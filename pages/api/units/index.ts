import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import type { Unit } from "interfaces/units";
import { constants } from "utils/constants";
import { calculateDistance } from "utils/helpers";

const GET = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const coordinates = {
      currentLocation: {
        latitude: 0,
        longitude: 0
      },
      destination: {
        latitude: 0,
        longitude: 0
      }
    };

    const IPAPI_API_URI = "https://ipapi.co/json/";
    const { data: ipapiData } = await axios.get(IPAPI_API_URI);
    if (!ipapiData.ip) return res.status(404).json({ message: "IP Address not found!" });

    const IPSTACK_API_URI = `http://api.ipstack.com/${ipapiData.ip}?access_key=${constants.IPSTACK_API_KEY}`;
    const { data: ipstackData } = await axios.get(IPSTACK_API_URI);
    if (!ipstackData.latitude || !ipstackData.longitude)
      return res.status(404).json({ message: "Coordinates not found!" });

    coordinates.currentLocation.latitude = ipstackData.latitude;
    coordinates.currentLocation.longitude = ipstackData.longitude;

    const BCR_API_URI = "https://api.bcr.ro/api/v1/appointments/branches/";
    const { data: bcrData } = await axios.get(BCR_API_URI, {
      headers: {
        apiKey: constants.BCR_API_KEY
      }
    });

    if (bcrData.replyStatus.status !== "OK")
      return res.status(400).json({ message: "Something went wrong!" });

    const units = bcrData.serviceResponse.map((unit: Unit) => {
      coordinates.destination.latitude = parseFloat(unit.location.latitude);
      coordinates.destination.longitude = parseFloat(unit.location.longitude);

      return {
        appointmentsSchedule: {
          isCashless: unit.appointmentsSchedule.isCashless
        },
        br_street: unit.br_street,
        branchId: unit.branchId,
        brn: unit.brn,
        distance: calculateDistance(coordinates).toFixed(2),
        mfm_euro_all_day: unit.mfm_euro_all_day ? unit.mfm_euro_all_day : false,
        location: {
          latitude: unit.location.latitude,
          longitude: unit.location.longitude
        }
      };
    });

    return res.status(200).json({
      units,
      unitsByGeolocation: units
        .filter((unit: Unit) => unit.distance < 2)
        .sort((a: Unit, b: Unit) => a.distance - b.distance)
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      return GET(req, res);
    default:
      return res.status(404).json({ message: "API route not found!" });
  }
};

export default handler;

import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { constants } from "utils/constants";
import { calculateDistance } from "utils/helpers";

interface BcrData {
  replyStatus: {
    status: string;
  };
  serviceResponse: {
    branchId: number;
    brn: string;
    br_street: string;
    location: {
      latitude: string;
      longitude: string;
    };
    schedule: {
      mf: string;
      sat: string;
      sun: string;
    };
    scheduleBreak: {
      mf: string;
      sat: string;
      sun: string;
    };
    appointmentsSchedule: {
      isWeekendOpen: boolean;
    };
  }[];
}

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { search } = req.query;

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

    if (!search || (search as string).length < 3) {
      const IPAPI_API_URI = "https://ipapi.co/json/";
      const { data: ipapiData } = await axios.get(IPAPI_API_URI);

      const IPSTACK_API_URI = `http://api.ipstack.com/${ipapiData.ip}?access_key=${constants.IPSTACK_API_KEY}`;
      const { data: ipstackData } = await axios.get(IPSTACK_API_URI);

      coordinates.currentLocation.latitude = ipstackData.latitude;
      coordinates.currentLocation.longitude = ipstackData.longitude;
    }

    const BCR_API_URI = "https://api.bcr.ro/api/v1/appointments/branches/";
    const { data: bcrData } = await axios.get<BcrData>(BCR_API_URI, {
      headers: {
        apiKey: constants.BCR_API_KEY
      }
    });

    if (bcrData.replyStatus.status !== "OK")
      return res.status(400).json({ message: "Something went wrong!" });

    const units = bcrData.serviceResponse.filter((unit) => {
      const filterBySearch = () => {
        if (unit.brn.toLowerCase().includes((search as string).toLowerCase())) return true;
        if (unit.br_street.toLowerCase().includes((search as string).toLowerCase())) return true;
        return false;
      };

      const filterByGeolocation = () => {
        coordinates.destination.latitude = parseFloat(unit.location.latitude);
        coordinates.destination.longitude = parseFloat(unit.location.longitude);
        if (calculateDistance(coordinates) < 1) return true;
        return false;
      };

      if (search && (search as string).length >= 3) return filterBySearch();
      else return filterByGeolocation();
    });

    return res.status(200).json(units);
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

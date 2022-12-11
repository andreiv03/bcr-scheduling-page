import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { constants } from "utils/constants";

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(404).json({ message: "Branch ID not found!" });

    const BCR_API_URI = `https://api.bcr.ro/api/v1/appointments/availableTime?operationId=1&branchId=318`;
    const { data: bcrData } = await axios.get(BCR_API_URI, {
      headers: {
        apiKey: constants.BCR_API_KEY,
      },
    });

    const availableTimeList = bcrData.serviceResponse.availableTimeList[0];
    return res.status(200).json(availableTimeList?.timeSlots);
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

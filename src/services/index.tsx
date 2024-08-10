import axios from "axios";
import { APIresponse } from "@/types";
require("dotenv");

const API_KEY = process.env.NEXT_PUBLIC_PREDICTHQ_API_KEY;
const getData = async (params: any): Promise<APIresponse> => {
  try {
    const response = await axios.get("https://api.predicthq.com/v1/events", {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getTotalEventsCount = async (params: any): Promise<APIresponse> => {
  try {
    const response = await axios.get(
      "https://api.predicthq.com/v1/events/count",
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        params: params,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export { getData, getTotalEventsCount };

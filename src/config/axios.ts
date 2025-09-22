import axios from "axios";

import { AXIOS_HEADERS } from "@/config/constants";

const axiosInstance = axios.create({
	headers: AXIOS_HEADERS,
	withCredentials: true,
});

export default axiosInstance;

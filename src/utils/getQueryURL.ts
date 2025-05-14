import { BASE_URL } from "../constants/endpoint";

const getQueryURL = (query: Record<string, string>) => {
	const params = new URLSearchParams(query);
	return BASE_URL + "?" + params.toString();
};

export default getQueryURL;

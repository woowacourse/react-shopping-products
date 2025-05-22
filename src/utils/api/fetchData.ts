import { USER_TOKEN } from "../../constants/env";
import handleHttpError from "../handleHTTPError";

const fetchData = async ({ url }: { url: string }) => {
	try {
		const response = await fetch(url, {
			headers: {
				"content-type": "application/json",
				Authorization: `Basic ${USER_TOKEN}`,
			},
		});

		handleHttpError(response);
		const data = await response.json();
		return data.content;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};

export default fetchData;

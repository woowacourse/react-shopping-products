import { USER_TOKEN } from "../../constants/env";
import handleHttpError from "../handleHTTPError";

interface FetchOptions {
	url: string;
	headers?: HeadersInit;
	body?: BodyInit;
}

const fetchData = async ({ url, body }: FetchOptions) => {
	try {
		const response = await fetch(url, {
			headers: {
				"content-type": "application/json",
				Authorization: `Basic ${USER_TOKEN}`,
			},
			body,
		});

		handleHttpError(response);
		const data = await response.json();
		return data.content;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
	}
};

export default fetchData;

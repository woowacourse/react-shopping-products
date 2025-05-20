import { useState, useEffect } from "react";
import handleHttpError from "../utils/handleHTTPError";

interface FetchState<T> {
	data: T;
	loading: boolean;
	error: string;
}

interface FetchOptions {
	url: string;
	method?: "GET" | "POST" | "PUT" | "DELETE";
	headers?: HeadersInit;
	body?: BodyInit;
}

export function useFetch<T>({ url, method = "GET", headers, body }: FetchOptions) {
	const [itemInfo, setItemInfo] = useState<FetchState<T>>({
		data: [] as T,
		loading: false,
		error: "",
	});

	const fetchData = async () => {
		setItemInfo((prev) => ({ ...prev, loading: true }));
		try {
			const response = await fetch(url, {
				method,
				headers,
				body,
			});
			handleHttpError(response);
			const data = await response.json();
			setItemInfo({ data: data.content, loading: false, error: "" });
		} catch (error) {
			if (error instanceof Error) {
				setItemInfo((prev) => ({ ...prev, loading: false, error: error.message }));
			}
		}
	};

	useEffect(() => {
		fetchData();
	}, [url]);

	return { ...itemInfo, refetch: fetchData };
}

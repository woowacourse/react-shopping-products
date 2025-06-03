import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useError } from "./ErrorContext";

const DataContext = createContext<{
	data: Record<string, unknown>;
	setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}>({
	data: {},
	setData: () => {},
});

export function DataProvider({ children }: { children: React.ReactNode }) {
	const [data, setData] = useState({});

	return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>;
}

export function useData<T>({ fetcher, name }: { fetcher: () => Promise<T>; name: string }) {
	const { data, setData } = useContext(DataContext);
	const [loading, setLoading] = useState(false);
	const { setError } = useError();

	const request = useCallback(async () => {
		setLoading(true);
		fetcher()
			.then((res) => {
				setData((data) => {
					return { ...data, [name]: res };
				});
			})
			.catch((error) => {
				setError(name, error.message);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [fetcher, name, setData]);

	useEffect(() => {
		const hasData = data[name];

		if (hasData) {
			return;
		}
		request();
	}, [data, name, request]);

	return { data: data[name] as T | undefined, refetch: request, loading, setLoading };
}

const getQueryURL = (baseURL: string, query: Record<string, string>) => {
	const params = new URLSearchParams(query);
	return baseURL + "?" + params.toString();
};

export default getQueryURL;

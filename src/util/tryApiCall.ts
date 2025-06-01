import {
	ERROR_MESSAGE_DURATION,
	ERROR_MESSAGE_ANIMATION_DELAY,
} from "../constants/systemConstants";

const tryApiCall = async <T>(
	apiCall: () => Promise<T>,
	handleErrorToast: (errorMessage: string) => void,
) => {
	try {
		const data = await apiCall();
		return data;
	} catch (error) {
		if (error instanceof Error) {
			handleErrorToast(error.message);
			setTimeout(() => {
				handleErrorToast("");
			}, ERROR_MESSAGE_DURATION + ERROR_MESSAGE_ANIMATION_DELAY);
		}
		return undefined;
	}
};

export default tryApiCall;

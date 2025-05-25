import { createContext } from "react";

interface ErrorMessageContextType {
	errorMessage: string;
	handleErrorMessage: (errorMessage: string) => void;
	isToastVisible: boolean;
}

interface ErrorMessageContextProps extends ErrorMessageContextType {
	children: React.ReactNode;
}

export const ErrorMessageContext =
	createContext<ErrorMessageContextType | null>(null);

export const ErrorMessageProvider = ({
	errorMessage,
	handleErrorMessage,
	isToastVisible,
	children,
}: ErrorMessageContextProps) => {
	return (
		<ErrorMessageContext.Provider
			value={{
				errorMessage,
				isToastVisible,
				handleErrorMessage,
			}}
		>
			{children}
		</ErrorMessageContext.Provider>
	);
};

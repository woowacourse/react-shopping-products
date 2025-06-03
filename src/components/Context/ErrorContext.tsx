// src/components/Context/ErrorContext.tsx
import { createContext, useContext, useState, type PropsWithChildren } from "react";

interface ErrorContextType {
	errors: Record<string, string>;
	setError: (key: string, message: string) => void;
	clearError: (key: string) => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export function ErrorProvider({ children }: PropsWithChildren) {
	const [errors, setErrors] = useState<Record<string, string>>({});

	const setError = (key: string, message: string) => {
		setErrors((prev) => ({ ...prev, [key]: message }));
	};

	const clearError = (key: string) => {
		setErrors((prev) => {
			const newErrors = { ...prev };
			delete newErrors[key];
			return newErrors;
		});
	};

	return <ErrorContext.Provider value={{ errors, setError, clearError }}>{children}</ErrorContext.Provider>;
}

export function useError() {
	const context = useContext(ErrorContext);
	if (!context) throw new Error("useError must be used within ErrorProvider");
	return context;
}

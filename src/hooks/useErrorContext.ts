import { useContext } from "react";
import { ErrorContext } from "../contexts";

export default function useErrorContext() {
  return useContext(ErrorContext);
}

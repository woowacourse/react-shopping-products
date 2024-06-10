import { useEffect, useState } from "react";
import { useErrorContext, useErrorToast } from "../../../hooks";

import * as Styled from "./Toast.style";

export default function Toast() {
  const [isClose, setIsClose] = useState<boolean>(false);

  const { isToastOpen, error } = useErrorToast();
  const { setError } = useErrorContext();

  useEffect(() => {
    if (!isToastOpen) {
      const removeTimer = setTimeout(() => {
        setIsClose(true);
      }, 500);

      return () => {
        clearTimeout(removeTimer);
        setIsClose(false);
      };
    }
  }, [isToastOpen, setError]);

  if (!error) return null;

  return (
    <Styled.Container $isClose={isClose}>
      <Styled.ToastMessage>{error?.message}</Styled.ToastMessage>
    </Styled.Container>
  );
}

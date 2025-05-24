import { ComponentProps, useCallback, useEffect } from "react";

import ModalBackdrop from "./Modal.Backdrop";
import ModalButtonWrapper from "./Modal.ButtonWrapper";
import ModalCancelButton from "./Modal.CancelButton";
import ModalCloseButton from "./Modal.CloseButton";
import ModalConfirmButton from "./Modal.ConfirmButton";
import ModalContainer from "./Modal.Container";
import ModalDescription from "./Modal.Description";
import ModalTitle from "./Modal.Title";
import Portal from "./Portal";

import { ModalContext } from "../../../hooks/useModalContext";

export type ModalProps = {
  /**
   * If true, the modal will be open
   */
  isOpen: boolean;

  /**
   * close function to be called when the close button is clicked
   * @default 'Close'
   */
  onClose: VoidFunction;

  /**
   * The content of the modal
   */
  children: React.ReactNode;

  /**
   * The z-index of the modal
   * @default 1000
   */
  $zIndex?: number;

  /**
   * If true, the modal will be closed by Escape key press
   * @default true
   */
  closeByEscapeKey?: boolean;

  /**
   * If true, the modal will be closed by click Backdrop
   */
  closeByBackdrop?: boolean;
} & ComponentProps<"div">;

export const Modal = (props: ModalProps) => {
  const {
    isOpen,
    onClose,
    children,
    closeByEscapeKey = true,
    closeByBackdrop = true,
  } = props;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeByEscapeKey) {
        onClose();
      }
    },
    [closeByEscapeKey, onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <ModalContext.Provider value={props}>
      <Portal isOpen={isOpen}>
        <ModalBackdrop closeByBackdrop={closeByBackdrop} />
        {children}
      </Portal>
    </ModalContext.Provider>
  );
};

Modal.Container = ModalContainer;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.CloseButton = ModalCloseButton;
Modal.ButtonWrapper = ModalButtonWrapper;
Modal.CancelButton = ModalCancelButton;
Modal.ConfirmButton = ModalConfirmButton;

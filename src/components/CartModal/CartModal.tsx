import { Modal } from "@kaori-killer/modal-component";

interface CartModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

function CartModal({ isOpen, handleClose }: CartModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <Modal.Content position="bottom" size="small">
        <Modal.Header direction="row" align="start" justify="start">
          <Modal.Title tag="h1" fontSize="25px" fontWeight="700">
            Title이다!
          </Modal.Title>
          <Modal.CloseButton onClose={handleClose} />
        </Modal.Header>
        <Modal.Body>
          <Modal.Input placeholder="쿠폰 번호 입력" />
        </Modal.Body>
        <Modal.Footer direction="row" align="end" justify="center">
          <Modal.Button color="light" size="small">
            확인
          </Modal.Button>
          <Modal.Button color="dark" size="small" onClick={handleClose}>
            취소
          </Modal.Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

export default CartModal;

function fixScrollOutsideModal(isModalOpen: boolean) {
  if (isModalOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}

export default fixScrollOutsideModal;

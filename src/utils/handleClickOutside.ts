const handleClickOutside = (
  event: MouseEvent,
  ref: React.RefObject<HTMLElement>,
  callback: () => void,
) => {
  if (event.target instanceof Node && ref.current && !ref.current.contains(event.target))
    callback();
};

export default handleClickOutside;

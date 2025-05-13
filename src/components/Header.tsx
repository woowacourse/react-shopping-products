const Header = ({ cartItemCount }: { cartItemCount: number }) => {
  return (
    <header>
      <h1>SHOP</h1>
      <img src="/cartIcon.png" />
      <div>{cartItemCount}</div>
    </header>
  );
};

export default Header;

import Header from "@/components/Header";
import ProductContent from "@/components/Product/Content";

// const cartItemResource = getCartItems();
function ProductPage() {
  // const cartItemData = use(cartItemResource);
  // const [cartItems, setCartItems] = useState<CartItemType[]>(cartItemData);

  // const updateCartItems = (newCartItems: CartItemType[]) => {
  //   setCartItems(newCartItems);
  // };

  return (
    <>
      <Header />
      <ProductContent />
    </>
  );
}

export default ProductPage;

import { DEFAULT_IMAGE_URL } from "../../constants/images";
import { GetCartItemsResponse, GetProductResponse } from "../../types";
import Button from "../Button/Button";
import Card from "../Card/Card";
import { AddCart, RemoveCart } from "../icons";
import Text from "../Text/Text";

interface ProductCardProps {
  product: GetProductResponse["content"][number];
  handleAddCartItem: (productId: number) => void;
  handleDeleteCartItem: (productId: number) => void;
  cartItems: GetCartItemsResponse;
}

export default function ProductCard({ product, cartItems, handleAddCartItem, handleDeleteCartItem }: ProductCardProps) {
  return (
    <Card key={product.id}>
      <Card.Preview>
        <img
          src={product.imageUrl}
          onError={(e) => {
            (e.target as HTMLImageElement).src = DEFAULT_IMAGE_URL;
          }}
          alt={product.name}
        />
      </Card.Preview>
      <Card.Content style={{ display: "flex", flexDirection: "column", gap: "27px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Text variant="title-2">{product.name}</Text>
          <Text>{product.price.toLocaleString()}원</Text>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {cartItems && cartItems.content.find((item) => item.product.id === product.id) ? (
            <Button backgroundColor="#fff" onClick={() => handleDeleteCartItem(product.id)}>
              <RemoveCart />
              <Text>빼기</Text>
            </Button>
          ) : (
            <Button onClick={() => handleAddCartItem(product.id)}>
              <AddCart />
              <Text color="#fff">담기</Text>
            </Button>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}

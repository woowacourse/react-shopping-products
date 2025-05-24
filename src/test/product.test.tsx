import { server } from "../mock/node";
import { ProductType } from "../types/product";

server.listen();

describe("msw를 사용해서 수량 필드가 추가된 api를 mocking한다.", () => {
  it("상품 목록에서 수량 필드를 확인할 수 있다. ", async () => {
    const response = await fetch("https://example.com/products");
    const res = await response.json();
    res.content.forEach((product: ProductType) => {
      expect(product).toHaveProperty("quantity");
    });
  });
});

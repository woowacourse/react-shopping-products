export const cartItemListHandlers = [
  // http.get(CART_ITEMS_ENDPOINT, ({request}) => {
  //     const cartItemList = cartItemListData.content;
  //     return HttpResponse.json({ content: cartItemList }, {status: 200});
  //   }),
  //   http.post(CART_ITEMS_ENDPOINT, ({ params }) => {
  //     const { id } = params;
  //     const newItem = productListData.content.find(
  //       (item) => item.id === parseInt(id as string)
  //     );
  //     if (newItem) {
  //       cartItemListData.content.push({
  //         id: newItem.id,
  //         quantity: 1,
  //         product: newItem,
  //       });
  //       return HttpResponse.json({status: 201});
  //     }
  //   }),
  //   http.delete(CART_ITEMS_ENDPOINT, ({ params }) => {
  //     const { id } = params;
  //     cartItemListData.content = cartItemListData.content.filter(
  //       (item) => item.id !== parseInt(id as string)
  //     );
  //     if()
  //     return HttpResponse.json({status: 204});
  //   }),
];

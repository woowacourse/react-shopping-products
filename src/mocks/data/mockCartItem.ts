import { CartResponse } from '../../types/product';

export const mockCartItems: CartResponse = {
  content: [
    {
      id: 6590,
      quantity: 1,
      product: {
        id: 23,
        name: "리바이 아커만",
        price: 60000000,
        imageUrl: "https://image.zeta-ai.io/profile-image/793bf4d3-03de-4ac3-afe1-95be8a9bc62c/29cd5c72-f872-4dba-8be1-21ba51e4487f.jpeg?w=1080&q=90&f=webp",
        category: "패션잡화"
      }
    },
    {
      id: 6592,
      quantity: 1,
      product: {
        id: 7,
        name: "메이통통이",
        price: 11000,
        imageUrl: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb5H3cg%2FbtsMRVqcfYF%2FvbKfazkKNY7I5CGkF1Ye9k%2Fimg.png",
        category: "식료품"
      }
    }
  ],
  totalElements: 2
};

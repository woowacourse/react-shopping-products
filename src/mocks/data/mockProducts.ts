import { ProductType } from '../../types/product';

export const mockProducts: ProductType[] = [
  {
    id: 65,
    name: "8888",
    price: 8,
    imageUrl: "8",
    category: "식료품"
  },
  {
    id: 66,
    name: "9",
    price: 9,
    imageUrl: "9",
    category: "식료품"
  },
  {
    id: 67,
    name: "10",
    price: 10,
    imageUrl: "10",
    category: "식료품"
  },
  {
    id: 58,
    name: "1",
    price: 100,
    imageUrl: "이런 URL은 없겠지",
    category: "식료품"
  },
  {
    id: 26,
    name: "기세",
    price: 100,
    imageUrl: "33",
    category: "식료품"
  },
  {
    id: 42,
    name: "프린세스 미용놀이",
    price: 1010,
    imageUrl: "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202204/19/ed8eddd4-0edd-40ad-af7d-44a171577c92.jpg",
    category: "패션잡화"
  },
  {
    id: 34,
    name: "코카콜라 제로 1.5L",
    price: 2100,
    imageUrl: "https://sitem.ssgcdn.com/88/19/87/item/0000006871988_i1_750.jpg",
    category: "식료품"
  },
  {
    id: 23,
    name: "리바이 아커만",
    price: 60000000,
    imageUrl: "https://image.zeta-ai.io/profile-image/793bf4d3-03de-4ac3-afe1-95be8a9bc62c/29cd5c72-f872-4dba-8be1-21ba51e4487f.jpeg?w=1080&q=90&f=webp",
    category: "패션잡화"
  },
  {
    id: 7,
    name: "메이통통이",
    price: 11100000,
    imageUrl: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb5H3cg%2FbtsMRVqcfYF%2FvbKfazkKNY7I5CGkF1Ye9k%2Fimg.png",
    category: "식료품"
  },
  {
    id: 1,
    name: "감자칩",
    price: 1500,
    imageUrl: "https://sitem.ssgcdn.com/71/17/59/item/1000054591771_i1_750.jpg",
    category: "식료품"
  },
  {
    id: 2,
    name: "초코파이",
    price: 3000,
    imageUrl: "https://sitem.ssgcdn.com/29/34/36/item/1000019363429_i1_750.jpg",
    category: "식료품"
  },
  {
    id: 3,
    name: "나이키 운동화",
    price: 89000,
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png",
    category: "패션잡화"
  },
  {
    id: 4,
    name: "아디다스 모자",
    price: 25000,
    imageUrl: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4d2c0856f2614a5ab20daf5f00f8c4c9_9366/Baseball_Cap_Black_FK0891_01_standard.jpg",
    category: "패션잡화"
  },
  {
    id: 5,
    name: "사과 1kg",
    price: 5000,
    imageUrl: "https://sitem.ssgcdn.com/71/72/45/item/2097001457271_i1_750.jpg",
    category: "식료품"
  },
  {
    id: 6,
    name: "배 3개입",
    price: 8000,
    imageUrl: "https://sitem.ssgcdn.com/41/24/69/item/1000011692441_i1_750.jpg",
    category: "식료품"
  }
];

export const mockProductStock: Record<number, number> = {
  65: 0,
  66: 5,
  67: 10,
  68: 3,
  69: 0,
  58: 15,
  26: 20,
  42: 2,
  34: 50,
  23: 1,
  7: 8,
  1: 100,
  2: 50,
  3: 5,
  4: 10,
  5: 30,
  6: 25
};

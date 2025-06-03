import { ProductType } from '../../types/product';

export const mockProducts: ProductType[] = [
  {
    id: 65,
    name: '8888',
    price: 8,
    imageUrl: '8',
    category: '식료품',
  },
  {
    id: 26,
    name: '기세',
    price: 100,
    imageUrl: '33',
    category: '식료품',
  },
  {
    id: 42,
    name: '프린세스 미용놀이',
    price: 1010,
    imageUrl:
      'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202204/19/ed8eddd4-0edd-40ad-af7d-44a171577c92.jpg',
    category: '패션잡화',
  },
  {
    id: 34,
    name: '코카콜라 제로 1.5L',
    price: 2100,
    imageUrl: 'https://sitem.ssgcdn.com/88/19/87/item/0000006871988_i1_750.jpg',
    category: '식료품',
  },
  {
    id: 23,
    name: '리바이 아커만',
    price: 60000000,
    imageUrl:
      'https://image.zeta-ai.io/profile-image/793bf4d3-03de-4ac3-afe1-95be8a9bc62c/29cd5c72-f872-4dba-8be1-21ba51e4487f.jpeg?w=1080&q=90&f=webp',
    category: '패션잡화',
  },
  {
    id: 7,
    name: '메이통통이',
    price: 11100000,
    imageUrl:
      'https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fb5H3cg%2FbtsMRVqcfYF%2FvbKfazkKNY7I5CGkF1Ye9k%2Fimg.png',
    category: '식료품',
  },
  {
    id: 2,
    name: '초코파이',
    price: 3000,
    imageUrl: 'https://sitem.ssgcdn.com/29/34/36/item/1000019363429_i1_750.jpg',
    category: '식료품',
  },
  {
    id: 3,
    name: '나이키 운동화',
    price: 89000,
    imageUrl:
      'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/99486859-0ff3-46b4-949b-2d16af2ad421/custom-nike-dunk-high-by-you-shoes.png',
    category: '패션잡화',
  },
  {
    id: 4,
    name: '아디다스 모자',
    price: 25000,
    imageUrl:
      'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/4d2c0856f2614a5ab20daf5f00f8c4c9_9366/Baseball_Cap_Black_FK0891_01_standard.jpg',
    category: '패션잡화',
  },
  {
    id: 5,
    name: '사과 1kg',
    price: 5000,
    imageUrl: 'https://sitem.ssgcdn.com/71/72/45/item/2097001457271_i1_750.jpg',
    category: '식료품',
  },
  {
    id: 6,
    name: '플라망고',
    price: 8130,
    imageUrl:
      'https://velog.velcdn.com/images/minsungje/post/c27c57cb-fcbb-4641-b72d-0e2030739ae7/image.jpg',
    category: '식료품',
  },
  {
    id: 27,
    name: '아바라',
    price: 4800,
    imageUrl:
      'https://image.ohousecdn.com/i/bucketplace-v2-development/uploads/cards/snapshots/171653801239329270.jpeg?w=256&h=366&c=c',
    category: '식료품',
  },
  {
    id: 25,
    name: '얌샘김밥',
    price: 5000,
    imageUrl:
      'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20171018_6%2F1508253136417Dlrjh_PNG%2FCdq22zpVpr92_XHROlHbxjJ0.png&type=sc960_832',
    category: '식료품',
  },
  {
    id: 31,
    name: '민초 치킨',
    price: 47000,
    imageUrl:
      'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/218/20dddd283cca0cb01c9ac7285f20b704_res.jpeg',
    category: '식료품',
  },
  {
    id: 59,
    name: '달 무드등',
    price: 28000,
    imageUrl:
      'https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/794f/cecbea5bdc654a11ae02d28b4d1f4bd2a03a7389eb2b8cc4a45c1c9f7d9b.jpg',
    category: '패션잡화',
  },
  {
    id: 57,
    name: '후추',
    price: 23000,
    imageUrl:
      'https://i.namu.wiki/i/t4M8eo-01JpLUZLIrpTD5vqBnquZLvQrGZJ4Dl3lcXtbk5AOlyK2k3k-VOQQNhFyor-zEHGhlEn60FisBPIqjF8i2xRq10Dbc_Hgg5IbSGM0ROgmychWXYmJzU95XhFmpLMhgUyUGPMv7S9-6Jh6PQ.webp',
    category: '패션잡화',
  },
  {
    id: 8,
    name: '앵그리버드',
    price: 50000,
    imageUrl: 'https://media.bunjang.co.kr/product/223522208_%7Bcnt%7D_1683581287_w%7Bres%7D.jpg',
    category: '패션잡화',
  },
];

export const mockProductStock: Record<number, number> = {
  65: 0,
  26: 8,
  42: 2,
  34: 12,
  23: 1,
  7: 8,
  2: 3,
  3: 0,
  4: 10,
  5: 3,
  6: 25,
  27: 10,
  25: 0,
  31: 5,
  57: 7,
  8: 12,
  59: 3,
};

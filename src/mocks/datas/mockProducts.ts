export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
}

export const mockProducts: Product[] = [
  {
    id: 58,
    name: '1',
    price: 100,
    imageUrl: '이런 URL은 없겠지',
    category: '식료품',
    quantity: 4,
  },
  {
    id: 26,
    name: '기세',
    price: 100,
    imageUrl: '33',
    category: '식료품',
    quantity: 4,
  },
  {
    id: 34,
    name: '코카콜라 제로 1.5L',
    price: 2100,
    imageUrl: 'https://sitem.ssgcdn.com/88/19/87/item/0000006871988_i1_750.jpg',
    category: '식료품',
    quantity: 9,
  },
  {
    id: 28,
    name: '아샷추',
    price: 3800,
    imageUrl:
      'https://d2afncas1tel3t.cloudfront.net/wp-content/uploads/2023/12/%EC%95%84%EC%83%B7%EC%B6%94%EC%95%84%EC%9D%B4%EC%8A%A4%ED%8B%B0%EC%83%B7%EC%B6%94%EC%B9%B4%EB%94%94%EC%B9%B4%ED%8E%98%EC%9D%B8_1.png',
    category: '식료품',
    quantity: 11,
  },
  {
    id: 61,
    name: '4',
    price: 4444,
    imageUrl: 'ㅋ',
    category: '식료품',
    quantity: 6,
  },
  {
    id: 27,
    name: '아바라',
    price: 4800,
    imageUrl:
      'https://image.ohousecdn.com/i/bucketplace-v2-development/uploads/cards/snapshots/171653801239329270.jpeg?w=256&h=366&c=c',
    category: '식료품',
    quantity: 5,
  },
  {
    id: 25,
    name: '얌샘김밥',
    price: 5000,
    imageUrl:
      'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20171018_6%2F1508253136417Dlrjh_PNG%2FCdq22zpVpr92_XHROlHbxjJ0.png&type=sc960_832',
    category: '식료품',
    quantity: 8,
  },
  {
    id: 6,
    name: '플라망고',
    price: 8130,
    imageUrl:
      'https://velog.velcdn.com/images/minsungje/post/c27c57cb-fcbb-4641-b72d-0e2030739ae7/image.jpg',
    category: '식료품',
    quantity: 0,
  },
  {
    id: 31,
    name: '민초 치킨',
    price: 47000,
    imageUrl:
      'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/218/20dddd283cca0cb01c9ac7285f20b704_res.jpeg',
    category: '식료품',
    quantity: 5,
  },
  {
    id: 30,
    name: '민초 피자',
    price: 48000,
    imageUrl:
      'https://www.esquirekorea.co.kr/resources_old/online_thumnail_image/eq/322f1c2e-fdd0-4b84-97ec-cfc8ee88c9d7.jpg',
    category: '식료품',
    quantity: 1,
  },
  {
    id: 42,
    name: '프린세스 미용놀이',
    price: 1010,
    imageUrl:
      'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202204/19/ed8eddd4-0edd-40ad-af7d-44a171577c92.jpg',
    category: '패션잡화',
    quantity: 3,
  },
  {
    id: 5,
    name: '동물 양말',
    price: 20000,
    imageUrl:
      'https://m.cocosocks.com/web/product/medium/202503/940897aced51144109baa4d145def01f.jpg',
    category: '패션잡화',
    quantity: 7,
  },
  {
    id: 57,
    name: '후추',
    price: 23000,
    imageUrl:
      'https://i.namu.wiki/i/t4M8eo-01JpLUZLIrpTD5vqBnquZLvQrGZJ4Dl3lcXtbk5AOlyK2k3k-VOQQNhFyor-zEHGhlEn60FisBPIqjF8i2xRq10Dbc_Hgg5IbSGM0ROgmychWXYmJzU95XhFmpLMhgUyUGPMv7S9-6Jh6PQ.webp',
    category: '패션잡화',
    quantity: 4,
  },
  {
    id: 4,
    name: '달 무드등',
    price: 28000,
    imageUrl:
      'https://thumbnail6.coupangcdn.com/thumbnails/remote/492x492ex/image/vendor_inventory/794f/cecbea5bdc654a11ae02d28b4d1f4bd2a03a7389eb2b8cc4a45c1c9f7d9b.jpg',
    category: '패션잡화',
    quantity: 8,
  },
  {
    id: 8,
    name: '앵그리버드',
    price: 50000,
    imageUrl: 'https://media.bunjang.co.kr/product/223522208_%7Bcnt%7D_1683581287_w%7Bres%7D.jpg',
    category: '패션잡화',
    quantity: 2,
  },
  {
    id: 3,
    name: '에어포스3',
    price: 100000,
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20250407_286%2F17439977006922oALN_JPEG%2F78130550828343669_1743337356.jpg&type=sc960_832',
    category: '패션잡화',
    quantity: 5,
  },
  {
    id: 2,
    name: '에어포스2',
    price: 100000,
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20250407_286%2F17439977006922oALN_JPEG%2F78130550828343669_1743337356.jpg&type=sc960_832',
    category: '패션잡화',
    quantity: 3,
  },
  {
    id: 1,
    name: '에어포스1',
    price: 100000,
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20250407_286%2F17439977006922oALN_JPEG%2F78130550828343669_1743337356.jpg&type=sc960_832',
    category: '패션잡화',
    quantity: 7,
  },
  {
    id: 113,
    name: '에어포스1',
    price: 100000,
    imageUrl:
      'https://search.pstatic.net/common/?src=http%3A%2F%2Fshop1.phinf.naver.net%2F20250407_286%2F17439977006922oALN_JPEG%2F78130550828343669_1743337356.jpg&type=sc960_832',
    category: '패션잡화',
    quantity: 4,
  },
  {
    id: 22,
    name: '앵버잠옷',
    price: 200000,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZeoCnBP_VbQ4pLozKbZOIu6B0A9FB3gaeQA&s',
    category: '패션잡화',
    quantity: 9,
  },
];

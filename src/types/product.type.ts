export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

// TODO: constants 파일에 정의한 key값만 들어가게 타입 설정
export interface ProductFilterOptions {
  sort: string;
  category: string;
}

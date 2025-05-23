import { fireEvent, render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handler';
import { ErrorContextProvider } from '../contexts/ErrorContext';
import { ApiProvider } from '../contexts/ApiContext';
import HomeHeader from '../components/Header/HomeHeader';
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// it('상품 리스트를 조회할 수 있다.', async () => {
//   render(
//     <ErrorContextProvider>
//       <ApiProvider>
//         <ProductList />
//       </ApiProvider>
//     </ErrorContextProvider>
//   );

//   // given : 상품 목록을 받았을 때
//   // when : 유저가 화면에 들어왔을 때

//   // then : 상품 목록이 화면에 보여야 한다.

//   // 아티클 태그를 찾아서 이게 화면에 잘 보이는지 확인하려고 함
//   const productItem = await screen.findAllByRole('article');

//   expect(productItem).toHaveLength(mockProducts.content.length);
// });

it('상품을 장바구니에 담으면 헤더에서 장바구니 숫자가 증가한다.', async () => {
  render(
    <ErrorContextProvider>
      <ApiProvider>
        <HomeHeader />
      </ApiProvider>
    </ErrorContextProvider>
  );

  // given : 상품이 존재한다.
  // when : 장바구니에 상품을 담았을 때

  const cartButton = await screen.findAllByText('담기');
  screen.debug(cartButton);
  fireEvent.click(cartButton[0]);

  // then : 장바구니 숫자가 증가한다.

  const headerCount = await screen.findByText('11');
  expect(headerCount).toBeInTheDocument();
});

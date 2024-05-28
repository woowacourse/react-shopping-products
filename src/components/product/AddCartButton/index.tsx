import { useState } from 'react';
import * as S from './style';
import { AddCartIcon, RemoveCartIcon } from './Icons';

export default function AddCartButton() {
  const [isPushed, setPushed] = useState(false);

  const togglePushed = () => {
    setPushed((prev) => !prev);
  };

  return (
    <S.Button isPushed={isPushed} onClick={togglePushed}>
      {isPushed ? (
        <>
          <RemoveCartIcon />
          <p>빼기</p>
        </>
      ) : (
        <>
          <AddCartIcon />
          <p>담기</p>
        </>
      )}
    </S.Button>
  );
}

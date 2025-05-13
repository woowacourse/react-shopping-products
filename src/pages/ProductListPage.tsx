import Button from '../components/Button';
import Header from '../components/Header';

export const ProductListPage = () => {
  return (
    <>
      <Header />;
      <Button
        type="button"
        name="test"
        id="test"
        onClick={() => alert('클릭')}
        content="test"
        variant="smallBlack"
      />
    </>
  );
};

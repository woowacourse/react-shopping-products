import { assets } from '@/shared';

import { ImgButton } from './ImgButton';

export default {
  title: '5. Shared/ImgButton',
  component: ImgButton,
};

export const Default = () => (
  <ImgButton
    className='example-class'
    alt='example'
    src={assets.cart}
    type='button'
    onClick={() => alert('Button clicked')}
  />
);

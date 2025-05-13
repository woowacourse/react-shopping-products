import { Global, ThemeProvider } from '@emotion/react';
import { GlobalStyle, theme } from './style';
import Button from './component/@common/Button';
import Dropdown from './component/@common/Dropdown';
import { useState } from 'react';
import ArrowIcon from './component/@common/ArrowIcon';

export type SortOption = '높은 가격순' | '낮은 가격순';

function App() {
  const [selected, setSelected] = useState<SortOption>('낮은 가격순');

  const handleSortClick = (content: SortOption) => {
    setSelected(content);
  };

  const sortOptions: SortOption[] = ['높은 가격순', '낮은 가격순'];

  return (
    <>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyle} />
        <Button variant="default">담기</Button>
        <Button variant="gray">담기</Button>
        <Dropdown.Root>
          <Dropdown.Trigger>
            {selected}
            <ArrowIcon />
          </Dropdown.Trigger>
          <Dropdown.List>
            {sortOptions.map((option) => (
              <Dropdown.Item
                key={option}
                handleClick={handleSortClick}
                content={option}
              />
            ))}
          </Dropdown.List>
        </Dropdown.Root>
      </ThemeProvider>
    </>
  );
}

export default App;

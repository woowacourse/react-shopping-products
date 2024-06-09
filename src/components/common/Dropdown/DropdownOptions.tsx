import * as S from './DropdownOptions.style';

interface DropdownOptionsProps<T> {
  optionList: [T, string][];
  changeOption: (option: [T, string]) => void;
  handleIsOpened: () => void;
}

function DropdownOptions<T extends {}>(props: DropdownOptionsProps<T>) {
  const { optionList, changeOption, handleIsOpened } = props;

  const handleOnClick = (option: [T, string]) => {
    changeOption(option);
    handleIsOpened();
  };

  return (
    <S.Container>
      {optionList.map(([key, value], index) => {
        return (
          <S.OptionWrapper
            key={index}
            onClick={() => handleOnClick([key, value])}
          >
            <S.Option key={index}>{value}</S.Option>
          </S.OptionWrapper>
        );
      })}
    </S.Container>
  );
}

export default DropdownOptions;

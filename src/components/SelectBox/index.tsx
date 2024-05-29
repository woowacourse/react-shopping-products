import useSelect from "@/hooks/useSelect";
import * as S from "@/components/SelectBox/style";
interface SelectBoxProps {
  optionsContents: string[];
}

const SelectBox = ({ optionsContents }: SelectBoxProps) => {
  const { isDropdown, handleDropdown, selected, handleSelected } = useSelect(optionsContents[0]);

  return (
    <S.Select onClick={handleDropdown}>
      <S.Arrow isDropdown={!!isDropdown} />
      <S.SelectedCardWrapper>
        <S.SelectedCardText isSelected={!!selected}>{selected}</S.SelectedCardText>
      </S.SelectedCardWrapper>
      {isDropdown && (
        <S.OptionWrapper>
          {optionsContents.map((optionContent) => (
            <S.Option key={optionContent} onClick={handleSelected}>
              {optionContent}
            </S.Option>
          ))}
        </S.OptionWrapper>
      )}
    </S.Select>
  );
};

export default SelectBox;

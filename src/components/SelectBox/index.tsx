import useSelect from "@/hooks/useSelect";
import styled from "styled-components";

interface SelectBoxProps {
  optionsContents: string[];
}

const SelectBox = ({ optionsContents }: SelectBoxProps) => {
  const { isDropdown, handleDropdown, selected, handleSelected } = useSelect(optionsContents[0]);

  return (
    <Select onClick={handleDropdown}>
      <Arrow isDropdown={!!isDropdown} />
      <SelectedCardWrapper>
        <SelectedCardText isSelected={!!selected}>{selected}</SelectedCardText>
      </SelectedCardWrapper>
      {isDropdown && (
        <OptionWrapper>
          {optionsContents.map((optionContent) => (
            <Option key={optionContent} onClick={handleSelected}>
              {optionContent}
            </Option>
          ))}
        </OptionWrapper>
      )}
    </Select>
  );
};

export default SelectBox;

const Select = styled.ul`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 36px;
  font-size: 10px;

  box-sizing: border-box;
  border-radius: 3px;
  padding: 8px;
  margin-bottom: 3px;
  border: 1px solid ${({ theme }) => theme.COLOR["grey2"]};
  border-radius: 8px;
`;

const SelectedCardWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SelectedCardText = styled.p<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  color: ${(props) => (props.isSelected ? "black" : "grey")};
`;

const OptionWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 38px;
  background: white;
  width: 100%;
  border: 1px solid grey;
  border-radius: 5px;
  max-height: 20vh;
  overflow: scroll;
`;

const Option = styled.li`
  padding: 8px;

  &:hover {
    background: grey;
    transition: 0.1s;
  }
`;

const Arrow = styled.div<{ isDropdown: boolean }>`
  position: absolute;
  top: ${({ isDropdown }) => (isDropdown ? "40%" : "30%")};
  right: 10px;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  box-sizing: border-box;
  border-top: 2px solid black;
  border-right: 2px solid black;
  transform: ${(props) => (props.isDropdown ? "rotate(315deg)" : "rotate(135deg)")};
  transition: 0.3s;
`;

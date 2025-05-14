import SelectDropdown from "./SelectDropdown";
import { Container, Header } from "../../styles/SelectDropdown";
import { CATEGORY, SORT } from "../../constants/selectOption";

const SelectDropdownContainer = () => {

    const handleCategory = () =>{
        console.log(CATEGORY);
    }

    const handleSelect = () =>{
        console.log(SORT);
    }

  return (
    <>
      <Header>bpple 상품 목록</Header>
      <Container>
        <SelectDropdown options={CATEGORY} onSelect={handleCategory} />
        <SelectDropdown options={SORT} onSelect={handleSelect}/>
      </Container>
    </>
  );
};

export default SelectDropdownContainer;

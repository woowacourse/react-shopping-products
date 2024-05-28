import Header from "@/components/Header/Header";
import Title from "@/components/common/Title/Title";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import Flex from "@/components/common/Flex/Flex";

const categoryOptionList = [
  "fashion",
  "beverage",
  "electronics",
  "kitchen",
  "fitness",
  "books",
  "wooteco",
];

const filterOptionList = ["낮은 가격순", "높은 가격순"];

export default function ProductListPage() {
  return (
    <>
      <Header leftComponent={<h1>SHOP</h1>} />
      <Flex gap={20} direction="column">
        <Title title="안녕하세요 나는 타이틀" />
        <Flex gap={24} direction={"row"}>
          <Dropdown optionList={categoryOptionList} onChange={() => {}} />
          <Dropdown optionList={filterOptionList} onChange={() => {}} />
        </Flex>
      </Flex>
    </>
  );
}

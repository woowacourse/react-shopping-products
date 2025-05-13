import Select from "../commons/Select";

const options = [
  { value: "하이", text: "하이" },
  { value: "바이", text: "바이" },
];

function Filter() {
  return <Select options={options} />;
}

export default Filter;

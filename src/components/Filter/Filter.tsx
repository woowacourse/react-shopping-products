function Filter(props) {
  return (
    <div>
      <select>
        <option>전체</option>
        <option>식료품</option>
        <option>패션잡화</option>
      </select>
      <select>
        <option>낮은 가격순</option>
        <option>높은 가격순</option>
      </select>
    </div>
  );
}

export default Filter;

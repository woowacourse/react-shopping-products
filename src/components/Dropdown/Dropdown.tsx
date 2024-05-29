import React from 'react';

function Dropdown() {
  return (
    <div>
      <select>
        <option value={''}>전체</option>
        <option value={'fashion'}>fashion</option>
        <option value={'beverage'}>beverage</option>
        <option value={'electronics'}>electronics</option>
        <option value={'kitchen'}>kitchen</option>
        <option value={'fitness'}>fitness</option>
        <option value={'books'}>books</option>
        <option value={'animal'}>animal</option>
      </select>

      <select>
        <option value={''}>낮은 가격 순</option>
        <option value={'desc'}>높은 가격 순</option>
      </select>
    </div>
  );
}

export default Dropdown;

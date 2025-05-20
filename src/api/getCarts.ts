async function getCarts() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/cart-items?page=0&size=50`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error('에러 발생');
  }
  const data = await res.json();
  return data.content;
}

export default getCarts;

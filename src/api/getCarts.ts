async function getCarts() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/cart-items?page=0&size=50`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic cm9zaWVsc2g6cGFzc3dvcmQ',
    },
  });

  if (!res.ok) {
    throw new Error('에러 발생');
  }
  const data = await res.json();
  return data.content;
}

export default getCarts;

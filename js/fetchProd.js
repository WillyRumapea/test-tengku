export const fetchProd = async () => {
  try {
    const request = await fetch("http://localhost:3000/daftar-produk");
    const data = await request.json();
    const dataPayload = data.payload;
    return dataPayload;
  } catch (err) {
    console.log("error", err);
  }
};

fetchProd();

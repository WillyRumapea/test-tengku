import { fetchProd } from "./fetchProd.js";

const buttonOrder = document.getElementById("button-order");
const listMenu = document.querySelector("#list-menu");
const orderedList = document.getElementById("ordered-list");
const amountPrice = document.getElementById("amount-price");
amountPrice.value = 0;

buttonOrder.addEventListener("click", (e) => {
  e.preventDefault();
  listMenu.setAttribute("class", "block");
});

const getDataFetch = async () => {
  const prods = await fetchProd();
  prods.forEach((prod) => {
    const cardMenu = document.createElement("div");
    const nameProd = document.createElement("h3");
    const priceProd = document.createElement("h5");
    const imgProd = document.createElement("img");
    const buttonAddProd = document.createElement("button");

    nameProd.textContent = prod.nama_produk;
    priceProd.textContent = prod.harga_produk;
    imgProd.setAttribute("src", `../public/img/${prod.gambar_produk}`);
    buttonAddProd.textContent = "tambahkan";
    buttonAddProd.setAttribute("data-id", prod.id);

    buttonAddProd.addEventListener("click", () => {
      const idProd = parseInt(buttonAddProd.getAttribute("data-id"));
      const selectedMenu = prods.find((item) => item.id === idProd);

      if (selectedMenu) {
        const existingMenu = orders.find((item) => item.id == selectedMenu.id);
        console.log(existingMenu);
        if (existingMenu) {
          return;
        } else {
          const detailNameProd = document.createElement("p");
          const detailPriceProd = document.createElement("p");
          const orderedMenu = document.createElement("div");
          const qtyWrapper = document.createElement("div");
          const btnMin = document.createElement("button");
          const inputQty = document.createElement("input");
          inputQty.setAttribute("type", "number");
          inputQty.min = 1;
          inputQty.value = 1;
          const btnPls = document.createElement("button");

          detailNameProd.textContent = selectedMenu.nama_produk;
          detailPriceProd.textContent = selectedMenu.harga_produk;
          btnMin.textContent = "-";
          btnPls.textContent = "+";

          btnPls.addEventListener("click", (e) => {
            e.preventDefault();
            inputQty.value = parseInt(inputQty.value) + 1;

            const index = orders.findIndex(
              (item) => item.id === selectedMenu.id
            );
            if (index !== -1) {
              orders[index].qty = parseInt(inputQty.value);
              updatePrice();
            }
          });

          btnMin.addEventListener("click", (e) => {
            e.preventDefault();
            if (parseInt(inputQty.value) > 1) {
              inputQty.value = parseInt(inputQty.value) - 1;
              const index = orders.findIndex(
                (item) => item.id === selectedMenu.id
              );
              if (index !== -1) {
                orders[index].qty = parseInt(inputQty.value);
                updatePrice();
              }
            }
          });

          orderedMenu.appendChild(detailNameProd);
          orderedMenu.appendChild(detailPriceProd);

          qtyWrapper.appendChild(btnMin);
          qtyWrapper.appendChild(inputQty);
          qtyWrapper.appendChild(btnPls);

          orderedList.appendChild(orderedMenu);
          orderedList.appendChild(qtyWrapper);

          orders.push({
            id: selectedMenu.id,
            harga: parseInt(selectedMenu.harga_produk),
            qty: 1,
          });

          updatePrice();
        }
      }
    });

    cardMenu.appendChild(nameProd);
    cardMenu.appendChild(imgProd);
    cardMenu.appendChild(priceProd);
    cardMenu.appendChild(buttonAddProd);

    const listMenuCard = document.getElementById("list-card-menu");
    listMenuCard.appendChild(cardMenu);
  });
};

let orders = [];

const updatePrice = () => {
  const totalPrice = orders.reduce(
    (sum, item) => sum + item.harga * item.qty,
    0
  );
  amountPrice.value = totalPrice;
  console.log(totalPrice);
};

getDataFetch();

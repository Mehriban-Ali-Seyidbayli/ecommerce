const categoryList = document.querySelector(".category-list");
const productList = document.querySelector(".product-list");
const cartBtn = document.querySelector("#cart");
const modal = document.querySelector(".modal-wrapper");
const closeBtn = document.querySelector("#close");
const modalList = document.querySelector("#modal-list");
const priceSpan = document.querySelector("#price");



document.addEventListener("DOMContentLoaded", () => {
    fetchCategories();
    fetchProducts();

})

function fetchCategories() {
    fetch("https://api.escuelajs.co/api/v1/categories")
        .then((res) => res.json())
        .then(data => data.splice(0, 4).forEach(category => {
            const categoryDiv = document.createElement("div")
            categoryDiv.classList.add("category")

            categoryDiv.innerHTML = `
            <img src="${category.image}" alt="" />
            <span>${category.name}</span>
            `

            categoryList.appendChild(categoryDiv)
        })

        )
        .catch((err) => console.log(err))
}

function fetchProducts() {
    fetch("https://api.escuelajs.co/api/v1/products")
        .then((res) => res.json())
        .then((data) => {
            data.splice(0, 25).forEach((product) => {
                const productDiv = document.createElement("div");
                productDiv.classList.add("product")
                productDiv.innerHTML = `
                <img src="${product.images[0]}" alt="">
                <p>${product.title}</p>
                <p>${product.category.name}</p>
                <div class="product-info">
                    <span>${product.price} $</span>
                    <button onclick="addCart({name:'${product.title}', id:'${product.id}', price:'${product.price}', amount:1})">Add Cart</button>
                </div>
                `
                productList.appendChild(productDiv);

            })

        })
        .catch((err) => console.log(err))
}

const cart = [];
let sumPrice = 0;

function listCart() {
    cart.forEach((i) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cartItem");
        cartItem.innerHTML = `
        <h2>${i.name}</h2>
        <h2>${i.price} $</h2>
        <p>Amount: ${i.amount}</p>
        `

        modalList.appendChild(cartItem);
        sumPrice += Number(i.price) * i.amount;
        console.log(sumPrice);

    });
    priceSpan.innerText = sumPrice;
}

cartBtn.addEventListener("click", () => {
    toggleCart();
    listCart();
});

closeBtn.addEventListener("click", () => {
    toggleCart();
    modalList.innerHTML = "";
}

);

function toggleCart() {
    modal.classList.toggle("active");
}




function addCart(param) {
    const foundItem = cart.find((item) => item.id == param.id);

    if (foundItem) {
        foundItem.amount += 1;
    } else {
        cart.push(param);
    }

    console.log(cart);
}
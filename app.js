import products from './product.js';
import cart, { addToCart, increaseQuantity, decreaseQuantity, removeItem, clearCart } from './cart.js';

const productListElement = document.getElementById('product-list');
const cartElement = document.getElementById('cart');
const clearCartButton = document.getElementById('clear-cart');

function displayProducts() {
  for (const product of products) {
    const productElement = document.createElement('div');
    productElement.innerHTML = `
      <h3>${product.name}</h3>
      <p>Price: $${product.price}</p>
      <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">Add to Cart</button>
    `;
    productListElement.appendChild(productElement);
  }
}

function displayCart() {
  cartElement.innerHTML = '';

  for (const item of cart) {
    const cartItemElement = document.createElement('div');
    const total = item.product.price * item.quantity;

    cartItemElement.innerHTML = `
      <p>Product: ${item.product.name}</p>
      <p>Quantity: 
        <button class="btn btn-sm btn-secondary decrease-quantity" data-product-id="${item.product.id}">-</button>
        ${item.quantity}
        <button class="btn btn-sm btn-secondary increase-quantity" data-product-id="${item.product.id}">+</button>
      </p>
      <p>Price: $${item.product.price}</p>
      <p>Total: $${total}</p>
      <button class="btn btn-sm btn-danger remove-item" data-product-id="${item.product.id}">Remove</button>
    `;
    cartElement.appendChild(cartItemElement);
  }

  const totalAmount = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const totalAmountElement = document.createElement('h3');
  totalAmountElement.textContent = `Total Amount: $${totalAmount}`;
  cartElement.appendChild(totalAmountElement);
}

function handleAddToCartClick(event) {
  const productId = Number(event.target.dataset.productId);
  const product = products.find(item => item.id === productId);
  addToCart(product, 1);
  displayCart();
}

function handleIncreaseQuantityClick(event) {
  const productId = Number(event.target.dataset.productId);
  increaseQuantity(productId, 1);
  displayCart();
}

function handleDecreaseQuantityClick(event) {
  const productId = Number(event.target.dataset.productId);
  decreaseQuantity(productId, 1);
  displayCart();
}

function handleRemoveItemClick(event) {
  const productId = Number(event.target.dataset.productId);
  removeItem(productId);
  displayCart();
}

function handleClearCartClick() {
  clearCart();
  displayCart();
}

displayProducts();
displayCart();

productListElement.addEventListener('click', handleAddToCartClick);
cartElement.addEventListener('click', (event) => {
  if (event.target.classList.contains('increase-quantity')) {
    handleIncreaseQuantityClick(event);
  } else if (event.target.classList.contains('decrease-quantity')) {
    handleDecreaseQuantityClick(event);
  } else if (event.target.classList.contains('remove-item')) {
    handleRemoveItemClick(event);
  }
});
clearCartButton.addEventListener('click', handleClearCartClick);

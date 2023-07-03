const cart = [];

export function addToCart(product, quantity) {
  const cartItem = cart.find(item => item.product.id === product.id);
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }
}

export function increaseQuantity(productId, quantity) {
  const cartItem = cart.find(item => item.product.id === productId);
  if (cartItem) {
    cartItem.quantity += quantity;
  }
}

export function decreaseQuantity(productId, quantity) {
  const cartItem = cart.find(item => item.product.id === productId);
  if (cartItem) {
    cartItem.quantity -= quantity;
    if (cartItem.quantity < 0) {
      cartItem.quantity = 0;
    }
  }
}

export function removeItem(productId) {
  const index = cart.findIndex(item => item.product.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
  }
}

export function clearCart() {
  cart.length = 0;
}

export default cart;

let cart = {};

function showRedDot() {
  const dot = document.getElementById("red-dot");
  dot.style.display = "block";
  setTimeout(() => {
    dot.style.display = "none";
  }, 500);
}

function addToCart(item, price) {
  showRedDot();
  if (cart[item]) {
    cart[item].quantity++;
  } else {
    cart[item] = { quantity: 1, price: price };
  }
  updateCartDisplay();
}

function removeFromCart(item) {
  showRedDot();
  if (cart[item]) {
    cart[item].quantity--;
    if (cart[item].quantity === 0) {
      delete cart[item];
    }
  }
  updateCartDisplay();
}

function deleteItem(item) {
  delete cart[item];
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalDiv = document.getElementById('cart-total');
  cartItemsDiv.innerHTML = '';
  cartTotalDiv.innerHTML = '';

  let total = 0;
  if (Object.keys(cart).length === 0) {
    cartItemsDiv.innerHTML = '<p>No items in cart.</p>';
  }

  for (let item in cart) {
    const { quantity, price } = cart[item];
    total += quantity * price;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item} x ${quantity} = ₹${quantity * price}</span>
      <div class="cart-controls">
        <button onclick="addToCart('${item}', ${price})">+</button>
        <button onclick="removeFromCart('${item}')">-</button>
        <button onclick="deleteItem('${item}')">Delete</button>
      </div>
    `;
    cartItemsDiv.appendChild(div);

    const countDisplay = document.getElementById(`count-${item}`);
    if (countDisplay) {
      countDisplay.textContent = `Quantity: ${quantity}`;
    }
  }

  cartTotalDiv.innerText = `Total: ₹${total}`;

  const productIds = ['RoosterM', 'RoosterF', 'Bananas', 'Eggs','Water Apple'];
  for (let id of productIds) {
    if (!cart[id]) {
      const countDisplay = document.getElementById(`count-${id}`);
      if (countDisplay) {
        countDisplay.textContent = 'Quantity: 0';
      }
    }
  }
}


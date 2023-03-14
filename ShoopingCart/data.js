// why does getID work and not getClassName
let ShoppingCart = document.getElementById("shopping-cart")
let label = document.getElementById("label")
let basket = JSON.parse(localStorage.getItem("data")) || []

// console.log(basket)
let generateCartItems = () => {
      if (basket.length !== 0) {
        return (ShoppingCart.innerHTML = basket.map((x) => {
            // id is coming from basket local storage
            let { id, item } = x;
            // let x = basket.find((y) => y.id === id) || [];
            return `
      <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${x.img}" width="100" height="100">
                <span class="cart-item-title">${x.name}</span>
            </div>
            <span class="cart-price cart-column">$${x.price} pp*</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" id=${id} value=${item}>
                <button class="btn btn-danger" id="removeBtn" type="button">REMOVE</button>
            </div>
      </div>
          `;
          })
          .join(""));
      } else {
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="catalouge.html">
          <button class="HomeBtn">Back to home</button>
        </a>
        `;
      }



            
      // })
    };
// calling the function
generateCartItems();


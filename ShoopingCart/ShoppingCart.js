
let total = 0
//  chekcing if the doucment is still loading 
if (document.readyState == 'loading') {
      // adding event that will trigger the ready function
      document.addEventListener('DOMContentLoaded', ready)
} else {
      ready ()
}

function getCartLength() {
      const cartData = JSON.parse(localStorage.getItem("data")) || []; // Get cart data from localStorage, or an empty array if it's not set
      document.getElementById("cartAmount").textContent = cartData.length; // Update the text content of the #cartAmount element with the cart item count
    }

// clear All JQuery Chained effect
$(document).ready(function() {
      $("#clearBtn").click(function(){
            $("*").slideDown(5000).css("font-size", "20px").slideUp(5000)
           });
});


// ready function 
function ready () {
      // remove item button
const removeBtn = document.getElementsByClassName("btn-danger")
      for (let i=0; i < removeBtn.length; i++){
            let button = removeBtn[i]
            button.addEventListener('click', removeCartItem)
      }
      const quantityInputs = document.getElementsByClassName('cart-quantity-input')
      for (let i = 0; i < quantityInputs.length; i++) {
          let input = quantityInputs[i]
          input.addEventListener('change', quantityChanged)
      }
      cartTotal ()
      document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

// Random reference generate
let randomRef = Math.floor((Math.random() * 1000) + 1) + "XYZ" + "-" + Math.floor((Math.random() * 100));
// Confirm order button
function purchaseClicked() {
      alert('Thank you for your purchase! Order No.' + randomRef)
      const cartItems = document.getElementsByClassName('cart-items')[0]
      while (cartItems.hasChildNodes()) {
          cartItems.removeChild(cartItems.firstChild)
      }
      cartTotal()
  }
// remove item 
function removeCartItem(event) {
      let buttonclicked = event.target
      buttonclicked.parentElement.parentElement.remove()

      cartTotal()
      
}


// quantity change

function quantityChanged(event) {
      const input = event.target
      if (isNaN(input.value) || input.value <= 0) {
          input.value = 1
      }
      cartTotal()
  }

  function discount(total) {
      // INPUT IS FOR THE DISCOUNT CODE
      let input = document.getElementById("discount").value;
      if (input == "take20") {
        disAmt = total - 200;
        console.log(total);
        cartTotal(disAmt);
      } else {
        alert("You entered an invalid coupoun code!");
      }
    }

// Creating function that will add the total 
function cartTotal () {
      const cartContainer = document.getElementsByClassName('cart-items')[0]
      const cartRows = cartContainer.getElementsByClassName('cart-row')
      for (let i=0; i < cartRows.length; i++) {
            let cartRow = cartRows[i]
            let priceElmt = cartRow.getElementsByClassName('cart-price')[0]
            let quantityElmt = cartRow.getElementsByClassName('cart-quantity-input')[0]
            let price = parseFloat(priceElmt.innerText.replace('$', ''))
            let qntity = quantityElmt.value
            // console.log(price)
            total = total + (price * qntity)  
            // the quantity does not get removed when remove button is pressed so it gets added on 
      }

      total = Math.round(total * 100 * 1.2) / 100
      document.getElementsByClassName('cart-total-price')[0].innerHTML = '$' + total + " " + '(Inc. VAT)'
      // totalAlert()
}


// Total Alert 
function totalAlert () {
    alert('Your cart total is' + total)

}


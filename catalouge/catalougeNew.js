// JQuery animate 
$(document).ready(function(){
      $("#animateBtn").click(function(){
        $("#collapseExample").animate({
          height: 'toggle'
        });
      });
    });

let shop = document.getElementById('shop');


// product object array
let productList = [
      {
            prodID: "product1",
            name: "Maldives",
            img: "../images/maldives.jpg",
            desc: "Experience crystal clear water and with the love of your life!",
            price: "From $990",

      
      },

      {
            prodID: "product2",
            name: "Barcelona",
            img: "../images/barcelona.jpg",
            desc: "Explore the amazing culture and heritage of this spanish city.",
            price: "From $995",
      },

      {     
            prodID: "product3",
            name: "South Africa",
            img: "../images/safari.jpg",
            desc: "Why not experience some amazing wildlife in our south african safari.",
            price: "From $999",
      },

      {     
            prodID: "product4",
            name: "London",
            img: "../images/London.jpg",
            desc: "One of the most famous capitals in the world what more to say!",
            price: "From $1000",
      },

      {     
            prodID: "product5",
            name: "Sydney",
            img: "../images/sydney.jpg",
            desc: "Why not go down and under to this icon city in Australia.",
            price: "From $1100",
      },

      {     
            prodID: "product6",
            name: "Tokyo",
            img: "../images/tokyo.jpg",
            desc: "Explore the amazing culture and heritage of this Japanese capital.",
            price: "From $1200",
      }
]
// we retreive the data from local storage by using json.parse
// we need empty array for when there is no data 
let basket = JSON.parse(localStorage.getItem("data")) || []

// product card style fucntion
let generateProducts = () => {
      return (shop.innerHTML = productList.map((x) => {
            // console.log(x)
            // let { prodID, name, desc, img, price } = x; 
            // Why is it when I remove "product-id-${prodID}" below, the reference error goes away?
            return `
            <div class="col-sm-4 item" id=${x.prodID}>
            <div class="card bg-dark text-white">
                <img class="card-img" src=${x.img} alt="maldives-beach">
                <div class="card-img-overlay">
                  <h5 class="card-title">${x.name}</h5>
                  <p class="card-text">${x.desc}</p>
                  <!-- Adding button for collapse feature -->
                  <div class="collapse-content my-5">
                    <!-- the id collapseExample links to the div below which opens showing the content -->
                    <p>
                        <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                          More info
                        </a>
                        <!-- add to cart -->
                        <a class="btn btn-primary btn-sm addToCart" onclick="addToCart('${x.prodID},${x.name},${x.img},${x.price}')" data-product-id="1">
                          ADD TO CART
                        </a>
                        <p class="price">${x.price}</p>
                    </p>
                </div>
                </div>
            </div>
        </div>
            `
      }).join(" "));
};

generateProducts();

function getCartLength() {
      const cartData = JSON.parse(localStorage.getItem("data")) || []; // Get cart data from localStorage, or an empty array if it's not set
      document.getElementById("cartAmount").textContent = cartData.length; // Update the text content of the #cartAmount element with the cart item count
    }

// pushing products to cart 
//  why does selectedItem.prodID not work and we have to use just "id" ?
let addToCart = (itemData) => {
      let splitData = itemData.split(",")
      // console.log(splitData)
     let prodID = splitData[0]
     let prodName = splitData[1]
     let prodImg = splitData[2]
     let prodPrice = splitData[3].slice(6)
//      console.log(prodPrice)
     let selectedItem = prodID;
     let search = basket.find((x) => x.id === selectedItem.id);
      // if the item has not been added to basket then we push it here
  if (search === undefined) {
    basket.push({
      id: prodID,
      item: 1,
      name: prodName,
      img: prodImg,
      price: prodPrice
    });
      // if already in basket then we increase qntity
  } else {
    search.item += 1;
  }
//   alert when item is added to cart with total
  localStorage.setItem("data", JSON.stringify(basket));
  let Price = basket.reduce((acc, item) => acc + item.item * item.price, 0);
    alert(`cart total is:${Price}`);
};




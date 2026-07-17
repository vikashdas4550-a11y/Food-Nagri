const cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cart-container");

let total = 0;

function loadCart(){

    container.innerHTML = "";

    total = 0;

    cart.forEach((item,index)=>{

        total += item.price * item.quantity;

        container.innerHTML += `
        <div class="cart-item">

            <img src="${item.image}" width="100">

            <div>
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
                <p>Qty : ${item.quantity}</p>
            </div>

            <button onclick="removeItem(${index})">
            Remove
            </button>

        </div>
        `;
    });

    document.getElementById("total").innerHTML =
    "Total : ₹" + total;

}

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    loadCart();

}

loadCart();
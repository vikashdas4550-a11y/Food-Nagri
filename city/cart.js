let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {

    let existing = cart.find(item => item.name === name);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name,
            price,
            image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " Added Successfully");
}

function updateCartCount() {

    let count = document.getElementById("cart-count");

    if(count){
        count.innerText = cart.reduce((sum,item)=>sum+item.quantity,0);
    }

}

updateCartCount();
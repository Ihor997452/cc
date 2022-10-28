let g_order = $('.order');

$(document).ready(get);

function get() {
    $.ajax({
        type: 'GET',
        url: '/items',
        success: function (response) {
            buildCart(g_order, response);
        },
    })
}

function remove(id) {
    $.ajax({
        type: 'POST',
        url: '/remove/' + id,
        data: {id},
        success: function (response) {
            buildCart(g_order, response);
        },
    })
}

function buildItem(parent, item) {
    let cartItem = document.createElement("div");
    cartItem.className = "cart-item d-flex align-items-center justify-content-between";

    let imgContainer = document.createElement("div");

    let img = document.createElement("img");
    img.src = item.dish.imgPath;

    let cartContent = document.createElement("div");
    cartContent.style.cssText = "width: 30%; display: flex; flex-direction: column; justify-content: space-between;";

    let priceContainer = document.createElement("div");
    priceContainer.className = "d-flex align-items-center";
    let price = document.createElement("p");
    price.innerHTML = "Price: " + item.price.toString() + ".00";
    price.style.margin = "0";
    let sign = document.createElement("i");
    sign.className = "fa-solid fa-hryvnia-sign";
    priceContainer.appendChild(price);
    priceContainer.appendChild(sign);

    let removeBTN = document.createElement("a");
    removeBTN.setAttribute("onclick", "remove(" + item.dish.id + ")");
    removeBTN.innerHTML = "Remove"
    removeBTN.className = "button-small";
    removeBTN.style.cssText = "width: fit-content;";

    let name = document.createElement("p");
    name.innerHTML = "Name: " + item.dish.name;

    let category = document.createElement("p");
    category.innerHTML = "Category: " + item.dish.category;

    let quantity = document.createElement("p");
    quantity.innerHTML = "Quantity: " + item.quantity;

    imgContainer.appendChild(img);
    cartItem.appendChild(imgContainer);
    cartContent.appendChild(name)
    cartContent.appendChild(category)
    cartContent.appendChild(quantity)
    cartContent.appendChild(priceContainer);
    cartContent.appendChild(removeBTN);
    cartItem.appendChild(cartContent)

    parent.append(cartItem);
}

function buildOrderButton(parent) {
    //no
}

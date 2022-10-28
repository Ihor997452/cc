let g_cart = $('.cart');

function remove(id) {
    $.ajax({
        type: 'POST',
        url: '/remove/' + id,
        data: {id},
        success: function (response) {
            buildCart(g_cart, response);
        },
    })
}

function order(id, qID) {
    let quantity = $("#" + qID).val();
    $.ajax({
        type: 'POST',
        url: '/add/' + id,
        data: {id, quantity},
        success: function (response) {
            createAlert("Added");
            buildCart(g_cart, response);
        },
    })
}

function buildCart(parent, cart) {
    parent.empty();

    if (cart.items.length === 0) {
        let e = document.createElement("h4");
        e.innerHTML = "Wow, such empty..";
        parent.append(e);
    } else {
        for (let i = 0; i < cart.items.length; i++) {
            buildItem(parent, cart.items[i]);
        }

        buildTotal(parent, cart);
        buildOrderButton(parent);
    }
}

function buildItem(parent, item) {
    let cartItem = document.createElement("div");
    cartItem.className = "cart-item d-flex align-items-center justify-content-between";

    let imgContainer = document.createElement("div");

    let img = document.createElement("img");
    img.src = item.dish.imgPath;

    let priceContainer = document.createElement("div");
    priceContainer.className = "d-flex align-items-center";
    let price = document.createElement("p");
    price.innerHTML = item.price.toString() + ".00";
    let sign = document.createElement("i");
    sign.className = "fa-solid fa-hryvnia-sign";
    priceContainer.appendChild(price);
    priceContainer.appendChild(sign);

    let trashIcon = document.createElement("a");
    trashIcon.setAttribute("onclick", "remove(" + item.dish.id + ")");
    trashIcon.innerHTML = "<i class=\"fa-solid fa-trash\"></i>"
    trashIcon.className = "trash-icon";

    imgContainer.appendChild(img);
    cartItem.appendChild(imgContainer);
    cartItem.appendChild(priceContainer);
    cartItem.appendChild(trashIcon);

    parent.append(cartItem);
}

function buildOrderButton(parent) {
    let link = document.createElement("a");
    link.innerHTML = "Order";
    link.href = "/order";
    parent.append(link);
}

function buildTotal(parent, cart) {
    let t = document.createElement("h5");
    t.className = "total";
    let span = document.createElement("span");
    span.innerHTML = "Total: " + cart.total + ".00";
    let sign = document.createElement("i");
    sign.className = "fa-solid fa-hryvnia-sign";
    t.appendChild(span);
    t.appendChild(sign);
    parent.append(t);
}
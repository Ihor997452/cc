let g_page = 1
let g_size = 6;
let g_category = 'undefined';
let g_price = 'undefined';

$(document).ready(function () {
    get();
})


$('.range-slider__range').on('change', function () {
    $('#menu').empty();
    g_price = $(this).val();
    g_page = 1;
    get(0, g_category);
})

function changeCategory(it, page, category) {
    g_page = 1;

    if (category !== 'undefined') {
        $('#menu').empty();
    }

    $('.category').removeClass('active')
    it.classList.add('active');

    g_category = category;

    get(page, category);
}

function get(page, category) {
    $("#loadMore").remove();

    $.ajax({
        type: 'GET',
        url: '/dishes/getPage?size=' + g_size + '&page=' + page,
        data: {category, g_price},
        success: function (response) {
            buildMenu(response.content)

            if (response.content.length === g_size) {
                appendButton(category);
            }
        },
    })
}

function appendButton(category) {
    let loadMoreButton = document.createElement("a");
    loadMoreButton.id = "loadMore";
    loadMoreButton.className = 'button2';
    loadMoreButton.innerHTML = 'Load More'
    loadMoreButton.style.cssText = 'cursor:pointer; width: 25%; text-align: center; align-self: center;';

    if (category !== 'undefined') {
        loadMoreButton.setAttribute("onclick", "get(" + g_page++ + ',' + '\'' + category + '\'' + ")");
    } else {
        loadMoreButton.setAttribute("onclick", "get(" + g_page++ + ")");
    }


    $(".dishes-wrapper").append(loadMoreButton);
}

function buildMenu(items) {
    for (let i = 0; i < items.length; i++) {
        buildCard(items[i]);
    }

    $("input[type='number']").inputSpinner({buttonsOnly: true});
}

function buildCard(item) {
    let card = document.createElement("div");
    card.className = "my-card";

    let imgContainer = document.createElement("div");
    let img = document.createElement("img");
    img.style.cssText = "width: 100%; height: 100%; object-fit: contain;";
    img.alt = "img";
    img.src = item.imgPath;
    imgContainer.appendChild(img);

    let cardContent = document.createElement("div");
    cardContent.className = "my-card-content";

    let cardContentDiv1 = document.createElement("div");
    cardContentDiv1.className = "d-flex justify-content-between";
    cardContentDiv1.style.cssText = "margin: 5px;";
    let cardContentName = document.createElement("h3");
    cardContentName.innerHTML = item.name;
    let cardContentPortionSize = document.createElement("p");
    cardContentPortionSize.style.cssText = "color: #909090;";
    cardContentPortionSize.innerHTML = item.portionSize + 'g';
    cardContentDiv1.appendChild(cardContentName);
    cardContentDiv1.appendChild(cardContentPortionSize);

    let desc = document.createElement("p");
    desc.style.cssText = "color: #707070;  margin: 10px 5px 5px;";
    desc.innerHTML = item.description;

    let cardContentDiv2 = document.createElement("div");
    cardContentDiv2.className = "d-flex align-content-center justify-content-between";
    cardContentDiv2.style.cssText = "margin: 30px 5px 5px;";
    let input = document.createElement("input");
    input.type = "number";
    input.name = "quantity";
    input.min = "1";
    input.max = "10";
    input.value = "1";
    input.step = "1";
    input.id = "q-" + item.id;
    let cardContentDiv3 = document.createElement("div");
    cardContentDiv3.className = "d-flex align-items-center";
    let price = document.createElement("p");
    price.style.cssText = "padding-right: 10px;";
    price.innerHTML = item.price + ".00";
    let sign = document.createElement("i");
    sign.className = "fa-solid fa-hryvnia-sign";
    cardContentDiv3.appendChild(price);
    cardContentDiv3.appendChild(sign);
    let button = document.createElement("button");
    button.className = "button-small";
    button.type = "submit";
    button.setAttribute("onclick", "order(" + item.id + "," + "'q-' + " + item.id + ")");
    button.textContent = "Order";
    cardContentDiv2.appendChild(input);
    cardContentDiv2.appendChild(cardContentDiv3);
    cardContentDiv2.appendChild(button);

    cardContent.appendChild(cardContentDiv1);
    cardContent.appendChild(desc);
    cardContent.appendChild(cardContentDiv2);

    card.appendChild(imgContainer);
    card.appendChild(cardContent);

    $(card).hide().fadeIn(500);

    $("#menu").append(card);
}


let rangeSlider = function () {
    let slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');

    slider.each(function () {
        value.each(function () {
            let value = $(this).prev().attr('value');
            $(this).html(value);
        });

        range.on('input', function () {
            $(this).next(value).html(this.value);
        });
    });
};
rangeSlider();

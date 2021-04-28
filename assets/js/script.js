let pizzaJson = [
    { id: 1, name: 'Mussarela', img: 'assets/img/pizza.png', price: 20.19, sizes: ['100g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 2, name: 'Calabresa', img: 'assets/img/pizza2.png', price: 18.00, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 3, name: 'Quatro Queijos', img: 'assets/img/pizza3.png', price: 17.45, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 4, name: 'Americana', img: 'assets/img/pizza4.png', price: 19.77, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 5, name: 'Sorvete', img: 'assets/img/pizza5.png', price: 21.43, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 6, name: 'Moda da Casa', img: 'assets/img/pizza6.png', price: 18.55, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 7, name: 'Chocolate', img: 'assets/img/pizza7.png', price: 22.36, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' }
];

let cart = []
let modalQt = 1
let modalKey = 0

const Pizzas = {

    pizzaProperty: pizzaJson.forEach((pizza, index) => {
        let pizzaItemClone =
            document
                .querySelector('.models .pizza-item')
                .cloneNode(true);

        pizzaItemClone
            .setAttribute('data-key', index);

        pizzaItemClone
            .querySelector('.pizza-item--img img')
            .setAttribute('src', pizza.img);

        pizzaItemClone
            .querySelector('.pizza-item--price')
            .innerHTML = `R$ ${pizza.price.toFixed(2).replace(".", ",")}`;

        pizzaItemClone
            .querySelector('.pizza-item--name')
            .innerHTML = pizza.name;

        pizzaItemClone
            .querySelector('.pizza-item--desc')
            .innerHTML = pizza.description;

        pizzaItemClone
            .querySelector('a')
            .addEventListener('click', (e) => {
                e.preventDefault();
                const modal = document.querySelector('.pizzaWindowArea');
                const key = pizzaItemClone.getAttribute('data-key');;
                modalQt = 1;
                modalKey = key;

                modal.style.opacity = 0;
                setTimeout(() => {
                    modal.style.opacity = 1
                }, 100);

                modal.classList.toggle('active');

                document
                    .querySelector('.pizzaBig img')
                    .setAttribute('src', pizzaJson[key].img);

                document
                    .querySelector('.pizzaInfo h1')
                    .innerHTML = pizzaJson[key].name;

                document
                    .querySelector('.pizzaInfo--desc')
                    .innerHTML = pizzaJson[key].description;

                document
                    .querySelector('.pizzaInfo--actualPrice')
                    .innerHTML = `R$ ${pizzaJson[key].price.toFixed(2).replace(".", ",")}`;

                document
                    .querySelector('.pizzaInfo--size.selected')
                    .classList.remove('selected');

                document
                    .querySelectorAll('.pizzaInfo--size')
                    .forEach((size, sizeIndex) => {
                        if (sizeIndex == 2) {
                            size.classList.add('selected')
                        }
                        size.querySelector('span')
                            .innerHTML = pizzaJson[key].sizes[sizeIndex];
                    });

                document
                    .querySelector('.pizzaInfo--qt')
                    .innerHTML = modalQt;
            });

        document
            .querySelector('.pizza-area')
            .append(pizzaItemClone);
    }),
}

const modalEvents = {

    modalClose() {
        const modal = document.querySelector('.pizzaWindowArea');
        modal.style.opacity = 0
        setTimeout(() => {
            modal.classList.toggle('active')
        }, 500)
    },

    cancelButtons:
        document
            .querySelectorAll('.pizzaInfo--cancelMobileButton, .pizzaInfo--cancelButton')
            .forEach(cancelButton => {
                cancelButton.addEventListener('click', function buttonClose() {
                    const modal = document.querySelector('.pizzaWindowArea');
                    modal.style.opacity = 0
                    setTimeout(() => {
                        modal.classList.toggle('active')
                    }, 500)

                })
            }),

    buttonQtMais:
        document
            .querySelector('.pizzaInfo--qtmais')
            .addEventListener('click', () => {
                modalQt++
                document.querySelector('.pizzaInfo--qt').innerHTML = modalQt
            }),

    buttonQtMenos:
        document
            .querySelector('.pizzaInfo--qtmenos')
            .addEventListener('click', () => {
                if (modalQt > 1) {
                    modalQt--
                    document.querySelector('.pizzaInfo--qt').innerHTML = modalQt
                }
            }),

    buttonsSelected:
        document
            .querySelectorAll('.pizzaInfo--size')
            .forEach((size, sizeIndex) => {
                size.addEventListener('click', () => {
                    document
                        .querySelector('.pizzaInfo--size.selected')
                        .classList.remove('selected');
                    size.classList.add('selected');
                })
            }),

    buttonAddCart:
        document
            .querySelector('.pizzaInfo--addButton')
            .addEventListener('click', () => {
                const size = Number(document
                    .querySelector('.pizzaInfo--size.selected')
                    .getAttribute('data-key'));
                const identifier = `${pizzaJson[modalKey].id} && ${size}`;
                const key = cart.findIndex(item => item.identifier === identifier);

                if (key > -1) {
                    cart[key].Qt += modalQt;  //pega o item que foi verificado e atribui a quantidade
                } else {
                    cart.push({
                        identifier,
                        id: pizzaJson[modalKey].id,
                        size,
                        price: pizzaJson[modalKey].price,
                        Qt: modalQt
                    })
                }

                cartProperty.updateCart();
                modalEvents.modalClose();
            })
}

const cartProperty = {
    updateCart() {
        const cartModal =
            document
                .querySelector('aside');
        document
            .querySelector('.menu-openner span')
            .innerHTML = cart.length;

        if (cart.length > 0) {
            cartModal.classList.add('show');

            document
                .querySelector('.cart').innerHTML = '';

            let subTotal = 0;
            let desconto = 0;
            let total = 0;

            for (let pizzaCart in cart) {

                //vai procurar no pizzaJson a pizza que contém o msm id 
                //da pizza que tá no cart e adicionar todas as
                //informações na const pizzaItem
                const pizzaItem =
                    pizzaJson
                        .find(pizza => pizza.id === cart[pizzaCart].id);
                const cartItemClone =
                    document
                        .querySelector('.cart--item')
                        .cloneNode(true);
                const cartArea =
                    document
                        .querySelector('.cart');

                let pizzaSize;

                switch (cart[pizzaCart].size) {
                    case 0:
                        pizzaSize = 'P';
                        break;
                    case 1:
                        pizzaSize = 'M';
                        break;
                    case 2:
                        pizzaSize = 'G';
                        break;
                }

                const pizzaName = `${pizzaItem.name} (${pizzaSize})`;

                subTotal += pizzaItem.price * cart[pizzaCart].Qt;

                cartItemClone
                    .querySelector('img').src = pizzaItem.img;
                cartItemClone
                    .querySelector('.cart--item-nome').innerHTML = pizzaName;
                cartItemClone
                    .querySelector('.cart--item--qt').innerHTML = cart[pizzaCart].Qt;
                cartItemClone
                    .querySelector('.cart--item-qtmenos')
                    .addEventListener('click', () => {
                        if (cart[pizzaCart].Qt > 1) {
                            cart[pizzaCart].Qt--;
                        } else {
                            cart.splice(pizzaCart, 1);
                        }

                        cartProperty.updateCart();
                    });
                cartItemClone
                    .querySelector('.cart--item-qtmais')
                    .addEventListener('click', () => {
                        cart[pizzaCart].Qt++;
                        cartProperty.updateCart();
                    });

                cartArea.append(cartItemClone);
            }

            desconto = subTotal * 0.1;
            total = subTotal - desconto;

            document
                .querySelector('.subtotal span:last-child')
                .innerHTML = `R$ ${subTotal.toFixed(2).replace('.', ',')}`;
            document
                .querySelector('.desconto span:last-child')
                .innerHTML = `R$ ${desconto.toFixed(2).replace('.', ',')}`;
            document
                .querySelector('.total span:last-child')
                .innerHTML = `R$ ${total.toFixed(2).replace('.', ',')}`;

        } else {
            cartModal.classList.remove('show');
            cartModal.style.left = '100vw';

        }
    },

    menuMobileOpen:
        document
            .querySelector('.menu-openner')
            .addEventListener('click', () => {
                if (cart.length > 0) {
                    document
                        .querySelector('aside')
                        .style.left = '0';
                }
            }),

    menuMobileClose:
        document
            .querySelector('.menu-closer')
            .addEventListener('click', () => {
                document
                    .querySelector('aside')
                    .style.left = '100vw';
            })
}
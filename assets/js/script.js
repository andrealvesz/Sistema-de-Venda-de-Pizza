let pizzaJson = [
    { id: 1, name: 'Mussarela', img: 'assets/img/pizza.png', price: 20.19, sizes: ['100g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 2, name: 'Calabresa', img: 'assets/img/pizza2.png', price: 18.00, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 3, name: 'Quatro Queijos', img: 'assets/img/pizza3.png', price: 17.45, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 4, name: 'Americana', img: 'assets/img/pizza4.png', price: 19.77, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 5, name: 'Sorvete', img: 'assets/img/pizza5.png', price: 21.43, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 6, name: 'Moda da Casa', img: 'assets/img/pizza6.png', price: 18.55, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' },
    { id: 7, name: 'Chocolate', img: 'assets/img/pizza7.png', price: 22.36, sizes: ['320g', '530g', '860g'], description: 'Descrição da pizza em mais de uma linha muito legal bem interessante' }
];

const Pizzas = {

    pizzaProperty: pizzaJson.forEach((pizza, index) => {
        let pizzaItemClone = document.querySelector('.models .pizza-item').cloneNode(true)
        const buttonCancel = document.querySelector('.pizzaInfo--cancelButton')

        pizzaItemClone.querySelector('.pizza-item--img img').setAttribute('src', pizza.img)
        pizzaItemClone.querySelector('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2).replace(".",",")}`
        pizzaItemClone.querySelector('.pizza-item--name').innerHTML = pizza.name
        pizzaItemClone.querySelector('.pizza-item--desc').innerHTML = pizza.description

        pizzaItemClone.querySelector('a').addEventListener('click', (e)=>{
            e.preventDefault()
            const modal = document.querySelector('.pizzaWindowArea')

            modal.style.opacity = 0
            setTimeout(()=>{
                modal.style.opacity = 1
            }, 100)

            modal.classList.toggle('active')
        })

        buttonCancel.addEventListener('click', () => {
            document.querySelector('.pizzaWindowArea').classList.toggle('active')
        })
        
        document.querySelector('.pizza-area').append(pizzaItemClone)
    })
}


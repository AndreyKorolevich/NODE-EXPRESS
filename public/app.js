const convertPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency'
    }).format(price)
}


document.querySelectorAll('.price').forEach(elem => {
    elem.textContent = convertPrice(elem.textContent)
})


const shopCartHtml = document.getElementById('shopcart')
if (shopCartHtml) {
    shopCartHtml.addEventListener('click', event => {
        if (event.target.classList.contains('delete')) {
            const id = event.target.dataset.id;

            fetch('/shopcart/delete/' + id, {
                method: 'delete'
            }).then(res => res.json())
                .then(shopCart => {
                    if (shopCart.scooters.length) {
                        const html = shopCart.scooters.map(elem => {
                        console.log(elem)
                            return ` <tr>
                            <td>${elem.scooter.model}</td>
                            <td>${elem.count}</td>
                            <td>
                                <button class="btn btn-small red delete" data-id="${elem.scooter._id}">Delete</button>
                            </td>
                        </tr>`
                        }).join('')
                        shopCartHtml.querySelector('tbody').innerHTML = html
                        shopCartHtml.querySelector('.price').textContent = convertPrice(shopCart.price)
                    } else {
                        shopCartHtml.innerHTML = '<p>There`s no scooters in Shopcart</p>'
                    }
                })
        }
    })
}
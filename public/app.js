const convertPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency'
    }).format(price)
}

const convertDate = date => {
    return new Intl.DateTimeFormat('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    }).format(new Date(date))
}

document.querySelectorAll('.price').forEach(elem => {
    elem.textContent = convertPrice(elem.textContent)
})

document.querySelectorAll('.date').forEach(elem => {
    elem.textContent = convertDate(elem.textContent)
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


M.Tabs.init(document.querySelectorAll('.tabs'));
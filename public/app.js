const convertPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency'
    }).format(price)
}


document.querySelectorAll('.price').forEach(elem => {
    elem.textContent = convertPrice(elem.textContent)
})


const shopcartHtml = document.getElementById('shopcart')
if (shopcartHtml) {
    shopcart.addEventListener('click', event => {
        if (event.target.classList.contains('delete')) {
            const id = event.target.dataset.id;

            fetch('/shopcart/delete/' + id, {
                method: 'delete'
            }).then(res => res.json())
                .then(shopcart => {
                    if (shopcart.scooters.length) {
                        const html = shopcart.scooters.map(elem => {
                            return ` <tr>
                            <td>${elem.model}</td>
                            <td>${elem.count}</td>
                            <td>
                                <button class="btn btn-small delete" data-id="${elem.id}">Delete</button>
                            </td>
                        </tr>`
                        }).join('')
                        shopcartHtml.querySelector('tbody').innerHTML = html
                        shopcartHtml.querySelector('.price').textContent = convertPrice(shopcart.price)
                    } else {
                        shopcartHtml.innerHTML = '<p>There`s no scooters in Shopcart</p>'
                    }
                })
        }
    })
}
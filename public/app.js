document.querySelectorAll('.price').forEach(elem => {
    elem.textContent = new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency'
    }).format(elem.textContent)
})


const shopcart = document.getElementById('shopcart')
if(shopcart) {
    shopcart.addEventListener('click', event => {
        if(event.target.classList.contains('delete')) {
            const id = event.target.dataset.id;
            
            fetch('/shopcart/delete/' + id, {
                method: 'delete'
            }).then(res => res.json())
            .then(shopcart => {
                console.log(shopcart)
            })
        }
    })
}
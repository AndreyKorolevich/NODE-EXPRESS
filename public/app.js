document.querySelectorAll('.price').forEach(elem => {
    elem.textContent = new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency'
    }).format(elem.textContent)
})
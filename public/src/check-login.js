// Seleccionar botones que pueden redirigir a rutas que requieren login
const btn = document.querySelector('button');

// Revisar si existe el token y su validez
const fetchLogin = async () => {

    const response = await fetch('/auth/token', {
        headers: {
            'x-token': localStorage.getItem('token'),
        }
    })

    return response.status;

}

btn.addEventListener('click', async () => {

    const status = await fetchLogin();

    // Si el token no es valido/inexistente redirige a login
    switch (status) {
        case 400:
            window.location = '/view/login'
    }

})

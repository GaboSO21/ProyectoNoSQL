// Seleccionar botones que pueden redirigir a rutas que requieren login
const list = document.querySelector('.nav-ul');

// Revisar si existe el token y su validez
const fetchToken = async () => {

    const response = await fetch('/api/auth/token', {
        method: 'post',
        headers: {
            'x-token': localStorage.getItem('token'),
        }
    })

    return response;

}

document.addEventListener('DOMContentLoaded', async () => {

    const { status } = await fetchToken();

    // Si el token no es valido/inexistente cambia icono
    switch (status) {
        case 401:

            const loggedIcon = document.createElement('li');
            const anchor = document.createElement('a');
            const icon = document.createElement('i');

            loggedIcon.className = 'nav-li-i';
            icon.className = 'fa-solid fa-door-open fa-3x';
            anchor.className = 'nav-a-i';
            anchor.href = '../view/login';

            list.append(loggedIcon);
            loggedIcon.append(anchor);
            anchor.append(icon);

            break;

        case 200:

            const logoutIcon = document.createElement('li');
            const anchorLogout = document.createElement('a');
            const iconLogout = document.createElement('i');

            logoutIcon.className = 'nav-li-i';
            iconLogout.className = 'fa fa-sign-out fa-3x';
            anchorLogout.className = 'nav-a-i';

            list.append(logoutIcon);
            logoutIcon.append(anchorLogout);
            anchorLogout.append(iconLogout);

            logoutIcon.addEventListener('click', () => {

                localStorage.clear();
                window.location = '/';

            })

            break;

    }

})

const fetchData = async () => {

    let response = '';

    await fetch('/api/media', {
        headers: {
            'x-token': localStorage.getItem('token'),
        }
    })
        .then(res => {

            if (res.status === 401) {

                window.location = '/view/login'

            }

            response = res.json();

        });

    return response;

}

// <div class="container">
//     <div class="txt">
//         <h4 class="name">Nombre</h4>
//         <p class="url">www.media.com</p>
//     </div>
//     <i class="fa-solid fa-newspaper fa-3x" style="color: #f6f1f1"></i>
// </div>

const renderMedias = async () => {

    const { medias } = await fetchData();

    const parent = document.querySelector('.parent');

    medias.forEach(media => {

        const container = document.createElement('div');
        const txt = document.createElement('div');
        const name = document.createElement('h4');
        const url = document.createElement('p');
        const icon = document.createElement('i');

        container.className = 'container';
        txt.className = 'txt';
        name.className = 'name';
        url.className = 'url';
        icon.className = 'fa-solid fa-newspaper fa-3x';
        name.innerHTML = `${media.nombre}`;
        url.innerHTML = `${media.url}`;

        parent.append(container);
        container.append(txt, icon);
        txt.append(name, url);

    });

}

document.addEventListener('DOMContentLoaded', () => {

    renderMedias();

});

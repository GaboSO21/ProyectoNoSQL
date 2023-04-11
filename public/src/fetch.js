const fetchData = async () => {

    const response = await fetch('/api/pelicula', {
        headers: {
            'x-token': localStorage('token'),
        }
    });

    return response.json();

}

const fetchDirector = async (directorID) => {

    const response = await fetch('/api/director?' + new URLSearchParams({
        id: directorID,
    }).toString());

    return response.json();

}

document.addEventListener('DOMContentLoaded', () => {


    const renderMovies = async () => {

        const { peliculas } = await fetchData();
        const peliContainer = document.querySelector('section');

        peliculas.forEach(async (pelicula) => {

            console.log(pelicula);

            const { director } = await fetchDirector(pelicula.director);

            const divContainer = document.createElement('div');
            const secInfoContainer = document.createElement('div');
            const mainInfoContainer = document.createElement('div');
            const descContainer = document.createElement('div');
            const iconContainer = document.createElement('div');
            const titulo = document.createElement('h4');
            const genero = document.createElement('p');
            const directorNombre = document.createElement('p');
            const desc = document.createElement('p');
            const anchor = document.createElement('a');
            const icon = document.createElement('i');

            const modal = document.createElement('div');
            const modalContent = document.createElement('div');
            const content = document.createElement('div');
            const tituloModal = document.createElement('h4');
            const directorModal = document.createElement('h5');
            const generoModal = document.createElement('h6');
            const descModal = document.createElement('div');
            const descContent = document.createElement('p');
            const hr = document.createElement('hr');

            modal.id = 'myModal';
            modal.className = 'modal';
            modal.style.display = 'none';
            modalContent.className = 'modal-content';
            descModal.className = 'desc';

            divContainer.className = 'container';
            mainInfoContainer.className = 'main-info';
            secInfoContainer.className = 'sec-info';
            descContainer.className = 'desc';
            iconContainer.className = 'more-icon';
            anchor.className = 'icon-link';
            anchor.id = 'myBtn';

            icon.className = 'fa-solid fa-angles-right fa-2x';

            directorNombre.innerHTML = `${director.nombre} ${director.primApellido} ${director.segApellido}`;
            genero.innerHTML = pelicula.genero;
            titulo.innerHTML = pelicula.titulo;
            desc.innerHTML = pelicula.desc;

            tituloModal.innerHTML = pelicula.titulo
            directorModal.innerHTML = directorNombre.innerText;
            generoModal.innerHTML = genero.innerText;
            descContent.innerHTML = desc.innerText;

            peliContainer.append(divContainer, modal);
            modal.append(modalContent);
            modalContent.append(content, descModal, hr);
            descModal.append(descContent);
            content.append(tituloModal, directorModal, generoModal);

            divContainer.append(mainInfoContainer, secInfoContainer, iconContainer);
            iconContainer.append(anchor);
            anchor.append(icon);
            mainInfoContainer.append(titulo);
            secInfoContainer.append(directorNombre, genero, descContainer);
            descContainer.append(desc);

            anchor.addEventListener('click', () => {

                modal.style.display = 'block';

            })

            window.addEventListener('click', (event) => {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            })

        });


    }

    renderMovies();

});

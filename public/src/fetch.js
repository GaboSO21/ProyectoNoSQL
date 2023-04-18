const fetchData = async () => {

    let response = '';

    await fetch('/api/pelicula', {
        headers: {
            'x-token': localStorage.getItem('token'),
        }
    })
        .then(res => {

            if (res.status === 401) {

                window.location = '/view/login'
                alert('Login to view content!');

            }

            response = res.json();

        });

    return response;

}

const fetchDirector = async (directorID) => {

    const response = await fetch('/api/director?' + new URLSearchParams({
        id: directorID,
    }
    ),
        {
            headers: {
                'x-token': localStorage.getItem('token'),
            }
        }
    );

    return response.json();

}

const fetchRating = async (ratingID) => {

    const response = await fetch('/api/rating?' + new URLSearchParams({
        id: ratingID,
    }
    ),
        {
            headers: {
                'x-token': localStorage.getItem('token'),
            }
        }
    );

    return response.json();

}

const fetchPremios = async (premioId) => {

    const response = await fetch('/api/premio?' + new URLSearchParams({
        id: premioId,
    }
    ),
        {
            headers: {
                'x-token': localStorage.getItem('token'),
            }
        }
    );

    return response.json();

}

const fetchCriticas = async (criticaId) => {

    const response = await fetch('/api/critica?' + new URLSearchParams({
        id: criticaId,
    }
    ),
        {
            headers: {
                'x-token': localStorage.getItem('token'),
            }
        }
    );

    return response.json();

}

document.addEventListener('DOMContentLoaded', () => {


    const renderMovies = async () => {

        const { peliculas } = await fetchData();
        const peliContainer = document.querySelector('section');

        peliculas.forEach(async (pelicula) => {

            console.log(pelicula);

            const { premios } = pelicula;

            const { criticas } = pelicula;

            const { director } = await fetchDirector(pelicula.director);

            const { rating } = await fetchRating(pelicula.rating);

            const divContainer = document.createElement('div');
            const secInfoContainer = document.createElement('div');
            const mainInfoContainer = document.createElement('div');
            const descContainer = document.createElement('div');
            const iconContainer = document.createElement('div');
            const img = document.createElement('img');
            const titulo = document.createElement('h4');
            const genero = document.createElement('p');
            const directorNombre = document.createElement('p');
            const desc = document.createElement('p');
            const anchor = document.createElement('a');
            const icon = document.createElement('i');

            const modal = document.createElement('div');
            const modalContent = document.createElement('div');
            const content = document.createElement('div');
            const modalPremios = document.createElement('div');
            const tituloPremios = document.createElement('h6');
            const tituloCriticas = document.createElement('h6');
            const modalCriticas = document.createElement('div');
            const tituloModal = document.createElement('h4');
            const ratingModal = document.createElement('h6');
            const directorModal = document.createElement('h5');
            const generoModal = document.createElement('h6');
            const descModal = document.createElement('div');
            const descContent = document.createElement('p');
            const hr = document.createElement('hr');
            const hr2 = document.createElement('hr');

            modal.id = 'myModal';
            modal.className = 'modal';
            modal.style.display = 'none';
            modalContent.className = 'modal-content';
            descModal.className = 'desc';
            modalPremios.className = 'premios';
            modalCriticas.className = 'criticas';

            divContainer.className = 'container';
            mainInfoContainer.className = 'main-info';
            img.className = 'poster';
            secInfoContainer.className = 'sec-info';
            descContainer.className = 'desc';
            iconContainer.className = 'more-icon';
            anchor.className = 'icon-link';
            anchor.id = 'myBtn';

            icon.className = 'fa-solid fa-angles-right fa-2x';

            directorNombre.innerHTML = `${director.nombre} ${director.primApellido} ${director.segApellido}`;
            genero.innerHTML = pelicula.genero;
            titulo.innerHTML = pelicula.titulo;
            img.src = `../imgs/${pelicula.img}.png`;
            img.style.width = '200px';
            img.style.height = '300px';
            desc.innerHTML = pelicula.desc;

            tituloModal.innerHTML = pelicula.titulo
            ratingModal.innerHTML = `Puntaje: ${rating.puntaje}/200`;
            directorModal.innerHTML = directorNombre.innerText;
            generoModal.innerHTML = genero.innerText;
            descContent.innerHTML = desc.innerText;
            tituloPremios.innerHTML = 'Awards';
            tituloCriticas.innerHTML = 'Critics';

            peliContainer.append(divContainer, modal);
            modal.append(modalContent);
            modalContent.append(content, descModal, hr2, modalPremios, hr, modalCriticas);
            modalPremios.append(tituloPremios);
            modalCriticas.append(tituloCriticas);
            descModal.append(descContent);
            content.append(tituloModal, ratingModal, directorModal, generoModal);

            divContainer.append(mainInfoContainer, secInfoContainer, iconContainer);
            iconContainer.append(anchor);
            anchor.append(icon);
            mainInfoContainer.append(titulo, img);
            secInfoContainer.append(directorNombre, genero, descContainer);
            descContainer.append(desc);

            premios.forEach(async (data, i) => {

                const { premio } = await fetchPremios(data);

                const p = document.createElement('p');
                p.innerHTML = `${i + 1} - " ${premio.nombre} - ${premio.evento} " `

                modalPremios.append(p);

            });

            criticas.forEach(async (data, i) => {

                const { critica } = await fetchCriticas(data);

                const p = document.createElement('p');
                p.innerHTML = `${i + 1} - " ${critica.desc} - ${critica.jornalista} " `

                modalCriticas.append(p);


            });

            anchor.addEventListener('click', () => {

                modal.style.display = 'block';

            });

            window.addEventListener('click', (event) => {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            });

        });


    }

    renderMovies();

});

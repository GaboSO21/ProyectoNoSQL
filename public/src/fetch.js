const fetchData = async () => {

    const response = await fetch('/api/pelicula');

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
        const peliContainer = document.querySelector('.pelis');

        peliculas.forEach(async (pelicula) => {

            const { director } = await fetchDirector(pelicula.director);

            const divContainer = document.createElement('div');
            const tituloContainer = document.createElement('div');
            const infoContainer = document.createElement('div');
            const titulo = document.createElement('h2');
            const genero = document.createElement('p');
            const directorNombre = document.createElement('p');
            const hr = document.createElement('hr');

            divContainer.className = 'container';
            tituloContainer.className = 'titulo';
            infoContainer.className = 'info';

            titulo.innerHTML = pelicula.titulo;
            genero.innerHTML = pelicula.genero;
            directorNombre.innerHTML = director.nombre;

            peliContainer.append(divContainer);

            divContainer.append(tituloContainer, infoContainer);
            tituloContainer.append(titulo);
            infoContainer.append(genero, hr, directorNombre);

        });


    }

    renderMovies();

});














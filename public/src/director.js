const fetchData = async () => {

    let response = '';

    await fetch('/api/director', {
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

// <div class="parent">
//   <div class="card">
//     <div class="card-info">
//       <h4>Nombre</h4>
//       <h4>Apellido1 Apellido2</h4>
//       <div class="movies">
//         <p>Movie1</p>
//         <p>Movie2</p>
//         <p>Movie3</p>
//         <p>Movie4</p>
//       </div>
//     </div>
//   </div>

const renderDirectors = async () => {

    const { directores } = await fetchData();

    console.log(directores);

    const parent = document.querySelector('.parent');

    directores.forEach(director => {

        const { peliculas } = director;

        console.log(peliculas);

        const card = document.createElement('div');
        const card_info = document.createElement('div');
        const movies = document.createElement('div');
        const nombre = document.createElement('h4');
        const apellidos = document.createElement('h4');

        card.className = 'card';
        card_info.className = 'card-info';
        movies.className = 'movies';

        nombre.innerHTML = `${director.nombre}`;
        apellidos.innerHTML = `${director.primApellido} ${director.segApellido}`;

        parent.append(card);
        card.append(card_info);
        card_info.append(nombre, apellidos, movies);

    });

}

document.addEventListener('DOMContentLoaded', () => {

    renderDirectors();

});

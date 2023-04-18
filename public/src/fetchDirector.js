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

// <div class="mySlides fade">
//   <div class="text">
//     <img class="dir-img" src="../imgs/Posters.png" alt="" />
//     <div class="info">
//       <div class="main-info">
//         <h4>Nombre</h4>
//         <div class="lastname">
//           <h4>PrimApellido</h4>
//         </div>
//       </div>
//       <div class="dir-movies">
//         <p>Movies2222</p>
//         <p>Movies</p>
//         <p>Movies</p>
//       </div>
//     </div>
//   </div>
// </div>
// <div class="slides">
//     <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
//     <a class="next" onclick="plusSlides(1)">&#10095;</a>
// </div>

const renderDirector = async () => {

    const { directores } = await fetchData();

    const section = document.querySelector('.slideshow-container');

    directores.forEach((director, i) => {

        console.log(director);

        const mySlides_fade = document.createElement('div');
        const text = document.createElement('div');
        const info = document.createElement('div');
        const main_info = document.createElement('div');
        const nombre = document.createElement('h4');
        const lastname = document.createElement('div');
        const txt = document.createElement('h4');
        const dir_movies = document.createElement('div');

        mySlides_fade.className = 'mySlide fade';
        text.className = 'text';
        info.className = 'info';
        main_info.className = 'main-info';
        lastname.className = 'lastname';
        dir_movies.className = 'dir-movies';

        nombre.innerText = `${director.nombre}`;
        txt.innerText = `${director.primApellido}`;

        section.append(mySlides_fade);

        mySlides_fade.append(text);

        text.append(info, dir_movies);

        info.append(main_info);

        main_info.append(nombre, lastname);

        lastname.append(txt);

    });

}

document.addEventListener('DOMContentLoaded', () => {

    renderDirector();

});

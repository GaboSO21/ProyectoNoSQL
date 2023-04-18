const fetchData = async () => {

    let response = '';

    await fetch('/api/premio', {
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
//      <div class="container">
//       <div class="info">
//         <h4>Nombre</h4>
//         <h6>Evento</h6>
//         <h6>Anno</h6>
//       </div>
//       <div class="award">
//         <img class="trophy-img" src="../imgs/trophy.png" alt="" />
//       </div>
//     </div>
const renderAwards = async () => {

    const { premios } = await fetchData();

    const section = document.querySelector('section');

    premios.forEach(premio => {

        const container = document.createElement('div');
        const info = document.createElement('div');
        const award = document.createElement('div');
        const nombre = document.createElement('h4');
        const evento = document.createElement('h6');
        const anno = document.createElement('h6');
        const img = document.createElement('img');

        container.className = 'container';
        info.className = 'info';
        award.className = 'award';
        img.className = 'trophy-img';
        img.src = premio.src;

        nombre.innerText = premio.nombre;
        evento.innerText = premio.evento;
        anno.innerText = premio.anno;

        container.append(info, award);
        info.append(nombre, evento, anno);
        award.append(img);

        section.append(container);

    });

}

document.addEventListener('DOMContentLoaded', () => {

    renderAwards();

})

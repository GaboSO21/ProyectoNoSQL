// Boton de logout
const lgoutBtn = document.querySelector('button');

lgoutBtn.addEventListener('click', () => {

    localStorage.clear();

    window.location = '/view/login';

})

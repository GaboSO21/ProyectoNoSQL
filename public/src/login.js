const form = document.querySelector(".form-login");

const saveToken = (token) => {

    localStorage.setItem('token', token);

}

const fetchData = async (formData) => {

    const response = await fetch("/api/auth/login",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo: formData.get('correo'),
                password: formData.get('password')
            }),
        })
        .catch(err => console.log(err));

    switch (response.status) {
        case 200:
            return response.json();
        case 400:
            alert('Correo/Password - incorrectos');
            return 'Bad request';
        case 401:
            return 'Not authorized';
    }

}

const formSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();
    formData.append(
        'correo',
        document.querySelector('input[name="email"]').value
    )
    formData.append(
        'password',
        document.querySelector('input[name="password"]').value
    );

    const data = await fetchData(formData);

    if (data.token) {
        saveToken(data.token);
        window.location = "/view/test";
    }

    console.log(data);

}

form.addEventListener("submit", formSubmit);

document.addEventListener('DOMContentLoaded', () => {

    if (localStorage.getItem('token')) {

        window.location = "/view/test";

    }

});









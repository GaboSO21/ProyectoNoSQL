const form = document.querySelector("form");

const fetchData = async (formData) => {

    const response = await fetch("/api/users",
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre: formData.get('nombre'),
                correo: formData.get('correo'),
                password: formData.get('password'),
                estado: true,
            }),
        })
        .catch(err => console.log(err));

    return response.json();

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
    )
    formData.append(
        'nombre',
        document.querySelector('input[name="name"]').value
    )

    const data = await fetchData(formData);

    if (data.errors) {
        let errors = '';
        data.errors.forEach(error => {

            errors += error.msg + "\n";

        });
        alert(errors);
    } else {

        window.location = '/view/login';

    }

    console.log(data);

}

form.addEventListener("submit", formSubmit);

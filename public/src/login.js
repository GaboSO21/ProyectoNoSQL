const form = document.querySelector("form");

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

    return response.json();

}

const formSubmit = async (e) => {

    e.preventDefault();

    const formData = new FormData();
    formData.append(
        'correo',
        document.querySelector('input[name="correo"]').value
    )
    formData.append(
        'password',
        document.querySelector('input[name="password"]').value
    );

    const data = await fetchData(formData);

    console.log(data);

}

form.addEventListener("submit", formSubmit);










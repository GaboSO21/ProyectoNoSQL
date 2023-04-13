const { response, request } = require('express');

// Controladores: encargados de resolver las peticions http y retornar o 
// asignar datos dependiendo del caso

const testGet = async (req = request, res = response) => {

    res.sendFile(process.env.DIRPATH + "test.html");

}

const login = async (req, res = response) => {

    res.sendFile(process.env.DIRPATH + "login.html");

}

const register = async (req, res = response) => {

    res.sendFile(process.env.DIRPATH + "register.html");

}

const movies = async (req, res = response) => {

    res.sendFile(process.env.DIRPATH + "movies.html");

}

const directors = async (req, res = response) => {

    res.sendFile(process.env.DIRPATH + "director.html");

}

const awards = async (req, res = response) => {

    res.sendFile(process.env.DIRPATH + "awards.html");

}

module.exports = {
    testGet,
    login,
    register,
    directors,
    movies,
    awards,
}








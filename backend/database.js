const mysql = require("mysql");


//данные для подключения к бд
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "simaca",
    password: "root"
});


// тестирование подключения
connection.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});

//вывод из бд
let queryString = 'SELECT * FROM user';
// let queryInsert = INSERT user(FirstName, LastName, Login, Password) VALUES ('Ара', 'Джамшут', 'typ99', 'arianLOH');

// connection.query(queryInsert, (err, results, fields) => {
//     console.log(err);
//     console.log(results);
//     // console.log(fields);
// });


connection.query(queryString, (err, results, fields) => {
    console.log(err);
    console.log(results);
    // console.log(fields);
});

// закрытие подключения
connection.end(function (err) {
    if (err) {
        return console.log("Ошибка: " + err.message);
    }
    console.log("Подключение закрыто");
});
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root"
});

//ïðîâåðÎ×ÊÀ
connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Database connected');
    }
});


const data = require("./data");
const mysql = require("mysql");
const { hashPassword } = require("./utils");

class Controller {
    //вывод списка лекарств
    async getDrugs() {
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection({
                host: "127.0.0.1",
                user: "root",
                database: "simaca",
                password: "root"
            });

            //проверОЧКА
            connection.connect((err) => {
                if (err) {
                    console.log(connection);
                    console.log(err);
                } else {
                    console.log('Database connected');
                    //тута я пишу запрос в бд
                    connection.query('Select * FROM prescriptions', (err, results, fields) => {

                        connection.end((err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log('Database closed');
                                // console.log(results);
                                resolve(results);
                            }
                        });
                    });
                }
            })
        });

    }

    //добавление лекарств
    async createDrug(id_prescription, id_user, drug_name, days, start_date, how_much_in_day) {
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection({
                host: "127.0.0.1",
                user: "root",
                database: "simaca",
                password: "root"
            });
            connection.connect((err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Database connected');
                    connection.query(
                        'INSERT INTO prescriptions SET ?',
                        //тута я указываюзначкения которые будут вводиться
                        {
                            id_prescription: id_prescription,
                            id_user: id_user,
                            drug_name: drug_name,
                            days: days,
                            start_date: start_date,
                            how_much_in_day: how_much_in_day
                        },
                        (err, results, fields) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results.insertId);
                            }
                            connection.end((err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('Database closed');
                                }
                            });
                        });
                }
            })
        });


    }


    //удаление
    async deleteDrug(id_prescription) {
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection({
                host: "127.0.0.1",
                user: "root",
                database: "simaca",
                password: "root"
            });
            connection.connect((err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Database connected');
                    connection.query(
                        'DELETE FROM prescriptions WHERE id_prescription=?',
                        [
                            id_prescription
                        ],
                        //тута я указываюзначкения которые будут вводиться
                       (err, results, fields) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results.insertId);
                            }
                            connection.end((err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('Database closed');
                                }
                            });
                        });
                }
            })
        });


    }


//user
    //регистрация
    async createUser(id_user, FirstName, LastName, login, password) {
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection({
                host: "127.0.0.1",
                user: "root",
                database: "simaca",
                password: "root"
            });
            connection.connect((err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Database connected');
                    connection.query(
                        'INSERT INTO user SET ?',
                        //тута я указываюзначкения которые будут вводиться
                        {
                            id_user: id_user,
                            FirstName: FirstName,
                            LastName: LastName,
                            login: login,
                            password: hashPassword(password)

                        },
                        (err, results, fields) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results.insertId);
                            }
                            connection.end((err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('Database closed');
                                }
                            });
                        });
                }
            })
        });


    }

    //логин
    async loginUser(Login, Password) {
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection({
                host: "127.0.0.1",
                user: "root",
                database: "simaca",
                password: "root"
            });
            connection.connect((err) => {
                if (err) {
                    reject(err);
                } else {
                    
                    console.log('Database connected');
                    connection.query(
                        'SELECT id_user FROM user WHERE login = ? and password = ?',
                        [
                            Login,
                            hashPassword(Password)
                        ],
                        (err, results, fields) => {
                            if (err) {
                                reject(err);
                            } else if (results.length === 0) {
                                reject(err);
                            } else {

                                const generate_token = (length) => {
                                    const a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
                                    const b = [];
                                    for (let i = 0; i < length; i += 1) {
                                        let j = (Math.floor(Math.random() * (a.length - 1)));
                                        b.push(a[j]);
                                    }
                                    return b.join('');
                                };
                                const token_user = generate_token(32);
                                const id_user = results[0].id_user;
                                console.log(id_user);
                                connection.query(
                                    'UPDATE user SET token_user = ? WHERE id_user = ?',
                                    [
                                        token_user,
                                        id_user
                                    ],
                                    (err, results, fields) => {
                                        if (err) {
                                            reject(err);
                                        } else {
                                            resolve(token_user);
                                        }
                                        connection.end((err) => {
                                            if (err) {
                                                console.log(err);
                                            } else {
                                                console.log('Database closed');
                                            }
                                        });
                                    }
                                )
                            }
                        });
                }
            });
        })
    }

    //logout
    async logoutUser(token_user) {
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection({
                host: "127.0.0.1",
                user: "root",
                database: "simaca",
                password: "root"
            });
            connection.connect((err) => {
                if (err) {
                    reject(err);
                } else {
                    console.log('Database connected');
                    connection.query(
                        'UPDATE user SET = token_user = null WHERE id_user=?',
                        [
                            token_user
                        ],
                        //тута я указываюзначкения которые будут вводиться
                        (err, results, fields) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results.insertId);
                            }
                            connection.end((err) => {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('Database closed');
                                }
                            });
                        });
                }
            })
        });


    }
};

module.exports = Controller;
const mysql = require("mysql");
const { hashPassword } = require("./utils");

class Controller {
    //вывод списка лекарств
    async getDrugs(token_user) {
        const promise = this.getIdUserByToken(token_user);
        const id_user = await promise;
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
                    connection.query('Select * FROM prescriptions WHERE id_user = ?', [id_user], (err, results, fields) => {

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
    async createDrug(token_user, drug_name, days, start_date, how_much_in_day) {
        const promise = this.getIdUserByToken(token_user);
        const id_user = await promise;
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

    //прием лекарств
    async createTaking(token_user, id_prescription, date) {
        const promise = this.getIdUserByToken(token_user);
        const id_user = await promise;
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
                        'SELECT COUNT (*) AS massive FROM prescriptions WHERE id_user = ? AND id_prescription = ?',
                        [
                            id_user,
                            id_prescription
                        ],
                        (err, results) => {
                            console.log(err);
                            if (results.length == 0) {
                                reject("acces denied");
                            } else {



                                connection.query(
                                    'INSERT INTO taking SET ?',
                                    //тута я указываюзначкения которые будут вводиться
                                    {
                                        id_prescription: id_prescription,
                                        date: date,
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
                            });
                }
            })
        });


    }

    //не принял лекарства
    async deleteTaking(token_user, id_taking) {
        const promise = this.getIdUserByToken(token_user);
        const id_user = await promise;
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
                        'SELECT id_prescription FROM taking WHERE id_taking = ?',
                        [
                        id_taking
                        ],
                        (err, results, fields) => {
                            console.log(results);
                            if (err) {
                                reject(err);
                            } else {
                                connection.query(
                                    'SELECT COUNT (*) AS massivi FROM taking WHERE id_taking = ? AND id_prescription = ?',
                                    [
                                        id_taking,
                                        results
                                    ],
                                    (err, results) => {
                                        if (results.length == 0) {
                                            reject("acces denied");
                                        } else {
                                            connection.query(
                                                'DELETE FROM taking WHERE id_taking = ?',
                                                //тута я указываюзначкения которые будут вводиться
                                                [
                                                    id_taking,
                                                ],
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
                                    });
                            }
                        });
                }
            })
        });


    }


    //удаление
    async deleteDrug(token_user, id_prescription) {
        const promise = this.getIdUserByToken(token_user);
        const id_user = await promise;
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
                        'DELETE FROM prescriptions WHERE id_user = ? AND id_prescription=?',
                        [
                            id_user,
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
                                console.log(token_user);
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

    //це штука которая чекает токены
    async getIdUserByToken(token_user) {
        console.log(token_user);
        return new Promise((resolve, reject) => {
            const connection = mysql.createConnection({
                host: "127.0.0.1",
                user: "root",
                database: "simaca",
                password: "root"
            });
            connection.query(
                'SELECT id_user FROM user WHERE token_user = ?',
                [
                    token_user,
                ],
                (err, results, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results[0].id_user);
                    }
                });
        }
        )
    }

    //вiход
    async logout(token_user) {
        const promise = this.getIdUserByToken(token_user);
        const id_user = await promise;
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
                    console.log(token_user);
                    connection.query(
                        'UPDATE user SET token_user = NULL WHERE id_user = ?',
                        [

                            id_user

                        ],
                        (err, results, fields) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(results);
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
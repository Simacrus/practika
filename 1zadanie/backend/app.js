//сверху объявляем константы
const http = require("http");
const Drug = require("./controller");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 5000;

//а тут описывает методы обращения к бд
const server = http.createServer(async (req, res) => {
    if (req.url === "/api/drugs/prescriptions" && req.method === "GET") {
        const drugs = await new Drug().getDrugs();
        //эта строка показывает все в консоли
        console.log(drugs);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(drugs));
    }

    else if (req.url.match(/\/api\/drugs\/prescriptions\/([0-9]+)/) && req.method === "GET") {
        try {
            const id = req.url.split("/")[3];
            const drug = await new Drug().getDrug(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(drug));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }


    //удаление
    else if (req.url.match(/\/api\/drugs\/prescriptions\/([0-9]+)/) && req.method === "DELETE") {
        try {
            const id = req.url.split("/")[4];
            let message = await new Drug().deleteDrug(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message }));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }


    //обновление данных
    else if (req.url.match(/\/api\/drugs\/prescriptions\/([0-9]+)/) && req.method === "PATCH") {
        try {
            const id = req.url.split("/")[4];
            let updated_drug = await new Drug().updateDrug(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(updated_drug));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }


    //запись данных в бд
    else if (req.url === "/api/drugs/prescriptions" && req.method === "POST") {
        console.log("dfdhjf");
        let drug_data = await getReqData(req);
        const drug = JSON.parse(drug_data);
        let newDrug = await new Drug().createDrug(drug.id_prescription, drug.id_user, drug.drug_name, drug.days, drug.start_date, drug.how_much_in_day);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ id: newDrug }));
    }

//user
    // регистрация
else if (req.url === "/api/drugs/user" && req.method === "POST") {
    let user_data = await getReqData(req);
    const user = JSON.parse(user_data);
    let newUser = await new Drug().createUser(user.id_user, user.FirstName, user.LastName, user.login, user.password);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ id: newUser }));
    }

    //логин
    else if (req.url === "/api/drugs/login" && req.method === "POST") {
        let user_data = await getReqData(req);
        const user = JSON.parse(user_data);
        let LoginUser = await new Drug().loginUser(user.login, user.password);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ token_user: LoginUser }));
    }

//логаут
else if (req.url === "/api/drugs/logout" && req.method === "GET") {
    let user_data = await getReqData(req);
    const user = JSON.parse(user_data);
    /*let newUser =*/ await new Drug().logoutUser(user.token_user);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ id: newUser }));
    }
});


//показывает что локалочка стартанула и на каком порту
server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
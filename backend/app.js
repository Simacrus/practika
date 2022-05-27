//������ ��������� ���������
const http = require("http");
const Drug = require("./controller");
const Taking = require("./controller");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 5000;

//� ��� ��������� ������ ��������� � ��
const server = http.createServer(async (req, res) => {

    if (req.method === 'OPTIONS') {
        res.writeHead(
            200,
            {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            }
        )
        res.end();
    }else 

    if (req.url === "/api/drugs/prescriptions" && req.method === "GET") {
        const body = await getReqData(req);
        const token = JSON.parse(body);
        const drugs = await new Drug().getDrugs(token.token_user);
        //��� ������ ���������� ��� � �������
        res.writeHead(200, {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        });
        res.end(JSON.stringify(drugs));
    }

    else if (req.url.match(/\/api\/drugs\/prescriptions\/([0-9]+)/) && req.method === "GET") {
        try {
            const id = req.url.split("/")[3];
            const drug = await new Drug().getDrug(id);
            res.writeHead(200, {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            });
            res.end(JSON.stringify(drug));
        } catch (error) {
            res.writeHead(404, {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            });
            res.end(JSON.stringify({ message: error }));
        }
    }


    //��������
    else if (req.url.match(/\/api\/drugs\/prescriptions\/([0-9]+)/) && req.method === "DELETE") {
        try {
            const id = req.url.split("/")[4];
            const body = await getReqData(req);
            const token = JSON.parse(body);
            let message = await new Drug().deleteDrug(token.token_user, id);
            res.writeHead(200, {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            });
            res.end(JSON.stringify({ message }));
        } catch (error) {
            res.writeHead(404, {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            });
            res.end(JSON.stringify({ message: error }));
        }
    }


    //���������� ������
    else if (req.url.match(/\/api\/drugs\/prescriptions\/([0-9]+)/) && req.method === "PATCH") {
        try {
            const id = req.url.split("/")[4];
            const body = await getReqData(req);
            const token = JSON.parse(body);
            let updated_drug = await new Drug().updateDrug(id, token.token_user);
            res.writeHead(200, {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            });
            res.end(JSON.stringify(updated_drug));
        } catch (error) {
            res.writeHead(404, {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': '*'
            });
            res.end(JSON.stringify({ message: error }));
        }
    }


    //���������� ���������
    else if (req.url === "/api/drugs/prescriptions" && req.method === "POST") {
        const body = await getReqData(req);
        const token = JSON.parse(body);
      //  let drug_data = await getReqData(req);
        // const drug = JSON.parse(drug_data);
        let newDrug = await new Drug().createDrug(token.token_user, token.drug_name, token.days, token.start_date, token.how_much_in_day);
        res.writeHead(200, {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        });
        res.end(JSON.stringify({ id: newDrug }));
    }

        //����������� ������
    else if (req.url === "/api/drugs/taking" && req.method === "POST") {
        const body = await getReqData(req);
        const token = JSON.parse(body);
        //  let drug_data = await getReqData(req);
        // const drug = JSON.parse(drug_data);
        let newTaking = await new Taking().createTaking( token.token_user, token.id_prescription, token.date);
        res.writeHead(200, {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        });
        res.end(JSON.stringify({ id: newTaking }));
    }

    //�� ������ ����������
    else if (req.url.match("/api/drugs/deltaking") && req.method === "DELETE") {
            const body = await getReqData(req);
      //      const token = JSON.parse(body);
            const taking = JSON.parse(body);
        console.log(taking);
            let message = await new Taking().deleteTaking(taking.token_user, taking.id_taking);
        res.writeHead(200, {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        });
            res.end(JSON.stringify({ message }));
    }

//user
    // �����������
    else if (req.url === "/api/registration" && req.method === "POST") {
    let user_data = await getReqData(req);
    const user = JSON.parse(user_data);
    let newUser = await new Drug().createUser(user.id_user, user.FirstName, user.LastName, user.login, user.password);
        res.writeHead(200, {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        });
    res.end(JSON.stringify({ id: newUser }));
    }

    //�����
    else if (req.url === "/api/login" && req.method === "POST") {
        let user_data = await getReqData(req);
        const user = JSON.parse(user_data);
        let LoginUser = await new Drug().loginUser(user.login, user.password);
        res.writeHead(200, {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        });
        res.end(JSON.stringify({ token_user: LoginUser }));
    }

//������
else if (req.url === "/api/drugs/logout" && req.method === "GET") {
    let user_data = await getReqData(req);
    const user = JSON.parse(user_data);
    await new Drug().logout(user.token_user);
        res.writeHead(200, {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*'
        });
    res.end("");
    }
});


//���������� ��� ��������� ���������� � �� ����� �����
server.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
});
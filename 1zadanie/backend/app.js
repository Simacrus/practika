const mysql = require('mysql');
const http = require("http");
const Drug = require("./controller");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    // /api/drugs : GET
    if (req.url === "/api/drugs" && req.method === "GET") {
        // get the drugs.
        //  const drugs = await new Drug().getDrugs();
        // set the status code, and content-type


        var connection = mysql.createConnection({
            host: '127.0.0.1',
            user: 'root',
            password: '',
            database: 'messenger,'
        });

        connection.connect((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Database connection - OK!');
            }
        });

        connection.query('select * from user', (err, results, fields) => {
            console.log(err);
            console.log(results);
            // console.log(fields);
        });

        connection.end((err) => {
            if (err) {
                console.log(err);
            } else {
                console.log('Datatbase connection - Close!');
            }
        });

        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify(drugs));
    }

    // /api/drugs/:id : GET
    else if (req.url.match(/\/api\/drugs\/([0-9]+)/) && req.method === "GET") {
        try {
            // get id from url
            const id = req.url.split("/")[3];
            // get drug
            const drug = await new Drug().getDrug(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end(JSON.stringify(drug));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/drugs/:id : DELETE
    else if (req.url.match(/\/api\/drugs\/([0-9]+)/) && req.method === "DELETE") {
        try {
            // get the id from url
            const id = req.url.split("/")[3];
            // delete drug
            let message = await new Drug().deleteDrug(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify({ message }));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/drugs/:id : UPDATE
    else if (req.url.match(/\/api\/drugs\/([0-9]+)/) && req.method === "PATCH") {
        try {
            // get the id from the url
            const id = req.url.split("/")[3];
            // update drug
            let updated_drug = await new Drug().updateDrug(id);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify(updated_drug));
        } catch (error) {
            // set the status code and content type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
        }
    }

    // /api/drugs/ : POST
    else if (req.url === "/api/drugs" && req.method === "POST") {
        // get the data sent along
        let drug_data = await getReqData(req);
        // create the drug
        let drug = await new Drug().createDrug(JSON.parse(drug_data));
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        //send the drug
        res.end(JSON.stringify(drug));
    }

    // No route present
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});
const http = require("http");
const Drug = require("./controller");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    console.log(req.url);
    if (req.url === "/api/drugs" && req.method === "GET") {
        const drugs = await new Drug().getDrugs();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(drugs));
    }

    else if (req.url.match(/\/api\/drugs\/([0-9]+)/) && req.method === "GET") {
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

    else if (req.url.match(/\/api\/drugs\/([0-9]+)/) && req.method === "DELETE") {
        try {
            const id = req.url.split("/")[3];
            let message = await new Drug().deleteDrug(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message }));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }

    else if (req.url.match(/\/api\/drugs\/([0-9]+)/) && req.method === "PATCH") {
        try {
            const id = req.url.split("/")[3];
            let updated_drug = await new Drug().updateDrug(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(updated_drug));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }

    else if (req.url === "/api/drugs" && req.method === "POST") {
        let drug_data = await getReqData(req);

        let drug = await new Drug().createDrug(JSON.parse(drug_data));
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(drug));
    }

    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});

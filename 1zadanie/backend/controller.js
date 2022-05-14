const data = require("./data.js");

class Controller {
    async getDrugs() {
        return new Promise((resolve, _) => resolve(data));
    }

    async getDrug(id) {
        return new Promise((resolve, reject) => {
            let drug = data.find((drug) => drug.id === parseInt(id));
            if (drug) {
                resolve(drug);
            } else {
                reject(`Drug with id ${id} not found `);
            }
        });
    }

    async createDrug(drug) {
        return new Promise((resolve, _) => {
            const drug_id = data.length + 1
            let newDrug = {
                id: drug_id,
                ...drug,
            };
            data.push(newDrug)
            resolve(newDrug);
        });
    }

    async updateDrug(id) {
        return new Promise((resolve, reject) => {
            let drug = data.find((drug) => drug.id === parseInt(id));
            if (!drug) {
                reject(`No drug with id ${id} found`);
            }
            drug["completed"] = true;
            resolve(drug);
        });
    }

    async deleteDrug(id) {
        return new Promise((resolve, reject) => {
            let drug = data.find((drug) => drug.id === parseInt(id));
            if (!drug) {
                reject(`No drug with id ${id} found`);
            }
            resolve(`Drug deleted successfully`);
        });
    }
}
module.exports = Controller;
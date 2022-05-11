const data = require("./data");

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
            let newDrug = {
                id: Math.floor(4 + Math.random() * 10),
                ...drug,
            };

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
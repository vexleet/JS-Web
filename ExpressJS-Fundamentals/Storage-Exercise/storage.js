const fs = require('fs');
let storage = {};

module.exports = {
    put: (key, value) => {
        if (typeof key !== 'string') {
            throw new Error("Key is not a string");
        } else if (storage[key] !== undefined) {
            throw new Error("Key already exists");
        }

        storage[key] = value;
    },
    get: (key) => {
        if (typeof key !== 'string') {
            throw new Error("Key is not a string");
        } else if (storage[key] === undefined) {
            throw new Error("Key does not exist");
        }

        return storage[key];
    },
    getAll: () => {
        if (Object.keys(storage).length === 0) {
            return 'Storage is empty';
        }

        return storage;
    },
    update: (key, newValue) => {
        if (typeof key !== 'string') {
            throw new Error("Key is not a string");
        } else if (storage[key] === undefined) {
            throw new Error("Key does not exist");
        }

        storage[key] = newValue;
    },
    delete: (key) => {
        if (typeof key !== 'string') {
            throw new Error("Key is not a string");
        } else if (storage[key] === undefined) {
            throw new Error("Key does not exist");
        }

        delete storage[key];
    },
    clear: () => {
        storage = {};
    },
    saveSync: () => {
        fs.writeFileSync('./data/storage.json', JSON.stringify(storage, null, 4));
    },
    loadSync: () => {
        let data = fs.readFileSync('./data/storage.json',);
        storage = JSON.parse(data);
    },
    save: () => {
        fs.writeFile('./data/storage.json', JSON.stringify(storage, null, 4), (err) => {
            if (err) {
                throw err;
            }
        });
    },
    load: () => {
        fs.readFile('./data/storage.json', (err, data) => {
            if (err) {
                throw err;
            }

            storage = JSON.parse(data);
        });
    }
};
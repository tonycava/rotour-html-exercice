import {createRequire} from "module";

const require = createRequire(import.meta.url); // construct the require method
const customer = require("../data/data.json") // use the require method

export function lenghtCustomer(Num) {
    customer.users.map(function () {
        Num++
    });
    return Num
}

export function idToSearch(query) {
    let lenJson = newId(0)
    console.log(query)

    for (let i = 0; i < lenJson; i++) {
        if (customer.users[i].id === parseInt(query)) {
            return customer.users[i]
        }
    }
    return "Out of range"
}

export function idToDelete(query) {
    let lenJson = newId(0)

    for (let i = 0; i < lenJson; i++) {
        if (customer.users[i].id === parseInt(query)) {
            return i
        }
    }
    return "Out of range"
}

import {createRequire} from "module";
import {lenghtCustomer} from "./getId.mjs";

const require = createRequire(import.meta.url); // construct the require method
const customer = require("../data/data.json") // use the require method

export function searchQuery(query, toSearch) {
    let lenght = lenghtCustomer(0)
    let temp = []

    for (let i = 0; i < lenght; i++) {
        if (customer.users[i][toSearch] === query[toSearch]) {
            temp.push(customer.users[i])
        }
    }
    return temp
}

import fs from "fs";

import {idToSearch, idToDelete, lenghtCustomer} from "../function/getId.mjs";
import {isValid} from "../function/isValid.mjs";
import {createRequire} from "module";
import express from "express";
import {searchQuery} from "../function/isQuery.mjs";

const require = createRequire(import.meta.url); // construct the require method
const customer = require("../data/data.json") // use the require method

const routeur = express.Router()

routeur.get('/', (req, res,) => {

    let queryRequest = req.query
    let functionToTrigger = Object.keys(queryRequest)

    switch (functionToTrigger[0]) {
        case 'firstname':
            let resultFirstname = searchQuery(queryRequest, "firstname")
            if (resultFirstname.length === 0) {
                resultFirstname = ['Nothing found']
            }
            res.send(resultFirstname)
            break
        case 'lastname':
            let resultLastname = searchQuery(queryRequest, "lastname")
            if (resultLastname.length === 0) {
                resultLastname = ['Nothing found']
            }
            res.send(resultLastname)
            break
        case 'company':
            let resultCompany = searchQuery(queryRequest, "company")
            if (resultCompany.length === 0) {
                resultCompany = ['Nothing found']
            }
            res.send(resultCompany)
            break
        case '':
            res.json(customer.users)
    }
})

routeur.post('/', (req, res) => {

    let isGood = isValid(['firstname', 'lastname', 'email', 'company'], req.body)
    let idToWrite = lenghtCustomer(0)

    if (isGood === true) {
        let providerId = req.body;

        let obj = Object.assign({"id": idToWrite + 1}, providerId);

        customer.users.push(obj)

        let dataJson = JSON.stringify(customer, null, 2);
        fs.writeFileSync('data/data.json', dataJson);
        res.json(obj)
    } else {
        res.sendStatus(500)
    }
})

routeur.route('/:id').get((req, res) => {
    let sortUsers = idToSearch(req.params.id)
    res.send(sortUsers)
}).delete((req, res) => {

    const isAdmin = req.headers.admin

    if (isAdmin === true) {

        let userToDelete = idToDelete(req.params.id)

        delete customer.users[userToDelete];

        customer.users = customer.users.filter((x) => {
            return x !== null
        });

        let dataJson = JSON.stringify(customer, null, 2);
        fs.writeFileSync('data/data.json', dataJson);

        res.send('Delete successful')
    } else {
        res.status(401).send('Permission Denied')
    }
})

export default routeur
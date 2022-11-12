import express from "express";
import userRouteur from "./routes/users.mjs";

const app = express()

app.use(express.static("function"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/users', userRouteur)

app.listen(3000)
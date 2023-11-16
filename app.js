const express = require('express');
const mongoose = require("mongoose")
const dotenv = require('dotenv');
const categorie = require('./models/categorie');
const scategorie = require('./models/scategorie');
const article = require('./models/article');
const categorieRouter = require('./routes/categorie.route');
const scategorieRouter = require('./routes/scategorie.route');
const articleRouter = require('./routes/article.route');

//const cors = require('cors')

dotenv.config()
const app = express();
app.use(express.json());
//Les cors

//app.use(cors())

//BodyParser Middleware
app.use(express.json());
mongoose.set('strictQuery', true)
const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASECLOUD);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});
app.get("/", (req, res) => {
    res.send("bonjour");
});
app.use("/api/categories",categorieRouter);
app.use("/api/scategories",scategorieRouter);
app.use("/api/article",articleRouter);
app.listen(process.env.PORT, () => {
    connect();
    console.log("Server is listening on port" +`${process.env.PORT}`);
});
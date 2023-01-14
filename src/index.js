const express = require("express")
const app = express()
const mongoose = require("mongoose")
const routes = require("./routes/routes")
app.use(express.json())
app.use('/',routes)


mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://piyushtale:piyushrajutale@cluster0.t7w7ipr.mongodb.net/Blockchain")
.then(console.log("MongoDB Connected")).catch((e) => console.log(e.message))


app.listen(3000, () => {
    console.log("Server running on port 3000")
})
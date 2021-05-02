const express = require("express");
const quoteRouter = require("./routes/qoutesRoute")

const PORT = 8000;

//server initialization
const app = express();

//middlewares
app.use(express.json())
//routes
app.use("/api/v1/quotes",quoteRouter)


app.listen(PORT,() => {
    console.log(`server started on PORT  ${PORT}`)
})
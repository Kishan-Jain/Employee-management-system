import  {configDotenv}  from "dotenv";
import { app } from "./app.js";
import { connectdb } from './db/connectDB.js';

configDotenv({
    path: "../.env"
})

const port = process.env.PORT || 3000

// server 
connectdb()
.then(
    app.listen(port, () => {
        console.log(`server listing on http://localhost:${port}`);
    })
)
.catch((error) => {
    console.log(`server DB connection error :: Error ${error}`)
} )
import express from "express"
import cors from "cors";
import routes from "./api/routes.js"

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/routes" , routes);
app.use("*", (req,res)=> res.status(404).json({error:"not found"}));

export default app
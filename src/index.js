import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./env" 
});


const PORT = process.env.PORT || 4000;

console.log(process.env.JWT_SECRET)

app.listen(PORT, () => {
  console.log("Server started successfully on port:", PORT);
});

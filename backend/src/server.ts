import app from "./app";
import mongoose from "mongoose"
import env from "./util/validateEnv"

const port = process.env.PORT

mongoose.connect(process.env.MONGO_CONNECTION_STRING!)
    .then(() => {
        console.log("Mongoose connected")
        app.listen(port, () => {
            console.log(`Server is running on : ${port}`);

        })

    })

    .catch(console.error);



import { Schema, InferSchemaType, model } from "mongoose";

const userSchema = new Schema({
    username: { type: String, required: true, unicue: true },
    email: { type: String, required: true,  unicue: true, select: false },
    password: { type: String, required: true, select: false },
})

type User = InferSchemaType<typeof userSchema>

export default model<User>("User", userSchema)
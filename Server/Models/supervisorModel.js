import mongoose from "mongoose";

const supervisorSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const Supervisor = mongoose.model('Supervisor', supervisorSchema);
export default Supervisor;
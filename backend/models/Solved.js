import mongoose from 'mongoose';
const { Schema } = mongoose;

const solvedSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    score: { type: Number, default: 0 },
    solves: { type: Number, default: 0 },
    flag1: { type: String, default: "" },
    flag2: { type: String, default: "" },
    flag3: { type: String, default: "" },
    flag4: { type: String, default: "" },
    flag5: { type: String, default: "" },
    flag6: { type: String, default: "" },
    flag7: { type: String, default: "" },
    lastSolveTime: String,
    password: { type: String },
    isAdmin: { type: Boolean, default: false }
});

export const Solved = mongoose.model('Solved', solvedSchema)
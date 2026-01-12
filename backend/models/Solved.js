import mongoose from 'mongoose';
const { Schema } = mongoose;

const blogSchema = new Schema({
    name:String,
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    points:String,
    flag1:String,
    flag2:String,
    flag3:String,
    flag4:String,
    score:String,
    flagtime:String,
    avatar:String
});

export const Solved = mongoose.model('Solved', blogSchema)
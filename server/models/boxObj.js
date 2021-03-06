import mongoose from 'mongoose';

const boxObjSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    type: String,
    nickname: {
        type: String,
        default: "",
    },
    moves: {
        type: Array,
        default: ["", "", "", ""],
    },
})

var BoxObjData = mongoose.model('BoxObjData', boxObjSchema);

export default BoxObjData;
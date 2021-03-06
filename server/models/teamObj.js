import mongoose from 'mongoose';

const teamObjSchema = mongoose.Schema({
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

var TeamObjData = mongoose.model('TeamObjData', teamObjSchema);

export default TeamObjData;
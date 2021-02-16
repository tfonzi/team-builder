import mongoose from 'mongoose';

const teamObjSchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
    nickname: {
        type: String,
        default: "",
    },
})

var TeamObjData = mongoose.model('TeamObjData', teamObjSchema);

export default TeamObjData;
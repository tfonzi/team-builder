import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    userId: String,
    team: [{type: mongoose.Schema.Types.Mixed, ref: 'TeamObjData'}],
    box: [{type: mongoose.Schema.Types.Mixed, ref: 'BoxObjData'}],
})

var User = mongoose.model('User', userSchema);

export default User;
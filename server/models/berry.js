import mongoose from 'mongoose';

const berrySchema = mongoose.Schema({
    name: String,
    image: String,
    description: String,
})

var BerryData = mongoose.model('BerryData', berrySchema);

export default BerryData;
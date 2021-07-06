import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
    homeType: {
        type: Boolean,
        default : true,
        required: true
        // default true = maison ; false = appartement
    },
    homeArea: {
        type: Number,
        required: true
    },
    howMuchPeople: {
        type: Number,
        required: true
    },
    haveThermostat: {
        type: Boolean,
        default : true,
        required: false
    },
    homeHeater: {
        type: Number,
        required: true
    },
    waterHeater: {
        type: Number,
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user',
        unique: true
    }
}, { timestamps: true });


const Form = mongoose.model('form', formSchema);

export { Form };

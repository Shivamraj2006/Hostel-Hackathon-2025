// models/Booking.js
import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
    },

    RoomNo : {
        type: String,
        required:true,
    },

    PhoneNo : {
        type: String,
        required:true,
    },

    UserName: {
        type: String,
        required: true,
    },
    
    Category: {
        type: String,
        required: true,
    },

    ComplaintDate: {
        type: String, 
        required: true,
    },

    ResolvedDate: {
        type: String,
        required: true,
        default: "00-00-0000"
    },

    Specifications: {
        type: String,
        required: true,
    },

    PreferableTime: {
        type: String,
        required: false,
    },

    Discription: {
        type: String,
        required: false,
    },

    Status: {
        type: Boolean,
        required: true,
        default: false,
    },
    Image: { 
        type: String,
        required: false
    },
});

const Complaints = mongoose.model('Complaint', complaintSchema);

export default Complaints;
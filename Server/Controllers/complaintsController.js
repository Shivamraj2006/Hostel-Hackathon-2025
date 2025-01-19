import Complaints from '../Models/complaints.js';
import mongoose from 'mongoose';

// Student Route Controllers

export const getComplaints = async (req, res) => {
    const { id } = req.params;

    try {
        const complaints = await Complaints.find({ ID: id , Status: true}).sort({ ComplaintDate: -1 });

        if (complaints.length === 0) {
            return res.status(404).json({ message: 'No Complaints found' });
        }

        res.status(200).json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getActiveComplaints = async (req, res) => {
    const { id } = req.params;

    try {
        const complaints = await Complaints.find({ ID: id , Status: false}).sort({ ComplaintDate: 1 });

        if (complaints.length === 0) {
            return res.status(404).json({ message: 'No Active Complaints found' });
        }

        res.status(200).json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createComplaint = async (req, res) => {
    const { ID, RoomNo, PhoneNo, UserName, Category, ComplaintDate, ResolvedDate, Specifications, PreferableTime, Discription, Image } = req.body;

    console.log('Incoming Request Body:', req.body);

    if (!ID || !RoomNo || !PhoneNo || !UserName || !Category || !Specifications) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const now = new Date();
    const currentDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;

    const newComplaint = new Complaints({
        ID,
        RoomNo,
        PhoneNo,
        UserName,
        Category,
        ComplaintDate : currentDate,
        ResolvedDate,
        Specifications,
        PreferableTime,
        Discription,
        Status: req.body.Status || false,
        Image: req.body.Image || false,
    });

    try {
        const savedComplaint = await newComplaint.save();
        res.status(201).json({ message: 'Complaint created successfully', data: savedComplaint });
    } catch (error) {
        console.error('Error creating complaint:', error);
        res.status(500).json({ message: 'Error creating complaint', error: error.message });
    }
};

export const deleteComplaint = async (req, res) => {
    const { id } = req.params; 
    console.log('Deleting complaint with ID:', id);
    
    try {
        const deletedComplaints = await Complaints.findByIdAndDelete(id);

        if (!deletedComplaints) {
            return res.status(404).json({ message: `Complain with ID ${id} not found` });
        }

        res.json({ message: `Complain with ID ${id} deleted successfully`, deleteComplaint });
    } catch (error) {
        console.error(`Error deleting complain with ID ${id}:`, error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const editComplaint = async (req, res) => {
    try {
        const complaintId = req.params.id;
        const updateData = req.body;

        if (!complaintId) {
            return res.status(400).json({ message: 'Complaint ID is required.' });
        }
        if (!mongoose.Types.ObjectId.isValid(complaintId)) {
            return res.status(400).json({ message: 'Invalid Complaint ID format.' });
        }

        const updatedComplaint = await Complaints.findOneAndUpdate(
            { _id: complaintId },  
            { $set: updateData }, 
            { new: true }
        );

        if (!updatedComplaint) {
            return res.status(404).json({ message: 'Complaint not found.' });
        }

        res.status(200).json({ 
            message: 'Complaint updated successfully.', 
            data: updatedComplaint 
        });
    } catch (error) {
        console.error('Error updating complaint:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};

export const updateStatus = async (req, res) => {
    const complaintId = req.params.id; 
    console.log(complaintId);

    const now = new Date();
    const currentDate = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;

    try {
        const complaint = await Complaints.findById(complaintId);
    
        if (!complaint) {
            return res.status(404).json({ message: `Complaint with ID ${complaintId} not found` });
        }
    
        const updatedComplaint = await Complaints.findByIdAndUpdate(
            complaintId,
            {
                Status: !complaint.Status,
                ResolvedDate: currentDate  
            },
            { new: true } 
        );
    
        res.status(200).json({
            message: `Complaint with ID ${complaintId} updated successfully`,
            data: updatedComplaint,
        });
    } catch (error) {
        console.error(`Error updating complaint with ID ${complaintId}:`, error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Supervisor Routes Controller

export const viewComplaint = async (req, res) => {
    const { category } = req.params;

    try {
        const complaints = await Complaints.find({ Category: category , Status: true}).sort({ ComplaintDate: -1 });

        if (complaints.length === 0) {
            return res.status(404).json({ message: 'No Complaints found' });
        }

        res.status(200).json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const viewActiveComplaint = async (req, res) => {
    const { category } = req.params;
    console.log(category);

    try {
        const complaints = await Complaints.find({Category: category , Status: false}).sort({ ComplaintDate: 1 });
        console.log(complaints);

        if (complaints.length === 0) {
            return res.status(404).json({ message: 'No Active Complaints found' });
        }

        res.status(200).json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

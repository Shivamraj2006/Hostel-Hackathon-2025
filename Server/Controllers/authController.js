import User from "../Models/Users.js";
import Supervisor from "../Models/supervisorModel.js"

export const registerUser = async (req, res) => {
    try {
        const { username, id, phonenumber, roomnumber } = req.body;

        if (!username || !id || !phonenumber || !roomnumber) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newUser = new User({ username, id, phonenumber, roomnumber });
        await newUser.save();

        return res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        return res.status(500).json({ message: "Server error", err });
    }
};

export const checkStudentName=async(req,res)=>{
    try {
        const { username, id, phonenumber } = req.body;

        if (!username && !id && !phonenumber) {
            return res.status(400).json({ message: "At least one field (username, id, or phone number) is required" });
        }

        let query = {};
        if (username) {
            query.username = username;
        }
        if (id) {
            query.id = id;
        }
        if (phonenumber) {
            query.phonenumber = phonenumber;
        }

        const user = await User.findOne(query);

        if (!user) {
            return res.status(404).json({ message: "Student name not found" });
        }

        return res.status(200).json({ message: "Student is found:", user });
    } catch (error) {
        console.error("Error in checkStudentName:", error); 
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
export const logoutUser = (req, res) => {
    try {
       
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Error in logoutUser:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

//Supervisor login
export const loginSuperVisor=async(req,res)=>{
    const {phone,password}=req.body;

    if (!phone || !password) {
        return res.status(400).json({ message: "Data required" });
    }
    try {
        const supervisor = await Supervisor.findOne({ phone });

        if (!supervisor || supervisor.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        
        res.status(200).json({  message: "Login successful" });
    } catch (err) {
        res.status(500).json({ message: "Internal server error" ,err});
    }
};

//supervisor logout
export const logoutSuperVisor=async(req,res)=>{
    res.status(200).json({ message: "Logged out successfully" });
}

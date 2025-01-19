import express from 'express';
import complaintRoutes from './Routes/complaintRoutes.js';
import connectDB from './Models/connectDB.js';
import userRoutes from './Routes/userRoutes.js'
import supervisorRoutes from './Routes/superviserRoutes.js'

const app = express();
const PORT = 5500;

app.use(express.json());
connectDB();

app.use('/complaints', complaintRoutes); 
app.use("/users", userRoutes);
app.use("/authsupervisor",supervisorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


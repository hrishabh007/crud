import express from "express";
import connectDB from "./config/database.js";           // default export
import contactRoutes from "./routes/contacts.routes.js"; // ✅ this must be a Router

const app = express();
const port= process.env.PORT || 3000;
await connectDB();

// Middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Routes
app.use("/", contactRoutes); // ✅ pass the router (a function), not a string

// Basic error handler (optional)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something broke!");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));
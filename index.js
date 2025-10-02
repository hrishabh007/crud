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

// ----------------------------
// 404 handler (for unmatched routes)
// ----------------------------
// app.use((req, res) => {
//     res.status(404).render("404", {
//         message: `The page ${req.originalUrl} could not be found.`
//     });
// });

// ----------------------------
// 500 handler (global error middleware)
// ----------------------------
app.use((err, req, res, next) => {
    console.error("💥 Server Error:", err.stack);
    res.status(500).render("500", {
        message: "Something went wrong on our end. Please try again later."
    });
});

app.listen(port, () => console.log(`Server is running on port ${port} && ${"http://localhost:3000/"}`));
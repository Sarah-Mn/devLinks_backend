import express from "express";
import logger from "./middlewares/logger.js";
import links from "./routes/links.js"
import notFoundHandler from "./middlewares/notFound.js";
import errorHandler from "./middlewares/error.js";

const port = process.env.PORT || 8000;

const app = express()


// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware for logging requests
app.use(logger)

// link routes
app.use("/api/links",links)


// Middleware for handling 404 errors
app.use(notFoundHandler)

// Global error handler
app.use(errorHandler)





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
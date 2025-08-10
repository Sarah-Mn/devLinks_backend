import express from "express";
import logger from "./middlewares/logger.js";
import links from "./routes/links.routes.js";
import auth from "./routes/auth.route.js";
import notFoundHandler from "./middlewares/notFound.js";
import errorHandler from "./middlewares/error.js";
import pool from "./db.js";

const port = process.env.PORT || 8000;
const app = express();



// Test the DB connection
// app.get('/dbtest', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT NOW()');
//     res.send(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Database error');
//   }
// });


app.get('/dbtest', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(result.rows[0]);
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).send({
      message: 'Database connection failed',
      error: err.message,
      stack: err.stack,
    });
  }
});





// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware for logging requests
app.use(logger)

// auth routes
app.use("/api/auth", auth)

// link routes
app.use("/api/links",links)


// Middleware for handling 404 errors
app.use(notFoundHandler)

// Global error handler
app.use(errorHandler)





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
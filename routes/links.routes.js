import express from 'express';
import {getLinks,getLinkById,createLink} from "../controllers/links.controller.js";


const router = express.Router()


// Get all links
router.get("/", getLinks)

// Get a link by ID
router.get('/:id', getLinkById)

// create a new link
router.post('/',createLink)


export default router;
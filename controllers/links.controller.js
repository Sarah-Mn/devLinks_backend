import linkSchema from "../validations/links.schema.js";
import service from "../services/links.service.js"


// @desc Get all links
// @route GET /api/links
// @access Public

export const getLinks = async (req,res,next) => {

    try {
        const links = await service.getLinks()
        res.json(links)
    } catch (error) {
         const err = new Error("Failed to fetch links");
         err.status = 500;
         next(err)
    }


}

// @desc Get a link by ID
// @route GET /api/links/:id
// @access Public

export const getLinkById = async (req,res,next) => {

    try {
        const link = await service.getLinkById(req, res, next);

        if (link.length === 0) {
            const error = new Error("Link not found");
            error.status = 404;
            next(error);
            
        } else {
            res.json(link[0]);
        }
    } catch (error) {
        const err = new Error("Failed to fetch link");
        err.status = 500;
        next(err);
    }





    //  const id = parseInt(req.params.id)

    // const query = "SELECT * FROM links WHERE id = $1";
    // db.query(query, [id]).then(result => {
    //     if (result.rows.length === 0) {
    //         const error = new Error("Link not found");
    //         error.status = 404;
    //         return next(error);
    //     }
    //     res.json(result.rows[0]);
    // }).catch(err =>{
    //     const error = new Error("Database query failed");
    //     error.status = 500;
    //     next(error);
    // })
}


// @desc Create a new link
// @route POST /api/link
// @access Public


export const createLink = async (req,res,next) => {

    const { error, value } = linkSchema.validate(req.body);

    if (error) {
    return res.status(400).json({
      message: 'Validation failed',
      error: error.details.map((d) => d.message)
    });
  }

  try {
    const link = await service.createLink(value);
    res.status(201).json(link);
  } catch (error) {
    const err = new Error("Failed to create link");
    err.status = 500;
    next(err);
    
  }

}
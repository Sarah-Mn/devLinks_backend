const links = [
    {
      id: 1,
      title: "Next.js Docs",
      url: "https://nextjs.org",
      tags: ["framework", "react"],
      note: "The official Next.js documentation",

    },
    {
        id: 2,
        title: "Express.js Guide",
        url: "https://expressjs.com",
        tags: ["framework", "node"],
        note: "Comprehensive guide to Express.js"
    },
    {
        id: 3,
        title: "JavaScript Info",
        url: "https://javascript.info",
        tags: ["javascript", "tutorial"],
        note: "A modern JavaScript tutorial"
    }
]


// @desc Get all links
// @route GET /api/links
// @access Public

export const getLinks = (req,res,next) => {
    res.json(links)
}

// @desc Get a link by ID
// @route GET /api/links/:id
// @access Public

export const getLinkById = (req,res,next) => {
     const id = parseInt(req.params.id)

     const link = links.find(link => link.id === id)

     if(!link) {  
            const error = new Error("Link not found");
            error.status = 404;

            return next(error)
     } else {
        res.json(link)
     }
}


// @desc Create a new link
// @route POST /api/link
// @access Public

export const createLink = (req,res,next) => {

    const {title, url, tags, note} = req?.body;

    if(!title || !url) {
        const error = new Error("Title and URL are required");
        error.status = 400;
        return next(error);
    }

    const newLink = {
        id: links.length + 1,
        title,
        url,
        tags: tags || [],
        note: note || ""
    };

    links.push(newLink);
    res.status(201).json(newLink);
}
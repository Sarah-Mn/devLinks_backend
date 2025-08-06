import db from "../db.js";

const service = {};


const getLinks = async () => {

    const query = "SELECT * FROM links";

    return db.query(query)
        .then(result => {
            return result.rows
        })
}

service.getLinks = getLinks;




export const getLinkById = async (req,res,next) => {
    const id = parseInt(req.params.id)
    const query = "SELECT * FROM links WHERE id = $1";

    return db.query(query, [id]).then(result => {
        
        return result.rows
    })
}


service.getLinkById = getLinkById;



const createLink = async ({title, url, tags, note}) => {


    const query = "INSERT INTO links (title, url, tags, note) VALUES ($1, $2, $3, $4) RETURNING *";

   return db.query(query, [title, url, tags, note]).then(result =>{
       return result.rows[0]
    })

}


service.createLink = createLink;

export default service;
import db from "../db.js"
import createRandomUsername from "../utils/createRandomUsername.js";

const service = {}

const registerUser = async ({email,password}) =>{
    const query = "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *";
    const randomUsername = createRandomUsername()
    return db.query(query, [randomUsername,email,password]).then(result =>{
        return result.rows?.[0]
    })
}

service.registerUser = registerUser;



const existingUser = async ({ email, password }) => {
    const query = "SELECT * from users WHERE email = $1"
    return db.query(query,[email]).then(result => {
        
        return result.rows[0]
    })
}

service.existingUser = existingUser


export default service;
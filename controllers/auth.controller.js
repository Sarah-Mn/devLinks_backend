import service from "../services/auth.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"



// @desc Register a new user
// @route POST /api/auth/register
// @access Public
export const register =  async (req,res,next) => {
    const {email, password} = req.body;

    if(!email || !password) {
        const error = new Error("Email and password are required")
        error.status = 400
        return next(error)
    }

    try {

        // Check if user exists
        const existingUser = await service.existingUser({ email, password })

        if (existingUser) {
            const err = new Error("Failed to register user");
            err.status = 400;
            return next(err);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await service.registerUser({email, password:hashedPassword});


        if(user) {
            res.status(201).json({
                message: "User registered successfully",
                user:{
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            })
        }

    } catch (error) {
        console.log(error);
        
        const err = new Error("Failed to register user");
        err.status = 500;
        return next(err);
    }

}


// @desc Login a user
// @route POST /api/auth/login
// @access Public
export const login = async (req, res, next) =>{

    const { email, password } = req.body

    if (!email || !password) {
            const error = new Error("Email and password are required")
            error.status = 400
            return next(error)
        }

    try {
        const user = await service.existingUser({ email, password })
        
        
        if (!user) {
                const error = new Error("Invalid credentials")
                error.status = 400
                return next(error)
            }
        
     
        const isMatch = await bcrypt.compare(password, user.password_hash)
       
        
    if (!isMatch) {
         const error = new Error("Invalid credentials")
         error.status = 400
         return next(error)
        }

    const token = jwt.sign(
        {id: user.id, username: user.username},
        process.env.ACCESS_TOKEN_SECRET
    )

    

    res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        token
    })
    } catch (error) {
        const err = new Error("Invalid credentials")
        err.status = 400
        return next(err)
    }


}
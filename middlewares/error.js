const errorHandler = (err,req,res,next) => {

    if(err.status) {
        return res.status(err.status).json({
            message: err.message || "An unexpected error occurred"})
    } else {
        return res.status(500).json({
            message: "An unexpected error occurred"})
    }
}

export default errorHandler;
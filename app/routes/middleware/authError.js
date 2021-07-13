


module.exports = (err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(err.status).json({
            message: err.message,
            success: false
        });
    }
    next();
}

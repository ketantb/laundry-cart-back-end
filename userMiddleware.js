const jwt = require('jsonwebtoken')

const userMiddleware = (req, resp, next) => {
    const token = req.headers.authorization

    if (token) {
        try {
            const { _id } = jwt.verify(token, "secretKey")
            if (_id) {
                req.user = _id
               // console.log(req.user)
                next()
            }
        }

        catch (err) {
            console.log('something went wrong', err)
        }
    }
    if (!token) {
        return resp.json({ message: 'Access denied. No token' })
    }
}

module.exports = userMiddleware



/*

This is a Node.js module that exports a middleware function called authMiddleware.

The purpose of this middleware function is to authenticate requests using JSON Web Tokens (JWT). 
The function expects the JWT to be included in the Authorization header of the incoming request, in the format Bearer <JWT>.

The function begins by splitting the Authorization header to extract the JWT. 
It then uses the jsonwebtoken package to verify the token using a secret key. 
If the token is valid, the function adds the decoded user object to the req.body object and passes control to the next middleware function using the next() function.

If the token is invalid or has expired, the function sends an error response with a status code of 500 and a message indicating that the token has expired.

This middleware function can be used in an Express.js application to protect certain routes and endpoints from unauthorized access. 
By adding this middleware function to the route handler for a protected route, you can ensure that only authenticated users are able to access the route.

*/
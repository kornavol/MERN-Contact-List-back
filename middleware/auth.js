const jwt = require('jsonwebtoken');
const jwtSKey = process.env.JWT_S_KEY;

exports.checkAuth = (req, res, next) => {
    const token = req.header('x-auth-tocken')

    /* We need to use this condition because of "Preflight request". In the last structure, middleware does not under ".Router()" and this part simulate some features from it */
    if (req.method == "OPTIONS") {
        res.status(200).send()
    } else {

        if (!token) {
            res.status(401).send({ status: 'failed', message: 'Absent tocken ' })
        }

        jwt.verify(token, jwtSKey, function (err, decoded) {
            if (err) {
                res.status(401).send({ status: 'failed', message: 'Invalid tocken ' })
            } else {
                req.userId = decoded.id
                next();
            }
        });
    }
};

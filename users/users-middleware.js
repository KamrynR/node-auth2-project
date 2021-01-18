const jwt = require('jsonwebtoken')

const departments = ["basic", "admin"]

function restrict(department = "basic") {
	return async (req, res, next) => {
		const authError = {
			message: 'Invalid credentials',
		}

		try {
			const token = req.cookies.token
			if (!token) {
				return res.status(401).json(authError)
			}

			jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
				if (err) {
					return res.status(401).json(authError)
				}
				if (department && departments.indexOf(decoded.userDepartment) < departments.indexOf(department)) {
					return res.status(403).json({
						message: "You shall not pass!",
					})
				}
				req.token = decoded
				next()
			})
		} catch(err) {
			next(err)
		}
	}
}

module.exports = {
	restrict,
}
const {Router} = require('express')
const bcrypt = require('bcryptjs')
const {check, validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const router = Router()

// /api/auth/register
router.post(
    '/register',
    [
        check('username', 'Minimum length of username 4 symbols, max 25').isLength({min: 4, max: 25}),
        check('email', 'Wrong Email address').isEmail(),
        check('password', 'Minimum length of password 6 symbols, max 8').isLength({min: 6, max: 8})
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong register data',
                    resultCode: 1
                })
            }

            const {email, password, username} = req.body
            const candidate = await User.findOne({email})
            const candidate2 = await User.findOne({username})

            if (candidate) {
                return res.status(400).json({message: "Current User already exist", resultCode: 1})
            }
            if (candidate2) {
                return res.status(400).json({message: "Current Username already in use", resultCode: 1})
            }
            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({username, email, password: hashedPassword})
            await user.save()
            res.status(200).json({
                message: "User created",
                resultCode: 0
            })
        } catch (e) {
            res.status(500).json({message: "Something gone wrong", erorr: e.message, resultCode: 1})
        }
    })

// /api/auth/login
router.post(
    '/login',
    [
        check('email', 'Insert correct email').normalizeEmail().isEmail(),
        check('password', 'Insert password').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Wrong login data',
                    resultCode: 1
                })
            }

            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({
                    message: "Wrong email or password",
                    resultCode: 1
                })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({
                    message: "Wrong email or password",
                    resultCode: 1
                })
            }

            const token = jwt.sign({userId: user.id}, config.get('jwtSecret'),
                {expiresIn: '1h'})

            res.status(200).json({token, userId: user.id, username: user.username, resultCode: 0})
        } catch (e) {
            res.status(500).json(
                {
                    message: "Something gone wrong",
                    resultCode: 1
                },
            )
        }
    }
)

// /api/auth/me

router.get(
    "/me",
    async (req, res) => {
        try {
            const token = req.headers['x-access-token'];
            if (!token) return res.status(401).send({message: 'No token provided.', resultCode: 1});

            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) return res.status(500).send({message: 'Failed to authenticate token.', resultCode: 1});

                res.status(200).json({decoded: decoded, resultCode: 0});
            });
        } catch (e) {
            res.status(500).json({resultCode: 1})
        }
    }
)


module.exports = router

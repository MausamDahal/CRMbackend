const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')
const { verifyAccessToken } = require('./helpers/jwt_helper')
require('./helpers/init_redis')
const AuthRoute = require('./Routes/auth.route')
const CustomerRoute = require('./Routes/customer.route')
const OrderRoute = require('./Routes/order.route')
const ProductRoute = require('./Routes/product.route')
const SubscriptionRoute = require('./Routes/subscription.route')
const DashboardRoute = require('./Routes/dashboard.route')
const CohortRoute = require('./Routes/cohort.route')
const InteractionRoute = require('./Routes/interaction.route')
const cors = require('cors')
const User = require('./Models/User.model')

const app = express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/home', verifyAccessToken, async (req, res, next) => {
    try {
        console.log("🔹 Checking user in DB:", req.payload.aud);

        const user = await User.findById(req.payload.aud);
        if (!user) {
            return next(createError.Unauthorized("User not found"));
        }
        res.json({ message: 'Welcome Home', user });
    } catch (error) {
        next(createError.InternalServerError());
    }
});

// routes
app.use('/auth', AuthRoute)
app.use('/api/customer', CustomerRoute)
app.use('/api/order', OrderRoute)
app.use('/api/product', ProductRoute)
app.use('/api/dashboard', DashboardRoute)
app.use('/api/subscription', SubscriptionRoute)
app.use('/api/interaction', InteractionRoute)
app.use('/api/cohort', CohortRoute)
app.use(async (req, res, next) => {
    // const error = new Error("Not Found")
    // error.status = 404
    // next(error)
    next(createError.NotFound())
})

app.use((err,req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


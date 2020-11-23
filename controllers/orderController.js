const Order = require('../models/orderModel')
const responseBody = require('../helper/response')

exports.createOrder = async (req, res, next) => {
    try {
        const customerId = req.user.id;
        const {workerId, name} = req.body;
        const newOrder = new Order({name, customer: customerId, worker: workerId})
        await newOrder.save()
        res.status(200).json(responseBody(0, newOrder, "Order has been created"))
    } catch (error) {
        next(error)
    }
}

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(responseBody(0, orders, 'Success'))
    } catch (error) {
        next(error)
    }
}

exports.getOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId
        const order = await Order.findById(orderId);
        res.status(200).json(responseBody(0, order, "Success"))
    } catch (error) {
        next(error)
    }
}


exports.updateOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId
        await Order.findByIdAndUpdate(orderId, req.body)
        const updatedOrder =  await Order.findById(orderId)
        res.status(200).json(responseBody(0, updatedOrder, "Order has been updated"))
    } catch (error) {
        next(error)
    }
}

exports.deleteOrder = async (req, res, next) => {
    try {
        const orderId = req.params.orderId
        await Order.findByIdAndDelete(orderId)
        res.status(200).json(responseBody(0, {}, "Order has been deleted"))
    } catch (error) {
        next(error)
    }
}

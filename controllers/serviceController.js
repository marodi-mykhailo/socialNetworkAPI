const Service = require('../models/serviceModel')
const responseBody = require('../helper/response')

exports.createService = async (req, res, next) => {
    try{
        const {name} = req.body;
        const newService = new Service({name})
        await newService.save();
        res.status(200).json(responseBody(0,newService,'Service has been created'))
    }catch (error) {
        next(error)
    }
}

exports.updateService = async (req,res,next) => {
    try{
        const update = req.body
        const serviceId = req.params.serviceId;
        await Service.findByIdAndUpdate(serviceId, update);
        const updatedService = await Service.findById(serviceId)
        res.status(200).json(
            responseBody(0, updatedService, 'Service has been updated'));
    }catch (error) {
        debugger
        next(error)
    }
}

exports.getAllServices = async (req,res,next) => {
    try{
        const services = await Service.find({})
        res.status(200).json(responseBody(0,services,"Success"))
    }catch (error) {
        next(error)
    }
}

exports.getService = async (req, res, next) => {
    try {
        const serviceId = req.params.serviceId
        const service = await Service.findById(serviceId)
        res.status(200).json(responseBody(0, service, "Success"))
    }catch (error) {
        next(error)
    }
}

exports.deleteService = async (req, res, next) => {
    try{
        const serviceId = req.params.serviceId
        await Service.findByIdAndDelete(serviceId);
        res.status(200).json(responseBody(0,{}, "Service has been delete"))
    }catch (error) {
        next(error)
    }
}


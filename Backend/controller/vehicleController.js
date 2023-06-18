import vehicle from "../models/vehicle.js";
 

export const addVehicle = async (req,res,next) => {
    const {slipNo, secondWeightManual, vehNo, dateTime, item, vehType, weight, charge, consignor} = req.body
    const newVehicle = new vehicle({
        slipNo, secondWeightManual, vehNo, dateTime, item, vehType, weight, charge, consignor
    })
    
    try{
        const saveVehicle = await newVehicle.save()
        res.status(200).json( saveVehicle)
        
    }catch(err){
        next(err)
    }
}

export const getVehicle = async (req, res, next) => {
    try{
        const Vehicle = await vehicle.find()
        res.status(200).json(Vehicle)
    }catch(err){
        next(err)
    }
}


export const updateVehicle = async (req,res,next) => {
    try{
        const updateEmployee = await vehicle.findByIdAndUpdate(req.body.id, { $set: req.body},
            { new: true})
        res.status(200).json(updateEmployee)
    }catch(err){
        res.status(500).json(err)
    }
}

export const deleteVehicle = async (req,res,next) => {
    try{
        await vehicle.findByIdAndDelete(req.body.id)
       res.status(200).json("Vehicle has been deleted")
   }catch(err){
       res.status(500).json(err)
   }
}

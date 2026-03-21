const roommodel = require("../models/roommodel");

module.exports.createroom = async (req, res) => {
    try {

        const {roomNumber,type,price,image,location,desc,member} = req.body;


        if (!roomNumber || !type || !price || !image || !location || !desc || !member) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

      
        const existroom = await roommodel.findOne({ roomNumber });

        if (existroom) {
            return res.status(409).json({
                message: "Room already exists"
            });
        }


        const newroom = await roommodel.create({roomNumber,type,price,image,location,desc,member});


        return res.status(201).json({
            message: "Room created successfully",
            success: true,
            newroom
        });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "Server Error"
        });
    }
};

module.exports.getallrooms = async (req,res) => {
    try {
        
        const getall = await roommodel.find();
        return res.status(200).json({success:true,getall});

    } catch (err) {
        console.log(err.message);
        
    }
    
}


module.exports.updateroom = async (req,res) => {
    try {

        const {id} = req.params;
        const {roomNumber,type,price,image,location,desc,member} = req.body;

        const updateroom = await roommodel.findByIdAndUpdate(id,{roomNumber,type,price,image,location,desc,member},{new:true});
        return res.status(200).json({success:true,updateroom});
        

    } catch (err) {
        console.log(err.message);
    }
    
}


module.exports.deleteroom = async (req,res) => {
    try{

        const {id}=req.params;

        const deleteroom = await roommodel.findByIdAndDelete(id);
        return res.status(200).json({messgae:"deleted",success:true,deleteroom});
    }catch(err){
        console.log(err.message);
    }
    
}

module.exports.getOneRoom = async (req, res) => {
  try {
    const room = await roommodel.findById(req.params.id);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({ success: true, room });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.filter = async (req,res) => {
    try {

        const {location} = req.query;

        const filter = location? await roommodel.find({location}):await roommodel.find();

        return res.status(200).json({success:true,filter});

        
    } catch (err) {
        console.log(err.message);
    }
    
}
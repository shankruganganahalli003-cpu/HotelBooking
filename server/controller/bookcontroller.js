const bookingmodel = require("../models/bookingmodel");

module.exports.create = async (req, res) => {
  try {

    const {room} = req.params;
    const {checkIn, checkOut,phoneno,name } = req.body;           

    if (!room || !checkIn || !checkOut|| !phoneno || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({ message: "Select correct date" });
    }


    const isRoomBooked = await bookingmodel.findOne({
      room,
      checkIn: { $lt: checkOutDate },
      checkOut: { $gt: checkInDate }
    });

    if (isRoomBooked) {
      return res.status(409).json({
        message: "Room already booked for these dates"
      });
    }

    const booking = await bookingmodel.create({userId:req.userId,room,checkIn: checkInDate,checkOut: checkOutDate,status: "booked",name,phoneno});
    
    res.status(200).json({ success: true ,booking});



  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: "Server error" });
  }
};


module.exports.getall = async (req,res) => {
    try {
        
        const getall = await bookingmodel.find().populate("userId");
        return res.status(201).json({message:"fetched",success:true,getall});



    } catch (err) {
        console.log(err.message);
        
    }
    
}


module.exports.update = async (req,res) => {
    try {

        const {id} = req.params;
        const {room,checkIn, checkOut,phoneno,name} = req.body;

        const updateroom = await bookingmodel.findByIdAndUpdate(id,{room, checkIn, checkOut,phoneno,name},{ returnDocument: "after" });
        return res.status(201).json({message:"updated",success:true,updateroom});

        
    } catch (err) {
        console.log(err.message);

    }
    
}

module.exports.deletebook = async (req,res) => {
    try {

        const {id} = req.params;
        const deletebook = await bookingmodel.findByIdAndDelete(id);
        return res.status(201).json({message:"deleted",success:true,deletebook});

        
    } catch (err) {
        console.log(err.message);
    }
    
}


module.exports.success = async (req,res) => {
  try {

    const {id} = req.params;

    const find = await bookingmodel.findById(id).populate("userId").populate("room");

    return res.status(200).json({success:true,find});
    
  } catch(err) {
    console.log(err.message);

    
  }
  
}


module.exports.booked = async (req,res) => {
    try {
    const booking = await bookingmodel
      .find({ userId: req.params.id, status: "booked" })
      .populate("room");

    return res.status(200).json({ success: true, booked: booking });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
  
}

module.exports.getme = async (req,res)=>{
  try {
    const {id} = req.params;
    const findme = await bookingmodel.findById(id);

    return res.json({success:true,findme})


  } catch (err) {
    console.log(err.message);
    
  }
}
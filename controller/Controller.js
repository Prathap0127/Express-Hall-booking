let room = [];
let bookRoom = [];
let customers = [];

export const createRoom = (req, res) => {
  try {
    let id = req.query.id;
    let roomName = req.query.roomName;
    let seatsAvailable = parseInt(req.query.seatsAvailable);
    let amenities = JSON.parse(req.query.amenities);
    let pricePerHr = req.query.price_per_hr;
    let roomObj = {
      id,
      roomName,
      seatsAvailable,
      amenities,
      pricePerHr,
      bookedStatus: false,
    };
    room.push(roomObj);
    console.log(room);
    res.status(200).json({
      message: "Room Created Sucessfully",
      roomObj: roomObj,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Room Creations",
      error,
    });
  }
};

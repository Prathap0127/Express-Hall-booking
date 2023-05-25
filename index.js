const express = require("express");
const app = express();
app.use(express.json());
const port = 8000;

let room = [];
let bookRoom = [];
let customers = [];

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to Hotel Booking App</h1>`);
});

app.get("/room", (req, res) => {
  // res.status(200).send(room)
  res.status(200).send(room);
});

//create a room with attributes
app.post("/create-room", (req, res) => {
  try {
    let id = req.body.id;
    let roomName = req.body.roomName;
    let noOfSeatAvailable = parseInt(req.body.noOfSeatAvailable);
    let amenitiesInRoom = req.body.amenitiesInRoom;
    let pricePerhour = req.body.pricePerhour;
    let roomObj = {
      id,
      roomName,
      noOfSeatAvailable,
      amenitiesInRoom,
      pricePerhour,
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
});

//booking room with customer

app.post("/room-booking", (req, res) => {
  let bookingStaus = bookRoom.filter((booking) => {
    return (
      booking.startDate == req.body.startDate &&
      booking.endDate == req.body.endDate
    );
  });
  if (bookingStaus.length) {
    res.status(200).send({
      status: true,
      message: "Room booked already!Check other dates",
    });
  } else {
    for (let i = 0; i < room.length; i++) {
      if (req.body.roomId === room[i].id && room[i].noOfSeatAvailable > 0) {
        let roombookObj = {
          customerName: req.body.customerName,
          roomName: room[i].roomName,
          date: req.body.date,
          startDate: req.body.startDate,
          endDate: req.body.endDate,
          roomId: req.body.roomId,
          bookedStatus: true,
        };
        let customerObj = {
          customerName: req.body.customerName,
          roomName: room[i].roomName,
          date: req.body.date,
          start: req.body.startDate,
          end: req.body.endDate,
        };
        bookRoom.push(roombookObj);
        customers.push(customerObj);
        res.status(200).send({
          status: true,
          message: "Room booked Sucessfully!",
          roombookObj,
          customerObj,
        });
      }
    }
  }
});

//list all booked room with customer data

app.get("/booked-room", (req, res) => {
  let showRooms = [];

  room.map((element) => {
    console.log(element.id);
    filterbooking = bookRoom.filter((e) => e.roomId === element.id);
    filterCustomer = customers.filter((e) => e.id === filterbooking.id);
    showRooms.push({
      "Room Name": element.roomName,
      "Booked Status": filterbooking.length,
      Bookings: filterbooking,
    });
    res.status(201).send(showRooms);
    console.log(showRooms);
  });
});

//show customer

app.get("/customers", (req, res) => {
  res.status(200).send(customers);
});

app.listen(port, () => {
  console.log("Server is lisiting " + port);
});

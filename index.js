const { json } = require('express')
const express = require('express')
const app = express()
app.use(express.json())
const port = 8000

let room = [{
    id: "001",
    roomName: "Executive 1",
    bookedStatus: "Free",
    noOfSeatAvailable: 30,
    amenitiesInRoom: "swiming pool , Garden",
    pricePerhour: 1200
},
{
    id: "002",
    roomName: "Executive 2",
    bookedStatus: "Free",
    noOfSeatAvailable: 37,
    amenitiesInRoom: "swiming pool , Garden",
    pricePerhour: 1500
}
]
let customer = [
    {
        id: "01",
        customerName: "prathap",
        customerEmail: "prathap@gmail.com",
        customerPhone: "8012170509"

    },
    {
        id: "02",
        customerName: "yuvaraj",
        customerEmail: "yuva@gmail.com",
        customerPhone: "8012170509"

    }
]

let bookingRoom = [
    {
        userId: "01",
        roomId: "001",
        date: "12.01.2023",
        startDate: "13.04.2023",
        endDate: "14.04.2023"
    },
    {
        userId: "02",
        roomId: "001",
        date: "12.01.2023",
        startDate: "13.03.2023",
        endDate: "14.03.2023"
    },
    {
        userId: "02",
        roomId: "002",
        date: "12.01.2023",
        startDate: "15.03.2023",
        endDate: "17.03.2023"
    }
]




app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Hotel Booking App</h1>`)
})

app.get('/room', (req, res) => {
    res.status(200).send(room)
    // res.status(200).send(bookingRoom)
})

//create a room with attributes 
app.post('/create-room', (req, res) => {
    room.push(req.body)
    res.status(200).send({ message: "Room added Sucessfully" })
})

//booking room with customer

app.post('/room-booking', (req, res) => {
    bookingRoom.push(req.body)

    res.status(200).send({ message: "Room Booked Sucessfully" })

    // let rooms = bookingRoom.map((e) => e.roomId === req.body.roomId)
    // if (rooms.length === 0) {
    //     res.status(200).send({ message: "Room Booked Sucessfully" })
    // }
    // else {
    //     res.status(201).send({ message: "room already booked " })
    // }

})

//list all booked room with customer data

app.get('/booked-room', (req, res) => {
    let showRooms = [];

    room.forEach(element => {

        console.log(element.id)
        filterbooking = bookingRoom.filter((e) => e.roomId === element.id)
        filterCustomer = customer.filter((e) => e.id === filterbooking.id)
        showRooms.push(
            {
                "Room Name": element.roomName,
                "Booked Status": filterbooking.length,
                "Bookings": (filterbooking)
            })
        res.status(201).send(showRooms)


    });


})

//show customer



app.listen(port, () => { console.log("Server is lisiting " + port) })
const bookingSchema = require("../../model/bookingSchema");

// @route    POST api/booking/bookFarm
// @desc     Used to book a farm house
// @access   Private
exports.bookFarm = async (req, res) => {
  try{
    // validation of farm data
    // const {error} =

    // getting data from request
    const { farmId, checkInDate, checkOutDate, totalPrice, noOfPeople } =
      req.body;

    // adding farm 
    const booking = new bookingSchema({
      farmId, userId, checkInDate, checkOutDate, price, noOfPeople
    });
    const savedbooking = booking.save();

    // sending response
    
    res.status(201).send({statusCode: 201, isError: false, message: "Farm booked Successfully!", savedbooking})
  }
  catch(err){
    console.log("Error while making a booking: ", err);
    res.status(500).json(err);
  }
}


const orderSchema = require("../../model/orderSchema");
const customResponse = require("../../utils/customResponse");

// @route    POST api/order/placeorder
// @desc     Used to book a farm house
// @access   Private
exports.placeOrder = async (req, res) => {
  try {
    // validation of farm data
    // const {error} =

    // getting data from request
    const { farmId, checkInDate, checkOutDate, totalPrice, noOfPeople } =
      req.body;

    // adding farm
    const order = new orderSchema({
      farmId,
      userId: req.user._id,
      checkInDate,
      checkOutDate,
      totalPrice,
      noOfPeople,
    });
    const savedOrder = await order.save();

    // sending response
    // res.status(201).send(customResponse(201, false, "Order Placed Successfully!!", savedOrder)/);
    res.status(201).send({
      statusCode: 201,
      isError: false,
      message: "Order Placed Successfully!",
      savedOrder,
    });
  } catch (err) {
    console.log("Error while making a order: ", err);
    res.status(500).json(err);
  }
};

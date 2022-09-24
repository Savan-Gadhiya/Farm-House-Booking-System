const userSchema = require("../../model/userSchema");
const authSchema = require("../../model/authSchema");
const {
	userValidation,
	addressValidation,
} = require("../../validators/validation");
const { sendResponse } = require("../../utils/sendResponse");

exports.updateUserDetails = async (req, res) => {
	const {
		firstName,
		lastName,
		phoneNumber,
		emergencyPhoneNumber,
		gender,
		dob,
		// idProof,
		// profileImage,
		address,
	} = req.body;

	// Validation of user
	const { error } = userValidation({
		firstName,
		lastName,
		phoneNumber,
		emergencyPhoneNumber,
		dob,
		// idProof,
	});
	if (error) return res.status(400).send(error.details[0].message);

	const { addressError } = addressValidation(address);
	console.log("is error ", addressError);
	if (addressError)
		return res.status(400).send(addressError.details[0].message);

	try {
		// check auth id is exist or not
		const isAuth = await authSchema.findOne({ _id: req.user._id }); // req.id from auth middleware
		if (!isAuth)
			return res.status(400).json({
				message: "User not found",
			});

		const updatedData = await userSchema.replaceOne(
			{ authId: req.user._id },
			{
				firstName,
				lastName,
				phoneNumber,
				emergencyPhoneNumber,
				gender,
				dob,
				// idProof,
				// profileImage,
				authId: req.user._id,
				address,
			}
		);

		sendResponse(res, 200, true, "Data Updated Successfully", updatedData);
	} catch (err) {
		res.status(500).send("Server crashed...");
		console.log("Error while updating user profile: ", err);
	}
};

exports.getUserController = async (req, res) => {
	try {
		const user = await userSchema.find().populate("authId");
		res.status(200).send({
			message: "User Detail Found.",
			status: 200,
			userData: user,
		});
	} catch (err) {
		res.status.json({
			message: "server crashed..." + err,
		});
	}
};

exports.getUserEmail = async (req, res) => {
	try {
		const userId = req.user._id;
		// const auth = await authSchema.findOne({_id: userId});
		// console.log(userId);
		const user = await userSchema.findOne(
			{ authId: userId },
			{ wishList: 0, createdAt: 0, updatedAt: 0 }
		);
    if(user == null){
      return sendResponse(res, 400, false, "User not found!");
    }
		await user.populate("authId", { email: 1, _id: 0 });
		// console.log("user: ", user);

		sendResponse(res, 200, true, "", user);
	} catch (err) {
		console.log("Error while getting user's email: ", err);
		sendResponse(res, 500, false, "Bad request");
	}
};

// for generating the custom resopnse
exports.sendResponse = (res, statusCode, success, message, data) => {
	const response = {
		statusCode, success, message, data
	}
	res.status(statusCode).json(response);
};

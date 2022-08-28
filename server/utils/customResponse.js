// for generating the custom resopnse
module.exports.customResponse = (statusCode, isError, message, ...others) => {
	const response = {
		statusCode: statusCode,
		isError: isError,
		message: message,
		// data: data,
		...others,
	};

	return response;
};

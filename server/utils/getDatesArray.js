exports.getDatesArray = (startDate, endDate) => {
	const date = startDate;

	const dates = [];
	while (date <= endDate) {
		dates.push(new Date(date));
		date.setDate(date.getDate() + 1);
	}
	return dates;
}

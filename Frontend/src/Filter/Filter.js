export const Filter = (from, to, data) => {
    var startDate = new Date(from);
    var endDate = new Date(to);

    var resultProductData = data.filter(a => {
        var date = new Date(a.dateTime);
        return (date >= startDate && date <= endDate);
      });
    return resultProductData
}

export const RequiredFieldSpaceNotAllow = (field) => {
	if (!field || field === null || field === "Invalid date") {
		return 'Required *';
	} else if(field.match(/^\S.*[a-zA-Z\s]*$/)) {
		return 'true';
	} else{
		return 'Space Not Allow';
	}
};
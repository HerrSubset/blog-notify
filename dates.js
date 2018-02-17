const largest_date = (date1, date2) => {
    if (!date1) {
        return date2

    } else if (!date2) {
        return date1

    } else if(date1 > date2) {
        return date1

    } else {
        return date2
    }
}


module.exports.largest_date = largest_date

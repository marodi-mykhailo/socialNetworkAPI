const responseBody = (resultCode,data, messages) => {
    return {
        resultCode,
        data,
        messages
    }
}

module.exports = responseBody;

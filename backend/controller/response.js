const response = (statusCode, payload, message, res) => {
  res.json({
    statusCode: statusCode,
    payload: payload,
    message: message,
    metadata: {
      prev: "",
      next: "",
    },
  });
};

module.exports = response;

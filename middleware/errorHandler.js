const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode;
  req.statusCode = 400;
  res.json({ error: error.message });
};

module.exports = { errorHandler };

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode;
  req.statusCode = statusCode ? statusCode : 500;
  res.json({ error: error.message });
};

module.exports = { errorHandler };

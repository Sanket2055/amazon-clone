const errorHandler = (error, req, res, next) => {
  req.statusCode = res.statusCode ? res.statusCode : 500;
  res.json({ error: error.message });
};

module.exports = { errorHandler };

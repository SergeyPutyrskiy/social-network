const getMessages = (req, res, next) => {
  const { userId } = req.query;

  res.status(200).json({ message: "ok" });
};

module.exports = {
  getMessages: [getMessages]
};

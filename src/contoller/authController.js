exports.register = (req, res) => {
  res.json({ message: 'register controller' });
};

exports.login = (req, res) => {
  res.json({ message: 'login controller' });
};

exports.forgotPassword = (req, res) => {
  res.json({ message: 'forgotPassword controller' });
};

exports.resetPassword = (req, res) => {
  res.json({ message: 'resetPassword controller' });
};
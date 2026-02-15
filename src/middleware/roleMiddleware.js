const role = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          message: `Access denied. Required role: ${allowedRoles.join(", ")}`,
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

module.exports = role;

module.exports = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized. Auth middleware missing.' });
    }

    const hasRole = Array.isArray(roles) 
      ? roles.includes(req.user.role) 
      : req.user.role === roles;

    if (!hasRole) {
      return res.status(403).json({ message: `Access denied. Requires one of these roles: ${roles}` });
    }

    next();
  };
};

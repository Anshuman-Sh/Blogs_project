const userRoutes = require("./userRoutes");
const blogRoutes = require("./blogRoutes");
const adminRoutes = require("./adminRoutes");
const express = require("express");
const router = express.Router();

const defaultRoutes = [
  { path: "/user", routes: userRoutes },
  { path: "/admin", routes: adminRoutes },
  { path: "/", routes: blogRoutes },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

module.exports = router;

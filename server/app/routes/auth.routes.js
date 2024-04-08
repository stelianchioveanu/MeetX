const controller = require("../controllers")

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/auth/signup", controller.signup);

  app.post("/auth/signin", controller.signin);

  app.post("/auth/signout", controller.signout);

  app.post("/auth/request", controller.resetRequest);

  app.post("/auth/reset", controller.resetPassword);
};
const mongoose = require("mongoose");
const app = require("./app.js");
const config = require("./config/config.js");
const Run = require("./utils/bootstrap.js");

mongoose
  .connect(config.mongoose.url)
  .then(() => {
    console.log("Database connected successfully");

    Run();
    app.listen(config.port, () =>
      console.log(`Server is running on PORT:${config.port}`)
    );
  })
  .catch((error) => console.log(error));

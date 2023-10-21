const express = require("express");
const configs = require("./configs");
const router = require("./routes");

const app = express();
const port = configs.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route
app.use(router);

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

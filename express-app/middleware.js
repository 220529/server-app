const express = require("express");
const app = express();

app.use((req, res, next) => {
  console.log("Middleware 1 - before ------------------------>");
  next();
  console.log("Middleware 1 - after");
});

app.use((req, res, next) => {
  console.log("Middleware 2 - before ------------------------->");
  // res.send("Hello Middleware 2");
  next();
  console.log("Middleware 2 - after");
});

app.use((req, res) => {
  console.log("Middleware 3 - final");
  res.send("Hello Express");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));

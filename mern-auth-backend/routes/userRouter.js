const router = require("express").Router();

router.get("/test", (req, res) => {
  res.send("Hello working");
});

module.exports = router;

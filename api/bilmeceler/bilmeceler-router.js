// değişiklik yapmayın
const router = require("express").Router();
const bilmeceler = require("./bilmeceler-data");
router.get("/", (req, res) => {
  res.status(200).json(bilmeceler);
});

module.exports = router;

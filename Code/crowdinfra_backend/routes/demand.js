const express = require("express");
const {
  demand,
  getDemand,
  getDemandById,
} = require("../controllers/demandController");
const router = express.Router();

router.post("/demand", demand);
router.get("/getDemand", getDemand);
router.get("/getDemandById/:id", getDemandById);

module.exports = router;

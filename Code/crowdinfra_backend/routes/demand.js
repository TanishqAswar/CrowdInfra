const express = require("express");
const {
  demand,
  getDemand,
  getDemandById,
  getNearbyDemands
} = require("../controllers/demandController");
const router = express.Router();

router.post("/demand", demand);
router.get("/getDemand", getDemand);
router.get("/getDemandById/:id", getDemandById);

/**
 * GET /api/demands/nearby
 * Retrieve nearby demands based on user location
 * Query Params: latitude, longitude, radius (optional, default 5km)
 */
// Route: GET /api/demands/nearby
router.get("/nearby", getNearbyDemands)

module.exports = router;

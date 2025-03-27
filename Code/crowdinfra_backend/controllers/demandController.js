const getDemandModel = require("../models/demandModel.js");
const colors = require('colors')

// **Create a new demand**
exports.demand = async (req, res) => {
  try {
    const Demand = await getDemandModel();

    const {
      user,
      title,
      description,
      location,
      category,
      status,
      upvotes,
      downvotes,
    } = req.body;

    // Ensure location is correctly formatted
    if (
      !location ||
      !Array.isArray(location.coordinates) ||
      location.coordinates.length !== 2
    ) {
      return res
        .status(400)
        .json({ error: "Invalid location. Provide [longitude, latitude]." });
    }

    const newDemand = new Demand({
      user,
      title,
      description,
      location: {
        type: "Point",
        coordinates: location.coordinates, // Expecting [longitude, latitude]
      },
      category,
      status,
      upvotes,
      downvotes,
    });

    await newDemand.save();
    res
      .status(201)
      .json({ message: "Demand created successfully!", demand: newDemand });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// **Get all demands**
exports.getDemand = async (req, res) => {
  try {
    const Demand = await getDemandModel();
    const demands = await Demand.find();
    res.status(200).json(demands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// **Get demand by ID**
exports.getDemandById = async (req, res) => {

  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate'
  )

  try {
    const Demand = await getDemandModel();
    const { id } = req.params;
    const demand = await Demand.findById(id);

    if (!demand) {
      return res.status(404).json({ message: "Demand not found" });
    }

    res.status(200).json(demand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// **Get nearby demands**
exports.getNearbyDemands = async (req, res) => {
  console.log("Fetching nearby demands...".blue.bgYellow);
  try {
    const { latitude, longitude, radius = 5000 } = req.query; // Default 5km radius

    if (!latitude || !longitude) {
      return res.status(400).json({ error: "Latitude and longitude are required." });
    }

    const Demand = await getDemandModel(); // Ensure model is initialized

    const demands = await Demand.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)], // MongoDB expects [lng, lat]
          },
          $maxDistance: parseInt(radius),
        },
      },
    });

    console.log("Nearby demands fetched successfully!".green);
    console.log(demands);

    res.json(demands);
  } catch (error) {
    console.error("Error fetching nearby demands:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
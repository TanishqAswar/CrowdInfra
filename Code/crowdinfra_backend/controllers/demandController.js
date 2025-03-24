const getDemandModel = require("../models/demandModel.js");

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

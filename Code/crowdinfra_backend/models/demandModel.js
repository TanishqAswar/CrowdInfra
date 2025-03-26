// import mongoose from "mongoose";
const mongoose = require("mongoose");
const connectDBs = require("../config/db");
let Demand = null;
let modelInitialized = false;

// Ensure `demandsDB` is initialized before use

const initializeDemandModel = async () => {
  if (modelInitialized) return Demand;

  const { demandsDB } = await connectDBs();
  const demandSchema = new mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false, //TODO: Change to true and get userid from token
      },
      title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
      location: {
        type: {
          type: String,
          enum: ["Point"],
          required: true,
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          required: true,
          validate: {
            validator: function (coords) {
              return coords.length === 2; // Ensure exactly 2 values
            },
            message:
              "Coordinates must be an array of two numbers [longitude, latitude].",
          },
        },
      },
      category: {
        type: String,
        required: true,
        enum: [
          "infrastructure",
          "public service",
          "transportation",
          "utilities",
          "education",
          "healthcare",
          "other",
        ], // Extend as needed
      },
      status: {
        type: String,
        enum: ["fulfilled", "not_fulfilled"],
        default: "not_fulfilled",
      },
      up_votes: {
        type: Number,
        default: 1,
        min: 0, // Prevents negative votes
      },
    },
    { timestamps: true }
  );

  // Bind to propertiesDB and assign to the global variable
  Demand = demandsDB.model("Demand", demandSchema);
  modelInitialized = true;
  return Demand;
};

// // **GeoSpatial Index for Efficient Location-Based Queries**
// demandSchema.index({ location: "2dsphere" });

// export const Demand = demandsDB.model("Demand", demandSchema);

// Initialize immediately
initializeDemandModel().catch((err) =>
  console.error("Failed to initialize Demand model:", err)
);

// Export an async function that ensures the model is available
const getDemandModel = async () => {
  if (!Demand) {
    await initializeDemandModel();
  }
  return Demand;
};

module.exports = getDemandModel;

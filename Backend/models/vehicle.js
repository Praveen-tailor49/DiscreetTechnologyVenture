import mongoose from "mongoose";

const vehicleSchema = mongoose.Schema(
  {
    slipNo: {
      type: String,
      require: true,
    },
    secondWeightManual: {
      type: Boolean,
    },
    vehNo: {
      type: String,
    },
    consignor: {
      type: String,
    },
    charge: {
      type: String,
    },
    weight: {
      type: String,
    },
    vehType: {
      type: String,
    },
    item: {
      type: String,
    },
    dateTime: {
      type: Date,
    },
  },
  { strict: false }
);

export default mongoose.model("vehicle", vehicleSchema);

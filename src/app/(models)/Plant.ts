import mongoose from "mongoose";

export interface Plants extends mongoose.Document {
  name: string;
  species: string;
  family_tree: string[];
  last_repotted: Date;
  soil_mix: string;
  image_url: string;
}

/* PlantSchema */
const PlantSchema = new mongoose.Schema<Plants>({
  name: {
    /* The name of this plant */

    type: String,
    required: [true, "Please provide a name for this plant."],
    maxlength: [40, "Name cannot be more than 40 characters"],
  },
  species: {
    /* The species of your plant */

    type: String,
    required: [true, "Please specify the species of your plant."],
    maxlength: [40, "Species specified cannot be more than 40 characters"],
  },  
  family_tree: {
    /* List of cuttings and pups, if applicable */

    type: [String],
  },
  last_repotted: {
    /* Date plant was last repotted, if applicable */

    type: Date,
  },
  soil_mix: {
    /* Soil mix, if desired */

    type: String,
  },
  image_url: {
    /* Url to pet image */

    required: [true, "Please provide an image url for this plant."],
    type: String,
  }
});

export default mongoose.models.Plant || mongoose.model<Plants>("Plant", PlantSchema);
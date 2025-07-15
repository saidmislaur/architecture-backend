const mongoose = require("mongoose")

const photoSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  layout: {
    type: String,
    enum: ["large", "medium", "small"],
    default: "medium",
  },
  description: {
    type: String,
    default: "",
  },
})

const locationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  district: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  plotArea: {
    type: String,
    required: false,
  },
  mapImage: {
    type: String,
    default: "",
  },
})

const keyFeatureSchema = new mongoose.Schema({
  icon: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

const galleryItemSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
})

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
      enum: ["residential", "commercial", "public"],
    },
    photos: [photoSchema],
    location: {
      type: locationSchema,
      required: true,
    },
    keyFeatures: [keyFeatureSchema],
    galleryItems: [galleryItemSchema],
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
    area: {
      type: String,
      default: "",
    },
    description: {
        type: String,
        required: false,
    }
  },
  {
    timestamps: true,
  },
)

projectSchema.index({ title: "text", type: "text" })
projectSchema.index({ category: 1 })
projectSchema.index({ status: 1 })

module.exports = mongoose.model("Project", projectSchema)

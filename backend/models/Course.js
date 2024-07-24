import mongoose, { Schema } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, default: 0 },
    comment: String,
    commentReplies: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        comment: String,
        createdAt: Date,
      },
    ],
  },
  { timestamps: true }
);

const linkSchema = new mongoose.Schema({
  title: String,
  url: String,
});

const questionSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    question: String,
    questionReplies: [
      {
        user: { type: Schema.Types.ObjectId, ref: "User" },
        answer: String,
        createdAt: Date,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const courseDataSchema = new mongoose.Schema({
  videoUrl: String,
  title: String,
  videoSection: String,
  description: String,
  videoLength: Number,
  videoPlayer: String,
  links: [linkSchema],
  suggestion: String,
  questions: [questionSchema],
});

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    estimatedPrice: { type: Number },
    thumbnail: {
      public_id: { type: String },
      url: { type: String },
    },
    tags: { type: String, required: true },
    level: { type: String, required: true },
    demoUrl: { type: String, required: true },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: { type: Number, default: 0 },
    purchased: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;

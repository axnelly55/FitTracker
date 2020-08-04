const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now,
  },
  exercises: [{
    type: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    duration: {
      type: Number,
    },
    weight: {
      type: Number
    },
    reps: {
      type: Number
    },
    sets:{
      type: Number
    },
    distance:{
      type: Number
    }
  }],
},
  {
    toJSON: {
      virtuals: true,
    }
  });

//Adds a dynamically-created property to schema (will not persist in database)
WorkoutSchema.virtual("totalDuration").get(function() {
  // Look at sum of exercises array durations.
  return this.exercises.reduce((total, exercise) => {
      return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

/*
{ Resistance Workout Example
    day: new Date(new Date().setDate(new Date().getDate() - 10)),
    exercises: [
      {
        type: "resistance",
        name: "Bicep Curl",
        duration: 20,
        weight: 100,
        reps: 10,
        sets: 4
      }
    ]
  },
   { Cardio Workout Example
    day: new Date(new Date().setDate(new Date().getDate() - 9)),
    exercises: [
      {
        type: "resistance",
        name: "Lateral Pull",
        duration: 20,
        weight: 300,
        reps: 10,
        sets: 4
      }
    ]
  },
*/
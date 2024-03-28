import { Meal, Workout } from "./Item.js";

class Storage {
  static getCalorieLimit(defaultLimit = 2000) {
    return localStorage.getItem("calorieLimit") !== null
      ? Number(localStorage.getItem("calorieLimit"))
      : defaultLimit;
  }

  static setCalorieLimit(limit) {
    localStorage.setItem("calorieLimit", limit);
  }

  static getTotalCalories(defaultTotal = 0) {
    return localStorage.getItem("totalCalories") !== null
      ? Number(localStorage.getItem("totalCalories"))
      : defaultTotal;
  }

  static setTotalCalories(total) {
    localStorage.setItem("totalCalories", total);
  }

  static saveMeals(meals) {
    const mealObjArr = meals.map((meal) => meal.recordValue());
    localStorage.setItem("meals", JSON.stringify(mealObjArr));
  }

  static getMeals() {
    const mealObjArr =
      localStorage.getItem("meals") !== null
        ? JSON.parse(localStorage.getItem("meals"))
        : [];

    const meals = mealObjArr.map((mealObj) => Meal.valueOf(mealObj));
    return meals;
  }

  static saveWorkouts(workouts) {
    const workoutObjArr = workouts.map((workout) => workout.recordValue());
    localStorage.setItem("workouts", JSON.stringify(workoutObjArr));
  }

  static getWorkouts() {
    const workoutObjArr =
      localStorage.getItem("workouts") !== null
        ? JSON.parse(localStorage.getItem("workouts"))
        : [];

    const workouts = workoutObjArr.map((workoutObj) =>
      Workout.valueOf(workoutObj)
    );
    return workouts;
  }

  static clearAll() {
    localStorage.removeItem("totalCalories");
    localStorage.removeItem("meals");
    localStorage.removeItem("workouts");
  }
}

export default Storage;

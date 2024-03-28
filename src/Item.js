class Meal {
  #id;
  #name;
  #calories;

  constructor(name, calories) {
    this.#id = this.#generateId();
    this.#name = name;
    this.#calories = calories;
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = id;
  }

  get name() {
    return this.#name;
  }

  get calories() {
    return this.#calories;
  }

  #generateId() {
    return `${Math.random().toString(16).slice(2)}${new Date().getTime()}`;
  }

  static valueOf(mealObj) {
    const meal = new Meal(mealObj.name, mealObj.calories);
    meal.id = mealObj.id;
    return meal;
  }

  recordValue() {
    const meal = {
      id: this.#id,
      name: this.#name,
      calories: this.#calories,
    };
    return meal;
  }
}

class Workout {
  #id;
  #name;
  #calories;

  constructor(name, calories) {
    this.#id = this.#generateId();
    this.#name = name;
    this.#calories = calories;
  }

  static valueOf(workoutObj) {
    const workout = new Workout(workoutObj.name, workoutObj.calories);
    workout.id = workoutObj.id;
    return workout;
  }

  get id() {
    return this.#id;
  }

  set id(id) {
    this.#id = id;
  }

  get name() {
    return this.#name;
  }

  get calories() {
    return this.#calories;
  }

  #generateId() {
    return `${Math.random().toString(16).slice(2)}${new Date().getTime()}`;
  }

  recordValue() {
    const workout = {
      id: this.#id,
      name: this.#name,
      calories: this.#calories,
    };
    return workout;
  }
}

export { Meal, Workout };

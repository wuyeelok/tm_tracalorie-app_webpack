import "@fortawesome/fontawesome-free/js/all";
import { Modal, Collapse } from "bootstrap";

import CalorieTracker from "./Tracker.js";
import { Meal, Workout } from "./Item.js";

import "./css/bootstrap.css";
import "./css/style.css";

class App {
  #tracker;

  constructor() {
    this.#tracker = new CalorieTracker();
    this.#loadEventListeners();
    this.#tracker.loadItems();
  }

  #loadEventListeners() {
    document.getElementById("meal-form").addEventListener("submit", (event) => {
      this.#newItem(event, "meal");
    });

    document
      .getElementById("workout-form")
      .addEventListener("submit", (event) => {
        this.#newItem(event, "workout");
      });

    document.getElementById("meal-items").addEventListener("click", (evt) => {
      this.#removeItem(evt, "meal");
    });

    document
      .getElementById("workout-items")
      .addEventListener("click", (evt) => {
        this.#removeItem(evt, "workout");
      });

    document.getElementById("filter-meals").addEventListener("input", (evt) => {
      this.#filterItems("meal", evt);
    });

    document
      .getElementById("filter-workouts")
      .addEventListener("input", (evt) => {
        this.#filterItems("workout", evt);
      });

    document
      .getElementById("reset")
      .addEventListener("click", this.#reset.bind(this));

    document
      .getElementById("limit-form")
      .addEventListener("submit", this.#setLimit.bind(this));

    const limitModalEl = document.getElementById("limit-modal");
    limitModalEl.addEventListener("show.bs.modal", (event) => {
      document.getElementById("limit").value = this.#tracker.calorieLimit;
    });

    limitModalEl.addEventListener("hidden.bs.modal", (event) => {
      document.getElementById("limit").value = "";
    });
  }

  #newItem(e, type) {
    e.preventDefault();

    const name = document.getElementById(`${type}-name`);
    const calories = document.getElementById(`${type}-calories`);

    // validate inputs
    if (name.value.trim() === "" || calories.value === "") {
      alert("Please fill in all fields");
      return;
    }

    if (type === "meal") {
      const meal = new Meal(name.value.trim(), Number(calories.value));
      this.#tracker.addMeal(meal);
    } else if (type === "workout") {
      const workout = new Workout(name.value.trim(), Number(calories.value));
      this.#tracker.addWorkout(workout);
    }

    name.value = "";
    calories.value = "";

    const collpaseItem = document.getElementById(`collapse-${type}`);
    const bsCollapse = new Collapse(collpaseItem, {
      toggle: true,
    });
  }

  #removeItem(e, type) {
    if (
      e.target.classList.contains("delete") ||
      e.target.parentElement.classList.contains("delete") ||
      e.target.parentElement.parentElement.classList.contains("delete")
    ) {
      if (confirm("Are you sure?")) {
        const id = e.target.closest(".card").dataset.id;

        if (type === "meal") {
          this.#tracker.removeMeal(id);
        } else if (type === "workout") {
          this.#tracker.removeWorkout(id);
        }
      }
    }
  }

  #filterItems(type, e) {
    const text = e.target.value.toLowerCase().trim();
    const items = document.querySelectorAll(`#${type}-items .card`);
    items.forEach((item) => {
      const name =
        item.firstElementChild.firstElementChild.firstElementChild.innerText.trim();

      if (name.toLowerCase().includes(text)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });

    // this.#tracker.loadItems(type, text);
  }

  #reset() {
    this.#tracker.resetDay();

    const mealItems = document.getElementById("meal-items");
    mealItems.innerHTML = "";

    const workoutItems = document.getElementById("workout-items");
    workoutItems.innerHTML = "";

    const filterMeals = document.getElementById("filter-meals");
    filterMeals.value = "";

    const filterWorkouts = document.getElementById("filter-workouts");
    filterWorkouts.value = "";
  }

  #setLimit(evt) {
    evt.preventDefault();

    const limitModalEl = document.getElementById("limit-modal");
    const modal = Modal.getInstance(limitModalEl);
    const limit = document.getElementById("limit");

    if (limit.value === "" || isNaN(limit.value) || Number(limit.value) <= 0) {
      alert("Please add a valid limit");
      return;
    }

    this.#tracker.setLimit(Number(limit.value));

    limit.value = "";
    modal.hide();
  }
}

const app = new App();

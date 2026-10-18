const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let exercises = [
  {
    id: 1,
    name: "Bench Press",
    day: "Monday",
    category: "Push",
    sets: 3,
    reps: 10,
    completed: false,
  },
  {
    id: 2,
    name: "Shoulder Press",
    day: "Monday",
    category: "Push",
    sets: 3,
    reps: 12,
    completed: false,
  },
  {
    id: 3,
    name: "Lat Pulldown",
    day: "Tuesday",
    category: "Pull",
    sets: 3,
    reps: 10,
    completed: false,
  },
  {
    id: 4,
    name: "Bicep Curl",
    day: "Tuesday",
    category: "Pull",
    sets: 3,
    reps: 12,
    completed: false,
  },
  {
    id: 5,
    name: "Squat",
    day: "Wednesday",
    category: "Legs",
    sets: 3,
    reps: 8,
    completed: false,
  },
  {
    id: 6,
    name: "Calf Raise",
    day: "Wednesday",
    category: "Legs",
    sets: 3,
    reps: 15,
    completed: false,
  },
  {
    id: 7,
    name: "Incline Dumbbell Press",
    day: "Thursday",
    category: "Upper Body",
    sets: 3,
    reps: 10,
    completed: false,
  },
  {
    id: 8,
    name: "Dumbbell Row",
    day: "Thursday",
    category: "Upper Body",
    sets: 3,
    reps: 10,
    completed: false,
  },
  {
    id: 9,
    name: "Romanian Deadlift",
    day: "Friday",
    category: "Lower Body",
    sets: 3,
    reps: 10,
    completed: false,
  },
  {
    id: 10,
    name: "Bulgarian Split Squat",
    day: "Friday",
    category: "Lower Body",
    sets: 3,
    reps: 8,
    completed: false,
  },
  {
    id: 11,
    name: "Easy Run",
    day: "Saturday",
    category: "Cardio",
    sets: 1,
    reps: 20,
    completed: false,
  },
  {
    id: 12,
    name: "Plank",
    day: "Saturday",
    category: "Core",
    sets: 3,
    reps: 1,
    completed: false,
  },
  {
    id: 13,
    name: "Rest Day",
    day: "Sunday",
    category: "Recovery",
    sets: 1,
    reps: 1,
    completed: false,
  },
];

const workoutGrid = document.getElementById("workoutGrid");

function render() {
  workoutGrid.replaceChildren();

  // Read the current search and day filter values.
  const searchInput = document.getElementById("search");
  const dayFilter = document.getElementById("dayFilter");

  const searchText = searchInput.value.trim().toLowerCase();
  const selectedDay = dayFilter.value;

  days.forEach(function (day) {
    // Skip days that don't match the selected day.
    if (selectedDay !== "all" && selectedDay !== day) {
      return;
    }

    // Get the exercises for this day that match the search.
    const dayExercises = exercises.filter(function (exercise) {
      const matchesDay = exercise.day === day;
      const matchesSearch = exercise.name.toLowerCase().includes(searchText);

      return matchesDay && matchesSearch;
    });

    // Create the day card.
    const dayCard = document.createElement("article");
    dayCard.classList.add("day-card");

    const heading = document.createElement("h3");
    heading.textContent = day;
    dayCard.appendChild(heading);

    if (dayExercises.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.textContent = "No matching exercises";
      dayCard.appendChild(emptyMessage);
    }

    dayExercises.forEach(function (exercise) {
      const exerciseItem = document.createElement("div");
      exerciseItem.classList.add("exercise-item");

      if (exercise.completed) {
        exerciseItem.classList.add("completed");
      }

      const exerciseName = document.createElement("h4");
      exerciseName.textContent = exercise.name;

      const details = document.createElement("p");

      if (exercise.category === "Cardio") {
        details.textContent = exercise.reps + " minutes";
      } else if (exercise.category === "Core") {
        details.textContent =
          exercise.sets + " sets × " + exercise.reps + " minute";
      } else if (exercise.category === "Recovery") {
        details.textContent = "";
      } else {
        details.textContent =
          exercise.sets + " sets × " + exercise.reps + " reps";
      }

      const buttonGroup = document.createElement("div");
      buttonGroup.classList.add("exercise-buttons");

      const completeButton = document.createElement("button");
      completeButton.type = "button";
      completeButton.classList.add("complete-button");
      completeButton.dataset.action = "complete";
      completeButton.dataset.id = exercise.id;
      completeButton.textContent = exercise.completed ? "Undo" : "Complete";

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.classList.add("delete-button");
      deleteButton.dataset.action = "delete";
      deleteButton.dataset.id = exercise.id;
      deleteButton.textContent = "Delete";

      const detailsButton = document.createElement("button");
      detailsButton.type = "button";
      detailsButton.classList.add("complete-button");
      detailsButton.dataset.action = "details";
      detailsButton.dataset.id = exercise.id;
      detailsButton.textContent = "Details";

      buttonGroup.appendChild(detailsButton);
      buttonGroup.appendChild(completeButton);
      buttonGroup.appendChild(deleteButton);

      exerciseItem.appendChild(exerciseName);
      exerciseItem.appendChild(details);
      exerciseItem.appendChild(buttonGroup);

      dayCard.appendChild(exerciseItem);
    });

    workoutGrid.appendChild(dayCard);
  });
}

render();

workoutGrid.addEventListener("click", function (event) {
  // Find out whether the click was on one of our buttons.
  const button = event.target.closest("button[data-action]");

  if (!button) {
    return;
  }

  const action = button.dataset.action;
  const id = Number(button.dataset.id);

  // Find the exercise that this button belongs to.
  const exercise = exercises.find(function (item) {
    return item.id === id;
  });

  if (!exercise) {
    return;
  }

  if (action === "details") {
    dialogTitle.textContent = exercise.name;

    let workoutDetails =
      "Day: " + exercise.day + "\n" + "Category: " + exercise.category + "\n";

    if (exercise.category === "Cardio") {
      workoutDetails += exercise.reps + " minutes\n";
    } else if (exercise.category === "Core") {
      workoutDetails +=
        exercise.sets + " sets × " + exercise.reps + " minute\n";
    } else if (exercise.category !== "Recovery") {
      workoutDetails += exercise.sets + " sets × " + exercise.reps + " reps\n";
    }

    workoutDetails +=
      "Status: " + (exercise.completed ? "Completed" : "Not completed");

    dialogDetails.textContent = workoutDetails;
    dialogDetails.style.whiteSpace = "pre-line";

    exerciseDialog.showModal();
    return;
  }

  if (action === "complete") {
    exercise.completed = !exercise.completed;
  }

  if (action === "delete") {
    exercises = exercises.filter(function (item) {
      return item.id !== id;
    });
  }

  render();
});

const searchInput = document.getElementById("search");
const dayFilter = document.getElementById("dayFilter");

searchInput.addEventListener("input", function () {
  render();
});

dayFilter.addEventListener("change", function () {
  render();
});

const exerciseForm = document.getElementById("exerciseForm");
const exerciseNameInput = document.getElementById("exerciseName");
const exerciseDayInput = document.getElementById("exerciseDay");
const exerciseCategoryInput = document.getElementById("exerciseCategory");
const exerciseSetsInput = document.getElementById("exerciseSets");
const exerciseRepsInput = document.getElementById("exerciseReps");
const formMessage = document.getElementById("formMessage");

exerciseForm.addEventListener("submit", function (event) {
  // Prevent the browser from reloading the page.
  event.preventDefault();

  // Read the values entered by the user.
  const name = exerciseNameInput.value.trim();
  const day = exerciseDayInput.value;
  const category = exerciseCategoryInput.value;
  const sets = Number(exerciseSetsInput.value);
  const reps = Number(exerciseRepsInput.value);

  // Clear previous field errors and highlighting.
  const fields = [
    exerciseNameInput,
    exerciseDayInput,
    exerciseCategoryInput,
    exerciseSetsInput,
    exerciseRepsInput,
  ];

  fields.forEach(function (field) {
    field.classList.remove("invalid");
    document.getElementById(field.id + "Error").textContent = "";
  });

  formMessage.textContent = "";
  formMessage.className = "form-message";

  let hasError = false;

  // Display an error beside the field that needs correcting.
  function showFieldError(field, message) {
    document.getElementById(field.id + "Error").textContent = message;
    field.classList.add("invalid");
    hasError = true;
  }

  // Rule 1: Exercise name cannot be empty.
  if (name === "") {
    showFieldError(exerciseNameInput, "Please enter an exercise name.");
  }

  // Rule 2: The same exercise cannot be added twice on the same day.
  const duplicateExists = exercises.some(function (exercise) {
    const existingName = exercise.name.toLowerCase().replace(/\s+/g, "");
    const newName = name.toLowerCase().replace(/\s+/g, "");

    return name !== "" && existingName === newName && exercise.day === day;
  });

  if (duplicateExists) {
    showFieldError(
      exerciseNameInput,
      "This exercise already exists on that day.",
    );
  }

  // Rule 3: A workout day must be selected.
  if (day === "") {
    showFieldError(exerciseDayInput, "Please choose a workout day.");
  }

  // Rule 4: A category must be selected.
  if (category === "") {
    showFieldError(exerciseCategoryInput, "Please choose a category.");
  }

  // Rule 5: Sets must be a whole number from 1 to 20.
  if (
    exerciseSetsInput.value.trim() === "" ||
    !Number.isInteger(sets) ||
    sets < 1 ||
    sets > 20
  ) {
    showFieldError(
      exerciseSetsInput,
      "Sets must be a whole number from 1 to 20.",
    );
  }

  // Rule 6: Reps or minutes must be a whole number from 1 to 300.
  if (
    exerciseRepsInput.value.trim() === "" ||
    !Number.isInteger(reps) ||
    reps < 1 ||
    reps > 300
  ) {
    showFieldError(
      exerciseRepsInput,
      "Reps / minutes must be a whole number from 1 to 300.",
    );
  }

  // Stop if any field has an error.
  if (hasError) {
    showFormMessage("Please correct the highlighted fields.", "error");

    return;
  }

  // Create a new exercise object.
  const newExercise = {
    id: Date.now(),
    name: name,
    day: day,
    category: category,
    sets: sets,
    reps: reps,
    completed: false,
  };

  // Add the new object to the exercises array.
  exercises.push(newExercise);

  // Redraw the schedule with the updated data.
  render();

  // Reset the form after successful submission.
  exerciseForm.reset();

  // Restore the default values for sets and reps.
  exerciseSetsInput.value = 3;
  exerciseRepsInput.value = 10;

  // Tell the user the exercise was added.
  showFormMessage("Exercise added successfully!", "success");
});

function showFormMessage(message, type) {
  formMessage.textContent = message;
  formMessage.classList.add(type);
}

const exerciseDialog = document.getElementById("exerciseDialog");
const dialogTitle = document.getElementById("dialogTitle");
const dialogDetails = document.getElementById("dialogDetails");
const closeDialogButton = document.getElementById("closeDialog");

closeDialogButton.addEventListener("click", function () {
  exerciseDialog.close();
});

document.addEventListener("keydown", function (event) {
  // Only activate the shortcut when the user presses "/".
  if (event.key !== "/") {
    return;
  }

  // Don't interrupt someone who is typing in an input, dropdown, or editable element.
  const activeTag = document.activeElement.tagName;

  if (
    activeTag === "INPUT" ||
    activeTag === "TEXTAREA" ||
    activeTag === "SELECT" ||
    document.activeElement.isContentEditable
  ) {
    return;
  }

  // Prevent the default "/" typing behavior.
  event.preventDefault();

  // Focus the Exercise Name input field in the "Add an Exercise" form.
  document.getElementById("exerciseName").focus();
});

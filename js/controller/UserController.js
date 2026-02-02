// Controller - coordinates between Model and View
import { getFullUserData } from "../model/UserModel.js";
import {
  renderUser,
  renderQuote,
  renderPokemon,
  renderAboutMe,
  renderFriends,
} from "../view/UserView.js";

let currentUserFriends = null;
let currentUserData = null;

// Fetch and display a new random user
const generateNewUser = async () => {
  const button = document.getElementById("generate-user-btn");

  try {
    button.disabled = true;
    button.innerText = "Loading...";

    const fullUserData = await getFullUserData();

    if (fullUserData) {
      currentUserData = fullUserData;
      renderUser(fullUserData.user);
      renderQuote(fullUserData.quote);
      renderPokemon(fullUserData.pokemon);
      renderAboutMe(fullUserData.aboutMe);

      currentUserFriends = fullUserData.friends || null;
      renderFriends(currentUserFriends);
    } else {
      console.error("Failed to fetch user data");
    }
  } catch (error) {
    console.error("Error generating user:", error);
  } finally {
    button.disabled = false;
    button.innerText = "Generate User";
  }
};

// Save the current user to localStorage (as part of users array)
const saveUserPage = () => {
  if (!currentUserData) {
    alert("No user to save! Generate a user first.");
    return;
  }

  // Get existing users or start with empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Add current user to array
  users.push(currentUserData);

  // Save back to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Update dropdown
  updateSavedUsersDropdown();

  alert("User saved!");
};

// Update the dropdown with saved users
const updateSavedUsersDropdown = () => {
  const select = document.getElementById("saved-users-select");
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Clear existing options except the first placeholder
  select.innerHTML =
    '<option value="" disabled selected>Select a user</option>';

  // Add each saved user as an option
  users.forEach((userData, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${userData.user.name.first} ${userData.user.name.last}`;
    select.appendChild(option);
  });
};

// Load the selected user from localStorage
const loadUserPage = () => {
  const select = document.getElementById("saved-users-select");
  const selectedIndex = select.value;

  if (selectedIndex === "") {
    alert("Please select a user from the dropdown first!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userData = users[selectedIndex];

  if (!userData) {
    alert("User not found!");
    return;
  }

  currentUserData = userData;
  renderUser(userData.user);
  renderQuote(userData.quote);
  renderPokemon(userData.pokemon);
  renderAboutMe(userData.aboutMe);

  currentUserFriends = userData.friends || null;
  renderFriends(currentUserFriends);
};

export const renderContent = () => {
  const generateButton = document.getElementById("generate-user-btn");
  generateButton.addEventListener("click", generateNewUser);

  document
    .getElementById("save-user-btn")
    .addEventListener("click", saveUserPage);
  document
    .getElementById("load-user-btn")
    .addEventListener("click", loadUserPage);

  // Load any previously saved users into dropdown
  updateSavedUsersDropdown();

  generateNewUser();
};

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

const saveUserPage = () => {
  if (!currentUserData) {
    alert("No user to save! Generate a user first.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push(currentUserData);

  localStorage.setItem("users", JSON.stringify(users));

  updateSavedUsersDropdown();

  alert("User saved!");
};

const updateSavedUsersDropdown = () => {
  const select = document.getElementById("saved-users-select");
  const users = JSON.parse(localStorage.getItem("users")) || [];

  select.innerHTML =
    '<option value="" disabled selected>Select a user</option>';

  users.forEach((userData, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${userData.user.name.first} ${userData.user.name.last}`;
    select.appendChild(option);
  });
};

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

  updateSavedUsersDropdown();

  generateNewUser();
};

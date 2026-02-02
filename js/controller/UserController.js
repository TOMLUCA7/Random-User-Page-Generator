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

// Fetch and display a new random user
const generateNewUser = async () => {
  const button = document.getElementById("generate-user-btn");

  try {
    button.disabled = true;
    button.innerText = "Loading...";

    const fullUserData = await getFullUserData();

    if (fullUserData) {
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

export const init = () => {
  const generateButton = document.getElementById("generate-user-btn");
  generateButton.addEventListener("click", generateNewUser);

  generateNewUser();
};

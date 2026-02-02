// disply the ui of user

export const renderUser = (userData) => {
  const nameElement = document.getElementById("user-name");
  const pictureElement = document.getElementById("user-picture");

  nameElement.innerText = `${userData.name.first} ${userData.name.last}`;
  pictureElement.src = userData.picture.large;
  pictureElement.alt = `${userData.name.first}'s picture`;
};

export const renderQuote = (quote) => {
  const quoteElement = document.getElementById("favorite-quote");
  quoteElement.innerText = `"${quote}"`;
};

export const renderPokemon = (pokemon) => {
  const pokemonImgElement = document.getElementById("pokemon-picture");
  const pokemonNameElement = document.getElementById("pokemon-name");

  pokemonImgElement.src = pokemon.img;
  pokemonImgElement.alt = pokemon.name;
  pokemonNameElement.innerText = pokemon.name;
};

export const renderAboutMe = (aboutMeArray) => {
  const aboutMeElement = document.getElementById("about-me");
  aboutMeElement.innerText = aboutMeArray[0];
};

export const renderFriends = (friendsArray) => {
  const friendsElement = document.getElementById("show-friends");
  if (friendsArray && friendsArray.length > 0) {
    friendsElement.innerText = friendsArray
      .map((f) => `${f.name.first} ${f.name.last}`)
      .join("\n");
  } else {
    friendsElement.innerText = "You Have No Friends";
  }
};

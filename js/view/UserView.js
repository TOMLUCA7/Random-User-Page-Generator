// disply the ui of user

export const renderUser = (userData) => {
  const nameElement = document.getElementById("user-name");
  const pictureElement = document.getElementById("user-picture");

  nameElement.innerText = `${userData.name.first} ${userData.name.last}`;
  pictureElement.src = userData.picture.large;
  pictureElement.alt = `${userData.name.first}'s picture`;
};

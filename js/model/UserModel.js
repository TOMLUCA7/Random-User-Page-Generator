// all the logic for the user model
// only use functions

const USER_API_URL = "https://randomuser.me/api/1.4/";
const GET_POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon/";
const GET_QUOTE_API_URL = "https://api.kanye.rest";
const GET_ABOUT_ME_TEXT = "https://baconipsum.com/api/?type=meat-and-filler";

export const getRandomUser = async () => {
  try {
    const response = await fetch(`${USER_API_URL}`);
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    throw new Error("Failed to get random user");
  }
};

export const getRandomPokemon = async () => {
  try {
    const response = await fetch(`${GET_POKEMON_API_URL}`);
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    throw new Error("Failed to get random pokemon");
  }
};

export const getRandomQuote = async () => {
  try {
    const response = await fetch(`${GET_QUOTE_API_URL}`);
    const data = await response.json();
    return data.quote;
  } catch (error) {
    throw new Error("Failed to get random quote");
  }
};

export const getAboutMeText = async () => {
  try {
    const response = await fetch(`${GET_ABOUT_ME_TEXT}`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to get about me text");
  }
};

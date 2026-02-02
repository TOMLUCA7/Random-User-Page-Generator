// all the logic for the user model
// only use functions

const USER_API_URL = "https://randomuser.me/api/1.4/";
const GET_POKEMON_API_URL = "https://pokeapi.co/api/v2/pokemon/";
const GET_QUOTE_API_URL = "https://api.kanye.rest";
const GET_ABOUT_ME_TEXT = "https://baconipsum.com/api/?type=meat-and-filler";

const getRandomUser = async () => {
  try {
    const response = await fetch(`${USER_API_URL}`);
    if (!response.ok) throw new Error("Faild to get USER API");
    const data = await response.json();
    return data.results[0];
  } catch (error) {
    throw new Error("Failed to get random user");
  }
};

const getRandomPokemon = async () => {
  try {
    const randomPokemonId = Math.floor(Math.random() * 898) + 1;
    const response = await fetch(`${GET_POKEMON_API_URL}${randomPokemonId}`);
    if (!response.ok) throw new Error("Faild to get GET POKEMON API");
    const data = await response.json();
    return {
      name: data.name,
      img: data.sprites.front_default,
    };
  } catch (error) {
    throw new Error("Failed to get random pokemon");
  }
};

const getRandomQuote = async () => {
  try {
    const response = await fetch(`${GET_QUOTE_API_URL}`);
    if (!response.ok) throw new Error("Faild to get GET QUOTE API");
    const data = await response.json();
    return data.quote;
  } catch (error) {
    throw new Error("Failed to get random quote");
  }
};

const getAboutMeText = async () => {
  try {
    const response = await fetch(`${GET_ABOUT_ME_TEXT}`);
    if (!response.ok) throw new Error("Faild to get GET ABOUT ME TEXT API");
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Failed to get about me text");
  }
};

export const getFullUserData = async () => {
  try {
    const [user, pokemon, quote, aboutMe] = await Promise.all([
      getRandomUser(),
      getRandomPokemon(),
      getRandomQuote(),
      getAboutMeText(),
    ]);

    return {
      user,
      pokemon,
      quote,
      aboutMe,
    };
  } catch (error) {
    throw new Error("error fetching data from API's:", error.message);
  }
};

// initialize unsplash api
import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getCoffeeStoresPhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 10,
  });

  const unsplashResults = photos.response.results;
  const photosUrls = unsplashResults.map((result) => result.urls["small"]);
  return photosUrls;
};

export const fetchCoffeeStores = async () => {
  const photos = await getCoffeeStoresPhotos();

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.FQ_API_KEY,
    },
  };

  const response = await fetch(
    "https://api.foursquare.com/v3/places/search?ll=37.78034126237199,-122.42119547186006&query=coffee&limit=6",
    options
  );
  const data = await response.json();
  console.log(data);

  return data.results.map((result, idx) => {
    return {
      ...result,
      imgUrl: photos[idx],
    };
  });
};

// initialize unsplash api
import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
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

const getUrlForCoffeeStores = (latLong, query, limit) => {
  return `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&query=${query}&limit=${limit}`;
};

export const fetchCoffeeStores = async (
  latLong = "37.78034126237199,-122.42119547186006",
  limit = 8
) => {
  const photos = await getCoffeeStoresPhotos();

  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FQ_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee", limit),
    options
  );
  const data = await response.json();

  return data.results.map((venue, idx) => {
    return {
      id: venue.fsq_id,
      address: venue.location.address || "",
      name: venue.name,
      neighbourhood:
        venue.location.neighborhood || venue.location.crossStreet || "",
      imgUrl: photos[idx],
    };
  });
};

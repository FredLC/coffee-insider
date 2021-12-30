export const fetchCoffeeStores = async () => {
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

  return data.results;
};

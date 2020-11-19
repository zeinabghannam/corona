import axios from "axios";

const API_URL = "https://covid19.mathdro.id/api";

//Fetch Data from  the API:
export const fetchData = async (country) => {
  let modifiedURL = API_URL;
  if (country) {
    modifiedURL = `${API_URL}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(modifiedURL);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${API_URL}/daily`);
    const destructedData = data.map((dataobj) => ({
      confirmed: dataobj.totalConfirmed,
      deaths: dataobj.deaths.total,
      date: dataobj.reportDate,
    }));
    return destructedData;
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${API_URL}/countries`);
    return countries.map(({ name }) => name);
  } catch (error) {
    console.log(error);
  }
};

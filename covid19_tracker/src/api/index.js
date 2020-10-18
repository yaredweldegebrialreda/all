import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export async function fetch_data(country) {
  let specificUrl = url;
  if(country){
      specificUrl=`${url}/countries/${country}`
  }
  try {
    const { data } = await axios.get(specificUrl);
    // console.log("data all:",data);
    const modifedData = {
      confirmed: data.confirmed,
      recovered: data.recovered,
      deaths: data.deaths,
      lastUpdate: data.lastUpdate,
    };
    // console.log("response from fetching data:",modifedData);
    return modifedData;
  } catch (error) {
    console.log(error);
  }
}

export async function fetch_dailyData() {
  try {
    const { data } = await axios.get(`${url}/daily`);
    // console.log("daily report:",data);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
      //recovered:dailyData.recovered
    }));
    // console.log("modified data=",modifiedData);
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
}
export default async function countries() {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    //  console.log("countries:",countries);
    return countries.map((country) => country.name);
  } catch (error) {
    console.log(error);
  }
}

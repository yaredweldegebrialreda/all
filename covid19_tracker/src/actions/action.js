import {fetch_data,fetch_dailyData} from "../api/index";
import countries from "../api/index";

export const TOTAL_DATA="TOTAL_DATA";
export const DAILY_DATA="DAILY_DATA";
export const COUNTRIES="COUNTRIES";

export  function fetchData(country) {
 // console.log("inside action");
    return async (dispatch) => {
      return dispatch({
        type: TOTAL_DATA,
        payload: await fetch_data(country)
      });
    }
  }
export  function fetchDailyData(){
  return async(dispatch)=>{
    return dispatch({
      type:DAILY_DATA,
      payload:await fetch_dailyData()
    })
  }
}

export function countriesList(){
  return async(dispatch)=>{
    return dispatch({
      type:COUNTRIES,
      payload:await countries()
    })
  }
}
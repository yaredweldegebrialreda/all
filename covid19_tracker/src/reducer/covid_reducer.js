
import {TOTAL_DATA,DAILY_DATA, COUNTRIES} from "../actions/action"

const initiValue = {
    total: {},
    deaths: {},
    recovered: {},
    countries:{},
    daily:{}
    
  };

  const covid_reducer=(state=initiValue,action)=>{
    switch (action.type) {
        case TOTAL_DATA:
            console.log("total data inside reducer",action.payload);
            return{
                ...state,
                total:action.payload
            }
            case DAILY_DATA:
               // console.log("daily report inside reducer:",action.payload);
                return{
                    
                    ...state,
                    daily:action.payload
                }
            case COUNTRIES:
               // console.log("countries inside reducer:",action);
                return{
                    ...state,
                    countries:action.payload
                }
        default:
            return state;
    }


}
export default covid_reducer;
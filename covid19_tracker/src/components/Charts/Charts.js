import React, { Component } from 'react';
import {fetchDailyData} from "../../actions/action"
import {connect} from "react-redux";
import {Line,Bar} from "react-chartjs-2"
import styles from "./Charts.module.css";


class Charts extends Component {
    constructor(props){
        super(props);
        this.state={
            daily_data:[]
        }

    }  
    componentDidMount=async e=>{
        let ret=await this.props.fetchDailyData();
       // console.log("returned daily report:",ret);
        this.setState({
            daily_data:ret.payload
        })
        console.log("daily_dataaaaaaaaa:",this.state.daily_data);

    }
   
    render() {
        console.log("props inside charts",this.props.country);
        const daily_data=this.state.daily_data;
        const lineChart=(
       daily_data!=[]?
        (
        <Line
        data={{
            labels:daily_data.map(({date})=>date),
            datasets:[{
             data:daily_data.map(({confirmed})=>confirmed),
             label:"Infected",
             borderColor:"#3333ff",
             fill:true,
            },
            {
             data:daily_data.map(({deaths})=>deaths),
             label:"Death",
             borderColor:"red",
             backgroundColor:'rgba(255,0,0,0.5)',
             fill:true,
            }],
        }}
        />
        ):null
        )

        const barChart=(
            this.props.country?(
          <Bar
          data={{
             // labels:['Infected','Recovered','Deaths'],
             labels:daily_data.map(({date})=>date),
              datasets:[{
                  label:'People',
                  backgroundColor:[ 'rgba(0, 0, 255,0.5)', 'rgba(0, 255, 0,0.5)','rgba(255, 0, 0,0.5)'],
                  data:[this.props.data.confirmed.value,this.props.data.recovered.value,this.props.data.deaths.value]
              }]

          }}
          options={{
              legend:{display:false},
              title:{display:true,text:`Current state in ${this.props.country}`},
          }}
          
          
          />
            ):null
        )
       
       // console.log("dailydataCOnfirmed",daily_data[0]);
        return (
            <div className={styles.container}>
                {this.props.country?barChart:lineChart}
            </div>
        );
    }
}

const MapStateToProps=(state)=>{
return{
  daily_data:state.covid_reducer
}

}
export default connect(MapStateToProps,{fetchDailyData})(Charts);
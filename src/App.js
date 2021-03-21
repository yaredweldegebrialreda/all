import React, { Component } from "react";
import { Cards, Charts, CountryPicker } from "./components";

import { fetchData } from "./actions/action";
import { connect } from "react-redux";
import coronaImage from "./images/image.png"
import styles from "./App.module.css";
class App extends Component {
  state = {
    data: {},
    country:""
  };

  componentDidMount = async (e) => {
    let fetchedData = await this.props.fetchData();
    // console.log("data==", fetchedData.payload);

    this.setState({
      data: fetchedData.payload,
    });
   // console.log("alll datatatatatataattt",this.state.data.confirmed);
  };
  handleCountryChange=async(country)=>{
    console.log("country selected:",country);
    let fetchedCountryData=await this.props.fetchData(country);
    
    this.setState({
      data:fetchedCountryData.payload,
     
    })
    this.setState({
      country:country
    })
   //console.log("data of specific country:",this.state.data.confirmed);
  }

  render() {
    const data = this.state.data;
    // console.log("data inside stateeeeeeeeeeeeeeeeeeeeeeeeeeee:", this.state.data);
    return (
      <div className={styles.container}>
        <img  className={styles.image} src={coronaImage} alt="COVID-19"/>
        <Cards/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Charts data={this.state.data} country={this.state.country} />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    totaldata: state.covid_reducer,
  };
};
export default connect(mapStateToProps, { fetchData })(App);

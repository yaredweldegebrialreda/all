import React, { Component } from "react";
import { connect } from "react-redux";
import { NativeSelect, FormControl } from "@material-ui/core";
import styles from "./CountryPicker.module.css";
import { countriesList } from "../../actions/action";

class CountryPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
    };
  }
  componentDidMount = async (e) => {
    let returned = await this.props.countriesList();
    // console.log("world attacked countries returned:",this.props);
    this.setState({
      countries: returned.payload,
    });
    console.log("inside state.", this.state.countries);
  };

  render() {
    // console.log("propssssssssssss country:",this.props.data);
    let countries = this.state.countries;
    return (
      <FormControl className={styles.formControl}>
        <NativeSelect
          defaultValue=""
          onChange={(e) => this.props.handleCountryChange(e.target.value)}
        >
           <option value="">Global </option> */}     
          {countries?countries.map((country, i) => (
            <option key={i} value={country}>
              {country}
            </option>
          )):null}
        </NativeSelect>
      </FormControl>
    );
  }
}

const MapStateToProps = (state) => {
  return {
    data: state.covid_reducer.countries,
  };
};

export default connect(MapStateToProps, { countriesList })(CountryPicker);

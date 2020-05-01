import React from "react";
import { connect } from "react-redux";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import styles from "./Cards.module.css";
import cx from "classnames"

class Cards extends React.Component {
  constructor() {
    super();
    this.state = {
      
    };
  }

  render(){
    console.log("props inside card:",this.props.data);
    if (!this.props.data.confirmed) {
      return "Loading...";
    }
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.infected)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infected
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={this.props.data.confirmed.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary" gutterBottom>
           { new Date(this.props.data.lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of active cases covid19.
            </Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={12} md={3} className={cx(styles.card,styles.recovered)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recovered
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={this.props.data.recovered.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary" gutterBottom>
            {new Date(this.props.data.lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of recoveres from covid19.
            </Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card}  xs={12} md={3} className={cx(styles.card,styles.deaths)}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Deaths
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={this.props.data.deaths.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary" gutterBottom>
            {new Date(this.props.data.lastUpdate).toDateString()}
            </Typography>
            <Typography variant="body2">
              Number of Deaths from covid19.
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
  }
};

const MapStateToProps = (state) => {
  return {
    data: state.covid_reducer.total
  };
};
export default connect(MapStateToProps)(Cards);

//export default Cards;

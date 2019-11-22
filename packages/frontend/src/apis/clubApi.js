import { clubEndpoint } from "./endpoints";
import React, { Component } from "react";
const axios = require("axios");

class ClubApi extends Component {
  constructor(props){
    super(props);

    this.state = {
      clubs: []
    };
  }
  componentDidMount() {
    console.log('mount')
    axios
      .get(clubEndpoint)
      .then(res => res.data)
      .then(data => {
        console.log({data});
        this.setState({ clubs: data });
      })
      .catch(e => {
        console.log({error: e.message})
      });
  }

  render() {
    return (
      <div className="container">
        <div className="col">
          {console.log({state: this.state.clubs})}
          {this.state.clubs.map(club => (
            <div className="club_card">
              <div className="body">
                <h5 className="card-name">{club.name}</h5>
                <pre className="card-description">{club.description}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default ClubApi;

import React, { useState, useEffect } from "react";
import styles from "./ClubPage.module.css";
//import { clubEndpoint, clubID } from "../../apis/endpoints";

const ClubPage = props => {
  const [club, setClubData] = useState({}); //club is state where club data is stored 

  async function getClub() {
    const { id } = props.match.params;
    const res = await fetch(`http://localhost:3000/club/${id}`);

    

    res
      .json()
      .then(res => setClubData(res))
      .catch(err => err);
  }

  useEffect(() => {
    getClub();
  }, []);

return <div className={styles.root}>ClubPage</div>; //JSON.stringify(club) // {club.name}...
};

export default ClubPage;

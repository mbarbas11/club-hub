import React, { useState, useEffect } from "react";
import styles from "./ClubPage.module.css";
//import { clubEndpoint, clubID } from "../../apis/endpoints";

const ClubPage = props => {
  const [club, setClubData] = useState({}); //club is state where club data is stored //JSON.stringify(club) // {club.name}...

  async function getClub() {
    const { id } = props.match.params;
    const res = await fetch(`http://localhost:3000/club/${id}`);

    console.log({ HERE: club });

    res
      .json()
      .then(res => setClubData(res))
      .catch(err => err);
  }

  useEffect(() => {
    getClub();
  }, []);

  return <div className={styles.root}>ClubPage</div>;
};

export default ClubPage;

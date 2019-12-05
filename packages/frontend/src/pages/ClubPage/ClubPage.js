import React, { useState, useEffect } from "react";
import styles from "./ClubPage.module.css";
import { clubEndpoint, clubID } from "../../apis/endpoints";

const ClubPage = () => {
  const [club, setClubData] = useState({});

  
  async function getClub() {
    const res = await fetch(
      clubEndpoint
    );

    console.log(clubID)
    //const res2 = await fetch( clubID);
    //console.log({here: res2})

    res
      .json()
      .then(res => setClubData(res))
      .catch(err => err);
  }

  useEffect(() => {
    getClub();
  },[]);

  return <div className={styles.root}>Club name: {club.name}</div>;
};

export default ClubPage;

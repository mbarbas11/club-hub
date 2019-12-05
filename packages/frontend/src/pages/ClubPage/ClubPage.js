import React, { useState, useEffect } from "react";
import styles from "./ClubPage.module.css";
import { clubEndpoint, clubID } from "../../apis/endpoints";

const ClubPage = () => {
  const [club, setClubData] = useState({});

  async function getClub() {
    const res = await fetch(clubID);

    console.log({ HERE: res.data });
    

    res
      .json()
      .then(res => setClubData(res))
      .catch(err => err);
  }

  useEffect(() => {
    getClub();
  }, []);

  return <div className={styles.root}>{club.name}</div>;
};

export default ClubPage;

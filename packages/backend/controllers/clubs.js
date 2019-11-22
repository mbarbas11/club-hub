const admin = require("firebase-admin");
const { ClubSchema } = require("@clubhub/common/models");

async function addClub(data) {
  console.log({ body: data });
  let result = ClubSchema.validate(data, {
    stripUnknown: true,
    abortEarly: false
  }); //strip removes unwanted attribute in club
  console.log(result);

  const db = admin.firestore();
  if (result.error) {
    throw Error(result.error.details.map(item => item.message).join(", ")); //joins errors, strips result.error of unwanted clutter
  } else {
    let newClub = await db.collection("clubs").add({
      name: data.name,
      active: data.active, //three attributes that are required in schema
      description: data.description
    });
    return "successful"; //in case wanted to do stuff after
  }
}

async function editClub(club_id, data) {
  let result = ClubSchema.validate(data, {
    //editClub assumes that frontend will always update a club by sending a request of ALL properties
    stripUnknown: true,
    abortEarly: false //allows multiple errors to be thrown in error response
  });
  if (result.error) {
    console.log("validation error:", result.error);
    throw Error(result.error.details.map(item => item.message).join(", ")); //joins errors, strips result.error of unwanted clutter
  }

  console.log("id here: " + club_id);

  const db = admin.firestore();

  club_data = await db
    .collection("clubs")
    .doc(club_id)
    .get()
    .then(async snapshot => {
      const new_data = snapshot.data(); //snapshot of data in club w/ club_id
      for (const key in new_data) {
        if (data[key] !== undefined) {
          new_data[key] = data[key];
        }
      }
      newClub = await db
        .collection("clubs")
        .doc(club_id)
        .update(new_data);
      return newClub;
    });
  return "successful";
}

async function getClub(club_id) {
  //gets single club
  const db = admin.firestore();
  const doc = await db
    .collection("clubs")
    .doc(club_id)
    .get();

  if (doc.exists) {
    //handling error iff ID does not exist..firestore doesnt catch doc not found error
    try {
      await doc.ref.get();
      return "successful";
    } catch (error) {
      return {
        error
      };
    }
  } else {
    return {
      error: "Id does not exist"
    };
  }
}

async function getAllClubs() {
  const db = admin.firestore();
  const clubData = await db.collection("clubs").get();
  let allClubs = []; //init list to store clubData
  clubData.forEach(club => {
    allClubs.push({ ...club.data(), id: club.id }); //place id into collection of club data
  });
  console.log(allClubs);
  return allClubs;
}

async function deleteClub(club_id) {
  const db = admin.firestore();
  const doc = await db
    .collection("clubs")
    .doc(club_id)
    .get();

  if (doc.exists) {
    //handling error iff ID does not exist..firestore doesnt catch doc not found error
    try {
      await doc.ref.delete();
      return "successful";
    } catch (error) {
      return {
        error
      };
    }
  } else {
    return {
      error: "Id does not exist"
    };
  }
}

module.exports.deleteClub = deleteClub;
module.exports.addClub = addClub;
module.exports.getAllClubs = getAllClubs;
module.exports.editClub = editClub;
module.exports.getClub = getClub;

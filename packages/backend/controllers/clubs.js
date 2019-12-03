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
    return({
      error : result.error.details.map(item => item.message).join(", ") //joins errors, strips result.error of unwanted clutter
    }) 
      
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
  // data = JSON.parse(data)
  console.log(data)
  for (const key in data) {
  
    if (!data[key]) {
      console.log({data : data[key], key: key})
      return {
        error: "Invalid club data"
      }
    }
  }

  console.log("id here: " + club_id);

  const db = admin.firestore();
  let result;
  await db
        .collection("clubs")
        .doc(club_id)
        .update(data)
        .then(() => {
          result = "successful";
          return;
        })
        .catch(e => {
          result = e.message;
          
          return;
        });

    return result;
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
      const club = await doc.ref.get();
      return club.data();
    } catch (error) {
      console.log({error})
      return null;
    }
  } else {
    return null;
  }
}

async function getAllClubs() {
  const db = admin.firestore();
  const clubData = await db.collection("clubs").get();
  let allClubs = []; //init list to store clubData
  clubData.forEach(club => {
    allClubs.push({ ...club.data(), id: club.id }); //place id into collection of club data
  });
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
        error : error.message
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

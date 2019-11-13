const admin = require('firebase-admin');
const { ClubSchema } = require('@clubhub/common/models');


async function addClub(data){
    console.log({body: data})
    let result = ClubSchema.validate(data, { stripUnknown: { objects: true } }) //strip removes unwanted attribute in club
    console.log(result);
    
    const db = admin.firestore();
    if (result.error){
        throw Error(result.error.details.messages)
    }else{
        let newClub =  await db.collection('clubs').add({
            name: data.name,
            active: data.active,    //three attributes that are required in schema
            description: data.description
        })
        return newClub; //in case wanted to do stuff after
    }
}

async function getAllClubs(){
    
    const db = admin.firestore();
    const clubData = await db.collection('clubs').get();
    let allClubs = []; //init list to store clubData
    clubData.forEach((club) =>{
        allClubs.push({...club.data(), id: club.id}); //place id into collection of club data
    });
    console.log(allClubs);
    return allClubs;
}


//module.export = addClub;
module.exports.addClub = addClub;
module.exports.getAllClubs = getAllClubs;

const express = require('express')

const router = express.Router()


const {clubControllers} = require('../../controllers');

const addClub = clubControllers.addClub;
const getAllClub = clubControllers.getAllClubs;


/* GET users listing. */
router.post('/', (req, res, next) => { // , async (req..) =>
    addClub(req.body).then((result)=>{
        res.send('Added Club');
        return true;
    }).catch((e)=>{
        console.log('There is an error:')
        console.log(e);
        console.log(e.message);
        res.send(e.message);
    });
    //res.send('respond with a resource')
    
})

router.get('/', (req, res, next) => {
    getAllClub().then((result)=>{
        res.send('Club received');
        return true;
    }).catch((e) =>{
        console.log({'error': e + e.message});
        res.send(e.message);
    });
})



module.exports = router

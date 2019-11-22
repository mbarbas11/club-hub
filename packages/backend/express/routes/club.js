const express = require("express");

const router = express.Router();

const { clubControllers } = require("../../controllers");

const addClub = clubControllers.addClub;
const getAllClub = clubControllers.getAllClubs;
const editClub = clubControllers.editClub;
const deleteClub = clubControllers.deleteClub;

router.put("/", (req, res) => {
  //addClub
  addClub(req.body)
    .then(result => {
      res.status(200).send("Club added");
      return true;
    })
    .catch(e => {
      console.log("error:", e, e.message);
      res.status(400).send({
        error: {
          message: e.message
        }
      });
    });
});

router.get("/", (req, res) => {
  //getAllClubs
  getAllClub()
    .then(result => {

      res.send(result);
      return;
    })
    .catch(e => {
      console.log("error:", e, e.message);
      res.status(400).send({
        error: {
          mesage: e.message
        }
      });
    });
});

router.post("/:id", (req, res) => {
  //editClub
  editClub(req.params.id, req.body)
    .then(result => {
      res.status(200).send("successful");
      return true;
    })
    .catch(e => {
      console.log("error:", e, e.message);
      res.status(400).send({
        error: {
          message: e.message
        }
      });
    });
});

router.delete("/:id", (req, res) => {
  //deleteClub
  deleteClub(req.params.id)
    .then(result => {
      res.status(200).send("Club Deleted");
      return true;
    })
    .catch(e => {
      console.log("error:", e, e.message);
      res.status(400).send({
        error: {
          message: e.message
        }
      });
    });
});

module.exports = router;

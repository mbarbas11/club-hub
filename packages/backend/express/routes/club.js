/* eslint-disable consistent-return */
const express = require("express");

const router = express.Router();

const { clubControllers } = require("../../controllers");

const addClub = clubControllers.addClub;
const getAllClub = clubControllers.getAllClubs;
const editClub = clubControllers.editClub;
const deleteClub = clubControllers.deleteClub;
const getClub = clubControllers.getClub;

router.post("/", (req, res) => {
  //addClub
  addClub(req.body)
    .then(result => {
      if (result === "successful") {
        res.send(result);
        return true;
      } else {
        return;
      }
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

router.get("/:id", (req, res) => {
  //gets SINGLE club
  //getClub
  getClub(req.params.id)
    .then(result => {
      console.log({expected: result})
      res.send(result);
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
  //ALL Clubs
  //getAllClubs
  getAllClub()
    .then(result => {
      res.send(result);
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

router.put("/:id", (req, res) => {
  //editClub
  editClub(req.params.id, req.body)
    .then(result => {
      if (result === "successful") {
        res.send(result);
        return true;
      } else {
        return;
      }
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
      if (result === "successful") {
        res.send(result);
        return true;
      } else {
        res.status(400).send({ error: { message: result } });
        console.log({ error: result });
        return;
      }
    })
    .catch(e => {
      console.log("error:", e, e.message);
      res.status(500).send({
        error: {
          message: "something wrong, contact developer"
        }
      });
    });
});

module.exports = router;

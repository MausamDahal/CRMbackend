const express = require("express");
const router = express.Router();
const {
  createInteraction,
  getAllInteraction,
  viewInteraction,
  deleteInteraction,
  editInteraction,
} = require("../controllers/Interaction.controllers");
const { verifyAccessToken } = require("../helpers/jwt_helper");

router.post("/", verifyAccessToken, createInteraction);
router.get("/all/:proId", verifyAccessToken, getAllInteraction);
router.get("/:proId/:interactionId", verifyAccessToken, viewInteraction);
router.delete("/:proId/:interactionId", verifyAccessToken, deleteInteraction);
router.put("/:proId/:interactionId", verifyAccessToken, editInteraction);
module.exports = router;
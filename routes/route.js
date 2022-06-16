const router = require("express").Router();
const { getEventById, deleteEvent, updateEvent, createEvent } = require("../middalware/middalware");



router.get("/events", getEventById);
router.post('/events', createEvent);
router.put('/events', updateEvent);
router.delete('/events', deleteEvent);



module.exports = router;
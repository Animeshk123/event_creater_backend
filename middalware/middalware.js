const { client } = require("../db/db");
const { v4: uuidv4 } = require('uuid');



const db = client.db();
const collection = db.collection("event");





const getEventById = async (req, res) => {
    try {
        let { id } = req.query;
        if (id === undefined) {
            getRecentEvents(req, res);
            return;
        }
        else {
            let data = await collection.findOne({ uid: id });
            if (data == null) {
                data = [];
            }
            res.send(data);

        }
    }
    catch (err) {
        res.status(500).send(err.message);
        console.log(err);
    }
}

const getRecentEvents = async (req, res) => {
    try {
        let { type, limit, page } = req.query;
        if (type === undefined && type === null && page === undefined) {
            res.status(403).send('bad request');
            return;
        }
        const start = (page - 1) * limit;
        const end = page * limit;
        const findResult = await collection.find({}).toArray();
        let nowArray = findResult.reverse().slice(start, end);
        res.json(nowArray);


    }
    catch (err) {
        res.status(500).send(err.message);
        console.log(err);
    }
}

const createEvent = async (req, res) => {
    try {


        const {
            type,
            tag,
            description,
            title,
            schedule
        } = req.body;

        const newpath = __dirname + "/../files/";
        const file = req.files.file;
        const filename = file.name;
        const file2 = req.files.file2;
        const file2name = file2.name;

        file.mv(`${newpath}${filename}`, (err) => {
            if (err) {
                res.status(500).json({ message: "File upload failed" });
                return;
            }
            file2.mv(`${newpath}${file2name}`, async (err) => {
                if (err) {
                    res.status(500).json({ message: "File upload failed" });
                    return;
                }

                let data = {
                    type: type,
                    uid: uuidv4(),
                    name: title,
                    tagline: tag,
                    coverImageUrl: `http://localhost:3030/${filename}`,
                    logoImageUrl: `http://localhost:3030/${file2name}`,
                    schedule: schedule,
                    description: description,
                    moderator: null,
                    category: null,
                    sub_category: null,
                    rigor_rank: null,
                    attendees: [],
                    createdAt: Date.now()
                }

                let savedData = await collection.insertOne(data);

                res.json({ message: `${type} created successfully` });

            })

        });





    }
    catch (err) {
        res.status(500).send(err.message);
        console.log(err);
    }

}

const updateEvent = async (req, res) => {
    try {
        const updateResult = await collection.updateOne({ uid: req.query.id }, { $set: { name: req.query.name } });
        res.json({ done: true, message: updateResult });
    }
    catch (err) {
        res.status(500).json({ done: false, error: err.message });
        console.log(err);
    }


}

const deleteEvent = async (req, res) => {
    try {
        const deleteResult = await collection.deleteMany({ uid: req.query.id });
        res.send({
            done: true, message: `deleted successfully`
        });
    }
    catch (err) {
        res.status(500).send({ done: false, error: err.message });
        console.log(err);
    }
}


module.exports = { getEventById, getRecentEvents, createEvent, updateEvent, deleteEvent };
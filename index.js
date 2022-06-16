const express = require("express"),
    app = express(),
    PORT = process.env.PORT || "3030",
    cors = require("cors"),
    bodyParser = require("body-parser"),
    { main } = require("./db/db"),
    router = require("./routes/route"),
    fileupload = require("express-fileupload");

app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v3/app", router);





main(() => {
    app.listen(PORT, () => {
        console.log(`our sever is up and runing on port ${PORT}`);
    })
})
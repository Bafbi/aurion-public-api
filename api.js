import express from "express";
import { getAllNote } from "./notes.js";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.route("/note")
    .get(async (req, res) => {
        let email, password;
        if (req.query.username && req.query.password) {
            email = req.query.username;
            password = req.query.password;
        } else if (req.headers.authorization) {
            // get basic auth info
            const auth = Buffer.from(
                req.headers.authorization.split(" ")[1],
                "base64"
            ).toString();
            [email, password] = auth.split(":");
        } else {
            res.status(401).send("No credentials provided");
            return;
        }
        const user = email.match(/^[^@]+/)[0];
        console.log(`fetching notes for ${user} | get request`);
        try {
            const notes = await getAllNote(email, password);
            res.json(notes);
        } catch (error) {
            console.log(error);
            res.status(402).send("Invalid credentials");
        }
    })
    .post(async (req, res) => {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(401).send("No credentials provided");
            return;
        }
        const user = username.match(/^[^@]+/)[0];
        console.log(`fetching notes for ${user} | post request`);
        try {
            const notes = await getAllNote(username, password);
            res.json(notes);
        } catch (error) {
            console.log(error);
            res.status(402).send("Invalid credentials");
        }
    });

app.listen(port, () => {
    console.log(`Aurion api listening on port ${port}`);
});

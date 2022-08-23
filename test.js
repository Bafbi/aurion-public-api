import * as dotenv from "dotenv";
import { getAllNote } from "./notes.js";

dotenv.config();
console.log(
    await getAllNote(process.env.AURION_USERNAME, process.env.AURION_PASSWORD)
);

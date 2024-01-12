import * as express from "express";
import * as functions from "firebase-functions";
import {onRequest} from "firebase-functions/v2/https";
import {createUser} from "./commands/create_user";
import {updateExpense} from "./commands/update_expense";
import {getExpenses} from "./commands/get_expense";


const expressApp = express();
expressApp.use(express.json({limit: "50mb"}));
// expressApp.use(require("cors")({origin: true}));

expressApp.post("/createUser", createUser);
expressApp.post("/updateExpense", updateExpense);
expressApp.get("/getExpense", getExpenses);

const api = onRequest({timeoutSeconds: functions.MAX_TIMEOUT_SECONDS, memory: "1GiB", region: ["asia-south1"]}, expressApp);

export {api};

import * as admin from "firebase-admin";

admin.initializeApp();

import {api} from "./api/on_request";

export const expenseTracker = api;

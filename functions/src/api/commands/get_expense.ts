import {Request, Response} from "express";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenseData = JSON.parse(req.body);

    const userExpenses = await admin.firestore().collection("users").doc(expenseData.userId).collection("expenses").where("status", "==", "active").get();

    const userExpenseData = userExpenses.docs.map((doc)=>{
      doc.data();
    });
    res.status(200).send({
      statusCode: 200,
      message: "ok",
      expenses: userExpenseData,
    });
  } catch (error: any) {
    functions.logger.error("fetch expense tracker data failed", error);
    res.status(500).send({
      message: "failed to fetch expenses of user",
    });
  }
};

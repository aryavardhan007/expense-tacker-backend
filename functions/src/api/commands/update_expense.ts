import {Request, Response} from "express";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const expenseData = JSON.parse(req.body);

    const userRef = admin.firestore().collection("users").doc(expenseData.userId).collection("expenses").doc();
    await userRef.create({
      createdAt: new Date(),
      expenseDate: expenseData.expenseDate,
      amount: expenseData.amount,
      category: expenseData.category,
      status: "active",
      currency: expenseData.currency,
    });

    res.status(200).send({
      statusCode: 200,
      message: "ok",
    });
  } catch (error: any) {
    functions.logger.error("update user expense failed", error);
    res.status(500).send({
      message: "failed to update expenses of user",
    });
  }
};

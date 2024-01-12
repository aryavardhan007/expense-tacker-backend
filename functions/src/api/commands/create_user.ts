import {Request, Response} from "express";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    functions.logger.log("calling creating user", userData);
    const isUserExist = await admin.firestore().collection("users").where("email", "==", userData.email).get();

    if (!isUserExist.empty) {
      functions.logger.log("user does not exist. creating user");
      res.status(200).send({
        statusCode: 200,
        message: "ok",
        userId: isUserExist.docs[0].id,
      });
    }

    const userRef = admin.firestore().collection("users").doc();
    await userRef.create({
      ...userData,
    });

    res.status(200).send({
      statusCode: 200,
      message: "ok",
      userId: userRef.id,
    });
  } catch (error: any) {
    functions.logger.error("Create expense tracker user failed", error);
    res.status(500).send({
      message: "failed to create user",
    });
  }
};

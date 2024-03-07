import * as admin from "firebase-admin";
import * as jwt from "jsonwebtoken";
import user from "../../models/UserModel";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { instanceMongo } from "../../dbs/MongoDB/instanceMongo";

dotenv.config();

interface AuthenticatedRequest extends Request {
  authUser?: any; // Adjust the type as neede d
}

const credential = {
  type: "service_account",
  project_id: "hellabooking-3abe3",
  private_key_id: "d99984a90fea021e1409526db78ea22e6b65b23e",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC68l8kpcWFKo2F\nhxFaj0BqUPjhKGnOUN+2+uaR5jj1mHPCIeojn061g7vDw7InbnME3Qv4GTTy8SZ0\nmJJwZO3NAVF+jRaKVIkEfseE9dLYermB6Vv8fGZCubwlHrrSQBKOlLWf6Tl2D/Wm\niVaJuELSuODSnW9t3u8ZZMof4QXpjNbO/pmlOup1xX9PwzyZD5OPwY6Adt/JygkS\nS4trNwicgbhLxodsU9dZQPC0+M6BIxYZavMKH/544qqyxziGsqVNMN/IUHtgOBlT\ngV9d+OWQ8FLAAz7qg1SVyrH1DDI6VvIHY2I9lE1QC9HuVv6k1gBFU5lW93pVbAWB\nClC5i1qBAgMBAAECggEAEloPp/fUA4YRXX3MYND2OFmZjPTcKiI7S+mmb8Uja0yb\ndH/CzdtqLRxw9r9DwmYvyVbvwVusHHs61LBTk8/8nibWeq9b+plg1/2gFXfSSmkF\nw/CGFKubmEpGY3h4S4J5r+B+UePhvarEaSRLR/q8KJZ4j4Rf92+ulhYUV3vOCkab\nkQ80vh+nFjyeRcNeWPx5XmCZaRjMe+bUP9Pklp5B3HaLud91lAtZXBT61yaaX41X\nGOuQpF0/jPV1JtYCKS8m4X6h5dVNZ01AVLaXwKCuzAFFhKgp2WOlcSNe4Ukthb3v\ntFKkrunHdeLJy6xDKr/aOCSnypaXeGrcMDdTtjiIZwKBgQDrRylSV+oq/hPNf+cY\nqiH10QMGVfBVWC26QeeCDvH7fByJi3oSKbUE4U4GM7DhzB3dGdmuxStGEfztsJqI\nV43ZMz/nLaRlqoQJxhf48vgRe9Lct6pyXgv41Yew7fiTXRLW3jSNyTE486LwTsiO\n/e4wFt25PVg5ELIeC0DRmrgU1wKBgQDLaXsofXeyFQCkFqnmH2bOwScnGzehb3gh\nlaH0sC08m/PEygAenRb6H61nKtDY0zGk5zBFmu4od5HfdNkQ6P+W5NvOYvSx/NMs\nLxankXHR7R8muwY7ILXgvlbb/scb1VlgfNTH8BnZEJOhXHcay7EzSG31niIWeNwu\nNO0NpwXIZwKBgQDrB79jnqcyI3YsxyRYIzyhjxXyck8PMnMbqVJXPg7FJoprbIWZ\nN0i5g0iqMWD1by41/OjUCercqIN9/fmhUbVF0Eh568JaPSiBiv3Plwfwjz1pd6Ax\nd3mGLejK+i5jJ4r2Uis1qFIfjmKqpEj9bvVN3MnJjlpfRypnkN5DhMd3KQKBgEKe\nkU95iDIy3rrfEVXlAu7EI+aS621b7KRTNW/GI4quKPBSmCdum4/fwBMB2tSolqHD\ndfPWAhoOzx+4TT9UkCEDY1n83tdMTn0yDuFiqTxvxLwSlL/YvriUni3/C4b6IQOQ\n3r98y3pkC3XVqsyD2c1J83l2CQQDIVmgy+KkySgRAoGATmad5+9TmTcO6iDIKhra\n0z2q4rXfJNklk3sTO6b9ihII2NfqWFHCFmTNYgUE7SfqBzURrBW87LeZFpOq7PSb\nDmkyZZ1QE8VIkZzOcYFkcO9RG/E2DFQai7Iv4iIPrwTSEn1m683fa47In3tMSOoc\npNzET2H0k9CODoIjJ79IOMI=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-zgdvo@hellabooking-3abe3.iam.gserviceaccount.com",
  client_id: "100830861487248434590",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zgdvo%40hellabooking-3abe3.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

admin.initializeApp({
  credential: admin.credential.cert(credential as admin.ServiceAccount),
});

export const verifyTokenGoogle = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authToken } = req.body;
    const authUser = await admin.auth().verifyIdToken(authToken);
    if (authUser) {
      req.authUser = authUser;
      console.log(req.authUser);

      next();
    } else {
      return res.status(401).send("Authenticate fail");
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send("Authenticate fail");
  }
};

export const CheckExistAccount = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    await instanceMongo();
    const { email } = req.authUser;
    const existAccountPromise = user.findOne({ email });
    existAccountPromise
      .then((existAccount) => {
        if (existAccount) {
          if (existAccount.status) {
            const token = jwt.sign(
              {
                userId: existAccount._id,
                email: existAccount.email,
                role: existAccount.roleId,
              },
              process.env.JWT_SECRET as string,
              { expiresIn: "24h" }
            );
            return res.status(200).send({
              msg: "Login Successful...!",
              email: existAccount.email,
              token,
              fullName: existAccount.fullName,
              _id: existAccount._id,
              roleId: existAccount.roleId,
              phone: existAccount.phone,
              gender: existAccount.gender,
            });
          }
        } else {
          const { name, email, phone, gender } = req.authUser;
          const account = new user({
            fullName: name,
            email: email,
            phone: phone,
            gender: gender,
          });
          account
            .save()
            .then((result: any) => {
              const token = jwt.sign(
                {
                  userId: result._id,
                  email: result.email,
                  roleId: result.roleId,
                },
                process.env.JWT_SECRET as string,
                { expiresIn: "24h" }
              );
              return res.status(201).send({
                email: result.email,
                token,
                fullName: result.fullName,
                _id: result._id,
                roleId: result.roleId,
                phone: result.phone,
                gender: result.gender,
                msg: "User Register Successfully",
              });
            })
            .catch((error:ErrorCallback) => {
              return res.status(500).send({ error });
            });
        }
      })
      .catch((result) => {
        console.log(result);
        return res.status(404).send("Authenticate fail");
      });
  } catch (error) {
    return res.status(401).send("Authenticate fail");
  }
};

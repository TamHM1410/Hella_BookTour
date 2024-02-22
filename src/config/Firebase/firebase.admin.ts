import admin from 'firebase-admin';
import { Request, Response,NextFunction } from "express";

interface AuthenticatedRequest extends Request {
    authUser?: any; // Adjust the type as needed
  }
const credential = {
    "type": "service_account",
    "project_id": "hellabooking-92fd1",
    "private_key_id": "c57edcfcd92eca26c2ce46b994c3c95fe428aed6",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDlktLi/vE6Y7Qd\n2WzkBGUQuD4F+Ujbfgu/vkiAZEi5CAAGBM0Ty9ZGSJcOykU7UlZFsuEwipugE+Sz\nCnjKbR6STFpcv4VFl5AxKEXiR0OfKafr/Fh0CTjmIavtrr4sRn0pq97HyxiXA5zS\nF0w6AB68O8XsxD40vXMGmov0farIVuu7NEt0QAq8BH14u+2Ho8kuwE/Rj2ZlGkco\n+xRM/10n/0aPLq638IlgMNK8PxAwWtbfvZ/jN23ngPNe5ZSox8aAEswjqnYf63f2\ndp6IKJ8VW+n542De+rzjGgKLcnhl0ELzRnGIclKl4JmvQvoSQM1vaB3oupF58dUC\nZX87RIfFAgMBAAECggEAMQYgiJ7ejpR6AyHKEgsqNd7SR95LA6wwABs3SkugB/tA\nXgiqbn7J3CpmL59cF2XmzG19jysaPp3g6abj0n5o1978MPApGopaHVU3TzHeq99u\nX4N8tBLAFsy79T6ql7PZyItOQKYLMzxvQaH+AijCZ3nwMzZY/lQyeweHuYcYcD1Q\nADYzeQ2Uip9ErJ5MlcVqDOGuonvB6WCOk/AhWPT2Vi3MqN+RfPpt6YENn9TMOvbu\nqvk9R/eY6jZWAtq7OoQOnApXwoBzFCfJ6/jbYH1Hw6B7D7D7jGt9dhAYLF6BJnyL\nkQxrI+xuYnCr6kk6GlrKzUvrmv2NI47PZfJFwODU5QKBgQD0+WUvWO85CDA6wKdZ\noDYKXBifyd1WLTll0lPeH7k762gn4wMX0yYpmeGqx0ywlnqWT2NHRxSc6ibxIKZz\numtqB8N7HmLe8f9kEeSRLvkAwU+RmGC5dypE1EZ8lnNwd+JjNc6gwAfQsnuN4FNu\nDMsOQScL8wBZI/isMUCxR+rxowKBgQDv5/szKyfjdeUjkcbjCPVZXmBIlZmCB7mE\nIWQ4Xs2+QTc8HFo6YTvz42BP1gZwXHKYzrHQo818NWT64tz9PQfP6RnHWyO+027P\nnL2sOn91oTf/CdW28lKQzBYC4nQqPu7OUKXRLdYKx3SpRM7xbEOo5itlSF5yC76I\nmYE48G5HdwKBgH7VHME9z2V8ytOwaTSrES+d7RXVwuXaNkx0b/2h+Rp/0AZOr4xH\nQwvo4wCzfQ40arWl1qXRtGdlh9Hx8JwcWX6lFF2LJu985Zhe9zL/2eW9MEAWX4XG\nn7jRGslob848E5cABcIOij1QG04iZa+lqf/wVZIHNxfv2tD0EyV2Mbr3AoGAMwhg\n+jiC6rLohFF9QkxkjJcz2hzgo7Vq9D16KTeZgpAy5LmPQ/3tF+tVUIZRplM0GWdW\nkfBWRMbC7U+W/NOfts16K1sq1mv5lXZdLqbe+DHMTJdV++2+PIj9Ya20UkxC1mZ3\nb3DVqENXgK5fayHBnssfjhL/7DitVjd5MpiKjO8CgYEAzwGXWM2jw07kbB4qgnsk\nZCtbyqBpvesmAjDMbMMRD18qMhvdJhrnuqVZNJ+X7Ib/CzsFSeVdiqHx1+/QPrIX\nsTAqS3tokibN5D2SgvBwMYSmegMnpiuEirkwf9uo58NxUt7imsqV2+VZQbrUVJeI\n84GBrW2qYEx3QmHJ8N5jwqY=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-x5eld@hellabooking-92fd1.iam.gserviceaccount.com",
    "client_id": "100761104045413869524",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x5eld%40hellabooking-92fd1.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};

admin.initializeApp({
    credential: admin.credential.cert(credential as admin.ServiceAccount)
});

export const verifyTokenGoogle = async (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
    try {
      const { authToken } = req.body;
      const authUser = await admin.auth().verifyIdToken(authToken);
      if (authUser) {
        req.authUser = authUser;
        next();
      } else {
        return res.status(401).send("Authenticate fail");
      }
    } catch (error) {
      return res.status(401).send("Authenticate fail");
    }
  };
import { cert, initializeApp, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccountKey from "../../serviceAccountKey.json";

export const app = initializeApp({
  credential: cert(serviceAccountKey as ServiceAccount),
});

export const firestore = getFirestore();

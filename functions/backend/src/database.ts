import { firebaseAdminApp } from "@/configs/firebaseConfig";
import { getFirestore } from "firebase-admin/firestore";

export function getDatabaseInstance() {
    return getFirestore(firebaseAdminApp);
}
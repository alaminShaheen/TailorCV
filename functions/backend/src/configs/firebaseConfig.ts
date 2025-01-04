import {
    APP_FIREBASE_API_KEY,
    APP_FIREBASE_APP_ID,
    APP_FIREBASE_AUTH_DOMAIN,
    APP_FIREBASE_MESSAGING_SENDER_ID,
    APP_FIREBASE_PROJECT_ID,
    APP_FIREBASE_SERVICE_AUTH_PROVIDER_X509_CERT_URL,
    APP_FIREBASE_SERVICE_AUTH_URI,
    APP_FIREBASE_SERVICE_CLIENT_EMAIL,
    APP_FIREBASE_SERVICE_CLIENT_ID,
    APP_FIREBASE_SERVICE_CLIENT_X509_CERT_URL,
    APP_FIREBASE_SERVICE_PRIVATE_KEY,
    APP_FIREBASE_SERVICE_PRIVATE_KEY_ID,
    APP_FIREBASE_SERVICE_TOKEN_URI,
    APP_FIREBASE_SERVICE_TYPE,
    APP_FIREBASE_SERVICE_UNIVERSE_DOMAIN,
    APP_FIREBASE_STORAGE_BUCKET
} from "@/configs/config";
import { cert, initializeApp as initializeAdminApp } from "firebase-admin/app";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: APP_FIREBASE_API_KEY,
    authDomain: APP_FIREBASE_AUTH_DOMAIN,
    projectId: APP_FIREBASE_PROJECT_ID,
    storageBucket: APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: APP_FIREBASE_APP_ID
};

const firebaseServiceConfig = {
    type: APP_FIREBASE_SERVICE_TYPE,
    projectId: APP_FIREBASE_PROJECT_ID,
    private_key_id: APP_FIREBASE_SERVICE_PRIVATE_KEY_ID,
    private_key: APP_FIREBASE_SERVICE_PRIVATE_KEY,
    client_email: APP_FIREBASE_SERVICE_CLIENT_EMAIL,
    client_id: APP_FIREBASE_SERVICE_CLIENT_ID,
    auth_uri: APP_FIREBASE_SERVICE_AUTH_URI,
    token_uri: APP_FIREBASE_SERVICE_TOKEN_URI,
    auth_provider_x509_cert_url: APP_FIREBASE_SERVICE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: APP_FIREBASE_SERVICE_CLIENT_X509_CERT_URL,
    universe_domain: APP_FIREBASE_SERVICE_UNIVERSE_DOMAIN
};


export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAdminApp = initializeAdminApp({ credential: cert(firebaseServiceConfig) });

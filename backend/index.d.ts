import User from "firebase/auth";


declare global {
    namespace Express {
        interface Request {
            userInfo: User
        }
    }
}

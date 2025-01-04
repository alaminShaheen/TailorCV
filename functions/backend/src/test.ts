import "module-alias/register";
import { getDatabaseInstance } from "./database";
import { DATABASE_CONSTANTS } from "@/constants/databaseConstants";
import { CollectionReference } from "firebase-admin/lib/firestore";
import { User } from "@/models/User";
import { QueryDocumentSnapshot } from "firebase-admin/firestore";
import { faker } from "@faker-js/faker";
import { FirebaseDbUser } from "@/models/FirebaseDbUser";

// Firestore data converter
const userConverter = {
    toFirestore: function(user: User) {
        return Object.assign({}, user);
    },
    fromFirestore: function(snapshot: QueryDocumentSnapshot) {
        const data = snapshot.data() as FirebaseDbUser;
        return new User({ ...data, createdAt: data.createdAt.toDate() });
    }
};

const databaseInstance = getDatabaseInstance();
const usersTable = databaseInstance.collection(DATABASE_CONSTANTS.USERS_TABLE).withConverter(userConverter) as CollectionReference<User, FirebaseDbUser>;


async function createUser() {
    try {
        const result = await usersTable.add(new User({
            email: faker.internet.email(),
            lastname: faker.person.lastName(),
            firstname: faker.person.firstName()
        }));
        const addedUser = await result.get();
        if (addedUser.data()) {
            console.log(addedUser.data());
        }
    } catch (e) {
        console.log(e);
    }
}

async function getUsers() {
    try {
        const usersSnapshot = await usersTable.withConverter(userConverter).get();
        const users: User[] = [];
        if (!usersSnapshot.empty) {
            usersSnapshot.forEach((user) => {
                const userData = user.data();
                users.push(new User(userData));
            });
        }
    } catch (e) {
        console.log(e);
    }
}

async function getUser(id: string) {
    try {
        const userSnapshot = await usersTable.where("id", "==", id).get();
        let user: User | null = null;
        if (!userSnapshot.empty) {
            userSnapshot.forEach((userData) => {
                user = userData.data();
            });
        }
        console.log(user);
    } catch (e) {
        console.log(e);
    }
}

// void createUser();
// void getUsers();
void getUser("c870d599-5b70-40d2-928b-10be5f9a10bf");
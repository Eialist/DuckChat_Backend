import { fetchCollection } from "../mongodb/chatMongoClient.js";

export function saveUser(user) {
    const data = {
        username: user.username,
        password: user.password,
        role: user.role,
    };
    return fetchCollection("user").insertOne(data);
}

export function fetchUser(username, password) {
    return fetchCollection("user").findOne({ username: username, password: password });
}
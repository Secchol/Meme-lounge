import { get } from "./api.js";

export function getUserData() {
    const user = sessionStorage.getItem("userData");
    return JSON.parse(user);
}

export function setUserData(data) {
    sessionStorage.setItem("userData", JSON.stringify(data));
}
export function clearUserData() {
    sessionStorage.removeItem("userData");
}

export function createSubmitHandler(callback) {
    return function (event) {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        return callback(data);
    }
}

export function getById(id) {
    return get("/data/memes/" + id);
}
import { get, post } from "./api.js";
import { clearUserData, setUserData } from "./util.js";

export async function login(email, password) {
    const data = await post("/users/login", { email, password });
    setUserData(data);
}
export async function register(username, email, password, gender) {
    const data = await post("/users/register", { username, email, password, gender });
    setUserData(data);
}
export async function logout() {
    get("/users/logout");
    clearUserData();


}
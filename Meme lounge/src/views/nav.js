import { html, page, render } from "../lib.js";
import { logout } from "../user.js";
import { getUserData } from "../util.js";

const header = document.querySelector("nav");
const navTemplate = (hasUser) => html`
    <a href="/memes">All Memes</a>
    
    
    ${hasUser ? html`<div class="user">
        <a href="/create">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${hasUser.email}</span>
            <a href="/profile">My Profile</a>
            <a @click=${onLogout} href="javascript:void(0)">Logout</a>
        </div>
    </div>`: html`<div class="guest">
        <div class="profile">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
        <a class="active" href="/">Home Page</a>
    </div>`}
    <!-- Logged users -->
`;


export function updateNav() {
    const hasUser = getUserData();
    render(navTemplate(hasUser), header)
}

function onLogout() {
    logout();
    updateNav();
    page.redirect("/");

}


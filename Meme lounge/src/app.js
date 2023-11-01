import { render } from "./lib.js";
import { page } from "./lib.js";
import { getUserData } from "./util.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showHome } from "./views/home.js";
import { showLogin } from "./views/login.js";
import { showMemes } from "./views/memes.js";
import { updateNav } from "./views/nav.js";
import { showProfile } from "./views/profie.js";
import { showRegister } from "./views/register.js";





const main = document.querySelector("main");

page(decorateContext);
page("/", showHome);
page("/memes", showMemes);
page("/memes/:id", showDetails);
page("/edit/:id", showEdit);
page("/login", showLogin);
page("/register", showRegister);
page("/create", showCreate);
page("/profile", showProfile);
updateNav();
page.start();

function decorateContext(ctx, next) {
    ctx.render = renderMain;
    const user = getUserData();
    if (user) {
        ctx.user = user;
    }

    next();
}

function renderMain(content) {
    render(content, main);
}


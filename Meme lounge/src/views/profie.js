import { get } from "../api.js";
import { html } from "../lib.js"


const male = "/images/male.png";
const female = "/images/female.png";
const memeTemplate = (meme) => html`<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/memes/${meme._id}">Details</a>
</div>`;
const profileTemplate = (user, memes) => html`<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src=${user.gender=="male"? male : female}>
        <div class="user-content">
            <p>Username: ${user.username}</p>
            <p>Email: ${user.email}</p>
            <p>My memes count: ${memes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">


        ${memes.length == 0 ? html`<p class="no-memes">No memes in database.</p>` : memes.map(memeTemplate)}
    </div>
</section>`;


export async function showProfile(ctx) {
    const user = ctx.user;
    const memes = await get(`/data/memes?where=_ownerId%3D%22${user._id}%22&sortBy=_createdOn%20desc`);

    ctx.render(profileTemplate(user, memes));
}


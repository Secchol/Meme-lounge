import { get } from "../api.js";
import { html } from "../lib.js"

const memeTemplate = (meme) => html`<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
        </div>
        <div id="data-buttons">
            <a class="button" href="/memes/${meme._id}">Details</a>
        </div>
    </div>
</div>`;
const memesTemplate = (memes) => html`<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        <!-- Display : All memes in database ( If any ) -->
        ${memes.length == 0 ? html`<p class="no-memes">No memes in database.</p>` : memes.map(memeTemplate)}

        <!-- Display : If there are no memes in database -->

    </div>
</section>`;

export async function showMemes(ctx) {
    const memes = await get("/data/memes?sortBy=_createdOn%20desc");
    ctx.render(memesTemplate(memes));


}
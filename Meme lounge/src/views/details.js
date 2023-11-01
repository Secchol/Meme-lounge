import { del } from "../api.js";
import { html, nothing } from "../lib.js"
import { getById } from "../util.js";


const detailsTemplate = (meme, isOwner, onDelete) => html`<section id="meme-details">
    <h1>Meme Title: ${meme.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src=${meme.imageUrl}>
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>
                ${meme.description}
            </p>
            ${isOwner ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
            <button @click=${onDelete} class="button danger">Delete</button>` : nothing}
            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->


        </div>
    </div>
</section>`;


export async function showDetails(ctx) {
    const meme = await getById(ctx.params.id);
    let isOwner;
    if (ctx.user && ctx.user._id == meme._ownerId)
        isOwner = true;
    else
        isOwner = false;
    ctx.render(detailsTemplate(meme, isOwner, onDelete));


    async function onDelete(event) {
        const choice = confirm("Are you sure?");
        if (choice) {
            await del(`/data/memes/${meme._id}`);
            ctx.page.redirect("/memes");
        }
    }
}
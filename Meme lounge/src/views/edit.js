import { put } from "../api.js";
import { html } from "../lib.js"
import { createSubmitHandler, getById } from "../util.js";




const editTemplate = (onEdit, game) => html`<section id="edit-meme">
    <form @submit=${onEdit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${game.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description">
                ${game.description}
            </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${game.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`;


export async function showEdit(ctx) {

    const game = await getById(ctx.params.id);

    ctx.render(editTemplate(createSubmitHandler(onEdit), game));


    async function onEdit({ title, description, imageUrl }) {
        if ([title, description, imageUrl].some(x => x == "")) {
            return alert("All fields are required!");
        }
        await put("/data/memes/" + ctx.params.id, { title, description, imageUrl });
        ctx.page.redirect("/memes");
    }
}




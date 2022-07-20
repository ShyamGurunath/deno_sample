// an api
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import {oakCors} from "https://deno.land/x/cors/mod.ts";

const books = new Map<string, any>();
books.set("1", {
    id: "1",
    title: "The Hound of the Baskervilles",
    author: "Conan Doyle, Arthur",
});
books.set("2", {
    id: "2",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
});
books.set("3", {
    id: "3",
    title: "The Count of Monte Cristo",
    author: "Alexandre Dumas",
});

const router = new Router();
router
    .get("/", (context) => {
        context.response.body = "Hello world!";
    })
    .get("/book", (context) => {
        context.response.body = Array.from(books.values());
    })
    .get("/book/:id", (context) => {
        if (books.has(context?.params?.id)) {
            context.response.body = books.get(context.params.id);
        }
    })
    .post("/book", async (context) => {
        const book = await  context.request.body().value;
        books.set((Math.floor(Math.random() * 100) + 1).toString(),{ id: book["id"], title: book["title"], author: book["author"] });
        context.response.body = book;
    });

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
console.log("Server running on http://localhost:8000");
await app.listen({ port: 8000 });



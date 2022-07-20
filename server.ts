// an api
import { opine } from "./deps.ts";
import { bcrypt } from "./deps.ts";

const app = opine();

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/:password", async function (req, res) {
    const hash = await bcrypt.hash(req.params.password);
    res.send("Your hash is for: " + req.params.password + "-" + hash);
});

app.listen(
    3000,
    () => console.log("server has started on http://localhost:3000 🚀"),
);


const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const port = process.env.PORT || 5152;


const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
const bootstrapPath = path.join(
    __dirname,
    "../node_modules/bootstrap/dist/css"
);
const jsPath = path.join(__dirname, "../node_modules/bootstrap/dist/js");
const jqueryPath = path.join(__dirname, "../node_modules/jquery/dist");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/jq", express.static(jqueryPath));
app.use("/style", express.static(bootstrapPath));
app.use("/js", express.static(jsPath));
app.use(express.static(staticPath));
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
    res.render("index");
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

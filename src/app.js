const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const port = process.env.PORT || 5152;
require("./db/conn.js");
const POST = require("./model/post");


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
    res.render("login");
});



app.get("/register", (req, res) => {
    res.render("register");
});


app.post("/register", async (req, res) => {
    try {
        const registerStudent = new POST({
            user: req.body.user,
            post: req.body.post,
            password: req.body.password,
        });

        const registered = await registerStudent.save();
        res.status(201).render("home");
    } catch (error) {
        console.log(error);
        res.status(404).render("error");
    }
});
app.post("/login", async (req, res) => {
    try {
        const user = req.body.user;
        const post = req.body.post;
        const password = req.body.password;

        const userEnroll = await POST.findOne({ user: user });


        if (userEnroll.post === post && userEnroll.password === password) {
            res.status(201).render("adminHome");
        }
        else if (userEnroll.post === post && userEnroll.password === password) {
            res.status(201).render("home");
        }
        else {
            res.status(404).render("error", {
                errorMessage: "Password or email do not match with the database",
            });
        }
    } catch (error) {
        res.status(404).render("error");
        console.log(error);
    }
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

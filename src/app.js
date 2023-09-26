const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const port = process.env.PORT || 5152;
require("./db/conn.js");
const POST = require("./model/post");
const RegisterStudent = require("./model/student.js")
const RegisterCollege = require("./model/college.js");

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


app.get("/adminHome", (req, res) => {
    res.render("adminHome");
})


app.get("/adminStudent", (req, res) => {
    res.render("adminStudent");
})
app.post("/adminStudent", async (req, res) => {
    try {
        const registerStudent = new RegisterStudent({
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            gender: req.body.gender,
            enroll: req.body.enroll,
            email: req.body.email,
            semester: req.body.semester,
            password: req.body.password,
            collegecode: req.body.collegecode

        });

        const registered = await registerStudent.save();
        res.status(201).render("adminHome");
    } catch (error) {
        console.log(error);
        res.status(404).render("error", {
            errorMessage: "Sorry, Looks like something is Wrong",
        });
    }
})

app.get("/adminUniversity", (req, res) => {
    res.render("adminUniversity");
})

app.get("/adminFaculty", (req, res) => {
    res.render("adminFaculty");
})
app.get("/adminCollege", (req, res) => {
    res.render("adminCollege");
})
app.post("/adminCollege", async (req, res) => {
    try {
        const registerCollege = new RegisterCollege({
            collegename: req.body.collegename,
            collegecode: req.body.collegecode,
            email: req.body.email,
            universitycode: req.body.universitycode,
            address: req.body.address

        });

        const registered = await registerCollege.save();
        res.status(201).render("adminHome");
    } catch (error) {
        console.log(error);
        res.status(404).render("error", {
            errorMessage: "Sorry, Looks like something is Wrong",
        });
    }
})


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
                errorMessage: "Post does not match with entered user id",
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

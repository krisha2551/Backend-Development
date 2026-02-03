import express from "express";

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let StudentList = [
    { id: 1, name: "jordan" },
    { id: 2, name: "smith" }
];

// SHOW STUDENT LIST
app.get("/", (req, res) => {
    res.render("index", { students: StudentList });
});

// SHOW ADD PAGE
app.get("/add", (req, res) => {
    res.render("add");
});

// ADD STUDENT
app.post("/add-student", (req, res) => {
    const { name } = req.body;

    StudentList.push({
        id: StudentList.length + 1,
        name
    });

    res.redirect("/");
});

// SHOW EDIT PAGE
app.get("/edit/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const student = StudentList.find(s => s.id === id);

    res.render("edit", { student });
});

// UPDATE STUDENT
app.post("/edit-student/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    StudentList = StudentList.map(student =>
        student.id === id ? { ...student, name } : student
    );

    res.redirect("/");
});

// DELETE STUDENT
app.get("/delete/:id", (req, res) => {
    const id = parseInt(req.params.id);
    StudentList = StudentList.filter(student => student.id !== id);

    res.redirect("/");
});

const port = 5000;
app.listen(port, () => {
    console.log("Server running on port", port);
});

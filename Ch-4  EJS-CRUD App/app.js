import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const app = express();

// EJS setup
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// __dirname fix for ES modules
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

// Static files
app.use(express.static(path.join(__dirName, "public")));

// Dummy data
let studentList = [
  { id: 1, name: "Jordan" },
  { id: 2, name: "Alice" },
];

// Home – Show students
app.get("/", (req, res) => {
  res.render("index", { studentList });
});

// Add page
app.get("/add", (req, res) => {
  res.render("add");
});

// Add student
app.post("/add", (req, res) => {
  const { name } = req.body;

  studentList.push({
    id: Date.now(),
    name,
  });

  res.redirect("/");
});

// Edit page
app.get("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = studentList.find((s) => s.id === id);

  if (!student) return res.status(404).send("Student not found");

  res.render("edit", { student });
});

// Update student
app.post("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const student = studentList.find((s) => s.id === id);

  if (!student) return res.status(404).send("Student not found");

  student.name = req.body.name;
  res.redirect("/");
});

// Delete student
app.get("/delete/:id", (req, res) => {
  const id = Number(req.params.id);
  studentList = studentList.filter((s) => s.id !== id);
  res.redirect("/");
});

// Server
const port = 5000;
app.listen(port, () => {
   console.log("server running on ", port);
});

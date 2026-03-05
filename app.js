const express = require("express");

const app = express();

const { products, people } = require("./data");

// app.use(express.static("./public"));
app.use(express.static("./methods_public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send('<h1>Home Page</h1><a href="/api/products">Products</a>');
  //   res.json(products);
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, price } = product;
    return { id, name, price };
  });
  res.json(newProducts);
});

app.get("/api/people", (req, res) => {
  res.status(200).json({ data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400).send("Please enter name");
  }
  res.status(201).json({ person: name });
});

app.put("/api/people/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const person = people.find((pe) => pe.id === Number(id));
  // console.log(id, index);
  if (!name) {
    res.status(400).send("Please enter name");
    return;
  }
  if (person) {
    res.status(404).send(`User with id=${id} does't exists`);
    return;
  }
  const newList = people.map((pe) => {
    if (pe.id === Number(id)) {
      pe.name = name;
    }
    return pe;
  });
  res.status(200).json(newList);
});

app.delete("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const person = people.find((pe) => pe.id === Number(id));

  if (!person) {
    res.status(404).send(`User with id=${id} does't exists`);
    return;
  }
  const newPeople = people.filter((pe) => pe.id !== Number(id));
  res.send({ success: true, data: newPeople });
});

app.post("/login", (req, res) => {
  const { name } = req.body;
  // console.log(req, name);
  res.status(201).json({ name });
});

// app.get("/", (req, res) => {
//   console.log(req);
//   res.status(200).send("<h1>Home page</h1>");
// });

app.get("/about", (req, res) => {
  //   console.log(req);
  res.status(200).send("<h1>About page</h1>");
});

app.all("*", (req, res) => {
  // console.log(req);
  res.status(404).send("<h1>Resourse not found</h1>");
});

app.listen(5000, () => {
  console.log("Listening to port 5000 !!!");
});

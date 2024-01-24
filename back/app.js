import express from "express";
import cors from "cors";

const MOCK_DATA = [
  {
    id: 1,
    name: "iPhone 7",
    description: "This is iPhone 7",
    color: "black",
    price: 700,
    image: "https://cdn2.gsmarena.com/vv/pics/apple/apple-iphone-7-1.jpg",
  },
  {
    id: 2,
    name: "Samsung Galaxy S7",
    description: "This is Samsung Galaxy S7",
    color: "black",
    price: 670,
    image: "https://cdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s7-1.jpg",
  },
];

const app = express();

app.use(express.json());

app.use(cors());

app.get("/phones", (req, res) => {
  res.json(MOCK_DATA);
});

app.get("/phones/:id", (req, res) => {
  const { id } = req.params;
  const phone = MOCK_DATA.find((phone) => phone.id === Number(id));
  res.json(phone);
});

app.post("/phones", (req, res) => {
  const data = req.body;
  const newPhone = {
    id: MOCK_DATA.length + 1,
    ...data,
  };
  MOCK_DATA.push(newPhone);
  res.status(201);
  res.json(newPhone);
});

app.patch("/phones/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const phone = MOCK_DATA.find((phone) => phone.id === Number(id));
  const index = MOCK_DATA.indexOf(phone);
  const updatedPhone = { ...phone, ...data };
  MOCK_DATA[index] = updatedPhone;
  res.json(updatedPhone);
});

app.delete("/phones/:id", (req, res) => {
  const { id } = req.params;
  const phone = MOCK_DATA.find((phone) => phone.id === Number(id));
  const index = MOCK_DATA.indexOf(phone);
  MOCK_DATA.splice(index, 1);
  res.status(204);
  res.json({});
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

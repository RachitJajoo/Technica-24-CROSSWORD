const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Marks = require("./model/marks");
const cors = require("cors");
require("dotenv").config();
mongoose
  .connect(
    `mongodb+srv://ddchandratre:${process.env.MONGOKEY}@crossword.dbl62yd.mongodb.net/`
  )
  .then(() => {
    console.log("Connected!");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(cors());
app.use(express.json());

app.post("/api/upload", async (req, res, next) => {
  try {
    const { name, teamname, regno, marks } = req.body;

    const user = await Marks.findOne({ regno });
    if (user)
      return res.json({
        status: false,
        msg: "You can only submit the form once.",
      });
    const data = await Marks.create({
      name: name,
      teamname: teamname,
      regno: regno,
      points: marks,
      time: new Date(),
    });
    return res.json({ status: true });
  } catch (error) {
    next(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`LISTENING TO PORT ${process.env.PORT}`);
});

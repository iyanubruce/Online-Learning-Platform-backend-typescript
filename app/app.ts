import express from "express";

const app = express();

const PORT = 3000;

export default function start() {
  app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
  });
}

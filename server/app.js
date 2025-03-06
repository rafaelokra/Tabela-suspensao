const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Usando CORS para permitir requisições de origens diferentes
app.use(cors());

// Dados de exemplo (modelos de motos e quantidades de óleo para cada lado)
const motorcycles = {
  "pop 100": { quantity: 60 },
  "cb 300": { quantity: 320 },
  "xre 300": { quantity: 550 },
  "biz 100": { quantity: 60.5 },
  "biz 125": { quantity: 60.5 },
  "cb 400": { quantity: "137 ~ 143" },
  "cb 450": { quantity: "137 ~ 143" },
  "cb 500": { quantity: 320 },
  "cb 500f": { quantity: 430 },
  "cb 500x": { quantity: 438 },
  "cb 600f - hornet": { quantity: 494 },
  "cb 650f": { quantity: 489 },
  "cb 1000r": { quantity: 509 },
  "cbr 1000rr": { quantity: 517 },
  "cbr 1000 fireblade": { quantity: 488 },
  "cbr 1100xx": { quantity: 483 },
  "cbr 600f": { quantity: 462 },
  "cbr 600rr": { quantity: 413 },
  "cbr 650f": { quantity: 489 },
  "cg 125": { quantity: 75 },
  "cg 150": { quantity: 141 },
  "cg 160": { quantity: 128 },
  "crf 230f": { quantity: 380 },
  "elite 125": { quantity: 80 },
  "goldwing 1800": { quantity: 494 },
  "lead 110": { quantity: 52 },
  "nc 700/750": { quantity: 428 },
  "nx 150": { quantity: 171 },
  "nx 200": { quantity: 312 },
  "nx 350 sahara": { quantity: 435 },
  "nx 400 falcon": { quantity: 529 },
  "nxr 125 bros": { quantity: 171 },
  "nxr 150 bros": { quantity: 171 },
  "pcx 150": { quantity: 80 },
  "sh 150i": { quantity: 73 },
  "titan 150": { quantity: 141.5 },
  "titan 160": { quantity: 150 - 250 },
  "transalp 700": { quantity: 428 },
  "varadero 1000": { quantity: 529 },
  "vario 150": { quantity: 73 },
  "cbx 150 aero": { quantity: 130 },
  "cbx 200 strada": { quantity: 128 },
  "cbx 250 twister": { quantity: 296 },
  "kawasaki ninja 250r": { quantity: 385 },
  "kawasaki ninja 300": { quantity: 385 },
  "kawasaki ninja 400": { quantity: 385 },
  "kawasaki ninja zx-6r": { quantity: 490 },
  "kawasaki ninja zx-10r": { quantity: 430 },
  "kawasaki z750": { quantity: 430 },
  "kawasaki z800": { quantity: 430 },
  "kawasaki z900": { quantity: 430 },
  "kawasaki z1000": { quantity: 430 },
  "ktm duke 200": { quantity: 380 },
  "ktm duke 390": { quantity: 380 },
  "ktm rc 200": { quantity: 380 },
  "ktm rc 390": { quantity: 380 },
  "yamaha factor 125i": { quantity: 73 },
  "yamaha fazer 250": { quantity: 387 },
  "yamaha fazer 600": { quantity: 430 },
  "yamaha mt-03": { quantity: 387 },
  "yamaha mt-07": { quantity: 430 },
  "yamaha mt-09": { quantity: 510 },
  "yamaha mt-09 tracer": { quantity: 510 },
  "yamaha mt-10": { quantity: 510 },
  "yamaha neo 125": { quantity: 73 },
  "yamaha nmax 160": { quantity: 73 },
  "yamaha r3": { quantity: 387 },
  "yamaha r6": { quantity: 430 },
  "yamaha r1": { quantity: 510 },
  "yamaha xmax 250": { quantity: 73 },
  "yamaha xtz 250 lander": { quantity: 387 },
  "yamaha xtz 250 tenere": { quantity: 387 },
  "bmw f 800 gs": { quantity: 500 },
  "bmw f 800 r": { quantity: 500 },
  "bmw f 800 s": { quantity: 500 },
  "bmw f 800 st": { quantity: 500 },
  "bmw f 800 gt": { quantity: 500 },
  "bmw s 1000 rr": { quantity: 500 },
  "bmw s 1000 r": { quantity: 500 },
  "bmw s 1000 xr": { quantity: 500 },
  "bmw r 1200 gs": { quantity: 500 },
  "bmw r 1200 r": { quantity: 500 },
  "bmw r 1200 rs": { quantity: 500 },
  "bmw r 1200 rt": { quantity: 500 },
  "bmw r 1200 gs adventure": { quantity: 500 },
  "bmw r 1250 gs": { quantity: 500 },
  "bmw r 1250 r": { quantity: 500 },
  "bmw r 1250 rs": { quantity: 500 },
  "bmw r 1250 rt": { quantity: 500 },
  "bmw r 1250 gs adventure": { quantity: 500 },
  "suzuki burgman 400": { quantity: 500 },
  "suzuki dl 650 v-strom": { quantity: 500 },
  "suzuki dl 1000 v-strom": { quantity: 500 },
  "suzuki gsx-r 750": { quantity: 500 },
  "suzuki gsx-r 1000": { quantity: 500 },
  "suzuki gsx-s 750": { quantity: 500 },
  "suzuki gsx-s 1000": { quantity: 500 },
  "suzuki hayabusa 1300": { quantity: 500 },
  "suzuki intruder 125": { quantity: 500 },
  "suzuki intruder 250": { quantity: 500 },
  "suzuki intruder 800": { quantity: 500 },
  "suzuki intruder 1500": { quantity: 500 },
  "suzuki yes 125": { quantity: 500 },
  "dafra kansas 150": { quantity: 160 },
  "dafra kansas 250": { quantity: 150 },
  "dafra laser 10": { quantity: 550 }, // 550 ml para cada lado
};

// Endpoint para buscar a quantidade de óleo de uma moto
app.get("/api/motorcycles/find/:model", (req, res) => {
  const model = req.params.model.toLowerCase();
  const oilQuantity = motorcycles[model];

  if (oilQuantity) {
    return res.json({
      model: req.params.model,
      oilQuantity: `${oilQuantity.quantity} `, // Adiciona "cada lado"
    });
  } else {
    return res.status(404).json({ message: "Modelo não encontrado" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta http://localhost:${port}`);
});

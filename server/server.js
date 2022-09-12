import fetch from "node-fetch";
import express from "express";
import * as dotenv from "dotenv";
import Stripe from "stripe";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

// require("dotenv").config();

const app = express();
app.use(express.json());
// app.use(express.static("public"));
app.use(express.static(path.resolve(__dirname, "../build")));

const createStripeSession = async (items) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: items,
    success_url: "http://localhost:3000/",
    cancel_url: "http://localhost:3000/",
  });

  return session;
};

// app.set("public", path.join(__dirname, "public"));
// const getFirebaseData = async () => {
//   const fetchApi = await fetch(
//     "https://food-order-18bb0-default-rtdb.europe-west1.firebasedatabase.app/orders.json"
//   );
//   const data = await fetchApi.json();
//   const dataKeys = Object.keys(data);
//   const retrievedData = data[dataKeys[0]];
//   const storeItems = new Map();
//   retrievedData.forEach((item) => {
//     storeItems.set(item.id, {
//       priceInCents: (item.price * 100).toFixed(0),
//       name: item.name,
//       amount: item.amount,
//     });
//   });
//   return storeItems;
// };

// getFirebaseData();

app.post("/create-checkout-session", async (req, res) => {
  try {
    // const storeItems = await getFirebaseData();

    const lineItems = req.body.map((item) => {
      // const storeItem = storeItems.get(item.id);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: parseInt((item.price * 100).toFixed(0)),
        },
        quantity: item.amount,
      };
    });

    // const session = await stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   mode: "payment",
    //   line_items: lineItems,
    //   success_url: "http://localhost:3000/",
    //   cancel_url: "http://localhost:3000/cancel",
    // });
    const session = await createStripeSession(lineItems);

    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});

import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import path from "path";
import Stripe from "stripe";

if (path.basename(process.cwd()) === "client") {
  dotenv.config({ path: "../server/.env" });
} else {
  dotenv.config();
}
const stripe = new Stripe(process.env.SECRET_KEY ?? "");
const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(cors());

app.use(express.json());

app.get("/key", (req: Request, res: Response): void => {
  res.status(200).send({
    publishableKey: process.env.PUBLISHABLE_KEY,
  });
});

app.post(
  "/create-payment-intent",
  async (
    req: Request<unknown, unknown, { amount: number }>,
    res: Response,
  ): Promise<void> => {
    const amount = req.body.amount ? req.body.amount * 100 : 0;
    const currency = "usd";

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        automatic_payment_methods: { enabled: true },
        currency,
      });

      res.status(201).send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      let message = "error";
      if (typeof e === "string") {
        message = e;
      } else if (e instanceof Error) {
        message = e.message;
      }

      res.status(400).send({ error: { message } });
    }
  },
);

app.listen(PORT, (): void => {
  console.log(`Cozy Threads node server listening on port ${String(PORT)}!`);
});

import dotenv from "dotenv";
import stripe from "stripe";
import supertest from "supertest";

dotenv.config();
const apiUrl = "http://localhost:8080";
const stripeSecretKey = process.env.SECRET_KEY ?? "";
const stripeClient = new stripe(stripeSecretKey);

interface ClientSecretResponse {
  clientSecret: string;
}

interface KeyResponse {
  publishableKey: string;
}

describe("Payment Element Integration Tests", () => {
  test("served config as expected", async () => {
    const response = await supertest(apiUrl).get("/key");
    expect(response.status).toBe(200);

    const body = response.body as KeyResponse;
    expect(body).toHaveProperty("publishableKey");
    expect(body.publishableKey).toMatch(/^pk_test/);
  });

  test("Creates a payment intent", async () => {
    const response = await supertest(apiUrl)
      .post("/create-payment-intent")
      .send({ amount: 1000 });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("clientSecret");

    const body = response.body as ClientSecretResponse;
    const clientSecret = body.clientSecret;
    const pi_id = clientSecret.split("_secret")[0];

    const paymentIntent = await stripeClient.paymentIntents.retrieve(pi_id);

    expect(paymentIntent.payment_method_types.length).toBeGreaterThan(0);
  });
});

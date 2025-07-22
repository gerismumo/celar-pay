import request from "supertest";
import app from "../../app";
import db from "../../db/knex";

const API_URL = "/api/transactions";

let token: string;

beforeAll(async () => {
  await db("transactions").del();
  await db("users").del();

  const user = {
    email: "payuser@example.com",
    password: "Secure123!",
    role: "psp",
  };

  await request(app).post("/api/auth/signup").send(user);

  const loginRes = await request(app).post("/api/auth/login").send({
    email: user.email,
    password: user.password,
  });

  token = loginRes.body.token.access_token;
});

afterAll(async () => {
  await db("transactions").del();
  await db("users").del();
  await db.destroy();
});

describe("Transaction Routes", () => {
  it("should send a payment successfully", async () => {
    const paymentData = {
      recipient: "merchant123",
      amount: 100,
      currency: "USD",
    };

    const res = await request(app)
      .post(`${API_URL}/send`)
      .set("Authorization", `Bearer ${token}`)
      .send(paymentData);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Transaction send successiful");
  });

  it("should return error for invalid payment data", async () => {
    const paymentData = {
      recipient: "merchant123",
      amount: -50,
      currency: "USD",
    };

    const res = await request(app)
      .post(`${API_URL}/send`)
      .set("Authorization", `Bearer ${token}`)
      .send(paymentData);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Amount must be greater than 0");
  });

  it("should get user transactions", async () => {
    const res = await request(app)
      .get(`${API_URL}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Fetched successifully");
    expect(res.body.data).toBeInstanceOf(Array);
  });

  it("should return 401 if token not provided for /send", async () => {
    const res = await request(app).post(`${API_URL}/send`).send({
      recipient: "merchant123",
      amount: 100,
      currency: "USD",
    });

    expect(res.status).toBe(401);
  });

  it("should return 401 if token not provided for /transactions", async () => {
    const res = await request(app).get(`${API_URL}`);

    expect(res.status).toBe(401);
  });
});

import request from "supertest";
import app from "../../app";
import db from "../../db/knex";

const API_URL = "/api/auth";

beforeAll(async () => {
  await db("users").del();
});

afterAll(async () => {
  await db("users").del();
  await db.destroy();
});

describe("Auth Routes", () => {
  const validUser = {
    email: "test@example.com",
    password: "123456!dd",
    role: "dev",
  };

  it("should signup a new user", async () => {
    const res = await request(app).post(`${API_URL}/signup`).send(validUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "User created");
  });

  it("should not signup a user with invalid email", async () => {
    const res = await request(app)
      .post(`${API_URL}/signup`)
      .send({
        ...validUser,
        email: "invalid-email",
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid email format");
  });

  it("should not signup a user with weak password", async () => {
    const res = await request(app)
      .post(`${API_URL}/signup`)
      .send({
        ...validUser,
        email: "test2@example.com",
        password: "weak",
      });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Password must be at least 6 characters/);
  });

  it("should not signup a user with invalid role", async () => {
    const res = await request(app)
      .post(`${API_URL}/signup`)
      .send({
        ...validUser,
        email: "test3@example.com",
        role: "invalid-role",
      });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid role");
  });

  it("should not signup an already existing user", async () => {
    const res = await request(app).post(`${API_URL}/signup`).send(validUser);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "User already exists");
  });

  it("should login an existing user with correct credentials", async () => {
    const res = await request(app).post(`${API_URL}/login`).send({
      email: validUser.email,
      password: validUser.password,
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Successfully signed in");
    expect(res.body.token).toHaveProperty("access_token");
  });

  it("should not login with wrong password", async () => {
    const res = await request(app).post(`${API_URL}/login`).send({
      email: validUser.email,
      password: "wrongPassword!@#",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Invalid credentials");
  });

  it("should not login with non-existent email", async () => {
    const res = await request(app).post(`${API_URL}/login`).send({
      email: "nonexistent@example.com",
      password: "123456!dd",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "User not found");
  });
});

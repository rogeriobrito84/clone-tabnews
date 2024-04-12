import db from "infra/database.js";

async function cleanDb() {
    await db.query("drop schema public cascade; create schema public;");
}

beforeAll(cleanDb);

const baseUrl = "http://localhost:3000/api/v1/migrations";

test("Get to /api/v1/migrations should return 200", async () => {
    const response = await fetch(baseUrl);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBeGreaterThan(0);
});

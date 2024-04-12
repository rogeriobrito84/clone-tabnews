import db from "infra/database.js";

async function cleanDb() {
    await db.query("drop schema public cascade; create schema public;");
}

beforeAll(cleanDb);

const baseUrl = "http://localhost:3000/api/v1/migrations";

test("POST to /api/v1/migrations should return 200", async () => {
    const response = await fetch(baseUrl, {
        method: "POST",
    });
    const body = await response.json();

    expect(response.status).toBe(201);
    expect(Array.isArray(body)).toBe(true);

    const response2 = await fetch(baseUrl);
    const body2 = await response2.json();

    expect(response2.status).toBe(200);
    expect(Array.isArray(body2)).toBe(true);
    expect(body2.length).toBe(0);
});

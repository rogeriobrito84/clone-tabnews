const baeUrl = "http://localhost:3000/api/v1/status";

test("Get to /api/v1/status should return 200", async () => {
    const response = await fetch(baeUrl);
    const body = await response.json();
    const date = new Date(body.update_at).toISOString();
    console.log(body);

    expect(response.status).toBe(200);
    expect(body.update_at).toBeDefined();
    expect(body.update_at).toEqual(date);
    expect(body.dependencies.database.version).toEqual("16.0");
    expect(body.dependencies.database.max_connections).toEqual(100);
    expect(body.dependencies.database.opened_connections).toEqual(1);
});

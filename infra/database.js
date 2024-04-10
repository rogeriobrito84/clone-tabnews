import { Client } from "pg";

async function query(queryExec) {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        database: process.env.POSTGRES_DB,
        password: process.env.POSTGRES_PASSWORD,
    });
    try {
        await client.connect();
        const result = await client.query(queryExec);
        return result;
    } catch (e) {
        console.log(e);
    } finally {
        await client.end();
    }
}

export default {
    query: query,
};

const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();


const insertResearch = async (user_id, device, os_name, research, research_timestamp) => {

	const client = new Client({
		user: process.env.PGUSER,
		host: process.env.PGHOST,
		database: process.env.PGDATABASE,
		password: process.env.PGPASSWORD,
		port: process.env.PGPORT
	});

	try {
		await client.connect(); // gets connection
		const id_research = await client.query(
			`INSERT INTO "research" ("user_id", "device", "os_name", "research", "research_timestamp")  
             VALUES ($1, $2, $3, $4, $5) RETURNING id`, [user_id, device, os_name, research, research_timestamp]); // sends queries
		console.log('Research inserted');
		return id_research;
	} catch (error) {
		console.error(error.stack);
		return 0;
	} finally {
		await client.end(); // closes connection
	}
};

const insertProduct = async (research_id, title, description, link) => {

	const client = new Client({
		user: process.env.PGUSER,
		host: process.env.PGHOST,
		database: process.env.PGDATABASE,
		password: process.env.PGPASSWORD,
		port: process.env.PGPORT
	});

	try {
		await client.connect(); // gets connection
		await client.query(
			`INSERT INTO "products" ("research_id", "title", "description", "link")  
             VALUES ($1, $2, $3, $4)`, [research_id, title, description, link]); // sends queries
		console.log('Products inserted');
		return true;
	} catch (error) {
		console.error(error.stack);
		return false;
	} finally {
		await client.end(); // closes connection
	}
};

module.exports = {
	insertResearch,
	insertProduct
};
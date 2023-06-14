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

const getProducts = async () => {

	const client = new Client({
		user: process.env.PGUSER,
		host: process.env.PGHOST,
		database: process.env.PGDATABASE,
		password: process.env.PGPASSWORD,
		port: process.env.PGPORT
	});

	try {
		await client.connect(); // gets connection
		const result= await client.query(`SELECT research_id, title, description, link, count (title) as total
			FROM products
			GROUP BY research_id, title,description, link
			ORDER BY total DESC
			LIMIT 10`); // sends queries
		console.log('Get most desired products');
		return result.rows;
	} catch (error) {
		console.error(error.stack);
		return false;
	} finally {
		await client.end(); // closes connection
	}
};

const getresearches = async () => {

	const client = new Client({
		user: process.env.PGUSER,
		host: process.env.PGHOST,
		database: process.env.PGDATABASE,
		password: process.env.PGPASSWORD,
		port: process.env.PGPORT
	});

	try {
		await client.connect(); // gets connection
		const result= await client.query(`SELECT research, count (research) as total
		FROM research
		GROUP BY research
		ORDER BY total DESC
		LIMIT 10`); // sends queries
		console.log('Get most performed searches');
		return result.rows;
	} catch (error) {
		console.error(error.stack);
		return false;
	} finally {
		await client.end(); // closes connection
	}
};

const getProductsFromResearch = async (title) => {

	const client = new Client({
		user: process.env.PGUSER,
		host: process.env.PGHOST,
		database: process.env.PGDATABASE,
		password: process.env.PGPASSWORD,
		port: process.env.PGPORT
	});

	try {
		await client.connect(); // gets connection
		const result= await client.query(`SELECT DISTINCT title, description, link
			FROM products
			JOIN research
			ON products.research_id = research.id
			and research.research = $1
			LIMIT 10`, [title]); // sends queries
		return result.rows;
	} catch (error) {
		console.error(error.stack);
		return false;
	} finally {
		await client.end(); // closes connection
	}
};

module.exports = {
	insertResearch,
	insertProduct,
	getProducts,
	getresearches,
	getProductsFromResearch
};
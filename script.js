const { MongoClient } = require("mongodb");


// Replace <mongodb-link> with the MongoDB connection string provided by your hosting service
const url =
  "mongodb+srv://kavita:kavi89198919@kika8919.kzzynyd.mongodb.net/banking_system?retryWrites=true&w=majority";
const dbName = "banking_system"; // Replace with your preferred database name

const client = new MongoClient(url, { useUnifiedTopology: true });

// Function to connect to the MongoDB database
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to the database");

    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
}

// Example function to insert a new customer into the database
async function insertCustomer(customerData) {
  const db = await connectToDatabase();
  const customersCollection = db.collection("customers");

  try {
    const result = await customersCollection.insertOne(customerData);
    console.log("Customer inserted:", result.insertedId);
  } catch (error) {
    console.error("Error inserting customer:", error);
    throw error;
  }
}

// Example function to retrieve all customers from the database
async function getCustomers() {
  const db = await connectToDatabase();
  const customersCollection = db.collection("customers");

  try {
    const customers = await customersCollection.find().toArray();
    console.log("All customers:", customers);
  } catch (error) {
    console.error("Error retrieving customers:", error);
    throw error;
  }
}

// Example usage
const newCustomer = {
  name: "John Doe",
  email: "johndoe@example.com",
  balance: 1000,
};

insertCustomer(newCustomer);
getCustomers();

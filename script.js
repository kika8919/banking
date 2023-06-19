const { MongoClient } = require('mongodb');

// Replace <mongodb-link> with the MongoDB connection string provided by your hosting service
const url = 'mongodb+srv://kika8919.kzzynyd.mongodb.net/<banking_system>?retryWrites=true&w=majority';
const dbName = 'banking_system'; // Replace with your preferred database name

// Function to connect to the MongoDB database
async function connectToDatabase() {
  const client = new MongoClient(url, { useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to the database');

    const db = client.db(dbName);
    return db;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

// Function to insert a new customer into the database
async function insertCustomer(customerData) {
  const db = await connectToDatabase();
  const customersCollection = db.collection('customers');

  try {
    const result = await customersCollection.insertOne(customerData);
    console.log('Customer inserted:', result.insertedId);
  } catch (error) {
    console.error('Error inserting customer:', error);
    throw error;
  }
}

// Function to retrieve all customers from the database
async function getCustomers() {
  const db = await connectToDatabase();
  const customersCollection = db.collection('customers');

  try {
    const customers = await customersCollection.find().toArray();
    console.log('All customers:', customers);
  } catch (error) {
    console.error('Error retrieving customers:', error);
    throw error;
  }
}

// Example usage
const newCustomer = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  balance: 1000
};

async function initialize() {
  try {
    await insertCustomer(newCustomer);
    await getCustomers();
  } catch (error) {
    console.error('Error:', error);
  } finally {
    process.exit(); // Exit the script after execution
  }
}

initialize();
// for hiding the nav bar 
function toggleNav() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('hide');
}


const senderSelect = document.getElementById("sender");
const recipientSelect = document.getElementById("recipient");
const selectedSender = document.getElementById("selectedSender");
const selectedRecipient = document.getElementById("selectedRecipient");

// Assuming you have an array of sender names
const senderNames = ["Sneha Shukla", "Jane Smith", "Robert Johnson"];

// Event listener for sender select
senderSelect.addEventListener("change", function () {
  selectedSender.textContent = senderSelect.value;
});

// Event listener for recipient select
recipientSelect.addEventListener("change", function () {
  selectedRecipient.textContent = recipientSelect.value;
});

// Generate the <option> elements for each sender
senderNames.forEach((senderName) => {
  const option = document.createElement("option");
  option.value = senderName;
  option.textContent = senderName;
  senderSelect.appendChild(option);
});


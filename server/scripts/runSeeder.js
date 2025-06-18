require("dotenv").config();
const connectToDatabase = require("../config/database");
const seedDatabase = require("../seedData/seeder");

async function runSeeder() {
  try {
    await connectToDatabase();
    await seedDatabase();
    console.log("Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error running seeder:", error);
    process.exit(1);
  }
}

runSeeder();
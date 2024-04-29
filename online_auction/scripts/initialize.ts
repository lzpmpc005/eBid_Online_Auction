const axios = require("axios");

const categories = [
  { name: "Digital" },
  { name: "Clothes" },
  { name: "Tools" },
  { name: "Filming" },
  { name: "Music" },
  { name: "Kitchen" },
  { name: "Old things" },
  { name: "Books" },
];

async function createCategories() {
  try {
    categories.forEach(async (category) => {
      const response = await axios.post(
        "http://backend:8080/api/create-categories",
        category
      );
    });
    console.log(`Created ${categories.length} categories `);
  } catch (error) {
    console.log("Error creating the categories", error);
  }
}

const account = {
  card_number: "1234123412341234",
  card_holder: "nobody",
  cvv: "123",
  balance: 1000,
  expire_year: 2030,
  expire_month: 11,
};

async function createBankAccount() {
  try {
    await axios.post("http://localhost:8080/bankx/create-account", account);
    console.log(`Created bank account ${account.card_number}`);
  } catch (error) {
    console.log("Error creating the bank account", error);
  }
}

createCategories();
createBankAccount();

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

createCategories();

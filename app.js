const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const mealContainer = document.getElementById("meal-container");
const mealDetail = document.getElementById("meal-detail");

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();
  if (!query) return;

  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await res.json();

  mealContainer.innerHTML = "";
  mealDetail.classList.add("hidden");

  if (data.meals) {
    data.meals.forEach(meal => {
      const card = document.createElement("div");
      card.className = "meal-card";
      card.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
      `;
      card.addEventListener("click", () => showMealDetail(meal.idMeal));
      mealContainer.appendChild(card);
    });
  } else {
    mealContainer.innerHTML = "<p>No meals found</p>";
  }
});

async function showMealDetail(mealId) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  const data = await res.json();

  const meal = data.meals[0];
  mealDetail.classList.remove("hidden");
  mealDetail.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <h2>${meal.strMeal}</h2>
    <p><strong>Category:</strong> ${meal.strCategory}</p>
    <p><strong>Area:</strong> ${meal.strArea}</p>
    <p><strong>Instructions:</strong> ${meal.strInstructions.slice(0, 300)}...</p>
  `;
}

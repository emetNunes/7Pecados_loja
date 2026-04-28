export default function ingredientView(ingredients, filter) {
  ingredients.map((ingredient) => {
    if (ingredient.id_ingredient.category == "Fruta") {
      console.log(ingredient);
      frutas.push(ingredient.id_ingredient);
    }
  });

  return filter;
}

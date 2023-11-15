import { IHistoryOrder, IIngredient } from '../../types/common';

// Function to generate a random string (for uuid)
function generateRandomString(length: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Function to generate a random mocked ingredient
export function generateRandomMockIngredient(id?: string, uuid?: string, type: string = 'Ingredient'): IIngredient {
  return {
    _id: id || generateRandomString(12),
    uuid: uuid || generateRandomString(12), // Optional uuid
    name: `Mock ${type} ${id || generateRandomString(12)}`, // Use a default id if not provided
    type,
    proteins: Math.floor(Math.random() * 100),
    fat: Math.floor(Math.random() * 100),
    carbohydrates: Math.floor(Math.random() * 100),
    calories: Math.floor(Math.random() * 1000),
    price: Math.floor(Math.random() * 10000),
    image: `mock-${type}-image.jpg`,
    image_mobile: `mock-${type}-image-mobile.jpg`,
    image_large: `mock-${type}-image-large.jpg`,
    __v: id || generateRandomString(12),
  };

}

export function generateMockBun() {
  return generateRandomMockIngredient(undefined, undefined, 'Bun');
}

// Function to generate an array of random mocked ingredients
export function generateRandomMockIngredients(count: number, type?: string): IIngredient[] {
  const ingredients: IIngredient[] = [];
  // ingredients.push(generateMockBun());

  for (let i = 1; i <= count; i++) {
    ingredients.push(generateRandomMockIngredient(undefined, undefined, type));
  }
  return ingredients;
}


export function generateRandomHistoryOrder(): IHistoryOrder {
  const randomId = generateRandomString(24); // Adjust the length as needed
  const randomIngredientCount = Math.floor(Math.random() * 5) + 1; // Random number of ingredients (1 to 5)
  const randomIngredients = Array.from({ length: randomIngredientCount }, () => generateRandomString(24));

  return {
    _id: randomId,
    ingredients: randomIngredients,
    status: 'Completed', // You can customize the possible status values
    name: `Order-${generateRandomString(8)}`, // Add a random string to the order name
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    number: Math.floor(Math.random() * 1000) + 1, // Random order number (1 to 1000)
  };
}
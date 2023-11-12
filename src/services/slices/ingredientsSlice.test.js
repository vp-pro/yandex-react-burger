import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchIngredients, ingredientsSlice, removeWatchingIngredient, setWatchingIngredient } from './ingredientsSlice';
import { RootState } from "./ingredientsSlice";

const ingredientsReducer = ingredientsSlice.reducer
// Mock the API request function
jest.mock('../../utils/api', () => ({
  ...jest.requireActual('../../utils/api'),
  request: jest.fn(),
}));

// Mock the API response
const mockedApiResponse = {
  data: [
    {
      _id: '1',
      name: 'Mocked Ingredient',
      type: 'Mocked Type',
      proteins: 10,
      fat: 5,
      carbohydrates: 20,
      calories: 150,
      price: 2.5,
      image: 'mocked-image.jpg',
      image_mobile: 'mocked-image-mobile.jpg',
      image_large: 'mocked-image-large.jpg',
      __v: '1',
    },
  ],
};               

// Mock Ingredient object
const mockIngredient = {
  _id: '2',
  name: 'Mock Ingredient',
  type: 'Mock Type',
  proteins: 12,
  fat: 6,
  carbohydrates: 18,
  calories: 160,
  price: 2.0,
  image: 'mock-image.jpg',
  image_mobile: 'mock-image-mobile.jpg',
  image_large: 'mock-image-large.jpg',
  __v: '2',
};

describe('ingredients reducer', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        ingredients: ingredientsReducer,
      },
    });
  });

  it('should handle setWatchingIngredient', () => {
    store.dispatch(setWatchingIngredient(mockIngredient));

    const { watchingIngredient: updatedWatchingIngredient } = store.getState().ingredients;
    expect(updatedWatchingIngredient).toEqual(mockIngredient);
  });

  it('should handle removeWatchingIngredient', () => {
    // Set an initial watchingIngredient
    store.dispatch(setWatchingIngredient(mockIngredient));

    store.dispatch(removeWatchingIngredient());

    const { watchingIngredient: updatedWatchingIngredient } = store.getState().ingredients;
    expect(updatedWatchingIngredient).toBeNull();
  });

  it('should handle fetchIngredients.pending', () => {
    store.dispatch(fetchIngredients());

    const { ingredients } = store.getState().ingredients;
    expect(ingredients).toEqual([]);
    expect(store.getState().ingredients.loading).toBe(true);
    expect(store.getState().ingredients.error).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', async () => {
    // Mock the API response
    jest.spyOn(require('../../utils/api'), 'request').mockResolvedValue(mockedApiResponse);

    await store.dispatch(fetchIngredients());

    const { ingredients } = store.getState().ingredients;
    expect(ingredients).toEqual(mockedApiResponse.data);
    expect(store.getState().ingredients.loading).toBe(false);
    expect(store.getState().ingredients.error).toBeNull();
  });

  it('should handle fetchIngredients.rejected', async () => {
    // Mock a rejected API response
    jest.spyOn(require('../../utils/api'), 'request').mockRejectedValue(new Error('Mocked error'));

    await store.dispatch(fetchIngredients());

    const { ingredients } = store.getState().ingredients;
    expect(ingredients).toEqual([]);
    expect(store.getState().ingredients.loading).toBe(false);
    expect(store.getState().ingredients.error).toEqual('Mocked error');
  });
});

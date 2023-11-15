import { configureStore } from "@reduxjs/toolkit";
import { fetchIngredients, ingredientsSlice, removeWatchingIngredient, setWatchingIngredient } from './ingredientsSlice';
import { RootState } from "./ingredientsSlice";
import { generateRandomMockIngredient  } from "../__test__/mocks";
const ingredientsReducer = ingredientsSlice.reducer;

// Mock the API request function
jest.mock('../../utils/api', () => ({
  ...jest.requireActual('../../utils/api'),
  request: jest.fn(),
}));

const mockedFetchResponse = {
  data: [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0,
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0,
    },
    // Add more mocked ingredients as needed
  ],
};

describe('ingredients reducer', () => {
  let store;

  beforeEach(() => {
    // Arrange: Create a Redux store with the ingredientsReducer
    store = configureStore({
      reducer: {
        ingredients: ingredientsReducer,
      },
    });
  });

  afterEach(() => {
    // Clean up spies after each test
    jest.restoreAllMocks();
  });

  it('should handle setWatchingIngredient', () => {
    // Act: Dispatch the setWatchingIngredient action
    const ingredient = generateRandomMockIngredient()
    store.dispatch(setWatchingIngredient(ingredient));

    // Assert: Check if the watchingIngredient state is updated as expected
    const { watchingIngredient: updatedWatchingIngredient } = store.getState().ingredients;
    expect(updatedWatchingIngredient).toEqual(ingredient);
  });

  it('should handle removeWatchingIngredient', () => {
    // Arrange: Set an initial watchingIngredient
    const ingredient = generateRandomMockIngredient()
    store.dispatch(setWatchingIngredient(ingredient));

    // Act: Dispatch the removeWatchingIngredient action
    store.dispatch(removeWatchingIngredient());

    // Assert: Check if the watchingIngredient state is set to null
    const { watchingIngredient: updatedWatchingIngredient } = store.getState().ingredients;
    expect(updatedWatchingIngredient).toBeNull();
  });

  it('should handle fetchIngredients.pending', () => {
    // Act: Dispatch the fetchIngredients action
    store.dispatch(fetchIngredients());

    // Assert: Check if the loading state is set to true and other state properties are as expected
    const { ingredients, loading, error } = store.getState().ingredients;
    expect(ingredients).toEqual([]);
    expect(loading).toBe(true);
    expect(error).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', async () => {
    // Arrange: Mock the API response
    jest.spyOn(require('../../utils/api'), 'request').mockResolvedValue(mockedFetchResponse);

    // Act: Dispatch the fetchIngredients action (asynchronous)
    await store.dispatch(fetchIngredients());

    // Assert: Check if the state is updated as expected after the asynchronous action is fulfilled
    const { ingredients, loading, error } = store.getState().ingredients;
    expect(ingredients).toEqual(mockedFetchResponse.data);
    expect(loading).toBe(false);
    expect(error).toBeNull();
  });

  it('should handle fetchIngredients.rejected', async () => {
    // Arrange: Mock a rejected API response
    jest.spyOn(require('../../utils/api'), 'request').mockRejectedValue(new Error('Mocked error'));

    // Act: Dispatch the fetchIngredients action (asynchronous)
    await store.dispatch(fetchIngredients());

    // Assert: Check if the state is updated as expected after the asynchronous action is rejected
    const { ingredients, loading, error } = store.getState().ingredients;
    expect(ingredients).toEqual([]);
    expect(loading).toBe(false);
    expect(error).toEqual('Mocked error');
  });
});

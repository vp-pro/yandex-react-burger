import configureMockStore from 'redux-mock-store';
import { orderSlice, fetchOrderNumber } from './orderSlice';
import { middlewares } from '../store';
import { IIngredient } from '../../types/common';
import { generateMockBun, generateRandomMockIngredient, generateRandomMockIngredients } from '../__test__/mocks';
import thunk from 'redux-thunk';
import { ingredientsSlice } from './ingredientsSlice';
import { userSlice } from './userSlice';
import { ordersSlice } from './ordersSlice';
import { userOrdersSlice } from './userOrdersSlice';
// const mockStore = configureMockStore([...middlewares, thunk]);



const initialEmptyState = {
  ingredients: [],
  bun: null,
  orderNumber: null,
  totalPrice: 0,
  loading: false,
  error: null,
};

describe('orderSlice reducers', () => {
  beforeEach(()=>{
    jest.mock('../../utils/api', () => ({
      ...jest.requireActual('../../utils/api'),
      request: jest.fn(),
    }));
  })
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should handle setBun', () => {
    // Arrange
    const mockBun = generateMockBun();
    const action = orderSlice.actions.setBun(mockBun);

    // Act
    const newState = orderSlice.reducer(initialEmptyState, action);

    // Assert
    expect(newState.bun).toEqual(mockBun);
    expect(newState.totalPrice).toBe(mockBun.price * 2);
  });

  it('should handle addIngredient', () => {
    // Arrange
    const ingredientToAdd = generateRandomMockIngredient();
    const uuid = 'uniqueId';
    const action = orderSlice.actions.addIngredient({ ingredient: ingredientToAdd, uuid });

    // Act
    const newState = orderSlice.reducer(initialEmptyState, action);

    // Assert
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({ ...ingredientToAdd, uuid });
    expect(newState.totalPrice).toBe(ingredientToAdd.price);
  });

  it('should handle removeIngredient', () => {
    // Arrange
    const bun = generateMockBun();
    const initialIngredients = [...generateRandomMockIngredients(3), bun];
    const initialStateWithIngredients = { ...initialEmptyState, ingredients: initialIngredients };
    const uuidToRemove = initialIngredients[0].uuid; // Use a valid UUID from the initial ingredients
    const action = orderSlice.actions.removeIngredient(uuidToRemove);

    // Act
    const newState = orderSlice.reducer(initialStateWithIngredients, action);

    // Assert
    expect(newState.ingredients).toHaveLength(initialIngredients.length - 1);
    expect(newState.ingredients.some(ingredient => ingredient.uuid === uuidToRemove)).toBeFalsy();
    expect(newState.totalPrice).toBe(
      initialIngredients.slice(1).reduce((acc, ingredient) => acc + ingredient.price, 0)
    );
  });

  it('should handle setIngredients', () => {
    // Arrange
    const newIngredients = generateRandomMockIngredients(2)
    const action = orderSlice.actions.setIngredients(newIngredients);

    // Act
    const newState = orderSlice.reducer(initialEmptyState, action);

    // Assert
    expect(newState.ingredients).toEqual(newIngredients);
    expect(newState.totalPrice).toBe(newIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0));
  });

  it('should handle cleanOrder', () => {
    // Arrange
    const initialStateWithOrder = {
      ...initialEmptyState,
      ingredients: generateRandomMockIngredients(2),
      bun: generateMockBun(),
      orderNumber: 123,
    };
    const action = orderSlice.actions.cleanOrder();

    // Act
    const newState = orderSlice.reducer(initialStateWithOrder, action);

    // Assert
    expect(newState.ingredients).toHaveLength(0);
    expect(newState.bun).toBeNull();
    expect(newState.orderNumber).toBeNull();
  });


  it('should handle fetchOrderNumber.fulfilled', () => {
    const ingredients = generateRandomMockIngredients(2);
    const bun = generateMockBun();
    const action = {
      type: fetchOrderNumber.fulfilled.type,
      payload: 26149,
    };
    const initialState = {
      ingredients,
      bun,
      orderNumber: null,
      totalPrice: 0,
      loading: true,
      error: null,
    };

    const newState = orderSlice.reducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe(null);
    expect(newState.orderNumber).toBe(26149);
  });

  it('should handle fetchOrderNumber.rejected', () => {
    const action = {
      type: fetchOrderNumber.rejected.type,
      error: {message: 'Some Error'}
    };
    const initialState = {
      ingredients: [],
      bun: null,
      orderNumber: null,
      totalPrice: 0,
      loading: true,
      error: null,
    };

    const newState = orderSlice.reducer(initialState, action);
    expect(newState.loading).toBe(false);
    expect(newState.error).toBe('Some Error');
  });

  it('should handle fetchOrderNumber.pending', () => {
    const action = {
      type: fetchOrderNumber.pending.type,
    };
    const initialState = {
      ingredients: [],
      bun: null,
      orderNumber: null,
      totalPrice: 0,
      loading: false,
      error: null,
    };

    const newState = orderSlice.reducer(initialState, action);
    expect(newState.loading).toBe(true);

  });

});




describe('fetchOrderNumber thunk', () => {
  it('fetchOrderNumber.fulfilled', async () => {
    const ms = [thunk.withExtraArgument({...middlewares})];
    const mockStore = configureMockStore(ms);

    const ingredients = generateRandomMockIngredients(2);
    const bun = generateMockBun();

    const store = mockStore({
      orderSlice: {
          ingredients,
          bun,
          orderNumber: null,
          totalPrice: 0,
          loading: false,
          error: null,
        }
    });

    const action = {
      type: fetchOrderNumber,
    };

    const newState = orderSlice.reducer(initialEmptyState, action)
    // Mock the API response
    jest.spyOn(require('../../utils/api'), 'request').mockResolvedValue({ order: { number: 26149 } });

    // Dispatch the async thunk
    await store.dispatch(fetchOrderNumber());

    // Get the actions dispatched to the store
    const actions = store.getActions();

    console.log(actions)
    expect(actions[1].payload).toEqual(26149);
  });
});


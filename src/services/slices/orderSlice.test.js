import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { orderSlice, fetchOrderNumber, clearOrder } from './orderSlice';
import { IIngredient } from '../../types/common';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

jest.mock('../../utils/api', () => ({
  ...jest.requireActual('../../utils/api'),
  request: jest.fn(),
}));

const initialState = {
  ingredients: [],
  bun: null,
  orderNumber: null,
  totalPrice: 0,
  loading: false,
  error: null,
};

describe('orderSlice reducers', () => {
  it('should handle setBun', () => {
    const selectedBun = { _id: '1', name: 'Bun', type: 'bread', price: 2.0 /* ... other properties */ };
    const action = orderSlice.actions.setBun(selectedBun);
    const newState = orderSlice.reducer(initialState, action);
    
    expect(newState.bun).toEqual(selectedBun);
    expect(newState.totalPrice).toBe(selectedBun.price * 2);
  });

  it('should handle addIngredient', () => {
    const ingredientToAdd = { _id: '2', name: 'Cheese', type: 'dairy', price: 1.5 /* ... other properties */ };
    const uuid = 'uniqueId';
    const action = orderSlice.actions.addIngredient({ ingredient: ingredientToAdd, uuid });
    const newState = orderSlice.reducer(initialState, action);
    
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({ ...ingredientToAdd, uuid });
    expect(newState.totalPrice).toBe(ingredientToAdd.price);
  });

  it('should handle removeIngredient', () => {
    const initialIngredients = [{ _id: '2', name: 'Cheese', type: 'dairy', price: 1.5, uuid:'1234A'}];
    const initialStateWithIngredients = { ...initialState, ingredients: initialIngredients };
    const uuidToRemove = '1234A';
    const action = orderSlice.actions.removeIngredient(uuidToRemove);
    const newState = orderSlice.reducer(initialStateWithIngredients, action);

    expect(newState.ingredients).toHaveLength(0);
    expect(newState.totalPrice).toBe(0);
  });

  it('should handle setIngredients', () => {
    const newIngredients = [
      { _id: '3', name: 'Tomato', type: 'vegetable', price: 1.0},
      { _id: '4', name: 'Lettuce', type: 'vegetable', price: 0.5},
    ];
    const action = orderSlice.actions.setIngredients(newIngredients);
    const newState = orderSlice.reducer(initialState, action);

    expect(newState.ingredients).toEqual(newIngredients);
    expect(newState.totalPrice).toBe(newIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0));
  });

  it('should handle cleanOrder', () => {
    const initialStateWithOrder = {
      ...initialState,
      ingredients: [{ _id: '3', name: 'Tomato', type: 'vegetable', price: 1.0 /* ... other properties */ }],
      bun: { _id: '1', name: 'Bun', type: 'bread', price: 2.0 /* ... other properties */ },
      orderNumber: 123,
    };
    const action = orderSlice.actions.cleanOrder();
    const newState = orderSlice.reducer(initialStateWithOrder, action);
    expect(newState.ingredients).toHaveLength(0);
    expect(newState.bun).toBeNull();
    expect(newState.orderNumber).toBeNull();
  });
  
});

describe('fetchOrderNumber thunk', () => {
  it('should fetch order number', async () => {
    const initialState = {
      order: {
        bun: {
          "_id": "643d69a5c3f7b9001cfa093d",
          "name": "Флюоресцентная булка R2-D3",
          "type": "bun",
          "proteins": 44,
          "fat": 26,
          "carbohydrates": 85,
          "calories": 643,
          "price": 988,
          "image": "https://code.s3.yandex.net/react/code/bun-01.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/bun-01-large.png",
          "__v": 0
        },
        ingredients: [
          {
            "_id": "643d69a5c3f7b9001cfa0943",
            "name": "Соус фирменный Space Sauce",
            "type": "sauce",
            "proteins": 50,
            "fat": 22,
            "carbohydrates": 11,
            "calories": 14,
            "price": 80,
            "image": "https://code.s3.yandex.net/react/code/sauce-04.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-04-large.png",
            "__v": 0,
            "uuid": "e975725a-0b0f-4d7c-83ca-79b7553ffec7"
          },
          {
            "_id": "643d69a5c3f7b9001cfa0942",
            "name": "Соус Spicy-X",
            "type": "sauce",
            "proteins": 30,
            "fat": 20,
            "carbohydrates": 40,
            "calories": 30,
            "price": 90,
            "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
            "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            "__v": 0,
            "uuid": "7e3d3379-2725-4b4c-866b-61dde0d4dfd0"
          }
          // Add more ingredients as needed
        ],
        orderNumber: null,
        totalPrice: 2146,
        loading: false,
        error: null,
      },
    };
    const store = mockStore(initialState);
    const mockedResponse = { success: true, order: { number: 123 } };
    
    // Mock the API request function
    jest.spyOn(require('../../utils/api'), 'request').mockResolvedValueOnce(mockedResponse);

    // Dispatch the thunk
    await store.dispatch(fetchOrderNumber());

    // Get the dispatched actions
    const actions = store.getActions();

    // Assertions
    expect(actions).toHaveLength(2);

    // Check the pending action
    expect(actions[0].type).toEqual(fetchOrderNumber.pending.type);

    // Check the fulfilled action
    expect(actions[1].type).toEqual(fetchOrderNumber.fulfilled.type);
    expect(actions[1].payload).toEqual(123);

    // Check the state
    const state = store.getState().order;
    expect(state.loading).toBeFalsy();
    expect(state.error).toBeNull();
    expect(state.orderNumber).toEqual(123);
  });

//   it('should handle fetchOrderNumber failure', async () => {
//     const store = mockStore(initialState);
//     const errorMessage = 'Internal Server Error';
//     jest.spyOn(require('../../utils/api'), 'request').mockRejectedValue({ message: errorMessage });

//     await store.dispatch(fetchOrderNumber());

//     const actions = store.getActions();
//     console.log(actions);

//     const expectedActions = [
//       { type: fetchOrderNumber.pending.type },
//       { type: fetchOrderNumber.rejected.type, error: { message: errorMessage } },
//     ];
//     expect(actions).toEqual(expectedActions);

//     const state = store.getState().order;
//     expect(state.loading).toBeFalsy();
//     expect(state.error).toEqual(errorMessage);
//     expect(state.orderNumber).toBeNull();
//   });
});

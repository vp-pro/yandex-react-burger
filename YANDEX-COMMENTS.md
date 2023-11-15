1.
Подскажите, пожалуйста, как правильно thunk-то проверить?

Я хочу проверить, какие диспатчи были вызваны.
У меня rejected постоянно, потому что store, похоже, неправильно реализован.

А как правильно-то реализовать?

в файле  orderSlice.test.js
describe('fetchOrderNumber thunk', () => {
  it('fetchOrderNumber.fulfilled', async () => {
    const ms = [thunk.withExtraArgument({...middlewares})];
    const mockStore = configureMockStore(ms);

    const ingredients = generateRandomMockIngredients(2);
    const bun = generateMockBun();

    const store = mockStore({
        ingredients: ingredientsSlice.reducer,
        order: orderSlice.reducer,
        user: userSlice.reducer,
        orders: ordersSlice.reducer,
        userOrders: userOrdersSlice.reducer

    });

    const newState = orderSlice.reducer(initialEmptyState, )
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

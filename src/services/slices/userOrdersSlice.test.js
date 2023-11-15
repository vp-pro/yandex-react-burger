import { userOrdersSlice, setUserOrders, userOrdersMiddleware, wsActions } from './userOrdersSlice'; // replace with your actual file path
import { WebsocketStatus } from '../../types/common';
import { generateRandomHistoryOrder } from '../__test__/mocks';

const initialEmptyState = {
  status: WebsocketStatus.OFFLINE,
  userOrders: [],
};

describe('userOrdersSlice reducers', () => {
  it('should create an action to set user orders', () => {
    // Arrange
    const newUserOrders = [generateRandomHistoryOrder()];
    const action = setUserOrders(newUserOrders);

    // Act
    const newState = userOrdersSlice.reducer(initialEmptyState, action);

    // Assert
    expect(newState.userOrders).toEqual(newUserOrders);
  });


  it('should handle wsConnecting action', () => {
    // Arrange
    const action = {
      type: 'USER_ORDERS_WS_CONNECTING',
    };

    // Act
    const newState = userOrdersSlice.reducer(initialEmptyState, action);

    // Assert
    expect(newState.status).toEqual(WebsocketStatus.CONNECTING);
  });


  it('should handle onOpen action', () => {
    // Arrange
    const action = {
      type: 'USER_ORDERS_WS_OPEN',
    };
    // Act
    const newState = userOrdersSlice.reducer(initialEmptyState, action);
    // Assert
    expect(newState.status).toEqual(WebsocketStatus.ONLINE);
  });


  it('should handle onClose action', () => {
    // Arrange
    const action = {
      type: 'USER_ORDERS_WS_CLOSE',
    };
    // Act
    const newState = userOrdersSlice.reducer(initialEmptyState, action);
    // Assert
    expect(newState.status).toEqual(WebsocketStatus.OFFLINE);
  });

  it('should handle onMessage action with success and orders', () => {
    // Arrange
    const newOrders = [generateRandomHistoryOrder()];
    const action = {
      type: 'USER_ORDERS_WS_MESSAGE',
      payload: {
        success: true,
        orders: newOrders,
      },
    };

    // Act
    const newState = userOrdersSlice.reducer(initialEmptyState, action);

    // Assert
    expect(newState.userOrders).toEqual(newOrders);
  });
});
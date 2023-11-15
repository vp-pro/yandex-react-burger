import { ordersSlice } from './ordersSlice'; // replace with your actual file path
import { WebsocketStatus } from '../../types/common';
import { generateRandomHistoryOrder } from '../__test__/mocks';

const initialEmptyState= {
  orders: [],
  total: undefined,
  totalToday: undefined,
  status: WebsocketStatus.OFFLINE,
};

describe('ordersSlice reducers', () => {
  it('should create an action to set orders', () => {
    const newOrders = [generateRandomHistoryOrder()]
    const action = ordersSlice.actions.setOrders(newOrders);
    const newState = ordersSlice.reducer(initialEmptyState, action);

    expect(newState.orders).toEqual(newOrders);
  });

  it('should create an action to set totals', () => {
    const {total, totalToday} = (5, 10)
    const action = ordersSlice.actions.setOrders({total, totalToday});
    const newState = ordersSlice.reducer(initialEmptyState, action);
    expect(newState.total).toEqual(total);
    expect(newState.totalToday).toEqual(totalToday);
  });

  it('should handle wsConnecting action', () => {
    const action = {
      type: 'FEED_WS_CONNECTING',
    };
    const newState = ordersSlice.reducer(initialEmptyState, action);
    expect(newState.status).toEqual(WebsocketStatus.CONNECTING);
  });

  it('should handle onOpen action', () => {
      const action = {
        type: 'FEED_WS_OPEN',
      };
      const newState = ordersSlice.reducer(initialEmptyState, action);
      expect(newState.status).toEqual(WebsocketStatus.ONLINE);
  });

  it('should handle onClose action', () => {
      const action = {
        type: 'FEED_WS_CLOSE',
      };
      const newState = ordersSlice.reducer(initialEmptyState, action);
      expect(newState.status).toEqual(WebsocketStatus.OFFLINE);
  });

  it('should handle onMessage action with success and orders', () => {

    const newOrders = [generateRandomHistoryOrder(), generateRandomHistoryOrder(), generateRandomHistoryOrder()]
    const {total, totalToday} = (5, 10)

      const action = {
        type: 'FEED_WS_MESSAGE',
        payload: {
          success: true,
          orders: newOrders,
          total,
          totalToday
        }
      }
      const newState = ordersSlice.reducer(initialEmptyState, action);
      expect(newState.orders).toEqual(newOrders);
      expect(newState.total).toEqual(total);
      expect(newState.totalToday).toEqual(totalToday);

    });
});

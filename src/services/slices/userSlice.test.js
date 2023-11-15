import { setAuthChecked, setUser, login, logout, register, getUser } from './userSlice'; // replace with your actual file path
import { userSlice } from './userSlice'
import { useNavigate } from 'react-router-dom';


import * as router from 'react-router'

const initialEmptyState = {
    user: null ,
    isAuthChecked: null,
  };




const navigate = jest.fn()

//   const mockedUsedNavigate = jest.fn();
//   jest.mock('react-router-dom', () => ({
//       ...(jest.requireActual('react-router-dom')),
//       useNavigate: () => mockedUsedNavigate,
//   }))

  describe('userSlice Test', () => {
    // let store;
    // let navigateMock;

    beforeEach(() => {


        // jest.mock('react-router-dom', () => ({
        //     ...jest.requireActual('react-router-dom'),
        //     useNavigate: jest.fn(),
        //   }));

          jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)

        // const mockStore = configureStore([]);
        // store = mockStore({
        //     ingredients: ingredientsSlice,
        //     order: orderSlice,
        //     user: userSlice,
        //     orders: ordersSlice,
        //     userOrders: userOrdersSlice
        // });

    //   // Reset the mock function for useNavigate before each test
    //   navigateMock = jest.requireMock('react-router-dom').useNavigate;
    //   navigateMock.mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
      });

  it('should create an action to set user', () => {
    // Arrange
    const newUser = { name: 'John Doe', email: 'john@example.com' };
    const action = setUser(newUser);

    // Act
    const newState = userSlice.reducer(initialEmptyState, action);

    // Assert
    expect(newState.user).toEqual(newUser);
  });

  it('should create an action to set auth checked', () => {
    // Arrange
    const action = setAuthChecked();

    // Act
    const newState = userSlice.reducer(initialEmptyState, action);

    // Assert
    expect(newState.isAuthChecked).toBe(true);
  });

//   // Add tests for extraReducers cases (login, logout, register, getUser, etc.)
  it('should handle login.fulfilled action', () => {
    // Arrange
    const user = { name: 'John Doe', email: 'john@example.com' }
    const initialState = { user: null, isAuthChecked: null };
    const action = {
        type: login.fulfilled.type,
        payload: user ,
    };

    // Act
    const newState = userSlice.reducer(initialState, action);

    // Assert
    expect(newState.user).toEqual({ name: 'John Doe', email: 'john@example.com' });
  });

  it('should handle logout.fulfilled action', () => {
    // Arrange
    const user =  { name: 'John Doe', email: 'john@example.com' }
    const initialState = { user: user,
        isAuthChecked: true ,
    };
    const action = {
        type: logout.fulfilled.type
    };

    // Act
    const newState = userSlice.reducer(initialState, action);

    // Assert
    expect(newState.user).toBeNull();
  });

  it('should navigate to /login when logout is rejected', async () => {
    const mockedNavigate = jest.fn();
    useNavigate.mockImplementation(() => mockedNavigate);

    const action = {
        type: logout.rejected.type
    };

    userSlice.reducer(initialEmptyState, action);

    expect(mockedNavigate).toHaveBeenCalledWith('/login');

  });

  it('should handle register.fulfilled action', () => {
    // Arrange
    const user = { name: 'John Doe', email: 'john@example.com' }
    const initialState = { user: null, isAuthChecked: null };
    const action = { type: register.fulfilled.type, payload:  user};

    // Act
    const newState = userSlice.reducer(initialState, action);

    // Assert
    expect(newState.user).toEqual(user);
  });

  it('should handle register.rejected action', () => {
    // Arrange
    const initialState = { user: null, isAuthChecked: null };
    const action = {
        type: register.rejected.type,
        error: {message: 'Registration failed'} ,
        };

    // Act
    const newState = userSlice.reducer(initialState, action);

    // Assert
    expect(newState.error).toEqual('Registration failed');
  });

  it('should handle getUser.fulfilled action', () => {
    // Arrange
    const user = { name: 'You MotherFock Doe', email: 'john@example.com' }
    const initialState = { user: null, isAuthChecked: null };
    const action = {
        type: getUser.fulfilled.type,
    payload:  user,
};

    // Act
    const newState = userSlice.reducer(initialState, action);

    // Assert
    expect(newState.user).toEqual(user);
  });

});

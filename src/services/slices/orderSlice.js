import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { urlToOrder, request } from '../../utils/api'

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        ingredients: [],
        bun: null,
        orderNumber: null,
        totalPrice: 0,
        loading: false,
        error: null,
    },
    reducers: {
        setBun: (state, action) => {
            const selectedBun = action.payload;
            state.bun = selectedBun;
            state.totalPrice = calculateTotalPrice(state);
        },
        addIngredient: (state, action) => {
            const ingredientToAdd = action.payload.ingredient;
            const id = action.payload.uuid;

            let updatedIngredient = { ...ingredientToAdd, id };
            state.ingredients.push(updatedIngredient);

            state.totalPrice = calculateTotalPrice(state);
        },
        removeIngredient: (state, action) => {
          const id = action.payload;
          state.ingredients = state.ingredients.filter((ingredient)=> ingredient.id !== id)
          state.totalPrice = calculateTotalPrice(state);
        },
        setIngredients: (state, action)=> {
          state.ingredients = action.payload;
          state.totalPrice = calculateTotalPrice(state)
        },
        cleanOrder: (state) => {
          state.orderNumber = null
          state.ingredients = []
          state.bun = null
        }
    },
    extraReducers: (builder) => {
      builder.addCase(fetchOrderNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const orderNumber = action.payload;
        state.orderNumber = orderNumber;
      });
  
      builder.addCase(fetchOrderNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  
      builder.addCase(fetchOrderNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    }

})

export const fetchOrderNumber = createAsyncThunk('order/fetchOrderNumber', 
async (_, {getState}) => {
    try {
      const state = getState()
      
      const ids = state.order.ingredients.map(ingredient => ingredient._id)
      ids.push(state.order.bun._id)

      console.log('AGAIN;,', ids)
      const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ingredients: ids
          })
        };
        
        const response = await request(urlToOrder, requestOptions);
        const data = await response.json();
        console.log(data)

        const orderNumber = data.order.number

        return orderNumber;
    } catch (error) {
        throw new Error(error.message)
    }
})



const calculateTotalPrice = (state) => {
  const totalPrice =
  Object.values(state.ingredients).reduce((acc, element) => acc + element.price, 0) +
  state.bun.price * 2;
  return totalPrice;
}

export const { setBun, addIngredient, removeIngredient, setIngredients, cleanOrder } = orderSlice.actions;





// const fetchToOrder = (array) => {
//   const requestOptions = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       "ingredients": array

//     })
//   }

//   fetch(urlToOrder, requestOptions)
//     .then(response => response.json())
//     .then(data => {
//       if (data.success === true) {
//         setOrderNumber(data.order.number)
//         setIsModalOpen(true)
//       } else { throw new Error('Something wrong with fetching Order')}

//     }).catch(error => {throw new Error('Something wrong with fetching Order')})
// }

import { createSlice} from "@reduxjs/toolkit";

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
        ingredients: [],
        bun: null,
        orderNumber: '',
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
            const ingredientToAdd = action.payload;
            const sequenceNumber = action.payload.sequenceNumber;
          
            let updatedIngredient = { ...ingredientToAdd };
          
            if (typeof sequenceNumber === 'number' && sequenceNumber >= 0 && sequenceNumber <= state.ingredients.length) {
              // If a valid sequence number is provided, insert the new ingredient at that position
              state.ingredients.splice(sequenceNumber, 0, updatedIngredient);
            } else {
              // If no or an invalid sequence number is provided, add the ingredient at the end
              state.ingredients.push(updatedIngredient);
            }
          
            // Update sequence numbers of all ingredients
            state.ingredients.forEach((ingredient, index) => {
              ingredient.sequenceNumber = index;
              console.log(ingredient.sequenceNumber)
            });

            state.totalPrice = calculateTotalPrice(state);
        },
        removeIngredient: (state, action) => {
          const sequenceNumberToRemove = action.payload;
          const indexToRemove = state.ingredients.findIndex(
            (ingredient) => ingredient.sequenceNumber === sequenceNumberToRemove
          );
        
          if (indexToRemove !== -1) {
            state.ingredients.splice(indexToRemove, 1);
        
            // Update sequence numbers of all remaining ingredients
            state.ingredients.forEach((ingredient, index) => {
              ingredient.sequenceNumber = index + 1;
            });
          }
        
          state.totalPrice = calculateTotalPrice(state);
        },
        changeBun: (state, action) => {
          const newBun = action.payload;
          state.bun = newBun
          state.totalPrice = calculateTotalPrice(state);
        }
    },
    extraReducers: (builder) => {

    }

})

const calculateTotalPrice = (state) => {
  const totalPrice =
  Object.values(state.ingredients).reduce((acc, element) => acc + element.price, 0) +
  state.bun.price * 2;
  return totalPrice;
}

export const { setBun, addIngredient, removeIngredient, changeBun } = orderSlice.actions;




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


// useEffect(() => {
//   let sum = 0

//   Object.values(data).forEach(ingredient => {
//     if (ingredient.type === 'bun') {
//       sum = sum + ingredient.price * 2
//     } else {
//       sum = sum + ingredient.price
//     }

//   })
//   // dispatch({type: 'SET_TOTAL_PRICE', payload: sum})
// }, data)
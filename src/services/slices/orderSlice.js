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
          console.log(action.payload)
          // ingredientToAdd.order = state.ingredients.length + 1;
          // ingredientToAdd.sequenceNumber = 0
          state.ingredients.push(ingredientToAdd);
          state.totalPrice = calculateTotalPrice(state);
          console.log(state.ingredients)
        },
        removeIngredient: (state, action) => {
          const ingredientToRemove = action.payload;
          // state.ingredients ingredientToRemove._id;

        },
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

export const { setBun, addIngredient, removeIngredient } = orderSlice.actions;




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
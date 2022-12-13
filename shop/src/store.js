import {configureStore, createSlice} from '@reduxjs/toolkit'
import user from './store/userSlice'


let stock = createSlice({
    name: 'stock',
    initialState : [10, 11, 12]
})

let cart = createSlice({
    name: 'cart',
    initialState:   [
        {id : 0, name : 'White and Black', count : 2},
        {id : 1, name : 'Grey Yordan', count : 1}
    ],
    reducers: {
        // 상품 수량 추가
        addCount(state, action) {
            // 배열로 찾기
            // state[action.payload].count++;
            let i = state.findIndex((a) => {return a.id === action.payload});
            state[i].count++;
        }
        ,
        // 상품 장바구니에 추가
        addItem(state, action) {
            state.push(action.payload);
        }

    }
})

export let { addCount, addItem } = cart.actions

export default configureStore({
    reducer: {
        user: user.reducer,
        stock: stock.reducer,
        cart: cart.reducer
    }
})
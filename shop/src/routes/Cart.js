import {Button, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {increase, changeName} from "../store/userSlice";
import {addCount} from "../store";
function Cart() {

    // Redux store 를 가져와준다.
    let cart = useSelector((state) => { return state.cart }) // Redux store에 있던 state 남음
    let dispatch = useDispatch(); // store.js 에 요청을 보내주는 함수

    let state = useSelector((state) => { return state }) // Redux store에 있던 state 남음

    return (
        <>
            <h6>{state.user.name}{state.user.age}의 장바구니</h6>

            <Button onClick={()=>{
                    dispatch(increase(100))
                }}
                >+</Button>

            <Button onClick={()=>{
                dispatch(changeName())
            }}>Cng</Button>

           <Table>


                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        cart.map((a, i) =>
                            <tr key={i}>
                                <th>{cart[i].id}</th>
                                <th>{cart[i].name}</th>
                                <th>{cart[i].count}</th>
                                <th>
                                    <Button onClick={()=>{
                                        dispatch(addCount(cart[i].id))
                                    }}>+</Button>
                                </th>
                            </tr>
                        )
                    }
                </tbody>
           </Table>
        </>
    )
}
export default Cart;
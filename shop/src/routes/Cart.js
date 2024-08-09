import { useState, useTransition, useDeferredValue } from "react";
import {Table} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {changeName, increase} from './../store/userSlice';
import { addCount } from './../store';


let c = new Array(10000).fill(0)


function Cart(){

    // Redux 사용하면 컴포넌트들이 props 없이  state 공유가능
    let state = useSelector((state)=>{return state}) //Redux store 가져와줌
    // let b = useSelector((state)=> state.user) //Redux store에 있는 user라는 항목만 가져와줌 : 
    console.log(state.user);

    let dispatch = useDispatch();

    // 간단한 프로젝트의 경우 컴포넌트가 몇개 없을 때에는 props 사용(짧기때문에)
    // 데이터 방대한 프로젝트의 경우에는 Redux 사용
    // Redux store 안에 모든걸 넣지 않아도 됩니다


    let [name, setName] = useState('');
    let [isPending, startTransition] = useTransition()
    let state2 = useDeferredValue(name)
    
    return(
        <div>
            <input onChange={(e)=>{ 
                startTransition(()=>{
                    // 코드시작을 뒤로 늦쳐줌
                    setName(e.target.value)
                })
            
            }} />
            {
                isPending ?  '로딩중' : 
                c.map(()=>{
                    // return <div>{name}</div>
                    return <div>{state2}</div>
                })
            }
            {state.user.name}{state.user.age}의 장바구니

            <button onClick={()=>{
                dispatch(increase(100))// 파라미터를 페이로드라 이름붙임
            }}>버튼</button>
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
                        state.cart.map((a, i)=>
                            <tr key={i}>
                            <td>{state.cart[i].id}</td>
                            <td>{state.cart[i].name}</td>
                            <td>{state.cart[i].count}</td>
                            <td><button onClick={()=>{
                                dispatch(addCount(state.cart[i].id))
                            }}>+</button></td>
                            </tr>
                        )
                    }


                </tbody>
            </Table> 
        </div>
    )
}

export default Cart;
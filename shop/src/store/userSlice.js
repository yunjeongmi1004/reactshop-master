import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState  : {name : 'kim', age : 20},

    //state 수정해주는 함수 만들기
    reducers:{

        changeName(state){
          state.name = 'park' // array/object의 경우 직접수정해도 state 변경됩니다
        },
        increase(state, action){
            state.age += action.payload
        },


    }
})


// state 수정해준 함수 export 해야함
export let {changeName, increase} = user.actions


export default user

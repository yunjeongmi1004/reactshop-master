import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { isStyledComponent } from 'styled-components';

let YellowBtn = styled.button`
    background : ${ props => props.bg };
    color : ${ props => props.bg == 'blue' ? 'white' : 'black' };
    padding:10px;
`
// let NewBtn = styled.button(YellowBtn)`


// `

// StyledComponent 단점 
// 1 JS파일 매우 복잡해짐
// 2 중복스타일은 컴포넌트간 import 할텐데 css파일과 다를 바가 없음
// 3 협업시 css담당의 숙련도 이슈 (도입여부는 생각해봐야함)


// 컴포넌트의 Lifecycle
// 1 페이지에 장착되기도 하고 (mount)
// 2 가끔 업데이트도 되고 (update)
// 3 필요없으면 제거되고 (unmount)




function Detail(props){





    let [count, setCount] = useState(0);


    // let [shoes] = useState(); 
    // - detail 안에 shoes라는 state 더 만들면 편할듯 하지만
    // - 데이터를 바꾸게 될때 관리가 어려워 일반적으로 이렇게 사용안함
    // - 데이터는 한곳에만 만들어 둘 것 

    let {id} = useParams(); 
    // 유저가 URL파라미터에 입력한거 가져오려면 useParams() 훅을 가져옵니다

    let 찾은상품 =  props.shoes.find((x) => x.id == id )

    let [alert, setalert] = useState(true);
    
    // mount, update시 코드 실행해주는 useEffect
    // useEffect 쓰는 이유 : html 렌더링 후에 동작합니다 - 시간이 오래 걸리는 어려운 연산 / 서버에서 데이터 가져오는 작업 / 타이머 장착하는거 사용합니다
    useEffect(()=>{
        console.log(1);
        setTimeout(()=>{setalert(false)}, 2000)
    }, [count])

    useEffect(()=>{
        setTimeout(()=>{setalert(false)}, 2000)
        console.log(2);
    }, []) // 컴포넌트 mount시 1회만 실행하고 싶으면 이렇게

    useEffect(()=>{
        console.log(3);
        let a = setTimeout(()=>{setalert(false)}, 2000)
        
        //clean up function : mount시 실행안됨, unmount시 실행됨
        return ()=>{
            console.log(33);
            clearTimeout(a) //기존 타이머는 제거해주세요~~
        }
    }, []) // useEffect 동작 전에 실행되는 return()=>{}


        //빡통식 정리시간 
        // useEffect(()=>{}) //1. 재렌더링마다 코드 실행하고 싶으면
        // useEffect(()=>{},[]) //2. mount 시 1회 코드실행하고싶으면
        // useEffect(()=>{
        //     return()=>{
        //     } //3. unmount시 1회 코드 실행하고 싶으면
        // },[]) 
        // useEffect(()=>{},[count]) //4. 특정  state 변경시에만 실행하려면 [state명]
            
    return(
        <div className="container">
            {
                alert == true
                ? <div className="alert alert-warning">
                    2초이내 구매시 할인
                    </div>
                : null
            }

            {count}
            <YellowBtn bg="blue" onClick={()=>{
                setCount(count +1)
            }}>버튼1</YellowBtn>
            <YellowBtn bg="pink">버튼2</YellowBtn>

            <div className="row">
                <div className="col-md-6">
                <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6">
                {/* <h4 className="pt-5">{props.shoes[현재url에입력한숫자].title}</h4> */}
                {/* <h4 className="pt-5">{props.shoes[id].title}</h4>
                <p>{props.shoes[id].content}</p>
                <p>{props.shoes[id].price}</p> */}

                <h4 className="pt-5">{찾은상품.title}</h4>
                <p>{찾은상품.content}</p>
                <p>{찾은상품.price}</p>
                <button className="btn btn-danger">주문하기</button> 
                </div>
            </div>
        </div> 
    )
}

export default Detail;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { isStyledComponent } from 'styled-components';
import {Nav} from 'react-bootstrap';
import { addItem } from './../store';
import { useDispatch } from "react-redux";
import { useLike } from "../hooks/like.js";
import { useUsername } from "../hooks/username.js";

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


    let [like, addLike] = useLike();

    let [username] =  useUsername();
    console.log(username)
 

    let [fade2, setFade2] = useState('')
    useEffect(()=>{
        let a = setTimeout(()=>{
            setFade2('end')
        }, 100)

        return ()=>{
            clearTimeout(a)
            setFade2('') 
        }
    }, []) 


    let [count, setCount] = useState(0);


    // let [shoes] = useState(); 
    // - detail 안에 shoes라는 state 더 만들면 편할듯 하지만
    // - 데이터를 바꾸게 될때 관리가 어려워 일반적으로 이렇게 사용안함
    // - 데이터는 한곳에만 만들어 둘 것 

    let {id} = useParams(); 
    // 유저가 URL파라미터에 입력한거 가져오려면 useParams() 훅을 가져옵니다

    let 찾은상품 =  props.shoes.find((x) => x.id == id )

    let [alert, setalert] = useState(true);
    let [탭, 탭변경] = useState(0);
    let dispatch = useDispatch();


    useEffect(()=>{
       let 꺼낸거 = localStorage.getItem('watched')
       꺼낸거 = JSON.parse(꺼낸거)
       꺼낸거.push(찾은상품.id)
       꺼낸거 = new Set(꺼낸거)
       꺼낸거 = Array.from(꺼낸거)
       localStorage.setItem('watched', JSON.stringify(꺼낸거))

       // 사이트 재접속시에도 데이터 유지되게 만들려면 localStorage 를 사용함
    }, [])
    
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
    
        

    // let[like, setLike] = useState(0);
    // function addLike(){
    //     setLike(a => a + 1)
    // }

    return(
        <div className={'container start ' + fade2}>
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
                    <div>{username}</div>
                
                    {like} <span onClick={() => {addLike()}}>♥</span>

                    {/* <h4 className="pt-5">{props.shoes[현재url에입력한숫자].title}</h4> */}
                    {/* <h4 className="pt-5">{props.shoes[id].title}</h4>
                    <p>{props.shoes[id].content}</p>
                    <p>{props.shoes[id].price}</p> */}

                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>{찾은상품.price}</p>
                    <button className="btn btn-danger" 
                    onClick={()=>{
                        dispatch(addItem({id : 1, name : 'Red Knit', count : 1},))
                    }}>주문하기</button> 
                </div>
            </div>

    

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{탭변경(0)}} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{탭변경(1)}} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{탭변경(2)}} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent2 shoes={props.shoes} 탭 = {탭}/>

        </div> 
    )
}

function TabContent(props){
    if(props.탭 == 0){
        return <div>내용0</div>
    }
    else if(props.탭 == 1){
        return <div>내용1</div>
    }
    else if(props.탭 == 2){
        return <div>내용2</div>
    }
}

// props어쩌구가 귀찮다면 ~ 
function TabContent2({탭, shoes}){
    // if(탭 == 0){
    //     return <div>내용0</div>
    // }
    // else if(탭 == 1){
    //     return <div>내용1</div>
    // }
    // else if(탭 == 2){
    //     return <div>내용2</div>
    // }

    let [fade, setFade] = useState('')

    // 리액트의 automatic batching 기능
    useEffect(()=>{
        let a = setTimeout(()=>{
            setFade('end')
        }, 100)

        return ()=>{
            clearTimeout(a)
            setFade('') 
        }
    }, [탭]) // 탭이라는게 변경될 때마다 안의 코드를 실행해줌

    //센스 좋은 방법
    return( 
    <div className={'start ' + fade}>
        {[<div>{shoes[0].title}</div>,<div>내용1</div>,<div>내용2</div>][탭]}
    </div>
    )
}



export default Detail;
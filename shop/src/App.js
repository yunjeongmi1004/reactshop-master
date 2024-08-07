import './App.css';
import {Container, Nav, Navbar} from 'react-bootstrap';
import bg from './bg.png'
import data from './data';
import { createContext, useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';
import Cart from './routes/Cart';
import axios from 'axios';
import {useQuery} from "react-query"


function App() {


  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify([]))
  }, [])
  // localStorage = 문자만 저장 가능, 숫자 넣어도 문자로 저장됨
  // 데이터입력
  // localStorage.setItem('age','20');

  // 데이터출력
  // localStorage.getItem('age')

  // 데이터삭제
  // localStorage.removeItem('age')
  // array/object 저장하려면 json으로 바꾸면 됩니다 
  let obj = {name : 'kim'};
  localStorage.setItem('data', JSON.stringify(obj));
  let 꺼낸거 = localStorage.getItem('data');
  console.log( JSON.parse(꺼낸거).name)


  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate(); /*  use로 시작되는것은 훅이다 */


  let result = useQuery('작명', ()=>{
     return axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      console.log('요청') // 틈만 나면 자동으로 refetch 해줌
      return a.data
    })
  }); 

  

  return (
    <div className="App">



      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">

            <Nav.Link onClick={()=>{ navigate(-1)}}>홈</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail')}}>상세페이지</Nav.Link>
          </Nav>
          <Nav className="ms-auto white nav-link">
            {result.isLoading && '로딩중'}
            {result.error && '에러남'}
            {result.data && result.data.name}
          </Nav>

        </Container>
      </Navbar>


      <Routes>
        <Route path="/" element={
          <>
          <div className="main-bg" style={{ backgroundImage : 'url(' + bg + ')' }}></div>
          <div className='row'>
          {shoes.map((a,i)=>{
              return(
                <Card shoes={shoes[i]} i={i+1}></Card>
              )
            })}
          </div>
            <button onClick={()=>{
              axios.get('https://codingapple1.github.io/shop/data2.json')
              .then((결과)=>{
                console.log(결과.data)
                console.log(shoes)

                let copy = [...shoes, ...결과.data];
                setShoes(copy);
              })
              .catch(()=>{
                console.log('실패함')//ajax 요청 실패할 경우 catch
              })

              // axios.post('/url', {name : 'kim'})//서버로 데이터 전송하는 post
              
              // Promise.all([axios.get('/url2'), axios.get('/url3')])
              // .then(()=>{
              //   //동시에 ajax요청 여러개 하려면
              //   "{"name" : "kim"}" // 따옴표 쳐놓으면 array, object도 주고받기 가능 : 일명 json
              // })

              // fetch('url')
              // .then(결과 => 결과.json())
              // .then(data=>{}) // axios 외부 라이브러리와 다르게 json을 array/object 변환과정이 필요하기때문


            }}>더보기</button>

            {/* ajax 쓰려면 옵션 3개중 택 1 
            1. XMLHttpRequest
            2. fetch()
            3. axios 같은거 
            리액트에서는 거의 서버와 ajax 이용해서 통신합니다. */}
          </>
          
        } />
        <Route path="/detail/:id" element={
         
            <Detail shoes={shoes}></Detail>
     
          } 
        />
        {/* :id = url 파라미터 라 명명함 잘 기억해 둘것 코딩애플 선생님이 말하심!! */}
        

        <Route path="/cart" element={
          <Cart></Cart>
        } 
        />
        
        {/* 3.Nested Routes 문법 : 장점 ROUTE가 간략해짐, 여러 유사한 페이지가 필요할때 사용함 */}
        <Route path="/about" element={<About></About>}>
          <Route path="member" element={<div>멤버임</div>}></Route>
          <Route path="location" element={<div>위치정보임</div>}></Route>
        </Route>
        
        <Route path="*" element={<div>없는 페이지에용 404</div>} />
       
      </Routes>





    </div>
  );
}

function About(){
  return(
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props){
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width="80%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.price }</p>
    </div>
  )
}
export default App;


// 240723 : ajax 
// 서버 : 부탁하면 진짜로 들어주는 프로그램
// 서버 개발시 짜는 코드 : 누가 a요청하면 a보내주세요
// 1. 방법 (GET:데이터가져올때/POST:데이터보낼때) / 2. 어떤자료(URL:서버만든사람한테 물어보면됩니다) 적어보내라
// 나 (GET요청 comic.naver.com) ---> <----- 네이버웹툰서버 (웹툰)


// 240724 : Context API 단점
// 1. state 변경시 쓸데없는 컴포넌트까지 전부 재렌더링
// 2. useContext() 를 쓰고 있는 컴포넌트는 나중에 다른 파일에서 재사용할 때 Context를 import하는게 귀찮아 질 수 있음
// 그래서 이것 보다는 redux 같은 외부라이브러리를 많이들 사용함
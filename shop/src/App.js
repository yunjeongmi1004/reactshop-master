import './App.css';
import {Container, Nav, Navbar} from 'react-bootstrap';
import bg from './bg.png'
import data from './data';
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';

function App() {

  let [shoes] = useState(data);
  let navigate = useNavigate(); /*  use로 시작되는것은 훅이다 */
  return (
    <div className="App">



      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">

            <Nav.Link onClick={()=>{ navigate(-1)}}>홈</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail')}}>상세페이지</Nav.Link>
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
          </>
        } />
        <Route path="/detail/:id" element={<Detail shoes={shoes}></Detail>} />
        {/* :id = url 파라미터 라 명명함 잘 기억해 둘것 코딩애플 선생님이 말하심!! */}
        
        
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

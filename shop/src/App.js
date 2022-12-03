/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import {Button, Navbar, Container, Nav} from "react-bootstrap";
import data from './data.js';
import { useState } from "react";
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import Detail from './routes/Detail.js'
function App() {

    let [shoes] = useState(data);
    let navigate = useNavigate();

    return (
        <div className="App">

            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Shopping Malls Project</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
                        <Nav.Link onClick={()=>{navigate('/detail')}}>Cart</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>

            {/* 페이지 이동 버튼 */}
            <Link to="/">Home</Link>
            <Link to="/detail">Detail</Link>
            <Link to="/about">About</Link>

            <Routes>
                <Route path="/*" element={<h1>에러페이지</h1>}/>
                <Route path="/" element={
                    <>
                        {/* 대문 사진 */}
                        <div className={"main-bg"} style={{backgroundImage: 'url(./images/bg.png)'}}></div>

                        {/* 상품 컴포넌트 */}
                        <div className={"container"}>
                            <div className={"row"}>

                                {
                                    shoes.map((a, i)=>{
                                        return(
                                            <ProductList shoes={shoes[i]} i={i}/>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </>
                }/>

                {/* URL Parameter 문법 */}
                <Route path="/detail/:id" element={<Detail shoes={shoes}/>}/>

                {/* Nested Router : 태그안에 태그가 들어간 형태 */}
                <Route path="/about" element={<About/>}>
                    <Route path="member" element={<div>멤버소개</div>}/>   {/* /about/memeber */}
                    <Route path="location" element={<div>위치정보</div>}/> {/* /about/location */}
                </Route>

            </Routes>

        </div>
    );

}
function About() {
    return(
        <>
            <h4>회사정보</h4>
            {/* Nested Router를 보여줄 자리가 <Outlet> */}
            <Outlet></Outlet>
        </>
    );
}
function ProductList(props) {

    return(
        <div className={"col-md-4"}>
            <img src={process.env.PUBLIC_URL + "./images/shoes"+ (props.i+1) +".jpeg"} width="80%" alt={'신발'+ (props.i+1) +' 이미지'}/>
            <h4>{props.shoes.title}</h4>
            <p>{props.shoes.content}</p>
        </div>
    );
}

export default App;

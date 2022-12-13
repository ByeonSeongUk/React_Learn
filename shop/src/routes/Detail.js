/* eslint-disable */
import {useParams} from "react-router-dom";
import styled from 'styled-components';
import {useContext, useEffect, useState} from "react";
import {Nav, Tab} from "react-bootstrap";

// context API 예제
import {Context1} from './../App.js'

// redux
import {useDispatch} from "react-redux";
import {addItem} from "../store";

// styled 라이브러리 기본 사용법
let Box = styled.div`
  padding : 20px;
  color : grey
`;

let YellowBtn = styled.button`
  // 삼항 연산자 등 조건문도 사용 가능
  background : ${ props => props.bg == 'blue'? 'white': 'black' };
  color : black;
  padding : 10px;
`;

// // 기존 스타일 복사도 가능
// let NewBtn = styled.button(YellowBtn)`
// `

function Detail(props) {

    let {contextTest} = useContext(Context1);

    // useEffect test 변수
    let [count, setCount] = useState(0)
    let [alert, setAlert] = useState(true);
    let [inputTest, setInputTest] = useState("");

    // :id 로 입력한 URL 파라미터 값을 받아온다.
    let {id} = useParams();

    // data.js의 id와 parameter id가 같은 것을 불러온다.
    let getProduct = props.shoes.find((x) => x.id == id);

    // 탭 상태 state
    let [tab, setTab] = useState(0);

    // 해당 컴포넌트가 나타날때 효과
    let [fade2, setFade2] = useState('');

    // redux 함수
    let dispatch = useDispatch();

    // --- useEffect
    // mount, update시 코드 실행해주는 useEffect
    useEffect(() => {
        let a = setTimeout(() => {
            setAlert(false)
        }, 2000)

        // clean up function
        // - useEffect 실행전에 사용할 함수를 선언하는 부분 (mount(장착)시 실행이 안되고, unmount(삭제)시 실행됨)
        return () => {
            console.log('test'); // return 안에 구현, setTimeout 이전에 실행되는 것을 확인

            // 타이머 제거 함수
            clearTimeout(a)
        }
    }, []);

    // 문자열 입력했을때
    useEffect(() => {
        if (isNaN(inputTest) === true) {
            console.log('숫자만 입력해주세요!');
        }
    }, [inputTest]);

    // 해당 컴포넌트 나타날떄 효과
    useEffect(() => {
       setFade2('end')
       return () => {
           setFade2('');
       }
    });


    // --- return
    return (
        <div className={"container start " + fade2}>
            <input onChange={(e) => {
                setInputTest(e.target.value)
            }}/>
            {
                alert == true
                    ? <div className={"alert alert-warning"}>
                        2초이내 구매시 할인
                    </div>
                    : null
            }
            {count}
            <button onClick={() => {
                setCount(count++)
            }}>버튼
            </button>


            {/* styled components */}
            {/*
            <Box>
                <YellowBtn bg={"blue"}>버튼</YellowBtn>
            </Box>
            */}


            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes1.jpg"} width="100%" alt={"상품 상세 이미지"}/>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{getProduct.title}</h4>
                    <p>{getProduct.content}</p>
                    <p>{getProduct.price}</p>
                    <button className="btn btn-danger" onClick={()=>{
                        console.log('click');
                        dispatch(addItem({id:2, name:'Grey Yordan', count: 1}))
                    }}>주문하기</button>
                    <p>{contextTest}</p>
                </div>
            </div>

            {/* 동적 UI - 탭 버튼 (bootstrap) */}
            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={ ()=>{ setTab(0); }}>버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={ ()=>{ setTab(1); }}>버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={ ()=>{ setTab(2); }}>버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab} shoes={props.shoes}/>


        </div>
    );
}

function TabContent(props) {
    // if (props.tab === 0) {
    //     return <div>내용0</div>
    // }
    // if (props.tab === 1) {
    //     return <div>내용1</div>
    // }
    // if (props.tab === 2) {
    //     return <div>내용2</div>
    // }
    let [fade, setFade] = useState('');

    useEffect(()=>{
        let a = setTimeout(()=>{ setFade("end") }, 100) // automatic batching 기능

        return(()=>{
            clearTimeout(a);
            setFade('');
        })
    },[props.tab])
    return (
        <div className={`start ${fade}`}>
            {[
                <div>{props.shoes[0].title}</div>,
                <div>{props.shoes[1].title}</div>,
                <div>{props.shoes[2].title}</div>
            ][props.tab]}
        </div>
    )

}
export default Detail;
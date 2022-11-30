/* eslint-disable */
import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function App() {

  // 변수 사용
  let post = 'clothes shopping mall';  

  // state 사용
  let [title, titleChange] = useState(['남자 코트 추천', '여자 코트 추천', '아이 코트 추천']); // 게시물 제목
  let [likey, likeyCount] = useState([0,0,0]);  // 게시물 좋아요 개수
  let [modal, setModal] = useState(false); // 모달창 on|off
  let [titleNum, setTitleNum] = useState(0); // 클릭한 게시물 정보의 seq (모달창 출력을 위해)
  let [inputTest, setInputTest] = useState(''); // input값 받아오기

  [1,2,3].map(function(a){
    return 'map test'
  })

  // Logo와 같이 자주 변경되지 않는 부분은 굳이 state 사용 X
  let [logo, setLogo] = useState('ReactBlog');

  return (
    // return 내의 태그에는 병렬 사용 불가(App 태그안에 선언)
    <div className="App">
    
      <div className="black-nav">
        <h4>{ logo }</h4>
      </div>

      <div className="list">
        {/* 글수정 버튼 */}
        <button 
          onClick={() => {
            let copy = [...title];
            copy[0] = '여자 코트 추천';
            titleChange(copy);
          }}
        > 글수정 
        </button>

        {/* 글정렬 버튼 */}
        <button 
          onClick={() => {
            let copy = [...title];
            copy.sort();
            titleChange(copy);
          }}
        > 글정렬 
        </button>

        {/* input 창 테스트 */}
        <input onChange={(e)=>{
          setInputTest(e.target.value);
          console.log(inputTest);
        }}/>

        <button onClick={()=>{
          // array, object는 바로 값을 변경하려고 하면 안된다.
          // 꼭 복사본을 가져온 후 -> 수정 -> 변경 함수에 적용 순서대로 작업
          let copy = [...title];
          let copy2 = [...likey];
          copy.unshift(inputTest);
          copy2.unshift(0);
          titleChange(copy);
          likeyCount(copy2);
        }}>발행</button>
      </div>
      {/* 
      <div className="list">
        <h4>{ title[0] } <span onClick={() => {likeyCount(likey++)}}>👍</span> {likey} </h4>
        <p>2월 17일 발행</p>
      </div>

      <div className="list">
        <h4>{ title[1] }</h4>
        <p>2월 17일 발행</p>
      </div>

      <div className="list">
        <h4 onClick={()=>{
            if(modal == false) {
              setModal(true);
            }
            else { 
              setModal(false);
            }
          }}>{ title[2] }</h4>
        <p>2월 17일 발행</p>
      </div>
      */}

      {/* 반복문 */}
      {
        title.map(function(a, i) {
          return (  
            <div className="list">
              <h4 onClick={()=>{
                    // if(modal == false) {
                    //   setModal(true);
                    // }
                    // else { 
                    //   setModal(false);
                    // };
                    setModal(true);
                    // 모달창 정보 받아오기
                    setTitleNum(i);
                  }}
              >{ title[i] }
                <span onClick={()=>{
                  let copy = [...likey]
                  copy[i]++
                  likeyCount(copy);
                }}
                > 👍 
                </span>
                { likey[i] }
              </h4>
              <p>2월 17일 발행</p>

              {/* 게시물 삭제 버튼 */}
              <button onClick={()=>{
                let copy = [...title];
                let remove = copy.splice(i, 1); // 인덱스 [i] 부터, 요소 [1]개 제거, 삭제한 데이터 [let remove로 반환]
                console.log('삭제 게시물 : '+remove);
                titleChange(copy);
              }}>삭제</button>

            </div>
          )
        })
      }

      {/* 조건문 */}
      {
        // 모달창 열기 | 닫기
        modal == true ? <Modal titleNum={ titleNum } titleChange={titleChange} color={'skyblue'} title={ title }/>: null
      }

      {/* 중괄호 문법 사용(Style) */}
      <h4 style={ {color:'red', fontSize:'16px'} }>{post}</h4>
      
      <Modal3></Modal3>

    </div>
  );
}

// 모달창
function Modal(props) {
    return (
      <div className="modal" style={{ background: props.color }}>
        <h4>{props.title[props.titleNum]}</h4>
        <p>날짜</p>
        <p>상세내용</p>
        <button onClick={()=>{ props.titleChange() }}>글수정</button>
      </div>
    );

}

/*
// 컴포넌트를 만드는 방법 1 - function 사용
function Modal1() {
  return (
    <div className="modal">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}

// 컴포넌트를 만드는 방법 2 - 변수, 상수 선언
const Modal2 = () => { // let, var, const 사용 가능
  return(    
    <div className="modal">
      <h4>제목</h4>
      <p>날짜</p>
      <p>상세내용</p>
    </div>
  );
}
*/

// 컴포넌트를 만드는 방법 3 - CLASS 문법
class Modal3 extends React.Component {
  constructor() {
    super();
    this.state = {
      title : '남자 코트 추천',
      date : '2월 17일',
      content : '상세내용'
    }
  }

  render() {
    return (
      <div className="modal">
        <h4>{this.state.title}</h4>
        <p>{this.state.date}</p>
        <p>{this.state.content}</p>
				<button onClick={()=>{ this.setState({title : '여자 코트 추천'}) }}>수정</button>
      </div>
    )
  }
}
export default App;

/* eslint-disable */
import {useParams} from "react-router-dom";

function Detail(props) {

    // :id 로 입력한 URL 파라미터 값을 받아온다.
    let {id} = useParams();

    let getProduct = props.shoes.find((x) => x.id == id  );

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={"https://codingapple1.github.io/shop/shoes1.jpg"} width="100%" alt={"상품 상세 이미지"}/>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{getProduct.title}</h4>
                    <p>{getProduct.content}</p>
                    <p>{getProduct.price}</p>
                    <button className="btn btn-danger">주문하기</button>
                </div>
            </div>
        </div>
    );
}
export default Detail;
import { Col, Row } from 'react-bootstrap';
import './orderDetail.css';

const OrderDetail = props => {
    return (
        <>
            <Col md={6} lg={4}>
                <div className="card m-3 shadow fpBG p-1">
                    <div className="card-header">
                        <span className='text-white'>Order Number:</span> <span className='cardText'>{props.order.id}</span>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><span className='cardText2'>User: &nbsp;&nbsp;&nbsp;</span><span className='cardText3'>{props.order.fullName}</span></li>
                        <li className="list-group-item"><span className='cardText2'>Email: &nbsp;&nbsp;</span><span className='cardText3'>{props.order.email}</span></li>
                        <li className="list-group-item"><span className='cardText2'>Phone: </span><span className='cardText3'>{props.order.phone}</span></li>
                        <li className="list-group-item"><span className='cardText2'>Adress: </span><span className='cardText3'>{props.order.address}</span></li>
                        <li className="list-group-item"><span className='cardText2'>Payment Type: </span><span className='cardText3'>{props.order.paymentType}</span></li>
                        <li className="list-group-item">
                            <span className='text-danger fw-bold'>Ordered</span> <br />
                            <Row>
                                <Col className='border border-bottom-0 border-start-0 border-top-0 border-2 border-info'><span className='cardText2 text-capitalize'>{props.order.ingredients[0].type} </span>x<span className='fw-bold text-success'>{props.order.ingredients[0].amount}</span></Col>
                                <Col className='border border-bottom-0 border-start-0 border-top-0 border-2 border-info'><span className='cardText2 text-capitalize'>{props.order.ingredients[1].type} </span>x<span className='fw-bold text-success'>{props.order.ingredients[1].amount}</span></Col>
                                <Col className=''><span className='cardText2 text-capitalize'>{props.order.ingredients[2].type} </span>x<span className='fw-bold text-success'>{props.order.ingredients[2].amount}</span></Col>
                            </Row>
                        </li>
                        <li className="list-group-item"><span className='cardText2'>Total Payable: </span><span className='text-success'>{props.order.totalPrice}</span> BDT</li>
                    </ul>
                </div>
            </Col >
        </>
    );
}

export default OrderDetail;
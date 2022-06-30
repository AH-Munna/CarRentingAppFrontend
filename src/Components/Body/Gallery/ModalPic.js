import { Button, Modal } from "react-bootstrap";
import '../../../StyleSheets/gradient.css';
import BookingForm from "./BookingForm";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

const mapStateToProps = state => {
    return {
        rents: state.state.rents,
        userId: state.state.auth.userId,
    }
}

const ModalPic = props => {
    const [userCanRent, setUserCanRent] = useState(true);
    const [isRented, setIsRented] = useState(false);
    useEffect(() => {
        if (props.car) {
            props.rents.map(rent => {
                if (rent.car === props.car.id)
                    setIsRented(true);
                if (rent.user === parseInt(props.userId)) {
                    setUserCanRent(false);
                }
            })
        }
    }, [props])
    // if (!userCanRent) debugger

    if (!props.car) return null;
    return (
        <Modal show={props.modalToggle} onHide={props.modalHandler}>
            <Modal.Header closeButton>
                <Modal.Title className="text-success">{props.car.car_name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.car.car_detail}
                {isRented ? <h3 className="text-center text-danger mt-4 mb-2">This Vehicle is Already Rented</h3> :
                    !userCanRent ?
                        <p className="text-center fs-5 text-danger my-2">You Already have one Vehicle Rented</p> :
                        <><h3 className="text-center mt-4 mb-2">Rent Available</h3>
                            <div className="text-success fw-b fs-5 pb-3 text-center my-2">For: {props.car.car_rent_price}</div>
                            <BookingForm car={props.car} addBooking={props.addBooking} />
                        </>}
            </Modal.Body>
            <Modal.Footer className="myModalFooterBG shadow">
                <Button variant="outline-secondary" onClick={props.modalHandler}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal >
    );
}

export default connect(mapStateToProps)(ModalPic);
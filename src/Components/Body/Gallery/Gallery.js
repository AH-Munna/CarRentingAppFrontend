import { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import '../../../StyleSheets/ItemMenu.css';
import { connect } from "react-redux";
import ModalPic from "./ModalPic";
import { addBooking, fetchRents, loadCars } from "../../../redux/ActionCreator";

const mapStateToProps = state => {
    return {
        cars: state.state.cars,
        category: state.state.selectedCategory,
        bookings: state.state.comments,
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        addBooking: bookingObj => dispatchEvent(addBooking(bookingObj)),
        fetchCars: () => dispatchEvent(loadCars()),
        fetchRents: () => dispatchEvent(fetchRents())
    }
}

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPic: null,
            modalToggle: false,
            show: false,
            setShow: false,
        }
    }
    onPicSelect = car => {
        this.setState({
            selectedPic: car,
        });
        this.modalHandler();
    }
    modalHandler = () => {
        this.setState({
            modalToggle: !this.state.modalToggle,
        })
    }
    componentDidMount() {
        this.props.fetchCars();
        this.props.fetchRents();
    }

    render() {
        document.title = "Cars";

        let galleryRender = null;
        if (this.props.cars && this.props.cars.length) {
            galleryRender = this.props.cars.map(car => {
                if (this.props.category === car.car_category) {
                    return (
                        <Col md={6} className="my-cards text-center" key={car.id}>
                            <Card onClick={() => this.onPicSelect(car)} className="my-5 p-1 shadow" style={{ cursor: "pointer" }}>
                                <CardBody>
                                    <CardText className="text-center display-5 tex-info mb-3">{car.car_name}'s Description</CardText>
                                    <CardText>{car.car_detail}</CardText>
                                </CardBody>
                                <CardTitle className="shadow bg-dark bg-opacity-50 m-1 text-white fs-4">
                                    {car.car_name}
                                </CardTitle>
                            </Card>
                        </Col>
                    )
                }
                return null;
            });
        }
        // galleryRender = [...galleryRender, ...galleryRender, ...galleryRender];
        // const bookedUser = bookingCheck(this.state.selectedPic)
        return (
            <>
                <ModalPic
                    modalToggle={this.state.modalToggle}
                    modalHandler={this.modalHandler}
                    car={this.state.selectedPic}
                    // bookingCheck={bookedUser}
                    addBooking={this.props.addBooking}
                />
                <Row>
                    {galleryRender}
                </Row>
            </>
        );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
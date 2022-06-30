import axios from "axios";
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Form, Field } from 'react-final-form';
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { Modal, ModalBody } from "reactstrap";
import { resetIngredients } from "../../../../redux/ActionCreator";
// import { INGREDIENT_PRICE } from "../../../../redux/Reducer";
// import { base_url } from "../../../redux/actTypes.js";
// import axios from 'axios';
import '../../../../StyleSheets/gradient.css';
import Spinner from "../../../Spinner/Spinner";

const mapStateToProps = state => {
    return {
        ingredients: state.state.ingredients,
        totalPrice: state.state.totalPrice,
        purchaseProps: state.state.purchase,
        token: state.state.auth.token,
        userId: state.state.auth.userId,
    }
}
const mapDispatchToProps = dispatch => {
    return { resetI: () => dispatch(resetIngredients()) }
}

class Checkouts extends React.Component {
    state = {
        alertShow: false,
        variant: "info",
        alertMessage: "",
        value: {
            deliveryAdress: "",
            phone: "",
            paymentType: "select payment type...",
        },
        submissionLoad: false,
    };
    handleSelect = () => {
        if (this.state.contactType === "Email") {
            this.setState({
                contactType: "Phone"
            })
        } else {
            this.setState({
                contactType: "Email"
            })
        }
    }
    navigateMinusOne = () => { this.props.navigate(-1) }

    validate = event => {
        const errors = {};
        //email
        if (event.Email && !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(event.Email))) errors.Email = 'Enter valid Email';
        if (!event.Email) errors.Email = "Enter Email";
        //phone
        if (!event.Phone) errors.Phone = "Enter Contact";
        //Address
        if (event.deliveryAdress && event.deliveryAdress.length < 5) errors.message = 'Enter valid address';
        //payment type
        if (event.paymentType === 'select payment type...' || !event.paymentType) errors.paymentType = 'Select Payment Type';
        //term agree
        if (!event.termAgree || !event.termAgree.length) errors.termAgree = "Agree to Continue";

        return errors;
    }
    onSubmit = inputs => {
        this.setState({ submissionLoad: true });
        inputs.termAgree[0] === 'termAgreeCheck' ? inputs.termAgree = true : inputs.termAgree = false;
        if (!inputs.fullName) inputs.fullName = inputs.Email;

        const orderObj = {
            fullName: inputs.fullName,
            phone: inputs.Phone,
            email: inputs.Email,
            agree: inputs.termAgree,
            address: inputs.deliveryAddress,
            paymentType: inputs.paymentType,
            orderTime: new Date(),
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
            userId: this.props.userId,
        }
        console.log(orderObj);
        axios.post("https://react-burger-builder-26069-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=" + this.props.token, orderObj)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        alertShow: true,
                        alertMessage: "All Information seems good. your delivery will be done according to your payment type",
                        variant: "success",
                        submissionLoad: false,
                    })
                    this.props.resetI();
                    // setTimeout(() => {
                    //     this.setState({
                    //         alertShow: false,
                    //     })
                    // }, 5000);
                } else {
                    this.setState({
                        alertShow: true,
                        alertMessage: "Form submission error. Try again",
                        variant: "warning",
                        submissionLoad: false,
                    })
                }
            }).catch(error => {
                this.setState({
                    alertShow: true,
                    alertMessage: `${error.message}.`,
                    variant: "danger",
                    submissionLoad: false,
                })
            });
    }
    render() {
        document.title = "Checkout";
        if (this.state.submissionLoad) {
            return (<Spinner />)
        }
        const bgName = `bg-${this.state.variant}`;
        return (
            <div className="text-center">
                <Modal isOpen={this.state.alertShow} onClick={this.navigateMinusOne}>
                    <ModalBody className={bgName}>
                        <span className="text-white">{this.state.alertMessage}</span>
                    </ModalBody>
                </Modal>

                <Row>
                    <Col className="mt-3">
                        <h3 className="display-5 fw-bold text-danger">Your Checkout Informations</h3><hr className="text-info" />
                        <Card className="text-dark">
                            <Card.Header className="text-success">Payable</Card.Header>
                            <Card.Body>
                                <Card.Title>Total Cost: {this.props.totalPrice}</Card.Title>
                                <Card.Text>
                                    You can pay <span className="text-warning">on delivery</span> or with <span className="text-warning">Bkash</span>/<span className="text-warning">Credit Card</span>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mb-5 d-flex justify-content-center py-5">
                    <Col xs md={7} lg={6} className="myBGT p-5">
                        <Form
                            onSubmit={this.onSubmit}
                            validate={this.validate}
                            subscription={{ submitting: true, pristine: true }}
                            initialValues={this.state.value}
                            render={({ handleSubmit, form, submitting, pristine }) => (
                                <form onSubmit={handleSubmit}>

                                    <Field name="deliveryAddress">
                                        {({ input, meta }) => (
                                            <div className="my-4">
                                                <label className="form-label">Your Address</label><br />
                                                <textarea required={true} rows={3} className="form-control myBG" {...input} placeholder="eg. road-07, house-38, sector-7, Uttra, Dhaka" />
                                                {meta.touched && meta.error && <span>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>

                                    <Field name="fullName">
                                        {({ input, meta }) => (
                                            <div className="mb-4">
                                                <label className="form-label">Full Name</label><br />
                                                <input className="form-control myBG" type="text" {...input} placeholder="name..." />
                                                {meta.touched && meta.error && <span>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>

                                    <Field name="Email">
                                        {({ input, meta }) => (
                                            <div>
                                                <label className="form-label">Email</label>
                                                <input className="form-control myBG mb-3" type="email" {...input} placeholder="example@mail.com" />
                                                {meta.touched && meta.error && <span className="text-danger fs-6 fw-bold">{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>
                                    <Field name="Phone" className="my-3">
                                        {({ input, meta }) => (
                                            <div>
                                                <label className="form-label">Phone</label>
                                                <input className="form-control myBG" type="number" {...input} placeholder="888-88-888-88" />
                                                {meta.touched && meta.error && <span>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>

                                    <Field name="paymentType">
                                        {({ input, meta }) => (
                                            <div className="mt-4">
                                                <select className="form-control myBG" {...input}>
                                                    <option>select payment type...</option>
                                                    <option value="Cash">Cash on Delivery</option>
                                                    <option value="Bkash">Bkash</option>
                                                    <option value="credit">Credit Card</option>
                                                </select>
                                                {meta.touched && meta.error && <span className="text-white ms-1">{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>

                                    <Field name="termAgree">
                                        {({ input, meta }) => (
                                            <div className="mt-4">
                                                <Field
                                                    name="termAgree"
                                                    component="input"
                                                    type="checkbox"
                                                    value="termAgreeCheck"
                                                    className="form-check-input"
                                                    id="termAgree4"
                                                />
                                                <label className="form-label" htmlFor="termAgree">
                                                    &nbsp;Agree to Term
                                                </label><br />
                                                {meta.touched && meta.error && <span className='text-white'>{meta.error}</span>}
                                            </div>
                                        )}
                                    </Field>

                                    <button disabled={!this.props.purchaseProps} type="submit" className="me-1 btn shadow myBtnBG rounded-pill px-5 py-2 fw-bold fs-6 text-light mt-3">Proceed to Checkout</button>
                                    <button onClick={this.navigateMinusOne} type="button" className="btn shadow btn-secondary rounded-pill px-5 py-2 fw-bold fs-6 text-light mt-3">Cancel Checkout</button>
                                </form>
                            )} />
                    </Col>
                </Row>
                <Row>

                </Row>
            </div>
        );
    }
}

const Checkout = props => {
    const navigate = useNavigate();

    return <Checkouts {...props} navigate={navigate} />;
}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
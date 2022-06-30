import { connect } from "react-redux";
import { Formik } from "formik";
import axios from 'axios';
import { useState } from "react";
import { Alert } from 'reactstrap';

const mapStateToProps = state => {
    return {
        email: state.state.email,
        token: state.state.auth.token,
        userId: state.state.auth.userId,
        account_type: state.state.auth.account_type,
    }
}

const FeedBack = props => {
    const [alertShow, setAlertShow] = useState(false);
    const [alertMsg, setAlertMsg] = useState("");
    const [alertType, setAlertType] = useState("");

    const onDismiss = () => {
        setAlertShow(false);
    }
    document.title = "Add Car";
    const userEmail = localStorage.getItem('email');
    if (!userEmail) return (<h1 className="text-center text-danger display-1 fw-bold my-5">You are not logged in</h1>);
    // debugger
    if (props.account_type !== 'owner') return (<h1 className="text-center text-danger display-1 fw-bold my-5">Only Owner can add cars</h1>);
    return (
        <div>
            <Alert className="shadow" color={alertType} isOpen={alertShow} toggle={onDismiss}>
                {alertMsg}
            </Alert>
            <h1 className="display-4 text-center text-info my-3 fw-bold">Add a car in one of the Category</h1>
            <h4 className="text-center text-success my-3">Your Email: {userEmail}</h4>
            <Formik
                initialValues={{ car_name: "", car_detail: "", car_owner: "", car_category: "5", car_rent_price: "" }}
                validate={values => {
                    const errors = {};
                    // car_name
                    if (!values.car_name.length) errors.car_name = "name can't empty";
                    // car_rent_price
                    if (!values.car_rent_price) errors.car_rent_price = "rent can't be free";
                    return errors;
                }}
                onSubmit={values => {
                    const carObj = {
                        car_name: values.car_name,
                        car_detail: values.car_detail,
                        car_rent_price: parseFloat(values.car_rent_price),
                        car_owner: parseInt(props.userId),
                        car_category: parseInt(values.car_category)
                    }
                    axios.post('http://127.0.0.1:8000/api/cars/', carObj)
                        .then(response => {
                            setAlertMsg("Your Car Added Successfully.");
                            setAlertShow(true);
                            setAlertType("success");
                        }).catch(error => {
                            setAlertMsg(error.message);
                            setAlertShow(true);
                            setAlertType("danger");
                        });
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <div className="d-flex justify-content-center">
                        <form onSubmit={handleSubmit} className="col-md-6">
                            {/* car_name */}
                            <label className="form-label">Car Name</label>
                            <input className="form-control"
                                type="text"
                                name="car_name"
                                onChange={handleChange}
                                placeholder="name of the car..."
                                onBlur={handleBlur}
                                value={values.car_name} />
                            <span className="text-center text-danger">{errors.car_name && touched.car_name && errors.car_name}</span><br className="mb-3" />
                            {/* car_detail */}
                            <label className="form-label">Car Description</label>
                            <textarea className="form-control mb-3"
                                name="car_detail"
                                rows={7}
                                placeholder="description..."
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.car_detail}
                            />
                            <span className="text-center text-danger">{errors.car_detail && touched.car_detail && errors.car_detail}</span>
                            {/* car_rent_price */}
                            <label className="form-label">Rent Price</label>
                            <input className="form-control"
                                type="number"
                                name="car_rent_price"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.car_rent_price} />
                            <span className="text-center text-danger">{errors.car_rent_price && touched.car_rent_price && errors.car_rent_price}</span><br className="mb-3" />
                            {/* car_category */}
                            <label className="form-label">Category</label>
                            <select className="form-control mb-5"
                                name="car_category"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.car_category}>
                                <option value="5">Car</option>
                                <option value="6">Bus</option>
                                <option value="7">Truck</option>
                                <option value="8">Bike</option>
                            </select>
                            <span className="text-center text-danger">{errors.car_category && touched.car_category && errors.car_category}</span>
                            {/* button */}
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-outline-info rounded-pill px-5 py-2 fw-bold fs-6" type="submit" disabled={isSubmitting}>
                                    Add Car
                                </button>
                            </div>
                        </form></div>
                )}
            </Formik>
        </div >
    );
}

export default connect(mapStateToProps)(FeedBack);
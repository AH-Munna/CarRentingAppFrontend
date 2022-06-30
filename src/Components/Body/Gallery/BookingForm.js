import React from "react";
import '../../../StyleSheets/gradient.css';
import { Formik } from "formik";
import { connect } from "react-redux";
import { useNavigate } from "react-router";

const mapStateToProps = state => {
    return {
        email: state.state.email,
        token: state.state.auth.token,
        userId: state.state.auth.userId,
        category: state.state.selectedCategory,
    }
}

const BookingForm = props => {
    const navigate = useNavigate();
    const clickNavigate = () => {
        navigate('/auth');
    }
    const email = localStorage.getItem('email');
    if (!email) return (
        <div>
            <h3 className="text-danger text-center display-6 mb-3">Login to Rent this Car</h3>
            <div className="d-flex justify-content-center mb-5">
                <button onClick={clickNavigate} className="btn btn-outline-secondary">Login/Register</button>
            </div>
        </div>
    );

    return (
        <div className="p-3 myBGT">
            <h3 className="display-5 fw-bold text-center text-info text-shadow">Your information</h3>
            <p className="text-center fs-4 text-white my-3">email: {email}</p>
            <Formik
                initialValues={{ name: "", phone: "", payment: "bkash" }}
                validate={values => {
                    const errors = {};
                    if (values.name.length < 3) errors.name = "name can't be that short";
                    if (values.phone < 60000000) errors.phone = "Enter valid phone number";
                    return errors;
                }}
                onSubmit={values => {
                    const rentObj = {
                        car: props.car.id,
                        customer: {
                            address: values.name,
                            phone: values.phone,
                            payment_type: values.payment
                        },
                        user: props.userId
                    }
                    debugger
                    props.addBooking(rentObj);
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
                        <form onSubmit={handleSubmit} className="col-12">
                            <label className="form-label">Your Address</label>
                            <textarea className="form-control mb-3"
                                rows={5}
                                name="name"
                                placeholder="eg. road-2 house-3"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                            <span className="text-center">{errors.name && touched.name && errors.name}</span><br />
                            <label className="form-label">Phone number</label>
                            <input className="form-control mb-3"
                                name="phone"
                                type="number"
                                placeholder="888-88888-888-888"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.phone}
                            />
                            <span className="text-center">{errors.phone && touched.phone && errors.phone}</span>
                            <label className="form-label">Payment Type</label>
                            <select className="form-control mb-3"
                                name="payment"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.payment}>
                                <option value="bkash">Bkash</option>
                                <option value="credit">Credit</option>
                                <option value="delivery">On Delivery</option>
                            </select>
                            <span className="text-center">{errors.payment && touched.payment && errors.payment}</span>
                            <div className="d-flex justify-content-center">
                                <button className="btn btn-info rounded-pill px-5 py-2 fw-bold fs-6" type="submit" disabled={isSubmitting}>
                                    Rent
                                </button>
                            </div>
                        </form></div>
                )}
            </Formik>
        </div>
    );
}

export default connect(mapStateToProps)(BookingForm);
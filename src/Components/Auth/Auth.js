import { Formik } from "formik";
import { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { Alert } from "reactstrap";
import { authenticate } from "../../redux/AuthActionCreator";
import '../../StyleSheets/gradient.css';
import Spinner from '../Spinner/Spinner.js';

const mapStateToProps = state => {
    return {
        authLoading: state.state.auth.authLoading,
        failledMessage: state.state.auth.authFailedMessage,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        authProp: (email, password, userMode, accType) => dispatch(authenticate(email, password, userMode, accType)),
    }
}

class Auths extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: (this.props.failledMessage && this.props.failledMessage.length > 0) ? true : false,
            userMode: "Login",
        };

        this.onDismiss = this.onDismiss.bind(this);
    }
    onDismiss() {
        this.setState({ visible: false });
    }
    switchMode = () => {
        this.setState({
            userMode: this.state.userMode === "Sign Up" ? "Login" : "Sign Up",
        })
    }
    render() {
        if (this.props.authLoading) return <Spinner />;
        return (
            <>
                <Alert className="shadow" color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                    {this.props.failledMessage}
                </Alert>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }}
                    onSubmit={values => {
                        this.props.authProp(values.email, values.password, this.state.userMode, values.accType);
                    }}
                    validate={values => {
                        const errors = {};
                        //email
                        if (!values.email) errors.email = 'Required';
                        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) errors.email = 'Enter valid email';
                        //password
                        if (this.state.userMode === "Sign Up" && values.password.length < 6) errors.password = "Password should be at least 6 characters";
                        else if (this.state.userMode === "Sign Up" && values.password !== values.confirmPassword) errors.confirmPassword = "password not matched";
                        //account type
                        if (this.state.userMode === "Sign Up")
                            if (!values.accType || values.accType === "s") errors.accType = "please select account type";
                        return errors;
                    }}>
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <>
                            <Row>
                                <Col className="d-flex justify-content-center text-center">
                                    <form onSubmit={handleSubmit} className="myBGT col-md-6 p-5">
                                        <h1 className="display-4 text-success mb-4 fw-bold">User {this.state.userMode}</h1>
                                        <label htmlFor="email" className="form-label fs-5">Email address</label>
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            className="form-control"
                                            placeholder="example@mail.com"
                                        />
                                        <span className="warningColor">{errors.email && touched.email && errors.email}</span><br className="mb-4" />

                                        <label htmlFor="password" className="form-label fs-5">Password</label>
                                        <input className="form-control"
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            placeholder="password"
                                        />
                                        <span className="warningColor">{errors.password && touched.password && errors.password}</span><br className="mb-4" />

                                        {this.state.userMode === "Login" ? null : <>
                                            <label htmlFor="confirmPassword" className="form-label fs-5">Confirm Password</label>
                                            <input className="form-control"
                                                type="password"
                                                name="confirmPassword"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.confirmPassword}
                                                placeholder="confirm"
                                            />
                                            <span className="warningColor">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</span><br className="mb-4" />

                                            <label htmlFor="accType" className="form-label fs-5">Account Type</label>
                                            <select className="form-control"
                                                name="accType"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.accType}>
                                                <option value="s">Select Option...</option>
                                                <option value="owner">Car Owner</option>
                                                <option value="client">Client</option>
                                            </select>
                                            <span className="warningColor">{errors.accType && touched.accType && errors.accType}</span><br className="mb-4" />
                                        </>}

                                        <button disabled={isSubmitting} type="submit" className="btn shadow myBtnBG rounded-pill px-5 py-2 fs-5 text-light mt-3">{this.state.userMode}</button>
                                    </form>
                                </Col>
                            </Row>
                            <div className="d-flex justify-content-center">
                                <button onClick={this.switchMode} disabled={this.state.userMode === "Login"} type="button" className="me-1 btn shadow btn-outline-secondary rounded-pill px-5 py-2 fw-bold fs-6 mt-3">Login</button>

                                <button onClick={this.switchMode} disabled={this.state.userMode === "Sign Up"} type="button" className="btn shadow btn-outline-secondary rounded-pill px-3 py-2 fw-bold fs-6 mt-3">Registration</button>
                            </div>
                        </>

                    )}
                </Formik>
            </>
        );
    }
}

const Auth = props => {
    const navigate = useNavigate();

    return <Auths {...props} navigation={navigate} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
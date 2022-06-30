import { useEffect } from "react";
import { connect } from "react-redux";
import { authLocalCheck } from "../redux/AuthActionCreator";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import './MainControl.css';

const mapDispatchToProps = dispatchEvent => {
    return { localAuth: () => dispatchEvent(authLocalCheck()) }
}

const MainControl = props => {
    useEffect(() => {
        props.localAuth();
    });
    return (
        <>
            <Header />
            <div className="myBG">
                <div className="container">
                    <Body />
                </div>
            </div>
            <Footer />
        </>
    )
};

export default connect(null, mapDispatchToProps)(MainControl);
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import { userLogout } from "../../redux/AuthActionCreator";
import { useEffect } from "react";

const mapDispatchToProps = dispatchEvent => {
    return { userLogout: () => dispatchEvent(userLogout()) }
}

const LogOut = props => {
    let navigate = useNavigate();
    useEffect(() => {
        props.userLogout();
        navigate("/auth");
    });
}

export default connect(null, mapDispatchToProps)(LogOut);
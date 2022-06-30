import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from '../Auth/Auth.js';
import LogOut from '../Auth/logout.js';
import { connect } from 'react-redux';
import Gallery from './Gallery/Gallery.js';
import GalleryCategory from './Gallery/GalleryCategory.js';
import Empty from '../Auth/empty.js';
import Feedback from './feedback/feedback.js';

const mapStateToProps = state => {
    return {
        token: state.state.auth.token,
        userId: state.state.auth.userId,
        type: state.state.auth.account_type,
    }
}

const Body = props => {
    let authRoute = null;
    let carAdd = null;
    if (props.token && props.userId) {
        authRoute = <Route exact path="/logout" element={<LogOut />} />
        if (props.type === 'owner') carAdd = <Route exact path="/add-car" element={<Feedback />} />
    } else {
        authRoute = <Route exact path="/auth" element={<Auth />} />
    }
    return (
        <div className='py-4'>
            <Routes>
                {authRoute}
                {carAdd}
                <Route exact path="/cars" element={<Gallery />} />
                <Route exact path="/empty" element={<Empty />} />
                <Route exact path="/category" element={<GalleryCategory />} />
                <Route exact path="/" element={<Navigate replace to="/category" />} />
                <Route path="*" element={<Navigate to="/category" replace />} />
            </Routes>
        </div>
    );
}

export default connect(mapStateToProps)(Body);
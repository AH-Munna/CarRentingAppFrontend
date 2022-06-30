import { useEffect } from "react";
import { useNavigate } from "react-router"

const Empty = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/auth')
    });
    return (<></>);
}

export default Empty;
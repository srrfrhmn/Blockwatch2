import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Dashboard() {
    const navigate = useNavigate();

    const {user} = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if(user !== null) {
            navigate("/");
        }
    }, [user,navigate])

    return (
        <>
        <div className="landing">
            <div className="landing-text">
                <h1>Your look into the Blockchain and beyond.</h1>
                <p>Discover the tools and information you need to buy, sell, trade, invest, and spend cryptocurrencies.</p>
            </div>
            <div className="landing-image">
                <h1></h1>
            </div>
        </div>
        </>
    )
}
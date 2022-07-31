import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CoinForm from "../components/CoinForm";
import CoinItem from "../components/CoinItem";
import Spinner from "../components/Spinner";
import { getCoins, reset} from "../features/coins/coinSlice";

import Topten from "../components/topten/Topten";

export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector(
        (state) => state.auth
    );

    const {coins, isLoading, isError, message} = useSelector(
        (state) => state.coins);

    useEffect(() => {
        if(isError){
            console.log(message);
        }

        if(user === null) {
            navigate("/about");
        }

        try{
            dispatch(getCoins());
        } catch(e){
            console.log(e);
        }
        // dispatch(getCoins());
        console.log("using effect");
        return () => {
            dispatch(reset())
        }
    }, []);
    // }, [user,navigate, isError, message, dispatch]);
    if(isLoading){
        return <Spinner />
    }

    return (
        <>
        <section className="heading">
            <h1>Welcome {user && user.firstName} .</h1>
            <p>This is your watchlist.</p>
        </section>
        <CoinForm />
        <section className="content">
            {coins.length > 0 ? (
                <div className="coins">
                    {coins.map((coin) => (
                        <CoinItem key={coin._id} coin={coin} />
                    ))}
                </div>
            ) : (<h3> You have not set any goals </h3>)}
        </section>
        <Topten />
        </>
    )
}
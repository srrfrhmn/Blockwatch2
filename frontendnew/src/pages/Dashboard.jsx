import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CoinForm from "../components/CoinForm";
import CoinItem from "../components/CoinItem";
import Spinner from "../components/Spinner";
import { getCoins, reset} from "../features/coins/coinSlice";

import Topten from "../components/topten/Topten";

export default function Dashboard() {

    const GET_COIN = '/api/coins/getCoin'

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector(
        (state) => state.auth
    );

    const {coins, doUpdate, isLoading, isError, message} = useSelector(
        (state) => state.coins);


    const [ prices , setPrices ] = useState([]);
    const [coinData, setCoinData] = useState([]);

    const getCoin = async (xcoin) => {
        try {
            const response = await axios.post(GET_COIN, {
                coin: xcoin
            })
            setCoinData(response.data)
            return response.data
        } catch (error) {
            console.log("error in getCoin", error)
            return error
        }

    }

    useEffect(() => {
        async function getPrices() {
            try {
                const promises = coins.map(async (coin) => {
                    const coinPrice = await getCoin(coin.coin);
                    return coinPrice.market_data.current_price.usd;
                });
            const prices = await Promise.all(promises);
            setPrices(prices);
            } catch (error) {
                console.error("error in get prices", error);
            }
        }
        getPrices();
    }, [coins]);

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
        return () => {
            dispatch(reset())
        }
    }, [doUpdate]);
    
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
                    {coins.map((coin, idx) => 
                        <CoinItem key={coin._id} coin={coin} currentPrice={prices[idx]}/>
                    )}
                </div> 
            ) : (<h3> You have not set any goals </h3>)}
        </section>
        {/* <Topten /> */}
        </>
    )
}
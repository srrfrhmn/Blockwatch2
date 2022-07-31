import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"
import {delCoin} from "../features/coins/coinSlice"

export default function CoinItem({coin}) {
    const dispatch = useDispatch();

    let getCoinURL = "http://localhost:5001/api/coins/getCoin"

    let getCoinById = async (id) => {
        //send get request to url with id in the request body as coin
        let response = await axios.get(getCoinURL, {
            params: {
                coin: id
            }
        })
        return response.data
    }


    return (
        <>
        <div className="coin">
            <div>
                {new Date(coin.createdAt).toLocaleDateString('en-US')}
            </div>
            <h2>{coin.coin}</h2>
            <h1></h1>
            <button onClick={() => dispatch(delCoin(coin.coin))} className="close">X</button>
        </div>
        </>
    )
}
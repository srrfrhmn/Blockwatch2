import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactDOM } from "react";
import { useRef } from "react";
import * as Sort from "./SortFunctions";

import "./Topten.css";


export default function Topten(){

    const [data, setData] = React.useState([]);
    const [isRankAsc, setIsRankAsc] = useState(true);
    const [isNameAlpha, setIsNameAlpha] = useState(false);
    const [isPriceAsc, setIsPriceAsc] = useState(false);
    const [is24Asc, setIs24Asc] = useState(false);
    const [is7Asc, setIs7Asc] = useState(false);
    const [isMCAsc, setIsMCAsc] = useState(true);

    useEffect(() => {
        try{
            axios.get("https://blockwatchserver.herokuapp.com/api/coins/getTop10")
            .then(res => {
                setData(res.data)
            })
        }
        catch(err){
            console.log(err);
        }
    }, []);


    useEffect(() => {
            const coins24 =  document.getElementsByClassName("topten-item-change-24h item");
            const coins7 = document.getElementsByClassName("topten-item-change-7d item");
            for(let i = 0; i < coins24.length; i++){
                if(coins24[i].innerHTML[0] === "-"){
                    coins24[i].style.color = "#B41B1B";
                }
                else{
                    coins24[i].style.color = "#0D8D50";
                }
            }

            for(let j = 0; j < coins7.length; j++){
                if(coins7[j].innerHTML[0] === "-") {
                    coins7[j].style.color = "#B41B1B";
                }
                else{
                    coins7[j].style.color = "#0D8D50";
                }
            }


    });

    function handleRankClick(){
        if(isRankAsc){
            Sort.sortRankByDesc(data);
            setIsRankAsc(false);
        }
        else{
            Sort.sortRankByAsc(data);
            setIsRankAsc(true);
        }
    }
    
    function handleNameClick(){
        if(!isNameAlpha){
            Sort.sortNameByAlphaOrder(data);
            setIsNameAlpha(true);
        }
        else{
            Sort.sortNameByAlphaReverse(data);
            setIsNameAlpha(false);
        }
    }

    function handleMCClick(){
        if(isMCAsc){
            Sort.sortMarketCapByDesc(data);
            setIsMCAsc(false);
        }
        else{
            Sort.sortMarketCapByAsc(data);
            setIsMCAsc(true);
        }
    }

    function handlePriceClick(){
        if(!isPriceAsc){
            Sort.sortPriceByHighest(data);
            setIsPriceAsc(true);
        }
        else{
            Sort.sortPriceByLowest(data);
            setIsPriceAsc(false);
        }
    }

    function handle24Click(){
        if(!is24Asc){
            Sort.sort24HrChangeByAsc(data);
            setIs24Asc(true);
        }
        else{
            Sort.sort24HrChangeByDesc(data);
            setIs24Asc(false);
        }
    }

    function handle7Click(){
        if(!is7Asc){
            Sort.sort7DayChangeByAsc(data);
            setIs7Asc(true);
        }
        else{
            Sort.sort7DayChangeByDesc(data);
            setIs7Asc(false);
        }
    }


    return(
        <React.Fragment>
            <div className="topten-container">
                <div className="topten-list">
                    <div className="topten-list-header">
                        <div className="topten-list-header-item" onClick={handleRankClick}>Rank</div>
                        <div className="topten-list-header-item" onClick={handleNameClick}>Name</div>
                        <div className="topten-list-header-item" onClick={handlePriceClick}>Price</div>
                        <div className="topten-list-header-item" onClick={handle24Click}>Change (24h)</div>
                        <div className="topten-list-header-item" onClick={handle7Click}>Change (7d)</div>
                        <div className="topten-list-header-item" onClick={handleMCClick}>Market Cap</div>
                    </div>
                    {data.map((coin , index)=> {
                        return(
                            <div className="topten-item" key={index}>
                                <div className="topten-item-rank item">{coin.market_cap_rank}.</div>
                                <div className="topten-item-name item">
                                    <img className="topten-item-img item" src={coin.image} alt="" />
                                    {coin.name}
                                    </div>
                                <div className="topten-item-price item">${coin.current_price.toLocaleString()}</div>
                                <div className="topten-item-change-24h item">{coin.price_change_percentage_24h.toFixed(2)}%</div>
                                <div className="topten-item-change-7d item">{coin.price_change_percentage_7d_in_currency.toFixed(2)}%</div>
                                <div className="topten-item-marketcap item">${coin.market_cap.toLocaleString()}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </React.Fragment>
    );
}

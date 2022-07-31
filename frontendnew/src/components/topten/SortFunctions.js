import Topten from "./Topten";

// Default Top 10 Table
export function sortRankByAsc(data){
    return data.sort((a,b) => {
        return a.market_cap_rank - b.market_cap_rank;
    });
}
// Sorting Table by Rank descending (10 to 1)
export function sortRankByDesc(data){ 
    return data.sort((a,b) => {
        return b.market_cap_rank - a.market_cap_rank;
    });
}

// Sorting table by Name in alphabetical order (a to z)
export function sortNameByAlphaOrder(data){ 
    return data.sort((a,b) => {
        return a.name.localeCompare(b.name);
    });
}

// Sorting table by Name in alphabetical order (a to z)
export function sortNameByAlphaReverse(data){ 
    return data.sort((a,b) => {
        return b.name.localeCompare(a.name);
    });
}

// Sorting table by Price in asc order 
export function sortPriceByLowest(data){ 
    data.sort((a,b) => {
        console.log(a.current_price > b.current_price);
        return (a.current_price - b.current_price);
    });
}

// Sorting table by Price in desc order 
export function sortPriceByHighest(data){ 
    data.sort((a,b) => {
        return (b.current_price - a.current_price);
    });
}

// Sorting table by Change (24hrs) in asc order 
export function sort24HrChangeByAsc(data){ 
    data.sort((a,b) => {
        return (a.price_change_percentage_24h_in_currency - b.price_change_percentage_24h_in_currency);
    });
}

// Sorting table by Change (24hrs) in desc order 
export function sort24HrChangeByDesc(data){ 
    data.sort((a,b) => {
        return (b.price_change_percentage_24h_in_currency - a.price_change_percentage_24h_in_currency);
    });
}

// Sorting table by Change (7d) in asc order 
export function sort7DayChangeByAsc(data){ 
    data.sort((a,b) => {
        return (a.price_change_percentage_7d_in_currency - b.price_change_percentage_7d_in_currency);
    });
}

// Sorting table by Change (7d) in desc order 
export function sort7DayChangeByDesc(data){ 
    data.sort((a,b) => {
        return (b.price_change_percentage_7d_in_currency - a.price_change_percentage_7d_in_currency);
    });
}

// Sorting table by Market Cap in asc order
export function sortMarketCapByAsc(data){ 
    data.sort((a,b) => {
        return (a.market_cap - b.market_cap);
    });
}

// Sorting table by Market Cap in desc order
export function sortMarketCapByDesc(data){ 
    data.sort((a,b) => {
        return (b.market_cap - a.market_cap);
    });
}






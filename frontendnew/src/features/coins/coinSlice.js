import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import coinService from './coinService';

const initialState = {
    coins: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

// addcoin to watchlist
export const addCoin = createAsyncThunk('coins/add', async(coinData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await coinService.addCoin(coinData,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

//get watchlist coins

export const getCoins = createAsyncThunk('coins/getAll', async(_,thunkAPI) => {
    try {
        console.log("trying to get coins")
        const token = thunkAPI.getState().auth.user.token;
        console.log(token)
        console.log("tried to get coins")
        return await coinService.getCoins(token)
        console.log("got coins i think")
    } catch (error) {
        console.log("error block")
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        console.log("error block end") 
        return thunkAPI.rejectWithValue(message)
    }
})

//delete coin from watchlist

export const delCoin = createAsyncThunk('coins/delete', async(coin, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await coinService.delCoin(coin,token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message)
    }
})

export const coinSlice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(addCoin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addCoin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.coins.push(action.payload)
            })
            .addCase(addCoin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getCoins.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCoins.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.coins = action.payload
            })
            .addCase(getCoins.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(delCoin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(delCoin.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                //refresh the page TEMPORARY SOLUTION
                window.location.reload()
            })
            .addCase(delCoin.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },
})

export const {reset} = coinSlice.actions;
export default coinSlice.reducer
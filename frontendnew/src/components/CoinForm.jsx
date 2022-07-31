import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addCoin} from '../features/coins/coinSlice';

export default function CoinForm() {
    const [coin, setCoin] = useState('');

    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch(addCoin({coin}));
    }



return (
    <>
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="coin">Coin</label>
                    <input type="coin" name='coin' id='coin' value={coin} onChange={(e) => setCoin(e.target.value)} />
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type='submit'> Add Coin</button>
                </div>
            </form>
        </section>
    </>
)}
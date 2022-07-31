import {useState, useEffect} from 'react';
import {FaSignInAlt, FaUser} from 'react-icons/fa';
import {toast} from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {login, reset} from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

import logo from './assets/nodes.png';
import './styling/Login.css';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if(isError) {
            //console.log(message);
            toast.error(message);
        }

        if(isSuccess || user) {
            navigate('/');
        }

        dispatch(reset());    

    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData( (prevState) => ({
            ...prevState, 
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        }

        dispatch(login(userData));
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
        <div className='page'>
            <div className='form-cont-si'>
                <section className='header-main'>
                    <img src={logo} id="form-logo" alt="" />
                    <h1>
                        <FaSignInAlt/> Sign In
                    </h1>
                    <p>New to blockwatch?</p> <p> <a href='/register'> Create an Account</a></p>
                </section>
                <section className='form'>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange} />
                        </div>
                        <div className='form-group btn'>
                            <button type='submit' id='btn-si' className='button'>
                                Sign In
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
        </>
    )
}
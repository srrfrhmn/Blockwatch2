import {useState, useEffect} from 'react';
import {FaUser} from 'react-icons/fa';
import {toast} from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {register, reset} from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

import logo from './assets/nodes.png';
import './styling/Register.css';

export default function Register() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const {firstName, lastName, email, password, confirmPassword} = formData;

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

        if(password !== confirmPassword) {
            //console.log('Passwords do not match');
            toast.error('Passwords do not match');
            return;
        } else {
            (firstName && console.log(firstName, lastName, email, password));
            const userData = {
                firstName,
                lastName,
                email, 
                password,
            }
            
            toast(`Welcome ${firstName} !`);
            dispatch(register(userData));
            navigate('/');
        }
    }

    if(isLoading) {
        return <Spinner />
    }


    return (
        <>
        <div className='page'>
            <div className='form-cont'>
                <section className='header-main'>
                    <img src={logo} id="form-logo" alt="" />
                    <h1>
                        <FaUser /> Sign up
                    </h1>
                    <p>Please create an account below</p>
                </section>
                <section className='form'>
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" id="firstName" name="firstName" value={firstName} placeholder="Enter your first name" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" className="form-control" id="lastName" name="lastName" value={lastName} placeholder="Enter your last name" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={email} placeholder="Enter your email" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" name="password" value={password} placeholder="Enter your password" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>   
                            <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={confirmPassword} placeholder="Confirm your password" onChange={onChange} />
                        </div>
                        <div className='form-group btn'>
                            <button type='submit' className='button'>
                                Register
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
        </>
    )
}
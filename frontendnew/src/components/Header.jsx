import {FraSignInAlt, FaSignOutAlt, FaUser, FaSignInAlt} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user} = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/about');
    }

    return (
        <header className='header'>
            <div className='logo'>
                { user ? (
                    <Link to='/'><div id='logo'>block<div id='logob'>watch</div></div></Link>
                ) : (
                    <>
                    <Link to='/about'><div id='logo'>block<div id='logob'>watch</div></div></Link>
                    </>
                ) }
                
            </div>
            <ul>
                {user ? (
                        <li>
                            <button className='btn' onClick={onLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </li>
                    ) : (
                        <>
                        <li>
                            <Link to='/login'>
                                <FaSignInAlt /> Sign In
                            </Link>
                        </li>
                        <li>
                            <Link to='/register'>
                                <FaUser /> Sign Up
                            </Link>
                        </li>
                        </>
                    )}
            </ul>
        </header>

    )
}
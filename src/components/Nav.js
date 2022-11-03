import React from "react";
import { NavLink } from "react-router-dom";
import { useStore } from 'react-redux';

export default function Nav() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const store = useStore();
    const [, updateState] = React.useState({});
    store.subscribe(() => updateState({}));

    const logout = () => {
        sessionStorage.removeItem("userInfo");
        sessionStorage.removeItem("id");
        updateState();
        
    }

    const checker = (e) =>{
        if(!userInfo) {
            e.preventDefault();

            alert("You must be logged in to continue");
        }
    }

    return (
        <nav className="nav">
            <ul>
                <li>
                    <NavLink to='/home' className={({isActive}) => isActive ? "active home-page": "home-page"} onClick={checker}>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/add' className={({isActive}) => isActive ? "active": ""} onClick={checker}>New Question</NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' className={({isActive}) => isActive ? "active": ""} onClick={checker} >Leader Board</NavLink>
                </li>
                <li>
                    {
                        userInfo && <div style={{display: 'flex'}}>
                            Hello, {userInfo.username}
                            <div className="image-container">
                                <img src={userInfo.avatar} alt={""}/>
                            </div>
                        </div>
                    }
                </li>
                <li>
                    {
                        userInfo &&
                        <NavLink to='/login' state= {{prevPath: '/home'}}  className={({isActive}) => isActive ? "active": ""} onClick={logout}>Logout</NavLink>

                    }
                </li>
            </ul>
        </nav>
    )
}

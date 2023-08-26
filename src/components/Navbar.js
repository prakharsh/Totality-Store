import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";
import styles from '../styles/Navbar.module.css'
function Navbar() {
    const cart_count=useSelector((state)=>state.count)
    const { loginWithRedirect,logout,user, isAuthenticated } = useAuth0();

  return (
    <div className={styles.navbar}>

      <Link to='/'  style={{width:'90px',height:'65px' }}>
        <img src="/logo.svg"alt='' className={styles.logo}/>
      </Link>

      <Link to='/'>
        <div className={styles.ecom_text}>Totality Store</div>
      </Link>

      <Link to='/'>
        <div className={styles.home_text}>Home</div>
      </Link>

      <div className={styles.login_section}>
        { 
          isAuthenticated?
            <div style={{display:'flex'}}>
              <img src={user.picture} className={styles.user_icon} alt=''/>
              <div className={styles.user_name}>{user.nickname}</div>
              <div style={{fontWeight:'bold', fontSize:'18px',cursor:'pointer',minWidth:'70px', paddingLeft:'10px'}} onClick={ () => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</div>
            </div>
            :
            <div style={{fontWeight:'bold', fontSize:'18px', cursor:'pointer',minWidth:'70px', paddingLeft:'10px'}}onClick={() => loginWithRedirect()}>Log In</div>
        }
      </div>
      <Link to='/cart'>
        <div className={styles.cart_wrapper}>
          <span className={styles.cart_text}>Cart</span>
          <i className={`fa-solid fa-cart-shopping ${styles.cart_icon}`}></i>
          <span className={styles.cart_quantity}>{cart_count.value}</span>
        </div>
      </Link>
    </div>
  )
}

export default Navbar
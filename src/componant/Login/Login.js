
import { useContext, useState } from "react";
import { UserContext } from '../../App';
import { useHistory, useLocation } from "react-router";
import { initializeLoginFramework, handleGoggleSignIn, handleSignInfb, handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateUserName } from "./loginManager";

initializeLoginFramework();


function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  });


  const [loggedInUser, setLoggedInUser] = useContext(UserContext)
  const history = useHistory()
  const location = useLocation()
  let { from } = location.state || { from: { pathname: "/" } };




 const handleRedirect = (res, redirect)=>{
        setUser(res)
        setLoggedInUser(res);
        if(redirect)history.replace(from);
 }

  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleRedirect(res, false)
      })
  }
  const googleSignIn = () => {
    handleGoggleSignIn()
      .then(res => {
        handleRedirect(res, true)
      })
  }
  const signInfb = () => {
    handleSignInfb()
      .then(res => {
        handleRedirect(res, true)
      })
  }




  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S/.test(e.target.value)
    }
    if (e.target.name === 'password') {
      const isPassLenOK = e.target.value.length > 6;
      const isPassOK = /\d{1}/.test(e.target.value);
      isFormValid = isPassLenOK && isPassOK;
    }
    if (isFormValid) {
      const newUser = { ...user };
      newUser[e.target.name] = e.target.value;
      setUser(newUser)
    }
  }
  // signup function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleRedirect(res, true)
        })
    }
    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleRedirect(res, true)
        })
    }
    updateUserName();
  }
  return (
    <div style={{ textAlign: 'center' }}>
      {
        user.isSignedIn
          ? <button onClick={signOut}>Sign Out</button>
          : (<div>
            <button onClick={googleSignIn}>Sign In google</button>
            <button onClick={signInfb}>Sign In facebook</button>
          </div>)
      }

      {
        user.isSignedIn &&
        <div>
          <p>Welcome, {user.name}</p>
          <img src={user.photo} alt='...' />
          <p>Your Email : {user.email}</p>
        </div>
      }
      <h1>Our own Authentication</h1>
      <form onSubmit={handleSubmit}>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" />
        <label htmlFor="newUser">New User Sign Up</label>
        <br />
        {
          newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Enter name" />
        }
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Enter Email" />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Enter Password" />
        <br />
        <input type="submit" onSubmit={handleSubmit} value={newUser ? "Sign Up" : "Login"} />
      </form>
      <p style={{ color: 'red' }}>{user.errorMsg}</p>
      {
        user.success && <p style={{ color: 'green' }}>User Account {newUser ? "created" : "logged in"} Successfully</p>
      }
    </div>
  );
}

export default Login;


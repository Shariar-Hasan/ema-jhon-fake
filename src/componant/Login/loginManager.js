import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
export  const initializeLoginFramework = () =>{
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
      }
      
}



export const handleGoggleSignIn = () => {
    const gProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(gProvider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true
        }
        return signedInUser;
      })
      .catch(err => {
        console.log(err);
        console.log(err.messege);
      })
  }


  export const handleSignInfb = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider(); 
    return firebase.auth().signInWithPopup(fbProvider)
      .then((result) => {
        const user = result.user;
        user.success = true;
        return user;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  export const handleSignOut = () => {
    return firebase.auth().signOut()
      .then(res => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          password: '',
          photo: '',
          errorMsg: '',
          success: false
        }
        return signedOutUser;
      })
  }


  export const createUserWithEmailAndPassword = (name, email, password)=> {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res => {
      const newUser = res.user;
      newUser.errorMsg = '';
      newUser.success = true;
      updateUserName(name);
      return newUser;
      
    })
    .catch(err => {
      console.log(err)
      const newUser = {  }
      newUser.errorMsg = err.message;
      newUser.success = false;
      return newUser;
    })
  }

  export const signInWithEmailAndPassword = (email,password)=>{
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      console.log(res)
      const loginUser = res.user;
      loginUser.errorMsg = '';
      loginUser.success = true;
      return loginUser;
    })
    .catch(err => {
      const newUser = {  }
      newUser.errorMsg = err.message;
      newUser.success = false;
      return newUser;
    })
}
export const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: name
    })
      .then(res => console.log('user name updated successfully'))
      .catch(err => console.log(err))
  }
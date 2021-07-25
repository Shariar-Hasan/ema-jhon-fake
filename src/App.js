
import './App.css';
import Header from './componant/header/Header';
import Shop from './componant/Shop/Shop';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Review from './componant/review/Review';
import Manage from './componant/manage/Manage';
import NotFound from './componant/notFound/NotFound';
import ProductDetail from './componant/ProductDetail/ProductDetail';
import Login from './componant/Login/Login';
import Shipment from './componant/Shipment/Shipment';
import PrivateRoute from './componant/PrivateRoute/PrivateRoute';

export const UserContext = createContext() 
function App() {
  const [loggedInUser, setloggedInUser] = useState({});
  return (
    <UserContext.Provider value = {[loggedInUser, setloggedInUser]}>
      <h2>email : {loggedInUser.email}</h2>
      
      <Router>
      <Header></Header>
        <Switch>
          <Route path='/shop'>
            <Shop></Shop>
          </Route>
          <Route path='/review'>
            <Review></Review>
          </Route>
          <PrivateRoute path='/manage'>
            <Manage></Manage>
          </PrivateRoute>
          <PrivateRoute path='/shipment'>
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path='/login'>
           <Login></Login>
          </Route>
          <Route exact path='/'>
            <Shop></Shop>
          </Route>
          <Route exact path='/product/:productKey'>
            <ProductDetail></ProductDetail>
          </Route>
          <Route path='*'>
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

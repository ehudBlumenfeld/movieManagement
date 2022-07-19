import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import {  createStore  } from 'redux';
import { Provider } from 'react-redux';
import appReducer from './reducer';


const appStore=createStore(appReducer)

ReactDOM.render(
  <Provider store={appStore}> 
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);

reportWebVitals();




const appReducer=(state={movies:[],members:[],subscriptions:[],usersLogin:[],permissions:[],users:[]},action)=>
{
  switch(action.type)
  {

    case "LOAD MOVIES":
      return{...state, movies:action.payload}

    case "LOAD MEMBERS":
     return{...state, members:action.payload}

    case "LOAD SUBSCRIPTIONS":
      return{...state, subscriptions:action.payload}

    case "LOAD USERS LOGIN":
      return{...state, usersLogin:action.payload}

    case "LOAD PERMISSIONS":
      return{...state, permissions:action.payload}

    case "LOAD USERS":
      return{...state, users:action.payload}

    default:return state;
  }


}

export default appReducer;







import LoginComp from './login/login';

function App() {
  return (
    <div>
      <LoginComp/>
    </div>
  );
}

export default App;



function LoginComp() {
  return (
    <div>
      <h1>LOGIN PAGE!</h1>     
    </div>
  );
}

export default LoginComp;




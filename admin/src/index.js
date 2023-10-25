import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'antd/dist/antd';
import { Provider } from "react-redux";
import store from './redux/store';
import { AuthContextProvider } from "./context/AuthContext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
  <Provider store={store}>

      <AuthContextProvider>
      
  
    <App />
    
    </AuthContextProvider>
    </Provider>
   
  
 
);
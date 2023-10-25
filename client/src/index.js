import React from "react";
import ReactDOM from "react-dom/client";
import 'antd/dist/antd';
import App from "./App";
import { Provider } from "react-redux";
import store from './redux/store';
import { AuthContextProvider } from "./context/AuthContext";
import { SearchContextProvider } from "./context/SearchContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  
  <Provider store={store}>
   

    
    <AuthContextProvider>
      <SearchContextProvider>

        <App />
        
      </SearchContextProvider>
    </AuthContextProvider>
    
    </Provider>

 
);

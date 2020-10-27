import React from 'react'
import {BrowserRouter as Router,} from 'react-router-dom'
import './App.css';
import RouterView from "./router/RouterView";


function App() {
  return (
    <div className="App">
      <Router>
          <div>
              <div>头部</div>
              <RouterView beforeEnter={(path:string)=>{
                  return path !== "/project/add";
              }} />
          </div>
      </Router>
    </div>
  );
}

export default App;

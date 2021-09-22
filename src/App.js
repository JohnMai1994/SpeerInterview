import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Header from './Header.js';
import ActivityDetail from "./components/ActivityDetail";
import ActivityFeed from "./components/ActivityFeed";



const App = () => {
    return (
        <div className='container'>
            <Header/>

            <Router>
                <div className="container-view">
                    <Switch>
                        <Route path={"/"} exact component={ActivityFeed}/>
                        <Route path={"/detail"} component={ActivityDetail}/>
                    </Switch>
                </div>
            </Router>


        </div>
    );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;

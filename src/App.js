import React , {Component, lazy, Suspense} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

const StudentDashboard = lazy(() => import("./student"));
const StudentDetails = lazy(() => import("./studentDetailPage"));

class App extends Component {

  render(){
    console.group("")
    return(
      <Router>
      <div>
      <Switch>
        <Suspense
              fallback={
                <div className="loding">
                  <h2>Loading...</h2>
                </div>
              }
            >
         <Route
                path="/"
                exact
                component={StudentDashboard}
              />
             <  Route
                path="/:id"
                component={StudentDetails}
                exact
                strict
              />
          </Suspense>
          </Switch>
      </div>
      </Router>
    )
  } 
}

export default App;

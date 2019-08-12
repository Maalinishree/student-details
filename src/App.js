import React , {Component, lazy, Suspense} from 'react';

const StudentDashboard = lazy(() => import("./student"));

class App extends Component {

  render(){
    return(
      <div>
        <Suspense
              fallback={
                <div className="loding">
                  <h2>Loading...</h2>
                </div>
              }
            >
          <StudentDashboard/>
          </Suspense>
      </div>
    )
  } 
}

export default App;

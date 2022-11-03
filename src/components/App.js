import '../assets/App.css';
import { Component, Fragment } from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
// import LoadingBar from 'react-redux-loading-bar';
import Nav from './Nav';
import Login from './Login';
import QuestionForm from './QuestionForm';
import LeaderBoard from './LeaderBoard';
import Home from './Home';
import Question from './Question';
import RequireAuth from './RequireAuth';

class App extends Component{
  render() {

    return (
      <Router>
        <Fragment>
          {/* <LoadingBar /> */}
          <div className="App">
            <header className="App-header">
              <p>React App</p>
              <Nav />
              <hr style={{background: '#60b0d3', marginTop: '7px'}}/>
            </header>
            <main>
              <div className='main-container'>
                <Routes>
                  <Route path='/' element={ <Navigate to="/home"/>}></Route>
                  <Route path='/home' element={ <RequireAuth><Home /></RequireAuth>}></Route>
                  <Route path='/add' element={ <RequireAuth><QuestionForm /></RequireAuth> }></Route>
                  <Route exact path='/leaderboard' element={ <RequireAuth><LeaderBoard /></RequireAuth>}></Route>
                  <Route path='/questions/:question_id' element={ <RequireAuth><Question /></RequireAuth> }></Route>
                  <Route path='/login' element={ <Login /> }></Route>
                  <Route path='*' element={ <RequireAuth>
                    <div className='not-found-page' style={{textAlign: 'center'}}>
                      <img alt='' src='https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?fit=845%2C503&ssl=1' />
                    </div>
                  </RequireAuth>}></Route>
                </Routes>
              </div>
              
            </main>
          </div>
        </Fragment>
      </Router>
      
    );
  }
}

export default connect((state) => state)(App);

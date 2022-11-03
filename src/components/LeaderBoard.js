import { Component } from 'react';
import {connect} from 'react-redux';


class LeaderBoard extends Component{
  state = {
    leaderBoard: [],
    pointsInRating: []
  }
  medals = [
    'https://cdn-icons-png.flaticon.com/512/2997/2997149.png',
    'https://cdn-icons-png.flaticon.com/128/3975/3975592.png',
    'https://cdn-icons-png.flaticon.com/512/3975/3975595.png'
  ];

  componentDidMount() {
    const {allUsers} = this.props;
    let leaderBoard = [];
    let chooserId = [];
    allUsers.forEach(user => {
      leaderBoard.push({
        id: user.id,
        avatarUrl: user.avatar,
        username: user.username,
        answeredQuestions: 0,
        createdQuestions: user.questions.length
      })
      user.questions.forEach(ques => {
        chooserId = chooserId.concat(ques.answers[0].chooserId, ques.answers[1].chooserId)
      });
    });
    let pointsInRating = [];
    leaderBoard.forEach(user => {
      user.answeredQuestions = chooserId.filter(id => id === user.id).length;
      pointsInRating.push(user.answeredQuestions+user.createdQuestions);
    });
    leaderBoard = leaderBoard.sort((a, b) => ((b.answeredQuestions+b.createdQuestions)-(a.answeredQuestions+a.createdQuestions)));
    pointsInRating = Array.from(new Set(pointsInRating.sort((a,b) => b-a))).splice(0,3);
    leaderBoard = leaderBoard.filter(lb => pointsInRating.indexOf(lb.answeredQuestions+lb.createdQuestions) >= 0);
    this.setState({leaderBoard, pointsInRating});
  }

  render() {
    const {leaderBoard, pointsInRating} = this.state;
    return (
        <div className='LeaderBoard-container'>
          {
            leaderBoard.length > 0 &&
            leaderBoard.map((user, index) => (
              <div key={user.id} className='user-ques-ans'>
                <div className='cup-c'>
                </div>
                <div className='cup-c__img-box'>
                    <img alt='' src={this.medals[pointsInRating.indexOf(user.answeredQuestions+user.createdQuestions)]} />
                  </div>
                <div className='avatar-col'>
                  <div className='avatar-box'>
                    <img alt='' src={user.avatarUrl} />  
                  </div>
                </div>
                <div className='info-col'>
                  <p className='info-col__username'>{user.username}</p>
                  <p className='numb-ans-c'>
                    <span>Answered questions</span>
                    <span>{user.answeredQuestions}</span>
                  </p>
                  <hr style={{margin: '5px 0'}} />
                  <p className='numb-ques-c'>
                    <span>Created questions</span>
                    <span>{user.createdQuestions}</span>
                  </p>
                </div>
                <div className='score-col'>
                  <div className='score-col__head'>Score</div>
                  <div className='score-col__body'>
                    <p className='score'>{user.answeredQuestions+user.createdQuestions}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      
    );
  }
}

export default connect((state) => state.loginReducer)(LeaderBoard);

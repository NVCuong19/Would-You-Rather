import { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class Poll extends Component {
  render() {
    const {poll} = this.props;
    return <div className='question-wrap'>
      <div className='ques-w__head'>
        <p className='label'>{poll.username} ask:</p>
      </div>
      <div className='ques-w__body'>
        <div className='ques-w__body__left-col'>
          <div className='avatar-box'>
            <img alt='' src={poll.avatar} />
          </div>
        </div>  
        <div className='ques-w__body__right-col'>
          <p className='ques-name'>{poll.questionName}</p>
          <p className='sample-ans'>{poll.sampleAns}</p>
          <Link to={'/questions/'+poll.questionId}>
            <button>View Poll</button>
          </Link>
        </div>  
      </div>

    </div>
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.allUsers = [];
    this.state = {
      tab: 1,
      unansweredQues: [],
      answeredQues: [],
    }
    this.handleTab = this.handleTab.bind(this);

  }

  componentDidMount() {
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const unansweredQues = [];
    const answeredQues = [];

    this.props.allUsers.forEach((user) => {
      user.questions.forEach((ques) => {
        let quesObj = {
          ownerId: user.id,
          avatar: user.avatar,
          username: user.username,
          questionId: ques.id,
          questionName: ques.name,
          sampleAns: '...'+ques.answers[0].content+'...',
          createdDate: ques.createdDate
        };
        if(ques.answers[0].chooserId.indexOf(userInfo.id) < 0 && ques.answers[1].chooserId.indexOf(userInfo.id) < 0 ) {
          unansweredQues.push(quesObj);
        }else {
          answeredQues.push(quesObj);
        }
      })
    })

    this.setState({
      unansweredQues: unansweredQues.sort(function(a,b){ return new Date(b.createdDate) - new Date(a.createdDate); }),
      answeredQues: answeredQues.sort(function(a,b){ return new Date(b.createdDate) - new Date(a.createdDate); }),
    })
  }

  handleTab(tabValue) {
    this.setState({tab: tabValue});
  }

  render() {
    const {tab, unansweredQues, answeredQues } = this.state;
    return (
        <div className='homePage-container'>
            <div className='home__head'>
              <span className={`${tab === 1 ? 'actived' : ''} unanswered-section`} onClick={() => this.handleTab(1)}>Unanswered Questions</span>
              <span className={`${tab === 2 ? 'actived' : ''} answered-section`} onClick={() => this.handleTab(2)}>Answered Questions</span>
            </div>
            <div className='home__body'>
              {
                tab === 1 ? (
                  unansweredQues.map((_poll, index) => (
                    <Poll key={index} poll={_poll} />
                  ))
                ) : (
                  answeredQues.map((_poll, index) => (
                    <Poll key={index} poll={_poll} />
                  ))
                )
              }
              
            </div>
        </div>
      
    );
  }
}

export default connect((state) => state.loginReducer)(Home);

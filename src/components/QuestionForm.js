import { Component } from 'react';
import {connect} from 'react-redux';
import {Form, Button} from 'react-bootstrap';
import {submitNewQuesAction} from '../actions/login';


class QuestionForm extends Component{
  constructor(props) {
    super(props);
    this.state = { 
        optionOne: '',
        optionTwo: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  } 

  handleChange(e) {
    if(e.target.name === 'optionOne') {
      this.setState({optionOne: e.target.value});
      return;
    }
    this.setState({optionTwo: e.target.value});

  }

  handleSubmit(e) {
    e.preventDefault();
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const id = JSON.parse(sessionStorage.getItem('id'));
    const numbUsers = this.props.allUsers.length;
    for(let i = 0; i < numbUsers; i++) {
      if(this.props.allUsers[i].id === userInfo.id) {
        this.props.allUsers[i].questions.push({
          id: id.quesId+1,
          name: 'Would You Rather...',
          createdDate: (new Date()).toString(),
          answers: [
            {
                id: id.ansId+1,
                content: this.state.optionOne,
                chooserId: []
            },
            {
              id: id.ansId+2,
              content: this.state.optionTwo,
              chooserId: []
            }
          ]
        })
        break;
      }
    }
    this.props.dispatch(submitNewQuesAction(this.props.allUsers));
    this.setState({
      optionOne: '',
      optionTwo: ''
    });
    sessionStorage.setItem('id', JSON.stringify({quesId: id.quesId+1, ansId: id.ansId+2 }));
    document.querySelector('a.home-page').click();
  }

  render() {
    return (
        <div className='question-container'>
            <div className='question-c__head'>
              <p className='title'>Create New Question</p>
            </div>
            <div className='question-c__body'>
              <p className='ques-info'>Complete the question:</p>
              <p className='ques-name'>Would you rather...</p>
              <div className='ques-form'>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Control type='text' name='optionOne' value={this.state.optionOne} onChange={this.handleChange} placeholder='Enter Option One Text Here'></Form.Control>
                  </Form.Group>
                  <div className='separate'>
                    <span>OR</span>
                  </div>
                  <Form.Group>
                    <Form.Control type='text' name='optionTwo' value={this.state.optionTwo} onChange={this.handleChange} placeholder='Enter Option One Text Here'></Form.Control>
                  </Form.Group>
                  <Button variant='info' type='submit'>Submit</Button>
                </Form>
              </div>
            </div>
        </div>
      
    );
  }
}

export default connect((state) => state.loginReducer)(QuestionForm);

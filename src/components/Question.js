import {Form, Button, ProgressBar} from 'react-bootstrap';
import { useParams, useNavigate} from 'react-router-dom';
import { useStore } from 'react-redux';
import {submitAnsAction} from '../actions/login';
import {useState, useEffect} from 'react';

export default function Question() {
    const store = useStore();
    const navigate = useNavigate();
    const stateInStore = store.getState();
    const [state, setValue] = useState({ selectedAnsId: null, hasAnswered: false });
    const params = useParams();
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
    const {allUsers} = stateInStore.loginReducer;
    let quesOwner = null
    for(let i = 0; i < allUsers.length; i++) {
        let _selectedQues = allUsers[i].questions.filter((ques) => ques.id === Number(params.question_id));
        if(_selectedQues.length > 0) {
            quesOwner = {
                id: allUsers[i].id,
                username: allUsers[i].username,
                avatar: allUsers[i].avatar,
                questions: _selectedQues
            }
            break;
        }
    }
    if(quesOwner) {
        var selectedQues = quesOwner.questions[0];
        state.hasAnswered = selectedQues.answers[0].chooserId.indexOf(userInfo.id) < 0 && selectedQues.answers[1].chooserId.indexOf(userInfo.id) < 0 ? false : true;
        state.selectedAnsId = state.hasAnswered ? (selectedQues.answers[0].chooserId.indexOf(userInfo.id) >= 0 ? selectedQues.answers[0].id : selectedQues.answers[1].id) : state.selectedAnsId;
        var numbVotes = selectedQues.answers[0].chooserId.length;
        var numbNonVotes = selectedQues.answers[1].chooserId.length;
        var percentVotes = Math.round((numbVotes/(numbVotes+numbNonVotes)) * 100);
        var percentNonVotes = Math.round((numbNonVotes/(numbVotes+numbNonVotes)) * 100);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        allUsers.forEach((user) => {
            if(user.id === quesOwner.id) {
                user.questions.forEach((ques) => {
                    if(ques.id === selectedQues.id) {
                        ques.answers.forEach((ans) => {
                            if(ans.id === state.selectedAnsId && ans.chooserId.indexOf(userInfo.id) < 0) {
                                ans.chooserId.push(userInfo.id);
                            }
                        })
                    }
                })
            }
        });
        store.dispatch(submitAnsAction(allUsers))
        setValue({...state});
    };
    useEffect(() => {
        if(!quesOwner) {
            navigate('*')
        }
    })
    return (
        <div className='detail-question-wrap'>
            {
                quesOwner &&
                <div className='detail-question-container'>
                    <div className='d-question-c__head'>
                        {
                            state.hasAnswered ? (
                                <p className='ques-info'> Asked by {quesOwner.username}:</p>
                            ) : (
                                <p className='ques-info'>{quesOwner.username} ask:</p>
                            )
                        }
                    </div>
                    <div className='d-question-c__body'>
                        <div className='d-question__body__left-col'>
                            <div className='d-ques__avatar-box'>
                                <img alt='' src={quesOwner.avatar} />
                            </div>
                        </div>
                        <div className='d-question__body__right-col'>
                            {
                                state.hasAnswered && 
                                <div className='answered'>
                                    <p className='ques-name'>Results:</p>
                                    <div className={`info-ans-container ${state.selectedAnsId === selectedQues.answers[0].id ? 'selected-ans' : ''}`}>
                                        <div className='icon-box'>
                                            <img alt='' src='https://cdn-icons-png.flaticon.com/512/1031/1031962.png' />
                                        </div>
                                        <p className='complete-ques-title'>Would you rather {selectedQues.answers[0].content}?</p>
                                        <ProgressBar now={percentVotes} label={`${percentVotes}%`}/>
                                        <p className='numb-votes'>{numbVotes} out of {numbVotes + numbNonVotes} votes</p>
                                    </div>
                                    <div className={`info-ans-container ${state.selectedAnsId === selectedQues.answers[1].id ? 'selected-ans' : ''}`}>
                                        <div className='icon-box'>
                                            <img alt='' src='https://cdn-icons-png.flaticon.com/512/1031/1031962.png' />
                                        </div>
                                        <p className='complete-ques-title'>Would you rather {selectedQues.answers[1].content}?</p>
                                        <ProgressBar now={percentNonVotes} label={`${percentNonVotes}%`}/>
                                        <p className='numb-votes'>{numbNonVotes} out of {numbVotes + numbNonVotes} votes</p>
                                    </div>
                                </div>
                            }
                            {
                                !state.hasAnswered && 
                                <div className='unanswered'>
                                    <p className='ques-name'>Would You Rather...</p>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group>
                                            {
                                                selectedQues.answers.map((ans, index) => (
                                                    <Form.Check key={index} name="answer" type="radio" label={ans.content} checked={state.selectedAnsId === ans.id} value={ans.id} onChange={() => setValue({...state, selectedAnsId: ans.id})}/>
                                                ))
                                            }
                                        </Form.Group>
                                        <Button variant='info' type='submit'>Submit</Button>
                                    </Form>
                                </div>
                            }
                            
                            
                        </div>
                    </div>
                </div>
            }
        </div>
    
    );
}

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './signupform.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  // const [hasSubmitted, setHasSubmitted] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    let errs = []
    if(!username) errs.push('please provide username')
    if(!email) errs.push('please provide email')
    if(password !== repeatPassword) errs.push('Passwords do not match')
    if(!email.includes('@') || email.length < 5) errs.push('please enter a valid email')
    if(email.length > 200) errs.push('email too long')
    if(username.length > 200) errs.push('username too long')
    if(username === email) errs.push('username and email cannot be the same')
    if(username.length > 200 || username.length < 4) errs.push('username must be between 4 and 200 characters')
    setErrors(errs)
  }, [username, email, password, repeatPassword]);


  const onSignUp = async (e) => {
    // setHasSubmitted(true)
    e.preventDefault();

    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onSignUp} className='signupForm'>
      <h3>Sign Up</h3>
      <div className='valid-errors-bottom'>
        {errors.map((error, ind) => (
          <div key={ind} className='errors'>{error}</div>
        ))}
      </div>
      <div>
        <input
          placeholder='Username'
          className='signupInput'
          type='text'
          name='username'
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div>

        <input
          placeholder='Email'
          className='signupInput'
          type='text'
          name='email'
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div>

        <input
          placeholder='Password'
          className='signupInput'
          type='password'
          name='password'
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div>

        <input
          placeholder='Confirm Password'
          className='signupInput'
          type='password'
          name='repeat_password'
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button type='submit'>Sign Up</button>
    </form>
  );
};

export default SignUpForm;

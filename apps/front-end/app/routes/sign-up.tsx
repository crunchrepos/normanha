import {MetaFunction} from '@shopify/remix-oxygen';
import {useState} from 'react';
import {AuthService} from '~/services/auth.service';

export const meta: MetaFunction = () => {
  return [{title: `Hydrogen | Sign Up`}];
};

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit() {
    try {
      if (!email || !password) return alert('Incorrect email or password');

      const response = await AuthService.signUp(email, password);

      if (response.data.access_token) {
        const session = {
          access_token: response.data.access_token,
          user: response.data.user,
        };
        localStorage.set('userSession', JSON.stringify(session));
        window.location.href = '/';
      }
    } catch (error: unknown) {
      console.log({error});
    }
  }
  return (
    <div className="auth">
      <h1>Sign Up</h1>
      <h4>Email</h4>
      <input type="text" onChange={(event) => setEmail(event.target.value)} />
      <h4>Password</h4>
      <input
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button className="auth-button" onClick={onSubmit}>
        Submit
      </button>
    </div>
  );
}

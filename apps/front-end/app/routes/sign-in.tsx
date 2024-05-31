import {MetaFunction} from '@shopify/remix-oxygen';
import {useState} from 'react';
import {restApi} from '~/services/api';
import {AuthService} from '~/services/auth.service';

export const meta: MetaFunction = () => {
  return [{title: `Hydrogen | Sign In`}];
};

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onSubmit() {
    try {
      if (!email || !password) return alert('Incorrect email or password');

      const response = await AuthService.signIn(email, password);

      if (response.data.access_token) {
        const session = {
          access_token: response.data.access_token,
          user: response.data.user,
        };
        restApi.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${session.access_token}`;

        localStorage.setItem('userSession', JSON.stringify(session));
        window.location.href = '/';
      }
    } catch (error: unknown) {
      console.log({error});
    }
  }
  return (
    <div className="auth">
      <h1>Sign In</h1>
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
      <p>
        Don't have an account?
        <a href="sign-up">
          <b>Sign Up</b>
        </a>
      </p>
    </div>
  );
}

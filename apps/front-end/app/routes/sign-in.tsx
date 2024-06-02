import {Form, useActionData} from '@remix-run/react';
import {
  ActionFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from '@shopify/remix-oxygen';
import {UserSessionManager} from '~/lib/session';
import {createRestAPI} from '~/services/api';
import {AuthService} from '~/services/auth.service';

export const meta: MetaFunction = () => {
  return [{title: `Hydrogen | Sign In`}];
};

export async function action({request}: ActionFunctionArgs) {
  const form = await request.formData();
  const email = form.get('email')?.toString() ?? '';
  const password = form.get('password')?.toString() ?? '';

  let errors: {email?: string; password?: string} = {};

  if (!email) {
    errors = {
      email: 'Please enter a valid email!',
    };
  }

  if (!password) {
    errors = {
      ...errors,
      password: 'Please enter a valid password!',
    };
  }

  if (errors.email || errors.password) {
    return json({
      errors,
    });
  }

  const axiosInstance = createRestAPI();
  const authService = new AuthService(axiosInstance);
  const response = await authService.signIn(email, password);

  if (response.data.access_token) {
    const sessionData = {
      access_token: response.data.access_token,
      user: response.data.user,
    };

    const session = await UserSessionManager.getSession(
      request.headers.get('Cookie'),
    );

    session.set('access_token', sessionData.access_token);
    session.set('user', sessionData.user);

    const cookieData = await UserSessionManager.commitSession(session);

    return redirect('/', {
      headers: {
        'Set-Cookie': cookieData,
      },
    });
  }
}
export default function SignIn() {
  const formActionData = useActionData<typeof action>();
  return (
    <div className="auth">
      <h1>Sign In</h1>
      <Form className="auth" method="post">
        <h4>Email</h4>
        <input type="text" name="email" />
        {formActionData?.errors.email ? (
          <em>{formActionData?.errors.email}</em>
        ) : null}
        <h4>Password</h4>
        <input type="password" name="password" />
        {formActionData?.errors.password ? (
          <em>{formActionData?.errors.password}</em>
        ) : null}
        <button className="auth-button" type="submit">
          Submit
        </button>
        <p>
          Don't have an account?
          <a href="sign-up">
            <b> Sign Up</b>
          </a>
        </p>
      </Form>
    </div>
  );
}

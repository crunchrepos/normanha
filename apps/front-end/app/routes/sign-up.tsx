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
  return [{title: `Hydrogen | Sign Up`}];
};
export async function action({request}: ActionFunctionArgs) {
  const form = await request.formData();
  const email = form.get('email')?.toString() ?? '';
  const password = form.get('password')?.toString() ?? '';
  const confirmPassword = form.get('confirm-password')?.toString() ?? '';

  let errors: {email?: string; password?: string; confirmPassword?: string} =
    {};

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors = {
      email: 'The email is required to create a new account!',
    };
  }
  if (email && !emailRegex.test(email)) {
    errors = {
      email: 'This is not a valid email. Please enter a valid email',
    };
  }

  if (!password) {
    errors = {
      ...errors,
      password: 'The password is required to create a new account!',
    };
  }
  if (password && password.length < 6) {
    errors = {
      ...errors,
      password: 'The password should have a minimum of 6 characters',
    };
  }

  if (!confirmPassword) {
    errors = {
      ...errors,
      confirmPassword: 'The password confirmation cannot be empty!',
    };
  }
  if (confirmPassword && password !== confirmPassword) {
    errors = {
      ...errors,
      confirmPassword: 'The passwords should match!',
    };
  }

  if (errors.email || errors.password || errors.confirmPassword) {
    return json({
      errors,
    });
  }

  const axiosInstance = createRestAPI();
  const authService = new AuthService(axiosInstance);
  const response = await authService.signUp(email, password);

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

export default function SignUp() {
  const formActionData = useActionData<typeof action>();
  return (
    <div className="auth">
      <h1>Sign Up</h1>
      <Form method="post" className="auth">
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
        <h4>Confirm Password</h4>
        <input type="password" name="confirm-password" />
        {formActionData?.errors.confirmPassword ? (
          <em>{formActionData?.errors.confirmPassword}</em>
        ) : null}
        <button className="auth-button" type="submit">
          Submit
        </button>
      </Form>
    </div>
  );
}

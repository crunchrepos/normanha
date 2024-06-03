import {useLoaderData, useSubmit} from '@remix-run/react';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
  json,
  redirect,
} from '@shopify/remix-oxygen';
import {UserSessionManager} from '~/lib/session';

export const meta: MetaFunction = () => {
  return [{title: `Hydrogen | Sign In`}];
};

export async function loader({request}: LoaderFunctionArgs) {
  const session = await UserSessionManager.getSession(
    request.headers.get('Cookie'),
  );
  const userSession = {
    access_token: session.data.access_token,
    user: session.data.user,
  };

  return json({userSession});
}
export async function action({request}: ActionFunctionArgs) {
  const session = await UserSessionManager.getSession(
    request.headers.get('Cookie'),
  );

  const cookieData = await UserSessionManager.destroySession(session);

  return redirect('/', {
    headers: {
      'Set-Cookie': cookieData,
    },
  });
}

export default function Profile() {
  const {userSession} = useLoaderData<typeof loader>();
  const submit = useSubmit();
  return (
    <div>
      <h1>Profile</h1>
      <h2>Welcome {userSession.user?.email}</h2>
      <h2>Your Profile Menu:</h2>
      <button onClick={() => submit(null, {method: 'post'})}>Logout</button>
    </div>
  );
}

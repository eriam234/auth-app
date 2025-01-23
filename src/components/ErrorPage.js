import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>An unexpected error occurred:</p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}
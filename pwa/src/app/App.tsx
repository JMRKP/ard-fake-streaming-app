import { RouterProvider } from 'react-router';
import { router } from './routes';
import { useRemoteRouter } from './hooks/useRemoteRouter';

function RemoteRouter() {
  useRemoteRouter();
  return null;
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <RemoteRouter />
    </>
  );
}
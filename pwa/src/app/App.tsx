import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ControllerToast } from './components/ControllerToast';

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ControllerToast />
    </>
  );
}
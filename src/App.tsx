import { RouterProvider } from "react-router-dom";
import { router } from "./router/RouterProvider";
import { Suspense } from "react";
import Loading from "./components/shared/Loading";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
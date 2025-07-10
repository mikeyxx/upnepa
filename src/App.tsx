import { Provider } from "react-redux";
import { RouterProvider } from "react-router";
import { store } from "./features/app/store.ts";
import { router } from "./routes.tsx";
import { useAppDispatch } from "./features/app/hooks.ts";
import { useEffect } from "react";
import { authenticateUser } from "./features/slices/auth.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

const AppInitializer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authenticateUser());
  }, [dispatch]);

  return null; // it doesn't render anything, it's just for init side-effects
};

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppInitializer />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;

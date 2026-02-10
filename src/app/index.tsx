import { SafeAreaProvider } from "react-native-safe-area-context";
import { Navigation } from "@/app/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";

const queryClient = new QueryClient();

export default function App() {
  return (
    <StrictMode>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Navigation />
        </QueryClientProvider>
      </SafeAreaProvider>
    </StrictMode>
  );
}

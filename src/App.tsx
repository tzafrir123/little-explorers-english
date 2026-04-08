import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import WordPicturePage from "./pages/WordPicturePage.tsx";
import SpellWordPage from "./pages/SpellWordPage.tsx";
import QuizPage from "./pages/QuizPage.tsx";
import MemoryPage from "./pages/MemoryPage.tsx";
import SentencePage from "./pages/SentencePage.tsx";
import WordOrderPage from "./pages/WordOrderPage.tsx";
import PronouncePage from "./pages/PronouncePage.tsx";
import LeaderboardPage from "./pages/LeaderboardPage.tsx";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

// Session: Protects routes - redirects to login if not authenticated
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-bounce">🎮</div>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

// Session: Redirects to home if already logged in
const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-4xl animate-bounce">🎮</div>
      </div>
    );
  }
  if (user) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />
    <Route path="/signup" element={<PublicRoute><SignupPage /></PublicRoute>} />
    <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
    <Route path="/game/word-picture" element={<ProtectedRoute><WordPicturePage /></ProtectedRoute>} />
    <Route path="/game/spell-word" element={<ProtectedRoute><SpellWordPage /></ProtectedRoute>} />
    <Route path="/game/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
    <Route path="/game/memory" element={<ProtectedRoute><MemoryPage /></ProtectedRoute>} />
    <Route path="/game/sentence" element={<ProtectedRoute><SentencePage /></ProtectedRoute>} />
    <Route path="/game/word-order" element={<ProtectedRoute><WordOrderPage /></ProtectedRoute>} />
    <Route path="/game/pronounce" element={<ProtectedRoute><PronouncePage /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

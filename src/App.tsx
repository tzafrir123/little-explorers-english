import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import WordPicturePage from "./pages/WordPicturePage.tsx";
import SpellWordPage from "./pages/SpellWordPage.tsx";
import QuizPage from "./pages/QuizPage.tsx";
import MemoryPage from "./pages/MemoryPage.tsx";
import SentencePage from "./pages/SentencePage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/game/word-picture" element={<WordPicturePage />} />
          <Route path="/game/spell-word" element={<SpellWordPage />} />
          <Route path="/game/quiz" element={<QuizPage />} />
          <Route path="/game/memory" element={<MemoryPage />} />
          <Route path="/game/sentence" element={<SentencePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

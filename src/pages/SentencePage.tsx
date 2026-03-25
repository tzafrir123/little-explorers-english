import { useNavigate } from "react-router-dom";
import SentenceGame from "@/components/games/SentenceGame";

const SentencePage = () => {
  const navigate = useNavigate();
  return <SentenceGame onBack={() => navigate("/")} />;
};

export default SentencePage;

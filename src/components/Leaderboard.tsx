// ============================================
// Leaderboard Component - Shows top players by score
// DB: Reads from profiles table, sorted by score DESC
// UI: Kid-friendly cards with medals for top 3
// ============================================

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface LeaderboardEntry {
  username: string;
  score: number;
  user_id: string;
}

const medals = ["🥇", "🥈", "🥉"];

const Leaderboard = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const { user } = useAuth();

  // DB: Fetch top 20 users with score > 0
  const fetchLeaderboard = async () => {
    const { data } = await supabase
      .from("profiles")
      .select("username, score, user_id")
      .gt("score", 0)
      .order("score", { ascending: false })
      .limit(20);
    if (data) setEntries(data as LeaderboardEntry[]);
  };

  useEffect(() => {
    fetchLeaderboard();

    // Realtime: Subscribe to profile changes for live updates
    const channel = supabase
      .channel("leaderboard-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        () => fetchLeaderboard()
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  if (entries.length === 0) return null;

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="bg-card rounded-3xl p-4 shadow-xl w-64 max-h-[70vh] flex flex-col"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 justify-center">
        <Trophy className="w-5 h-5 text-sunshine" />
        <h3 className="font-extrabold text-foreground text-lg">לוח תוצאות</h3>
      </div>

      {/* Scrollable list */}
      <div className="overflow-y-auto space-y-2 flex-1">
        {entries.map((entry, i) => {
          const isCurrentUser = entry.user_id === user?.id;
          return (
            <motion.div
              key={entry.user_id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold transition-all ${
                isCurrentUser
                  ? "bg-primary/20 border-2 border-primary ring-2 ring-primary/30"
                  : i < 3
                  ? "bg-sunshine/10 border border-sunshine/30"
                  : "bg-muted/50"
              }`}
            >
              {/* Rank */}
              <span className="text-lg min-w-[28px] text-center">
                {i < 3 ? medals[i] : `${i + 1}`}
              </span>
              {/* Username */}
              <span className="flex-1 truncate text-foreground">
                {entry.username}
                {isCurrentUser && " ⭐"}
              </span>
              {/* Score */}
              <span className="text-primary font-extrabold">{entry.score}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Leaderboard;

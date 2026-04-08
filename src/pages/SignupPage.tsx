// ============================================
// Signup Page - Kid-friendly registration screen
// Signup: Create new user account
// ============================================

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signUp(username, password);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background" dir="rtl">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-full max-w-sm"
      >
        {/* Title */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-7xl text-center mb-4"
        >
          ⭐
        </motion.div>
        <h1 className="text-3xl font-extrabold text-foreground text-center mb-2">
          !יצירת חשבון חדש
        </h1>
        <p className="text-muted-foreground text-center mb-8 text-lg">
          בחרו שם וסיסמה קצרה כדי להתחיל
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="bg-card rounded-3xl p-8 shadow-xl space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">👤 שם משתמש</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="בחרו שם קצר..."
              maxLength={20}
              className="w-full h-14 rounded-2xl border-2 border-input bg-background px-4 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              autoComplete="username"
            />
            <p className="text-xs text-muted-foreground mt-1">לפחות 2 תווים</p>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-foreground mb-2">🔑 סיסמה</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="בחרו סיסמה..."
                maxLength={20}
                className="w-full h-14 rounded-2xl border-2 border-input bg-background px-4 pl-12 text-lg font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">לפחות 6 תווים (אפשר גם מספרים)</p>
          </div>

          {/* Error message */}
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-destructive text-center font-bold text-sm bg-destructive/10 rounded-xl p-3"
            >
              {error}
            </motion.p>
          )}

          {/* Signup button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full h-14 bg-primary text-primary-foreground rounded-2xl font-extrabold text-xl flex items-center justify-center gap-2 game-shadow disabled:opacity-50"
          >
            <UserPlus className="w-6 h-6" />
            {loading ? "...יוצרים חשבון" : "יצירת חשבון"}
          </motion.button>

          {/* Back to login */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => navigate("/login")}
            className="w-full h-12 bg-muted text-foreground rounded-2xl font-bold text-lg flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-5 h-5" />
            חזרה להתחברות
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignupPage;

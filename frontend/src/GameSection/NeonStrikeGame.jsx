import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LottieBase from "lottie-react"; 
import gaming from "../assets/gaming.json"; 
import { 
  Trophy, ArrowRight, Sparkles, Copy, CheckCircle2, 
  ChevronLeft, ChevronRight, Heart, Zap, Bomb, Rocket, 
  User, Phone, BookOpen, BrainCircuit, X, Loader2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Lottie = LottieBase.default || LottieBase;

const API_CATEGORY_MAP = {
  "IT / Technical": 18,     
  "IT / Non-Technical": 9,  
  "Designing": 25,         
  "Accounting": 19,        
  "Civil": 17               
};

const FALLBACK_QUESTIONS = {
  "IT / Technical": [
    { q: "What does HTML stand for?", options: ["Hyper Text", "Home Tool", "Hyperlinks"], correct: 0 },
    { q: "Which acts as the 'brain' of a computer?", options: ["RAM", "Motherboard", "CPU"], correct: 2 },
    { q: "Which is a frontend React framework?", options: ["Next.js", "Django", "Laravel"], correct: 0 },
    { q: "What does CSS do?", options: ["Database", "Styling", "Server Logic"], correct: 1 },
    { q: "Python files end with which extension?", options: [".pt", ".py", ".pn"], correct: 1 }
  ],
  "IT / Non-Technical": [
    { q: "What does SEO stand for?", options: ["Search Engine Opt.", "Secure Email Org.", "System Error Out"], correct: 0 },
    { q: "Which is used for spreadsheets?", options: ["MS Word", "MS Excel", "MS Paint"], correct: 1 },
    { q: "B2B stands for?", options: ["Back to Basics", "Business to Bus.", "Binary to Base"], correct: 1 },
    { q: "Which is a social media platform?", options: ["LinkedIn", "Linux", "Linode"], correct: 0 },
    { q: "What is Google Analytics used for?", options: ["Coding", "Web Traffic", "Video Editing"], correct: 1 }
  ],
  "Designing": [
    { q: "What does CAD stand for?", options: ["Computer Art", "Code And Deploy", "Computer Aided Design"], correct: 2 },
    { q: "Which tool is best for UI/UX?", options: ["Figma", "AutoCAD", "Notepad"], correct: 0 },
    { q: "RGB is primarily used for?", options: ["Printing", "Digital Screens", "3D Models"], correct: 1 },
    { q: "Which is vector-based?", options: ["Photoshop", "Illustrator", "Lightroom"], correct: 1 },
    { q: "What does UI stand for?", options: ["User Interface", "Unix Index", "Unified Input"], correct: 0 }
  ],
  "Civil": [
    { q: "Which software is standard for 2D drafting?", options: ["Maya", "AutoCAD", "Photoshop"], correct: 1 },
    { q: "Revit is primarily used for?", options: ["Video Editing", "BIM Modeling", "Web Design"], correct: 1 },
    { q: "What does RCC stand for?", options: ["Real Cement", "Reinforced Concrete", "Rigid Core"], correct: 1 },
    { q: "Which tool is used for 3D elevation?", options: ["3ds Max", "Excel", "Tally"], correct: 0 },
    { q: "What is a foundation?", options: ["Roof top", "Base of structure", "Wall paint"], correct: 1 }
  ],
  "Accounting": [
    { q: "Which software is used for GST in India?", options: ["AutoCAD", "Tally Prime", "VS Code"], correct: 1 },
    { q: "What is a Ledger?", options: ["Account Book", "Hardware", "Tax Type"], correct: 0 },
    { q: "GST stands for?", options: ["Gross Sales Tax", "Goods & Service Tax", "General State Tax"], correct: 1 },
    { q: "Which is an asset?", options: ["Bank Loan", "Cash in Hand", "Creditors"], correct: 1 },
    { q: "What is SAP?", options: ["Game Engine", "ERP Software", "Design Tool"], correct: 1 }
  ]
};

const decodeHTML = (html) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export default function NeonStrikeGame() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState("intro"); 
  const [score, setScore] = useState(0);
  const [playerLane, setPlayerLane] = useState(1); 
  const [entities, setEntities] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [floatingTexts, setFloatingTexts] = useState([]);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(1);
  const [shake, setShake] = useState(false); 
  const [couponCode, setCouponCode] = useState("");
  const [copied, setCopied] = useState(false);
  
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({ name: "", countryCode: "+91", phone: "", course: "" });
  const [formError, setFormError] = useState("");
  const [isFetchingQs, setIsFetchingQs] = useState(false);

  const stateRef = useRef({
    lane: 1, score: 0, lives: 3, combo: 1,
    speed: 0.6, entities: [], flashTimer: 0, frame: 0, 
    questions: [], qIndex: 0, isQuestionActive: false
  });

  const gameLoopRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Failed to fetch countries:", err));
  }, []);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const addFloatingText = (text, color, lane) => {
    const id = Date.now() + Math.random();
    setFloatingTexts(prev => [...prev, { id, text, color, lane }]);
    setTimeout(() => setFloatingTexts(prev => prev.filter(t => t.id !== id)), 1000);
  };

  const copyToClipboard = () => {
    if (couponCode) {
      navigator.clipboard.writeText(couponCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePhoneChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, phone: digitsOnly });
  };

  const submitForm = async () => {
    if (formData.name.trim().length < 3) return setFormError("Name must be at least 3 characters.");
    if (formData.countryCode === "+91" && formData.phone.length !== 10) return setFormError("Indian phone numbers must be exactly 10 digits.");
    if (formData.countryCode !== "+91" && formData.phone.length < 6) return setFormError("Please enter a valid phone number.");
    if (!formData.course) return setFormError("Please select a target course.");
    
    setFormError("");
    setIsFetchingQs(true);

    let finalQuestions = [];

    try {
      const categoryId = API_CATEGORY_MAP[formData.course] || 18; 
      
      const response = await fetch(`https://opentdb.com/api.php?amount=5&category=${categoryId}&type=multiple`);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        finalQuestions = data.results.map((item) => {
          const options = [...item.incorrect_answers];
          const correctIndex = Math.floor(Math.random() * 4); 
          options.splice(correctIndex, 0, item.correct_answer); 

          return {
            q: decodeHTML(item.question),
            options: options.map(decodeHTML),
            correct: correctIndex,
          };
        });
      } else {
        finalQuestions = [...FALLBACK_QUESTIONS[formData.course]].sort(() => Math.random() - 0.5);
      }
    } catch (error) {
      console.error("API failed to fetch, using fallback questions:", error);
      finalQuestions = [...FALLBACK_QUESTIONS[formData.course]].sort(() => Math.random() - 0.5);
    }

    setIsFetchingQs(false);
    startGame(finalQuestions);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== "playing") return;
      if (e.key === "ArrowLeft" && stateRef.current.lane > 0) movePlayer(-1);
      if (e.key === "ArrowRight" && stateRef.current.lane < 2) movePlayer(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  const movePlayer = (direction) => {
    const newLane = stateRef.current.lane + direction;
    if (newLane >= 0 && newLane <= 2) {
      stateRef.current.lane = newLane;
      setPlayerLane(newLane);
    }
  };

  const startGame = (questionsToPlay) => {
    setGameState("playing");
    setScore(0); setLives(3); setCombo(1); setEntities([]);
    
    stateRef.current = {
      lane: 1, score: 0, lives: 3, combo: 1, speed: 0.6, entities: [], 
      flashTimer: 0, frame: 0, questions: questionsToPlay, qIndex: 0, isQuestionActive: false
    };

    setPlayerLane(1);
    gameLoopRef.current = setInterval(gameTick, 30);
  };

  const gameTick = () => {
    const state = stateRef.current;
    state.frame += 1;
    
    if (state.frame % 150 === 0) state.speed += 0.02; 
    if (state.flashTimer > 0) state.flashTimer -= 30;

    if (!state.isQuestionActive && state.frame % 120 === 0) {
      if (state.qIndex >= state.questions.length) state.qIndex = 0; 
      
      const qData = state.questions[state.qIndex];
      setCurrentQuestion(qData.q);
      state.isQuestionActive = true;

      const laneOrder = [0, 1, 2];
      const selectedOptions = [];
      selectedOptions.push({ text: qData.options[qData.correct], isCorrect: true });
      
      const incorrects = qData.options.filter((_, i) => i !== qData.correct);
      selectedOptions.push({ text: incorrects[0] || "None", isCorrect: false });
      selectedOptions.push({ text: incorrects[1] || "All", isCorrect: false });
      
      selectedOptions.sort(() => Math.random() - 0.5); 
      
      selectedOptions.forEach((opt, index) => {
        state.entities.push({
          id: Date.now() + Math.random(),
          lane: laneOrder[index],
          top: -10, 
          text: opt.text,
          isCorrect: opt.isCorrect,
          revealed: false 
        });
      });
    }

    let hitWrong = false;
    let waveCompleted = false;

    state.entities = state.entities.map(ent => ({ ...ent, top: ent.top + state.speed }))
      .filter(ent => {
        const inHitbox = ent.top > 75 && ent.top < 90 && ent.lane === state.lane;
        
        if (inHitbox && !ent.revealed) {
          ent.revealed = true; 
          waveCompleted = true; 

          if (ent.isCorrect) {
            const pts = 1000 * state.combo;
            state.score += pts;
            state.combo = Math.min(state.combo + 1, 10);
            setCombo(state.combo);
            addFloatingText(`+${pts}`, "text-green-400", state.lane);
          } else {
            hitWrong = true;
            addFloatingText("WRONG", "text-red-500", state.lane);
          }
        }
        return ent.top < 120; 
      });

    if (waveCompleted) {
      setTimeout(() => {
        state.entities = [];
        state.isQuestionActive = false;
        state.qIndex++;
        setCurrentQuestion(null);
      }, 500); 
    }

    if (hitWrong) {
      triggerShake(); 
      state.lives -= 1;
      state.combo = 1; 
      state.flashTimer = 2000; 
      
      setLives(state.lives);
      setCombo(state.combo);
      
      if (state.lives <= 0) {
        endGame();
        return;
      }
    }

    if (state.frame % 3 === 0) {
      setScore(state.score);
      setEntities([...state.entities]);
    }
  };

  const endGame = async () => {
    clearInterval(gameLoopRef.current);
    
    const finalScore = stateRef.current.score;
    let prefix = "B2"; 
    if (finalScore > 10000) prefix = "X9"; 
    else if (finalScore > 5000) prefix = "V7"; 
    
    const code = `GTEC-${prefix}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    setCouponCode(code);
    setGameState("result");

    const fullPhoneNumber = `${formData.countryCode}${formData.phone}`;
    try {
      await fetch("http://localhost:5000/api/gamescores/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, phone: fullPhoneNumber, course: formData.course, score: finalScore, couponCode: code })
      });
    } catch (error) { console.error("Failed to save score:", error); }
  };

  const handleExit = () => {
    clearInterval(gameLoopRef.current);
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-[#020202] flex items-center justify-center font-sans overflow-hidden select-none w-screen h-screen">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-blue-900/20 blur-[200px] rounded-full pointer-events-none"></div>

      <button onClick={handleExit} className="absolute top-6 right-6 z-[100000] bg-white/10 hover:bg-red-500/80 text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/20">
        <X size={24} />
      </button>

      <motion.div 
        animate={shake ? { x: [-15, 15, -15, 15, 0], y: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full h-full relative z-10 flex flex-col justify-center max-w-[1920px] mx-auto"
      >
        <AnimatePresence mode="wait">
          
          {gameState === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center px-4">
              <BrainCircuit size={100} className="mx-auto text-blue-500 mb-6 drop-shadow-[0_0_40px_rgba(59,130,246,0.8)]" />
              <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight leading-none mb-4">
                TRIVIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">RACER</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-2xl leading-relaxed mb-8 max-w-3xl mx-auto">
                Test your knowledge at warp speed! Steer your rocket into the correct answers to win a massive <strong className="text-white">Scholarship Code!</strong>
              </p>
              <button onClick={() => setGameState("form")} className="w-full md:w-1/2 max-w-lg mx-auto bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black py-5 rounded-3xl shadow-[0_0_40px_rgba(34,211,238,0.5)] flex items-center justify-center gap-4 text-2xl uppercase tracking-widest active:scale-95 transition-all hover:scale-105">
                Start Quest <ArrowRight size={28} />
              </button>
            </motion.div>
          )}

          {gameState === "form" && (
            <motion.div key="form" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-5xl mx-auto bg-black/80 backdrop-blur-xl p-8 md:p-12 rounded-[3rem] border border-zinc-800 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                
                <div className="space-y-5">
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-1">Registration</h2>
                  <p className="text-zinc-400 mb-6 text-base">Enter details to generate your unique scholarship coupon.</p>
                  
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={22} />
                    <input type="text" placeholder="Student Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-900 border-2 border-zinc-700 text-white rounded-xl py-4 pl-12 pr-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all text-lg" />
                  </div>
                  
                  <div className="flex gap-2 relative">
                    <div className="relative w-32 shrink-0">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                      <select value={formData.countryCode} onChange={(e) => setFormData({...formData, countryCode: e.target.value})} className="w-full bg-zinc-900 border-2 border-zinc-700 text-white rounded-xl py-4 pl-10 pr-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all appearance-none text-base">
                        <option value="+91">IN (+91)</option>
                        {countries.map((c) => <option key={c.id} value={`+${c.phonecode}`}>{c.id} (+{c.phonecode})</option>)}
                      </select>
                    </div>
                    <input type="text" placeholder="Phone Number" value={formData.phone} onChange={handlePhoneChange} maxLength={formData.countryCode === "+91" ? 10 : 15} className="w-full bg-zinc-900 border-2 border-zinc-700 text-white rounded-xl py-4 px-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all font-mono tracking-wider text-lg" />
                  </div>

                  <div className="relative">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={22} />
                    <select value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} className="w-full bg-zinc-900 border-2 border-zinc-700 text-white rounded-xl py-4 pl-12 pr-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all appearance-none text-lg">
                      <option value="" disabled>Select Target Course</option>
                      {Object.keys(FALLBACK_QUESTIONS).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  
                  {formError && <p className="text-red-400 text-sm font-bold text-center bg-red-500/10 py-3 rounded-lg border border-red-500/20">{formError}</p>}
                  
                  <button onClick={submitForm} disabled={isFetchingQs} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] mt-4 active:scale-95 text-xl uppercase tracking-wider flex justify-center items-center gap-2">
                    {isFetchingQs ? <><Loader2 className="animate-spin" /> Preparing Challenge...</> : "Ready to Launch"}
                  </button>
                </div>

                <div className="hidden md:flex flex-col items-center justify-center relative border-l border-zinc-800 pl-10">
                  <div className="absolute inset-0 bg-blue-500/10 blur-[60px] rounded-full"></div>
                  <div className="relative z-10 flex items-center justify-center">
                    <Lottie animationData={gaming} loop={true} style={{ width: 350, height: 350 }} />
                  </div>
                  <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm mt-4 relative z-10">System Calibrated</p>
                </div>

              </div>
            </motion.div>
          )}

          {gameState === "playing" && (
            <motion.div key="playing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full w-full relative">
              
              <div className="absolute top-0 left-0 w-full flex justify-between items-start p-6 md:p-8 z-[100] bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none">
                <div className="flex flex-col gap-1">
                  <div className="font-black font-mono text-4xl md:text-5xl text-white drop-shadow-lg flex items-baseline gap-2">
                    {score.toLocaleString()} <span className="text-lg text-cyan-400">PTS</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {[...Array(3)].map((_, i) => (
                      <Heart key={i} size={30} className={i < lives ? "text-red-500 fill-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,1)]" : "text-zinc-800"} />
                    ))}
                  </div>
                </div>
                
                <div className="pr-12"> 
                  <div className={`px-5 py-2 rounded-xl font-black font-mono text-xl flex items-center gap-2 shadow-lg ${combo > 1 ? 'bg-yellow-400/20 text-yellow-400 border-2 border-yellow-400/50 shadow-[0_0_20px_rgba(250,204,21,0.5)]' : 'bg-black/60 text-zinc-400 border border-zinc-800'}`}>
                    <Zap size={22} className={combo > 1 ? "fill-yellow-400" : ""} /> x{combo}
                  </div>
                </div>
              </div>

              <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[90%] md:w-[60%] max-w-2xl z-[90]">
                <AnimatePresence mode="wait">
                  {currentQuestion && (
                    <motion.div 
                      initial={{ y: -30, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: -30, opacity: 0, scale: 0.95 }}
                      className="bg-blue-950/90 backdrop-blur-xl border border-cyan-400/50 rounded-2xl p-4 md:p-5 text-center shadow-[0_15px_30px_rgba(34,211,238,0.2)]"
                    >
                      <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">Incoming Target</p>
                      <h3 className="text-lg md:text-2xl font-black text-white leading-tight">{currentQuestion}</h3>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative flex-1 w-full bg-[#030305] overflow-hidden" style={{ perspective: '1200px' }}>
                
                <div 
                  className="absolute bottom-0 w-full h-[250%]" 
                  style={{ 
                    transform: 'rotateX(60deg)', 
                    transformOrigin: 'bottom center', 
                    transformStyle: 'preserve-3d',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%, black 100%)'
                  }}
                >
                  <div className="absolute inset-0 opacity-50">
                    <div className="w-full h-full bg-[linear-gradient(transparent_50%,rgba(34,211,238,0.15)_50%)] bg-[length:100%_120px] animate-[slideDown_0.6s_linear_infinite]"></div>
                  </div>
                  <div className="absolute inset-0 flex justify-evenly pointer-events-none opacity-80">
                    <div className="w-4 h-full bg-cyan-500/40 shadow-[0_0_30px_rgba(34,211,238,0.8)]"></div>
                    <div className="w-4 h-full bg-cyan-500/40 shadow-[0_0_30px_rgba(34,211,238,0.8)]"></div>
                  </div>
                </div>

                <div className="absolute inset-0 z-[60] pointer-events-none">
                  {entities.map(ent => {
                    const progress = ent.top / 100;
                    
                    let xPos = 50;
                    if (ent.lane === 0) xPos = 50 - (5 + progress * 34); 
                    if (ent.lane === 2) xPos = 50 + (5 + progress * 34); 

                    const scale = 0.4 + (progress * 0.7);

                    return (
                      <div key={ent.id} 
                           className="absolute flex flex-col items-center justify-center pointer-events-auto"
                           style={{ 
                             left: `${xPos}%`, 
                             top: `${ent.top}%`, 
                             transform: `translate(-50%, -50%) scale(${scale})`, 
                             zIndex: Math.floor(ent.top),
                             width: '280px' 
                           }}>
                        
                        {!ent.revealed && (
                          <div className="bg-blue-950/95 border-2 border-cyan-400 px-5 py-4 rounded-xl text-white font-black text-center shadow-[0_15px_30px_rgba(34,211,238,0.5)] backdrop-blur-md text-xl leading-snug w-full">
                            {ent.text}
                          </div>
                        )}

                        {ent.revealed ? (
                          ent.isCorrect ? (
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(34,197,94,1)] border-4 border-white animate-pulse">
                              <CheckCircle2 size={40} className="text-white" />
                            </div>
                          ) : (
                            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(239,68,68,1)] border-4 border-yellow-400">
                              <Bomb size={40} className="text-yellow-300" />
                            </div>
                          )
                        ) : null}
                      </div>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {floatingTexts.map(ft => {
                    let xPos = 50;
                    if (ft.lane === 0) xPos = 16.66;
                    if (ft.lane === 2) xPos = 83.33;

                    return (
                      <motion.div key={ft.id} 
                        initial={{ opacity: 1, y: '70%', scale: 0.5 }} 
                        animate={{ opacity: 0, y: '20%', scale: 1.5 }} 
                        exit={{ opacity: 0 }} 
                        transition={{ duration: 1 }} 
                        className={`absolute flex justify-center text-5xl font-black ${ft.color} drop-shadow-[0_0_20px_currentColor] z-50 text-center pointer-events-none`} 
                        style={{ left: `${xPos}%`, transform: 'translateX(-50%)', width: '100%' }}>
                        {ft.text}
                      </motion.div>
                    )
                  })}
                </AnimatePresence>

                <div className="absolute bottom-10 w-1/3 flex justify-center z-[80]" style={{ left: `${playerLane * 33.33}%`, transition: 'left 0.1s cubic-bezier(0.2, 0.8, 0.2, 1)' }}>
                  <div className={`w-28 h-36 relative flex items-center justify-center transition-all duration-300 ${stateRef.current.flashTimer > 0 ? 'opacity-30' : 'opacity-100'}`}>
                    <div className="w-20 h-32 rounded-t-full rounded-b-4xl relative z-10 flex flex-col items-center pt-4 bg-linear-to-b from-gray-100 via-gray-300 to-gray-500 shadow-[0_15px_30px_rgba(0,0,0,0.9),inset_-8px_0_20px_rgba(0,0,0,0.5)] border border-gray-400">
                      <div className="w-8 h-12 rounded-full mt-2 border-4 bg-blue-950 border-gray-400 shadow-[inset_0_8px_15px_rgba(0,0,0,0.9)]"></div>
                      <div className="absolute -left-5 bottom-4 w-5 h-16 rounded-l-full skew-y-12 bg-red-600 shadow-xl border-r border-red-800"></div>
                      <div className="absolute -right-5 bottom-4 w-5 h-16 rounded-r-full -skew-y-12 bg-red-600 shadow-xl border-l border-red-800"></div>
                    </div>
                    <div className="absolute -bottom-12 w-14 h-24 rounded-full blur-[10px] mix-blend-screen animate-[pulse_0.05s_infinite] bg-linear-to-t from-transparent via-orange-500 to-yellow-100"></div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-black z-100 h-32 pb-8">
                <button onPointerDown={() => movePlayer(-1)} className="flex-1 bg-zinc-900 border-b-8 border-zinc-800 rounded-3xl flex items-center justify-center active:border-b-0 active:translate-y-2 transition-all hover:bg-zinc-800 shadow-2xl">
                  <ChevronLeft size={60} className="text-zinc-400" />
                </button>
                <button onPointerDown={() => movePlayer(1)} className="flex-1 bg-zinc-900 border-b-8 border-zinc-800 rounded-3xl flex items-center justify-center active:border-b-0 active:translate-y-2 transition-all hover:bg-zinc-800 shadow-2xl">
                  <ChevronRight size={60} className="text-zinc-400" />
                </button>
              </div>
            </motion.div>
          )}

          {gameState === "result" && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center px-4 w-full max-w-2xl mx-auto space-y-6">
              <h2 className="text-5xl md:text-7xl font-black text-red-500 tracking-widest drop-shadow-[0_0_30px_rgba(239,68,68,0.8)]">GAME OVER</h2>
              
              <div className="bg-zinc-900/80 backdrop-blur-md rounded-3xl p-6 border border-zinc-800 flex flex-col gap-2 shadow-xl">
                <p className="text-white text-xl font-bold">{formData.name}</p>
                <div className="w-full h-px bg-zinc-800 my-2"></div>
                <p className="text-zinc-400 text-sm uppercase tracking-widest font-bold">Final Score</p>
                <p className="text-6xl md:text-7xl leading-none font-mono font-black text-white drop-shadow-md">{score.toLocaleString()}</p>
              </div>

              <div className="p-6 md:p-8 bg-linear-to-br from-blue-900/60 to-cyan-900/60 border-2 border-cyan-500/50 rounded-3xl shadow-[0_0_40px_rgba(34,211,238,0.2)] backdrop-blur-lg">
                <p className="text-lg text-cyan-300 font-black uppercase tracking-widest mb-3 flex items-center justify-center gap-2">
                  <Sparkles size={24} /> Scholarship Code
                </p>
                <div onClick={copyToClipboard} className="text-4xl md:text-5xl font-black text-white font-mono tracking-wider cursor-pointer hover:scale-105 transition-transform py-3 drop-shadow-xl">
                  {couponCode}
                </div>
                <button onClick={copyToClipboard} className="mt-4 mx-auto flex items-center gap-2 text-lg bg-cyan-500 text-cyan-950 px-8 py-3 rounded-xl transition-all font-black uppercase hover:bg-cyan-400 shadow-md">
                  {copied ? "Copied!" : "Copy Code"}
                </button>
              </div>

              <div className="pt-4 flex flex-col md:flex-row gap-4">
                <button onClick={() => setGameState("form")} className="flex-1 bg-zinc-800 text-white font-black uppercase py-5 rounded-2xl transition-all hover:bg-zinc-700 active:scale-95 border-b-[6px] border-zinc-900 text-xl shadow-lg">Play Again</button>
                <button onClick={handleExit} className="flex-1 bg-white text-black font-black uppercase py-5 rounded-2xl transition-all shadow-xl hover:bg-gray-200 flex items-center justify-center gap-3 active:scale-95 border-b-[6px] border-gray-400 text-xl">Exit Game <ArrowRight size={24} /></button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </motion.div>

      <style jsx="true">{`
        @keyframes slideDown {
          from { background-position: 0 0; }
          to { background-position: 0 120px; }
        }
      `}</style>
    </div>
  );
}
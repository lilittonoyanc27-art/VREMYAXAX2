import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw,
  ChevronRight,
  Trophy,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface Exercise {
  spanish: string;
  armenian: string;
}

const EXERCISES: Exercise[] = [
  { spanish: "Es la una", armenian: "Ժամը մեկն է" },
  { spanish: "Son las dos", armenian: "Ժամը երկուսն է" },
  { spanish: "Son las tres y cuarto", armenian: "Երեքն անց քառորդ է" },
  { spanish: "Son las cuatro y media", armenian: "Չորսն անց կես է" },
  { spanish: "Son las cinco menos cuarto", armenian: "Հինգից քառորդ պակաս է" },
  { spanish: "Es la una y cinco", armenian: "Մեկն անց հինգ է" },
  { spanish: "Son las siete y diez", armenian: "Յոթն անց տաս է" },
  { spanish: "Son las आठ y veinte", armenian: "Ութն անց քսան է" },
  { spanish: "Son las nueve y veinticinco", armenian: "Իննն անց քսանհինգ է" },
  { spanish: "Son las diez en punto", armenian: "Ուղիղ ժամը տասն է" },
  { spanish: "Son las once menos veinte", armenian: "Տասնմեկից քսան պակաս է" },
  { spanish: "Son las doce menos diez", armenian: "Տասներկուսից տաս պակաս է" },
  { spanish: "Es mediodía", armenian: "Կեսօր է" },
  { spanish: "Es medianoche", armenian: "Կեսգիշեր է" },
  { spanish: "Son las seis de la mañana", armenian: "Առավոտյան ժամը վեցն է" },
  { spanish: "Son las tres de la tarde", armenian: "Ցերեկվա ժամը երեքն է" },
  { spanish: "Son las nueve de la noche", armenian: "Երեկոյան ժամը իննն է" },
  { spanish: "Son las siete y media", armenian: "Յոթն անց կես է" },
  { spanish: "Son las diez menos cinco", armenian: "Տասից հինգ պակաս է" },
  { spanish: "Son las doce y cuarto", armenian: "Տասներկուսն անց քառորդ է" }
];

// Fix typo in exercise 8
EXERCISES[7].spanish = "Son las ocho y veinte";

const shuffle = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function TimeExercises() {
  const [index, setIndex] = useState(0);
  const [scrambled, setScrambled] = useState<string[]>([]);
  const [selected, setSelected] = useState<{ word: string; originalIndex: number }[]>([]);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentExercise = EXERCISES[index];
  const targetWords = currentExercise.spanish.split(' ');

  useEffect(() => {
    setScrambled(shuffle(targetWords));
    setSelected([]);
    setFeedback(null);
  }, [index]);

  const handleWordClick = (word: string, originalIndex: number) => {
    if (feedback) return;
    
    // Check if already selected
    if (selected.some(s => s.originalIndex === originalIndex)) {
      // Deselect
      setSelected(prev => prev.filter(s => s.originalIndex !== originalIndex));
    } else {
      // Select
      setSelected(prev => [...prev, { word, originalIndex }]);
    }
  };

  const checkAnswer = () => {
    const userSentence = selected.map(s => s.word).join(' ');
    if (userSentence === currentExercise.spanish) {
      setScore(s => s + 1);
      setFeedback({ isCorrect: true, message: 'Հրաշալի է: Ճիշտ է:' });
    } else {
      setFeedback({ isCorrect: false, message: `Սխալ է: Ճիշտ տարբերակն է՝ "${currentExercise.spanish}"` });
    }
  };

  const handleNext = () => {
    if (index < EXERCISES.length - 1) {
      setIndex(i => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setIsFinished(false);
    setSelected([]);
    setFeedback(null);
  };

  if (isFinished) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-2xl w-full bg-white rounded-[64px] p-12 md:p-20 border-4 border-slate-100 shadow-2xl text-center space-y-12">
          <div className="space-y-4">
            <div className="w-24 h-24 bg-amber-500 rounded-[32px] flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/30 mb-8">
              <Trophy className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-5xl font-black text-slate-900 uppercase tracking-tight">Ավարտվեց:</h2>
            <p className="text-2xl text-slate-500 font-medium">
              Դուք կատարեցիք բոլոր 20 վարժությունները <br/>
              <span className="text-amber-600 font-black text-4xl">{score} / 20</span> միավորով:
            </p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-[48px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <img 
              src="https://picsum.photos/seed/clock-final/800/400" 
              alt="Clocks" 
              className="relative w-full h-64 object-cover rounded-[40px] shadow-xl border-4 border-white"
              referrerPolicy="no-referrer"
            />
          </div>

          <button 
            onClick={reset}
            className="w-full py-6 bg-amber-600 text-white rounded-[32px] font-black text-2xl shadow-xl hover:bg-amber-700 transition-all active:scale-95 flex items-center justify-center gap-4"
          >
            ՍԿՍԵԼ ՆՈՐԻՑ
            <RotateCcw className="w-8 h-8" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-amber-100 pb-20">
      {/* Header */}
      <header className="bg-white border-b-4 border-amber-100 p-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">Իգրա: Ժամի Վարժություններ</h1>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">20 Ինտերակտիվ Խաղ</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest">
              ՄԻԱՎՈՐ: <span className="text-amber-600">{score}</span>
            </div>
            <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 transition-all duration-300"
                style={{ width: `${((index + 1) / EXERCISES.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 md:p-12 space-y-12">
        {/* Prompt Section */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <div className="inline-block px-4 py-1 bg-amber-100 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest">
              ՎԱՐԺՈՒԹՅՈՒՆ {index + 1} / 20
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              {currentExercise.armenian}
            </h2>
            <div className="h-1 w-24 bg-amber-200 mx-auto rounded-full"></div>
            <p className="text-sm text-slate-400 font-medium italic">
              Կազմիր այս նախադասությունը իսպաներենով՝ ընտրելով ճիշտ բառերը
            </p>
          </div>
        </div>

        {/* Result Area */}
        <div className="min-h-[120px] bg-white rounded-[40px] border-4 border-dashed border-slate-200 p-8 flex flex-wrap gap-3 items-center justify-center shadow-inner">
          {selected.length === 0 && !feedback && (
            <p className="text-slate-300 font-bold uppercase tracking-widest text-sm">
              Ընտրիր բառերը ներքևից...
            </p>
          )}
          {selected.map((s, i) => (
            <button
              key={`${s.word}-${s.originalIndex}`}
              onClick={() => handleWordClick(s.word, s.originalIndex)}
              disabled={feedback !== null}
              className="px-6 py-3 bg-amber-500 text-white rounded-2xl font-black text-xl shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all"
            >
              {s.word}
            </button>
          ))}
        </div>

        {/* Scrambled Words Pool */}
        <div className="flex flex-wrap gap-4 justify-center p-8 bg-slate-100/50 rounded-[48px] border-4 border-white shadow-xl">
          {scrambled.map((word, i) => {
            const isSelected = selected.some(s => s.originalIndex === i);
            return (
              <div key={i} className="relative">
                {/* Gray Placeholder */}
                <div className="px-6 py-3 bg-slate-200 rounded-2xl text-transparent font-black text-xl select-none">
                  {word}
                </div>
                
                {/* Actual Word Button */}
                {!isSelected && (
                  <button
                    onClick={() => handleWordClick(word, i)}
                    disabled={feedback !== null}
                    className="absolute inset-0 px-6 py-3 bg-white text-slate-700 rounded-2xl font-black text-xl shadow-md border-2 border-white hover:border-amber-200 hover:shadow-lg transition-all active:scale-95"
                  >
                    {word}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-6">
          {!feedback ? (
            <button
              onClick={checkAnswer}
              disabled={selected.length === 0}
              className="w-full py-6 bg-slate-900 text-white rounded-[32px] font-black text-2xl shadow-xl hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ՍՏՈՒԳԵԼ
            </button>
          ) : (
            <div
              className={`p-8 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-6 ${feedback.isCorrect ? 'bg-emerald-50 border-4 border-emerald-100 text-emerald-700' : 'bg-rose-50 border-4 border-rose-100 text-rose-700'}`}
            >
              <div className="flex items-center gap-6">
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${feedback.isCorrect ? 'bg-emerald-500' : 'bg-rose-500'} text-white shadow-lg`}>
                  {feedback.isCorrect ? <CheckCircle2 className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-black uppercase tracking-tight">{feedback.isCorrect ? 'Գերազանց է:' : 'Ուշադիր եղիր:'}</p>
                  <p className="text-lg font-bold opacity-80">{feedback.message}</p>
                </div>
              </div>
              <button 
                onClick={handleNext}
                className="px-12 py-5 bg-white rounded-[24px] shadow-xl font-black uppercase tracking-widest text-lg hover:shadow-2xl transition-all flex items-center gap-3 active:scale-95"
              >
                {index < EXERCISES.length - 1 ? 'ՀԱՋՈՐԴԸ' : 'ԱՎԱՐՏԵԼ'}
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        <footer className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-300 font-black uppercase tracking-[0.5em] text-xs">
            <Sparkles className="w-4 h-4" />
            ԳԱՅԱՆԵԻ ՀԱՄԱՐ
            <Sparkles className="w-4 h-4" />
          </div>
        </footer>
      </main>
    </div>
  );
}

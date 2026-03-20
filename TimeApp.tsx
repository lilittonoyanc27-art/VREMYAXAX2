import React from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  BookOpen, 
  Sparkles,
  Info,
  CalendarDays
} from 'lucide-react';

const THEORY_CARDS = [
  {
    title: "Հիմնական հարցը",
    spanish: "¿Qué hora es?",
    armenian: "Ժամը քանի՞սն է:",
    description: "Իսպաներենում ժամը հարցնելու միակ ձևն է:",
    time: "12:00",
    image: "https://picsum.photos/seed/clock-question/400/300"
  },
  {
    title: "Ժամը 1-ը (Եզակի)",
    spanish: "Es la una",
    armenian: "Ժամը մեկն է",
    description: "Միայն 1-ի դեպքում ենք օգտագործում 'Es la' (եզակի թիվ):",
    time: "01:00",
    image: "https://picsum.photos/seed/clock-1/400/300"
  },
  {
    title: "Ժամը 2-ից 12-ը (Հոգնակի)",
    spanish: "Son las dos / Son las tres...",
    armenian: "Ժամը երկուսն է / երեքն է...",
    description: "2-ից սկսած օգտագործում ենք 'Son las' (հոգնակի թիվ):",
    time: "02:00",
    image: "https://picsum.photos/seed/clock-2/400/300"
  },
  {
    title: "Քառորդ անց (15 րոպե)",
    spanish: "y cuarto",
    armenian: "անց քառորդ",
    description: "Օրինակ՝ 4:15 - Son las cuatro y cuarto.",
    time: "04:15",
    image: "https://picsum.photos/seed/clock-15/400/300"
  },
  {
    title: "Կես (30 րոպե)",
    spanish: "y media",
    armenian: "կես",
    description: "Օրինակ՝ 5:30 - Son las cinco y media.",
    time: "05:30",
    image: "https://picsum.photos/seed/clock-30/400/300"
  },
  {
    title: "Քառորդ պակաս (45 րոպե)",
    spanish: "menos cuarto",
    armenian: "քառորդ պակաս",
    description: "Օրինակ՝ 6:45 - Son las siete menos cuarto (յոթից քառորդ պակաս):",
    time: "06:45",
    image: "https://picsum.photos/seed/clock-45/400/300"
  },
  {
    title: "Ավելացնող րոպեներ (1-30)",
    spanish: "y cinco, y diez, y veinte...",
    armenian: "անց հինգ, անց տաս, անց քսան...",
    description: "Մինչև 30 րոպեն օգտագործում ենք 'y' (և):",
    time: "08:10",
    image: "https://picsum.photos/seed/clock-plus/400/300"
  },
  {
    title: "Պակասող րոպեներ (31-59)",
    spanish: "menos diez, menos veinte...",
    armenian: "տաս պակաս, քսան պակաս...",
    description: "30 րոպեից հետո ասում ենք հաջորդ ժամը և հանում րոպեները:",
    time: "09:50",
    image: "https://picsum.photos/seed/clock-minus/400/300"
  },
  {
    title: "Օրվա ժամանակահատվածները",
    spanish: "de la mañana / de la tarde / de la noche",
    armenian: "առավոտյան / կեսօրից հետո / երեկոյան",
    description: "Օգտագործվում է ճշտելու համար օրվա պահը (օր.՝ Son las ocho de la mañana):",
    time: "08:00 AM",
    image: "https://picsum.photos/seed/day-night/400/300"
  },
  {
    title: "Կեսօր և Կեսգիշեր",
    spanish: "Es mediodía / Es medianoche",
    armenian: "Կեսօր է / Կեսգիշեր է",
    description: "Հատուկ բառեր կեսօրվա և կեսգիշերվա համար:",
    time: "12:00 / 00:00",
    image: "https://picsum.photos/seed/noon-midnight/400/300"
  }
];

const ClockIcon = ({ time }: { time: string }) => {
  // Parse time string like "04:15" or "08:00 AM"
  const [h, m] = time.split(':');
  const hour = parseInt(h) || 12;
  const minute = parseInt(m?.split(' ')[0]) || 0;
  
  const hourDeg = (hour % 12) * 30 + minute * 0.5;
  const minuteDeg = minute * 6;

  return (
    <div className="relative w-28 h-28 bg-white rounded-full border-4 border-amber-500 flex items-center justify-center shadow-xl ring-8 ring-amber-50">
      {/* Clock Face Numbers (Simplified) */}
      {[12, 3, 6, 9].map((num, i) => (
        <span 
          key={num} 
          className="absolute text-[10px] font-black text-slate-300"
          style={{ 
            transform: `rotate(${i * 90}deg) translateY(-38px) rotate(-${i * 90}deg)` 
          }}
        >
          {num}
        </span>
      ))}
      
      {/* Hands */}
      <motion.div 
        className="absolute w-1.5 h-8 bg-slate-800 rounded-full origin-bottom -translate-y-4" 
        style={{ rotate: hourDeg }}
      />
      <motion.div 
        className="absolute w-1 h-11 bg-amber-600 rounded-full origin-bottom -translate-y-5.5" 
        style={{ rotate: minuteDeg }}
      />
      <div className="w-3 h-3 bg-slate-900 rounded-full z-10 border-2 border-white"></div>
      
      <div className="absolute -bottom-8 bg-amber-500 px-3 py-1 rounded-full shadow-lg">
        <span className="text-[10px] font-black text-white whitespace-nowrap">{time}</span>
      </div>
    </div>
  );
};

const QUICK_EXAMPLES = [
  { s: "1:05", es: "Es la una y cinco", am: "Մեկն անց հինգ" },
  { s: "2:10", es: "Son las dos y diez", am: "Երկուսն անց տաս" },
  { s: "3:15", es: "Son las tres y cuarto", am: "Երեքն անց քառորդ" },
  { s: "4:20", es: "Son las cuatro y veinte", am: "Չորսն անց քսան" },
  { s: "5:25", es: "Son las cinco y veinticinco", am: "Հինգն անց քսանհինգ" },
  { s: "6:30", es: "Son las seis y media", am: "Վեցն անց կես" },
  { s: "7:35", es: "Son las ocho menos veinticinco", am: "Ութից քսանհինգ պակաս" },
  { s: "8:40", es: "Son las nueve menos veinte", am: "Իննից քսան պակաս" },
  { s: "9:45", es: "Son las diez menos cuarto", am: "Տասից քառորդ պակաս" },
  { s: "10:50", es: "Son las once menos diez", am: "Տասնմեկից տաս պակաս" },
  { s: "11:55", es: "Son las doce menos cinco", am: "Տասներկուսից հինգ պակաս" },
  { s: "12:00", es: "Son las doce en punto", am: "Ուղիղ տասներկուսն է" },
];

export default function TimeApp() {
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
              <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight leading-none">Իսպաներեն Ժամեր</h1>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Ամբողջական Տեսություն</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-xl font-black text-sm uppercase tracking-widest">
            <BookOpen className="w-4 h-4" />
            ԲՈԼՈՐ ՏԱՐԲԵՐԱԿՆԵՐԸ
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6 md:p-12">
        <div className="mb-16 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 bg-amber-100 rounded-[32px] mb-4"
          >
            <Clock className="w-12 h-12 text-amber-600" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tight leading-none"
          >
            Ժամանակը <br/> <span className="text-amber-500">Իսպաներենում</span>
          </motion.h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Սովորիր բոլոր կանոնները, թե ինչպես ճիշտ ասել ժամը ցանկացած պահի:
          </p>
        </div>

        {/* Main Rules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {THEORY_CARDS.map((card, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-[48px] border-4 border-slate-100 shadow-xl overflow-hidden group hover:border-amber-200 transition-all flex flex-col"
            >
              <div className="relative h-48 bg-slate-50 flex items-center justify-center overflow-hidden border-b-4 border-slate-50">
                <div className="absolute inset-0 opacity-10">
                  <img src={card.image} alt="" className="w-full h-full object-cover grayscale" />
                </div>
                <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                  <ClockIcon time={card.time} />
                </div>
              </div>

              <div className="p-10 flex-grow space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{card.title}</h3>
                  <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">Կանոն {i + 1}</span>
                </div>

                <div className="space-y-4">
                  <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-100">
                    <p className="text-3xl font-black text-amber-600 leading-tight mb-2">{card.spanish}</p>
                    <p className="text-xl font-bold text-slate-500">{card.armenian}</p>
                  </div>
                  
                  <p className="text-slate-600 leading-relaxed font-medium italic">
                    {card.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All Variants / Quick Reference Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[64px] border-4 border-amber-100 p-12 md:p-20 shadow-2xl mb-20"
        >
          <div className="flex items-center gap-6 mb-12">
            <div className="w-16 h-16 bg-amber-500 rounded-3xl flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight">Բոլոր Տարբերակները</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Արագ տեղեկատու</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {QUICK_EXAMPLES.map((ex, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 bg-slate-50 rounded-[32px] border-2 border-slate-100 hover:border-amber-200 hover:bg-white transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm font-black text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                    {ex.s}
                  </div>
                  <div className="h-px flex-grow bg-slate-200"></div>
                </div>
                <p className="text-xl font-black text-slate-900 mb-1">{ex.es}</p>
                <p className="text-sm font-bold text-slate-400">{ex.am}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Summary / Tips */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 bg-slate-900 rounded-[64px] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Clock className="w-64 h-64" />
          </div>
          
          <div className="relative z-10 space-y-12">
            <div className="space-y-4">
              <h2 className="text-5xl font-black uppercase tracking-tight">Կարևոր խորհուրդներ</h2>
              <p className="text-slate-400 text-xl font-medium">Մի քանի լրացուցիչ կանոններ, որոնք կօգնեն քեզ:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <CalendarDays className="w-6 h-6 text-amber-400" />
                </div>
                <h4 className="text-xl font-black uppercase">Հոդերը</h4>
                <p className="text-slate-400 leading-relaxed">Ժամերի համար միշտ օգտագործում ենք իգական սեռի հոդերը (la/las), քանի որ 'hora' բառը իգական է:</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-amber-400" />
                </div>
                <h4 className="text-xl font-black uppercase">Բայը</h4>
                <p className="text-slate-400 leading-relaxed">'Ser' բայը միշտ համաձայնեցվում է թվի հետ՝ Es (1-ի համար) և Son (2-12-ի համար):</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                  <Info className="w-6 h-6 text-amber-400" />
                </div>
                <h4 className="text-xl font-black uppercase">Հարցը</h4>
                <p className="text-slate-400 leading-relaxed">Եթե հարցնում եք «Ո՞ր ժամին», օգտագործեք '¿A qué hora?' (օր.՝ ¿A qué hora es la clase?):</p>
              </div>
            </div>
          </div>
        </motion.div>

        <footer className="mt-20 text-center pb-12">
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

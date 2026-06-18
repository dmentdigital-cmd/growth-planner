import React, { useState, useEffect } from 'react';

// --- ICONOS SVG PERSONALIZADOS PARA EVITAR DEPENDENCIAS EXTRA ---
const GoalIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BrainstormIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const PrioritizeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
  </svg>
);

const PlanIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
  </svg>
);

const TestIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const AnalysisIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

const ChevronRight = () => (
  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);

export default function App() {
  // --- ESTADO GLOBAL DEL PROYECTO ---
  const [projectTitle, setProjectTitle] = useState('Estrategia de Growth Marketing - Dmente Digital');
  const [activeStep, setActiveStep] = useState(1);
  
  // Paso 1: Objetivos
  const [objectives, setObjectives] = useState({
    northStar: '',
    kpis: '',
    audience: '',
    duration: '30 días',
    budget: '',
  });

  // Paso 2: Lluvia de Ideas
  const [ideas, setIdeas] = useState([
    { id: 1, title: 'Crear Lead Magnet con plantilla gratuita de IA', channel: 'Inbound / SEO', impact: 8, confidence: 7, ease: 9, status: 'prioritized' },
    { id: 2, title: 'Retargeting agresivo en Meta Ads a visitas de precios', channel: 'Paid Media', impact: 7, confidence: 8, ease: 8, status: 'prioritized' },
    { id: 3, title: 'Optimizar CTR de la landing de servicios principal', channel: 'CRO / Web', impact: 8, confidence: 6, ease: 7, status: 'brainstorm' }
  ]);
  const [newIdeaTitle, setNewIdeaTitle] = useState('');
  const [newIdeaChannel, setNewIdeaChannel] = useState('');

  // Paso 4: Planear Tests (Experimentos asociados a ideas)
  const [tests, setTests] = useState([
    {
      id: 1,
      ideaId: 1,
      hypothesis: 'Si regalamos una plantilla de prompts de IA en la landing, entonces aumentaremos la tasa de conversión de leads en un 25% porque resolvemos un dolor inmediato de nuestra audiencia.',
      metric: 'Tasa de conversión de formulario (Lead Rate)',
      duration: '14 días',
      responsible: 'Equipo Growth',
      status: 'No Iniciado', // 'No Iniciado' | 'En Ejecución' | 'Finalizado'
      result: '',
      validated: null, // null | 'validated' | 'refuted'
      decision: '', // '' | 'Escalar' | 'Pivotar' | 'Descartar'
    }
  ]);

  // Nuevo experimento temporario para el formulario
  const [selectedIdeaForTest, setSelectedIdeaForTest] = useState(null);
  const [newHypothesis, setNewHypothesis] = useState('');
  const [newTestMetric, setNewTestMetric] = useState('');
  const [newTestDuration, setNewTestDuration] = useState('7 días');
  const [newTestResponsible, setNewTestResponsible] = useState('');

  // Notificaciones locales tipo toast
  const [notification, setNotification] = useState('');

  const triggerNotification = (text) => {
    setNotification(text);
    setTimeout(() => setNotification(''), 3000);
  };

  // --- COMPORTAMIENTO LOCAL STORAGE ---
  useEffect(() => {
    const saved = localStorage.getItem('dmente_growth_planner');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.projectTitle) setProjectTitle(parsed.projectTitle);
        if (parsed.objectives) setObjectives(parsed.objectives);
        if (parsed.ideas) setIdeas(parsed.ideas);
        if (parsed.tests) setTests(parsed.tests);
      } catch (e) {
        console.error("Error al cargar datos locales", e);
      }
    }
  }, []);

  const saveToLocalStorage = () => {
    const dataToSave = { projectTitle, objectives, ideas, tests };
    localStorage.setItem('dmente_growth_planner', JSON.stringify(dataToSave));
    triggerNotification('¡Progreso guardado localmente con éxito!');
  };

  const resetAll = () => {
    if (window.confirm('¿Estás seguro de que quieres borrar todos los datos del proyecto actual? Esta acción no se puede deshacer.')) {
      setObjectives({ northStar: '', kpis: '', audience: '', duration: '30 días', budget: '' });
      setIdeas([]);
      setTests([]);
      setProjectTitle('Nueva Campaña de Growth');
      setActiveStep(1);
      localStorage.removeItem('dmente_growth_planner');
      triggerNotification('Proyecto reiniciado correctamente.');
    }
  };

  // --- LÓGICA DE PASO 2: LLUVIA DE IDEAS ---
  const handleAddIdea = (e) => {
    e.preventDefault();
    if (!newIdeaTitle.trim()) return;
    const newId = Date.now();
    const idea = {
      id: newId,
      title: newIdeaTitle,
      channel: newIdeaChannel || 'General / Orgánico',
      impact: 5,
      confidence: 5,
      ease: 5,
      status: 'brainstorm'
    };
    setIdeas([...ideas, idea]);
    setNewIdeaTitle('');
    setNewIdeaChannel('');
    triggerNotification('¡Idea añadida a la lluvia de ideas!');
  };

  const handleUpdateIce = (id, field, value) => {
    setIdeas(ideas.map(idea => idea.id === id ? { ...idea, [field]: parseInt(value) } : idea));
  };

  const calculateIceScore = (idea) => {
    return ((idea.impact + idea.confidence + idea.ease) / 3).toFixed(1);
  };

  // --- LÓGICA DE PASO 4: PLANIFICAR EXPERIMENTOS ---
  const handleCreateTest = (e) => {
    e.preventDefault();
    if (!selectedIdeaForTest) {
      alert("Por favor selecciona una idea de la lista para crear un test.");
      return;
    }
    const newTest = {
      id: Date.now(),
      ideaId: parseInt(selectedIdeaForTest),
      hypothesis: newHypothesis,
      metric: newTestMetric,
      duration: newTestDuration,
      responsible: newTestResponsible || 'Responsable',
      status: 'No Iniciado',
      result: '',
      validated: null,
      decision: '',
    };
    setTests([...tests, newTest]);
    
    // Cambiar estado de la idea a "En test"
    setIdeas(ideas.map(i => i.id === parseInt(selectedIdeaForTest) ? { ...i, status: 'testing' } : i));

    // Limpiar formulario
    setSelectedIdeaForTest(null);
    setNewHypothesis('');
    setNewTestMetric('');
    setNewTestDuration('7 días');
    setNewTestResponsible('');
    triggerNotification('¡Experimento planificado correctamente!');
  };

  // --- LÓGICA DE PASO 5: TESTS/PRUEBAS (KANBAN) ---
  const updateTestStatus = (testId, newStatus) => {
    setTests(tests.map(t => t.id === testId ? { ...t, status: newStatus } : t));
    triggerNotification(`Test movido a "${newStatus}"`);
  };

  // --- LÓGICA DE PASO 6: ANÁLISIS DE RESULTADOS ---
  const updateTestAnalysis = (testId, field, value) => {
    setTests(tests.map(t => t.id === testId ? { ...t, [field]: value } : t));
  };

  // Exportar a JSON imprimible o guardar reporte
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ projectTitle, objectives, ideas, tests }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${projectTitle.replace(/\s+/g, '_')}_Growth_Hacking_Plan.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col antialiased">
      {/* HEADER / BARRA DE NAVEGACIÓN */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-emerald-400 to-teal-500 text-slate-950 p-2 rounded-lg font-bold shadow-lg shadow-teal-500/20">
              ⚡ DG
            </div>
            <div>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="bg-transparent font-bold text-lg md:text-xl text-emerald-400 focus:outline-none border-b border-transparent hover:border-slate-700 focus:border-emerald-500 w-full md:w-96 transition"
                title="Haz clic para renombrar tu campaña"
                placeholder="Nombre de la campaña..."
              />
              <p className="text-xs text-slate-400">Herramienta de Control de Experimentos • Dmente Digital</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-wrap">
            <button 
              onClick={saveToLocalStorage}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm transition flex items-center gap-2"
            >
              💾 Guardar Progreso
            </button>
            <button 
              onClick={handleExportData}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold rounded-lg text-sm transition flex items-center gap-2 shadow-md shadow-emerald-500/10"
            >
              📥 Exportar JSON
            </button>
            <button 
              onClick={resetAll}
              className="px-4 py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-800/50 rounded-lg text-sm text-red-300 transition"
            >
              🔄 Reiniciar
            </button>
          </div>
        </div>
      </header>

      {/* NOTIFICACIÓN FLOTANTE */}
      {notification && (
        <div className="fixed bottom-6 right-6 bg-slate-850 border border-emerald-500/40 text-emerald-300 px-4 py-3 rounded-lg shadow-2xl z-50 flex items-center gap-2 animate-bounce">
          <span className="h-2 w-2 bg-emerald-400 rounded-full animate-ping"></span>
          <span>{notification}</span>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SECCIÓN IZQUIERDA: DIAGRAMA INTERACTIVO Y ESTADOS */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          
          {/* MAPA INTERACTIVO (CIRCULO DE GROWTH) */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex flex-col items-center">
            <h2 className="text-sm font-semibold text-slate-400 tracking-wider uppercase mb-6 text-center w-full">
              MAPA DE PROCESO DE GROWTH HACKING
            </h2>
            
            {/* Contenedor del Círculo */}
            <div className="relative w-80 h-80 flex items-center justify-center">
              
              {/* Línea circular de fondo (SVG) */}
              <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="2"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="url(#gradient-emerald)"
                  strokeWidth="2"
                  strokeDasharray="238.7"
                  strokeDashoffset={238.7 - (238.7 * activeStep) / 6}
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="gradient-emerald" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#0d9488" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Botones del Círculo (Nodos) */}
              {/* Paso 1: Definir Objetivos (Arriba) */}
              <button
                onClick={() => setActiveStep(1)}
                className={`absolute top-0 flex flex-col items-center transform -translate-y-1 transition ${activeStep === 1 ? 'scale-110 z-10' : 'opacity-75 hover:opacity-100'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${activeStep === 1 ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30' : 'bg-slate-800 text-slate-300'}`}>1</div>
                <span className="text-[10px] font-bold mt-1 bg-slate-950 px-2 py-0.5 rounded shadow border border-slate-800">OBJETIVOS</span>
              </button>

              {/* Paso 2: Lluvia de Ideas (Arriba Derecha) */}
              <button
                onClick={() => setActiveStep(2)}
                className={`absolute top-12 right-0 transform translate-x-3 transition ${activeStep === 2 ? 'scale-110 z-10' : 'opacity-75 hover:opacity-100'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mx-auto ${activeStep === 2 ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30' : 'bg-slate-800 text-slate-300'}`}>2</div>
                <span className="text-[10px] font-bold mt-1 block bg-slate-950 px-2 py-0.5 rounded shadow border border-slate-800">BRAINSTORM</span>
              </button>

              {/* Paso 3: Priorizar Ideas (Abajo Derecha) */}
              <button
                onClick={() => setActiveStep(3)}
                className={`absolute bottom-12 right-0 transform translate-x-3 transition ${activeStep === 3 ? 'scale-110 z-10' : 'opacity-75 hover:opacity-100'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mx-auto ${activeStep === 3 ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30' : 'bg-slate-800 text-slate-300'}`}>3</div>
                <span className="text-[10px] font-bold mt-1 block bg-slate-950 px-2 py-0.5 rounded shadow border border-slate-800">PRIORIZAR</span>
              </button>

              {/* Paso 4: Planear Tests (Abajo) */}
              <button
                onClick={() => setActiveStep(4)}
                className={`absolute bottom-0 flex flex-col items-center transform translate-y-1 transition ${activeStep === 4 ? 'scale-110 z-10' : 'opacity-75 hover:opacity-100'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${activeStep === 4 ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30' : 'bg-slate-800 text-slate-300'}`}>4</div>
                <span className="text-[10px] font-bold mt-1 bg-slate-950 px-2 py-0.5 rounded shadow border border-slate-800">PLANEAR</span>
              </button>

              {/* Paso 5: Tests / Pruebas (Abajo Izquierda) */}
              <button
                onClick={() => setActiveStep(5)}
                className={`absolute bottom-12 left-0 transform -translate-x-3 transition ${activeStep === 5 ? 'scale-110 z-10' : 'opacity-75 hover:opacity-100'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mx-auto ${activeStep === 5 ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30' : 'bg-slate-800 text-slate-300'}`}>5</div>
                <span className="text-[10px] font-bold mt-1 block bg-slate-950 px-2 py-0.5 rounded shadow border border-slate-800">PRUEBAS</span>
              </button>

              {/* Paso 6: Análisis de Resultados (Arriba Izquierda) */}
              <button
                onClick={() => setActiveStep(6)}
                className={`absolute top-12 left-0 transform -translate-x-3 transition ${activeStep === 6 ? 'scale-110 z-10' : 'opacity-75 hover:opacity-100'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mx-auto ${activeStep === 6 ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30' : 'bg-slate-800 text-slate-300'}`}>6</div>
                <span className="text-[10px] font-bold mt-1 block bg-slate-950 px-2 py-0.5 rounded shadow border border-slate-800">ANALIZAR</span>
              </button>

              {/* Ilustración de Centro (Cohete de Growth / Superhéroe) */}
              <div className="absolute w-36 h-36 bg-slate-900 rounded-full border border-slate-800 flex flex-col items-center justify-center p-3 shadow-inner">
                <div className="text-3xl animate-pulse">🚀</div>
                <div className="text-xs font-black text-emerald-400 mt-2 tracking-widest text-center">DMENTE</div>
                <div className="text-[8px] text-slate-500 tracking-wider">GROWTH LAB</div>
              </div>

            </div>

            {/* Selector de Pasos en forma de Lista de Progreso */}
            <div className="w-full mt-6 space-y-2 border-t border-slate-850 pt-4">
              <div className="text-xs text-slate-500 font-bold mb-2 uppercase">Fases del Embudo de Aprendizaje</div>
              {[
                { n: 1, label: 'Definir Objetivos', desc: 'Metas e hipótesis iniciales' },
                { n: 2, label: 'Lluvia de Ideas', desc: 'Propuestas de mejora' },
                { n: 3, label: 'Priorizar Ideas (ICE)', desc: 'Elegir pruebas de impacto' },
                { n: 4, label: 'Planear Experimentos', desc: 'Definir hipótesis claras' },
                { n: 5, label: 'Ejecutar Tests', desc: 'Seguimiento de pruebas vivas' },
                { n: 6, label: 'Análisis de Resultados', desc: 'Validación y toma de decisiones' }
              ].map((step) => (
                <button
                  key={step.n}
                  onClick={() => setActiveStep(step.n)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition text-left ${activeStep === step.n ? 'bg-emerald-950/30 border border-emerald-500/30 text-emerald-300' : 'bg-slate-900/30 border border-transparent hover:bg-slate-900/60 hover:text-white'}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${activeStep === step.n ? 'bg-emerald-400 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                      {step.n}
                    </span>
                    <div>
                      <div className="text-xs font-bold">{step.label}</div>
                      <div className="text-[10px] text-slate-500">{step.desc}</div>
                    </div>
                  </div>
                  <div className="text-xs">
                    {step.n < activeStep ? '✅' : step.n === activeStep ? '🎯' : '⏳'}
                  </div>
                </button>
              ))}
            </div>

          </div>

          {/* RESUMEN DE MÉTRICAS */}
          <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-4 grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850">
              <div className="text-xs text-slate-400">Total Ideas</div>
              <div className="text-xl font-bold text-emerald-400">{ideas.length}</div>
            </div>
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850">
              <div className="text-xs text-slate-400">En Test</div>
              <div className="text-xl font-bold text-amber-400">
                {tests.filter(t => t.status === 'En Ejecución').length}
              </div>
            </div>
            <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850">
              <div className="text-xs text-slate-400">Analizados</div>
              <div className="text-xl font-bold text-indigo-400">
                {tests.filter(t => t.status === 'Finalizado').length}
              </div>
            </div>
          </div>

        </section>

        {/* SECCIÓN DERECHA: ESPACIO DE TRABAJO DINÁMICO */}
        <section className="lg:col-span-7 bg-slate-950/45 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[600px]">
          
          <div>
            {/* CABECERA DEL TRABAJO ACTIVO */}
            <div className="flex items-center gap-3 border-b border-slate-850 pb-4 mb-6">
              <div className="bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 p-2.5 rounded-xl">
                {activeStep === 1 && <GoalIcon />}
                {activeStep === 2 && <BrainstormIcon />}
                {activeStep === 3 && <PrioritizeIcon />}
                {activeStep === 4 && <PlanIcon />}
                {activeStep === 5 && <TestIcon />}
                {activeStep === 6 && <AnalysisIcon />}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Paso {activeStep} de 6</span>
                <h1 className="text-xl font-extrabold text-white">
                  {activeStep === 1 && "Definir Objetivos de la Campaña"}
                  {activeStep === 2 && "Lluvia de Ideas (Brainstorm)"}
                  {activeStep === 3 && "Priorizar Ideas con Matriz ICE"}
                  {activeStep === 4 && "Planear Tests y Experimentos"}
                  {activeStep === 5 && "Ejecución y Seguimiento de Tests"}
                  {activeStep === 6 && "Análisis de Resultados de Experimentos"}
                </h1>
              </div>
            </div>

            {/* --- CONTENIDO DINÁMICO DE PASOS --- */}

            {/* PASO 1: OBJETIVOS */}
            {activeStep === 1 && (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm">
                  Establece los cimientos. Un buen growth hacker necesita saber a dónde apunta antes de tirar cualquier línea de código o crear un anuncio publicitario.
                </p>

                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-850 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Métrica Norte de Crecimiento (North Star Metric)</label>
                    <textarea
                      value={objectives.northStar}
                      onChange={(e) => setObjectives({...objectives, northStar: e.target.value})}
                      placeholder="Ej: Aumentar los suscriptores activos mensuales del SaaS un 30%."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white min-h-[80px]"
                    />
                    <span className="text-[10px] text-slate-500">La métrica clave que define el éxito general de esta campaña de Growth Hacking.</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Métricas de Control / KPIs de apoyo</label>
                      <input
                        type="text"
                        value={objectives.kpis}
                        onChange={(e) => setObjectives({...objectives, kpis: e.target.value})}
                        placeholder="Ej: Costo por Lead (CPL) < $2, CTR > 4%."
                        className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Público Objetivo / Buyer Persona</label>
                      <input
                        type="text"
                        value={objectives.audience}
                        onChange={(e) => setObjectives({...objectives, audience: e.target.value})}
                        placeholder="Ej: Directores de Marketing en LATAM, Dueños de Ecommerce."
                        className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Plazo estimado para el Sprint</label>
                      <select
                        value={objectives.duration}
                        onChange={(e) => setObjectives({...objectives, duration: e.target.value})}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                      >
                        <option value="7 días">7 días (Sprint Corto)</option>
                        <option value="14 días">14 días (Sprint Estándar)</option>
                        <option value="30 días">30 días (Plan de Mes)</option>
                        <option value="60 días">60 días</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Presupuesto o Recursos asignados</label>
                      <input
                        type="text"
                        value={objectives.budget}
                        onChange={(e) => setObjectives({...objectives, budget: e.target.value})}
                        placeholder="Ej: $500 USD para Ads + Diseñador Copywriter."
                        className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-500/20 p-4 rounded-xl text-xs text-emerald-300 space-y-2">
                  <span className="font-bold">🧠 Consejo Dmente Growth:</span>
                  <p>Mantén tus metas **S.M.A.R.T.** (Específicas, Medibles, Alcanzables, Relevantes y con Plazo). Si tus metas son difusas, el análisis de tus pruebas de growth será imposible de verificar.</p>
                </div>
              </div>
            )}

            {/* PASO 2: LLUVIA DE IDEAS */}
            {activeStep === 2 && (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm">
                  Ninguna idea es mala en esta etapa. Añade sugerencias, tácticas del competidor o hacks que creas que pueden disparar tus conversiones.
                </p>

                {/* Formulario de Nueva Idea */}
                <form onSubmit={handleAddIdea} className="bg-slate-900/50 p-4 rounded-xl border border-slate-850 grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                  <div className="md:col-span-6">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">¿Cuál es tu idea o hack?</label>
                    <input
                      type="text"
                      value={newIdeaTitle}
                      onChange={(e) => setNewIdeaTitle(e.target.value)}
                      placeholder="Ej: Enviar un mail con descuento a carritos abandonados..."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                      required
                    />
                  </div>
                  <div className="md:col-span-4">
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Canal de aplicación</label>
                    <input
                      type="text"
                      value={newIdeaChannel}
                      onChange={(e) => setNewIdeaChannel(e.target.value)}
                      placeholder="Ej: Email / CRM"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold p-2.5 rounded-lg text-sm transition"
                    >
                      Añadir
                    </button>
                  </div>
                </form>

                {/* Listado de Ideas Registradas */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase text-slate-400">Ideas en el Banco ({ideas.length})</h3>
                  {ideas.length === 0 ? (
                    <div className="bg-slate-900/20 border border-dashed border-slate-800 p-8 rounded-xl text-center text-slate-500 text-sm">
                      Tu banco de ideas está vacío. ¡Escribe la primera arriba!
                    </div>
                  ) : (
                    <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                      {ideas.map((idea) => (
                        <div key={idea.id} className="bg-slate-900 p-3 rounded-xl border border-slate-850 flex items-center justify-between gap-3 hover:border-slate-700 transition">
                          <div>
                            <div className="text-sm font-semibold text-white">{idea.title}</div>
                            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-emerald-400 border border-slate-750 font-medium">
                              {idea.channel}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setIdeas(ideas.filter(i => i.id !== idea.id));
                              setTests(tests.filter(t => t.ideaId !== idea.id));
                              triggerNotification('Idea eliminada');
                            }}
                            className="text-slate-500 hover:text-red-400 p-1 rounded transition text-xs"
                            title="Eliminar idea"
                          >
                            🗑️
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* PASO 3: PRIORIZAR IDEAS (MATRIZ ICE) */}
            {activeStep === 3 && (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm">
                  No todas las ideas se pueden hacer a la vez. El **ICE Score** nos ayuda a ponderar y ordenar lógicamente. Del 1 al 10, califica cada criterio:
                </p>

                <div className="bg-slate-950 border border-slate-850 rounded-xl p-3 flex gap-4 text-[10px] text-slate-400 justify-around text-center">
                  <div>🎯 <span className="font-bold text-slate-300">Impacto (I):</span> ¿Cuánto empujará el crecimiento si funciona?</div>
                  <div>💪 <span className="font-bold text-slate-300">Confianza (C):</span> ¿Qué tan seguros estamos de que funcionará?</div>
                  <div>⚡ <span className="font-bold text-slate-300">Facilidad (E):</span> ¿Qué tan fácil es crearlo/testearlo?</div>
                </div>

                {ideas.length === 0 ? (
                  <div className="bg-slate-900/20 border border-dashed border-slate-800 p-12 rounded-xl text-center text-slate-500 text-sm">
                    No tienes ideas para priorizar en este momento. Regresa al paso 2.
                  </div>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {/* Ordenadas por Score de ICE automáticamente */}
                    {[...ideas].sort((a,b) => calculateIceScore(b) - calculateIceScore(a)).map((idea) => (
                      <div key={idea.id} className="bg-slate-900 p-4 rounded-xl border border-slate-850 hover:border-slate-750 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="text-sm font-bold text-white mb-1">{idea.title}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-emerald-400">
                              {idea.channel}
                            </span>
                            <span className="text-xs text-slate-400">
                              Puntaje ICE: <strong className="text-emerald-400 text-sm">{calculateIceScore(idea)}</strong>/10
                            </span>
                          </div>
                        </div>

                        {/* Sliders ICE */}
                        <div className="flex flex-wrap gap-4 bg-slate-950 p-2.5 rounded-lg border border-slate-850">
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] font-bold text-rose-400">Impacto</span>
                            <div className="flex items-center gap-2">
                              <input
                                type="range" min="1" max="10"
                                value={idea.impact}
                                onChange={(e) => handleUpdateIce(idea.id, 'impact', e.target.value)}
                                className="w-16 accent-rose-400"
                              />
                              <span className="text-xs font-bold w-4 text-center">{idea.impact}</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center">
                            <span className="text-[10px] font-bold text-amber-400">Confianza</span>
                            <div className="flex items-center gap-2">
                              <input
                                type="range" min="1" max="10"
                                value={idea.confidence}
                                onChange={(e) => handleUpdateIce(idea.id, 'confidence', e.target.value)}
                                className="w-16 accent-amber-400"
                              />
                              <span className="text-xs font-bold w-4 text-center">{idea.confidence}</span>
                            </div>
                          </div>

                          <div className="flex flex-col items-center">
                            <span className="text-[10px] font-bold text-emerald-400">Facilidad</span>
                            <div className="flex items-center gap-2">
                              <input
                                type="range" min="1" max="10"
                                value={idea.ease}
                                onChange={(e) => handleUpdateIce(idea.id, 'ease', e.target.value)}
                                className="w-16 accent-emerald-400"
                              />
                              <span className="text-xs font-bold w-4 text-center">{idea.ease}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PASO 4: PLANEAR EXPERIMENTOS */}
            {activeStep === 4 && (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm">
                  Convierte tus ideas priorizadas en experimentos científicos formalizando su hipótesis.
                </p>

                {/* Formulario de Experimento */}
                <form onSubmit={handleCreateTest} className="bg-slate-900/50 p-4 rounded-xl border border-slate-850 space-y-4">
                  
                  {/* Selector de Idea */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Selecciona la Idea a Testear</label>
                    <select
                      value={selectedIdeaForTest || ''}
                      onChange={(e) => {
                        setSelectedIdeaForTest(e.target.value);
                        // Sugerir una estructura de hipótesis básica
                        const selected = ideas.find(i => i.id === parseInt(e.target.value));
                        if (selected) {
                          setNewHypothesis(`Si logramos [implementar: ${selected.title}], entonces veremos un aumento/mejora en [métrica específica] porque [motivo de comportamiento del usuario].`);
                        }
                      }}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                      required
                    >
                      <option value="">-- Elige una idea priorizada del banco --</option>
                      {ideas.map(idea => (
                        <option key={idea.id} value={idea.id}>
                          {idea.title} (Puntuación ICE: {calculateIceScore(idea)})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Redactar Hipótesis */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-semibold text-slate-300">Hipótesis del Experimento (Growth Formula)</label>
                      <span className="text-[10px] text-amber-400">¡Muy Importante!</span>
                    </div>
                    <textarea
                      value={newHypothesis}
                      onChange={(e) => setNewHypothesis(e.target.value)}
                      placeholder="Ej: Si implementamos un popup con salida de intención de compra ofreciendo un 10% de descuento en la tienda, aumentaremos las ventas totales en un 5% porque retenemos usuarios que estaban listos para irse de la web."
                      className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-3 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white min-h-[90px]"
                      required
                    />
                  </div>

                  {/* Detalles Técnicos */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Métrica de Éxito Exacta</label>
                      <input
                        type="text"
                        value={newTestMetric}
                        onChange={(e) => setNewTestMetric(e.target.value)}
                        placeholder="Ej: Tasa de conversión de venta"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Duración del Test</label>
                      <input
                        type="text"
                        value={newTestDuration}
                        onChange={(e) => setNewTestDuration(e.target.value)}
                        placeholder="Ej: 14 días"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Responsable del Sprint</label>
                      <input
                        type="text"
                        value={newTestResponsible}
                        onChange={(e) => setNewTestResponsible(e.target.value)}
                        placeholder="Ej: Laura Copywriter"
                        className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black p-2.5 rounded-lg text-sm transition"
                  >
                    🚀 Agendar Experimento en el Calendario de Pruebas
                  </button>

                </form>

                {/* Lista de Experimentos Guardados */}
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase text-slate-400">Experimentos Planificados ({tests.length})</h3>
                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                    {tests.map(test => {
                      const associatedIdea = ideas.find(i => i.id === test.ideaId);
                      return (
                        <div key={test.id} className="bg-slate-900/60 p-3 rounded-xl border border-slate-850 text-xs">
                          <div className="font-bold text-slate-300 mb-1">IDEA: {associatedIdea ? associatedIdea.title : 'Idea General'}</div>
                          <p className="text-slate-400 italic mb-2">"{test.hypothesis}"</p>
                          <div className="flex justify-between items-center text-[10px] text-slate-500">
                            <span>Métrica: <strong className="text-emerald-400">{test.metric}</strong></span>
                            <span>Asignado: <strong>{test.responsible}</strong> ({test.duration})</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* PASO 5: TESTS/PRUEBAS (KANBAN) */}
            {activeStep === 5 && (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm">
                  Controla en tiempo real tus experimentos activos. Cambia el estado de cada prueba a medida que corran tus campañas de pauta o landing pages.
                </p>

                {tests.length === 0 ? (
                  <div className="bg-slate-900/20 border border-dashed border-slate-800 p-12 rounded-xl text-center text-slate-500 text-sm">
                    No tienes experimentos agendados. Ve a planificar uno en el paso anterior.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    
                    {/* COLUMNA 1: NO INICIADO */}
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex flex-col gap-2">
                      <div className="text-xs font-bold text-slate-400 border-b border-slate-850 pb-2 mb-1 flex items-center justify-between">
                        <span>📋 POR EMPEZAR</span>
                        <span className="bg-slate-800 text-slate-300 text-[10px] px-1.5 py-0.5 rounded-full">
                          {tests.filter(t => t.status === 'No Iniciado').length}
                        </span>
                      </div>
                      
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {tests.filter(t => t.status === 'No Iniciado').map(test => (
                          <div key={test.id} className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs shadow-md">
                            <p className="font-bold text-white mb-1">Exp #{test.id.toString().slice(-4)}</p>
                            <p className="text-slate-400 line-clamp-3 mb-2">"{test.hypothesis}"</p>
                            <button
                              onClick={() => updateTestStatus(test.id, 'En Ejecución')}
                              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-1 rounded text-[10px] transition"
                            >
                              Iniciar Práctica ➔
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* COLUMNA 2: EN EJECUCIÓN */}
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex flex-col gap-2">
                      <div className="text-xs font-bold text-amber-400 border-b border-slate-850 pb-2 mb-1 flex items-center justify-between">
                        <span>🧪 EN EJECUCIÓN</span>
                        <span className="bg-amber-950/40 text-amber-400 text-[10px] px-1.5 py-0.5 rounded-full">
                          {tests.filter(t => t.status === 'En Ejecución').length}
                        </span>
                      </div>
                      
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {tests.filter(t => t.status === 'En Ejecución').map(test => (
                          <div key={test.id} className="bg-slate-900 p-2.5 rounded-lg border border-amber-950 text-xs shadow-md">
                            <p className="font-bold text-amber-300 mb-1">Ejecutando...</p>
                            <p className="text-slate-400 line-clamp-3 mb-2">"{test.hypothesis}"</p>
                            <button
                              onClick={() => updateTestStatus(test.id, 'Finalizado')}
                              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-1 rounded text-[10px] transition"
                            >
                              Finalizar y Analizar ➔
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* COLUMNA 3: COMPLETADO */}
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 flex flex-col gap-2">
                      <div className="text-xs font-bold text-emerald-400 border-b border-slate-850 pb-2 mb-1 flex items-center justify-between">
                        <span>📊 FINALIZADO</span>
                        <span className="bg-emerald-950/40 text-emerald-400 text-[10px] px-1.5 py-0.5 rounded-full">
                          {tests.filter(t => t.status === 'Finalizado').length}
                        </span>
                      </div>
                      
                      <div className="space-y-2 max-h-96 overflow-y-auto">
                        {tests.filter(t => t.status === 'Finalizado').map(test => (
                          <div key={test.id} className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs shadow-md">
                            <p className="font-bold text-emerald-400 mb-1">Resultados Listos</p>
                            <p className="text-slate-400 line-clamp-3 mb-1">"{test.hypothesis}"</p>
                            <span className="text-[10px] text-slate-500 block mb-1">Analizado: {test.decision || 'Pendiente análisis estratégico'}</span>
                            <button
                              onClick={() => {
                                updateTestStatus(test.id, 'En Ejecución');
                                updateTestAnalysis(test.id, 'decision', '');
                              }}
                              className="text-slate-500 hover:text-slate-300 underline text-[9px] block text-center mt-1"
                            >
                              Re-abrir Experimento
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>
            )}

            {/* PASO 6: ANÁLISIS DE RESULTADOS */}
            {activeStep === 6 && (
              <div className="space-y-4">
                <p className="text-slate-400 text-sm">
                  La fase definitiva del Growth Hacking. Aquí decides si escalar la táctica, descartarla definitivamente o pivotar el enfoque según los números.
                </p>

                {tests.filter(t => t.status === 'Finalizado').length === 0 ? (
                  <div className="bg-slate-900/20 border border-dashed border-slate-800 p-12 rounded-xl text-center text-slate-500 text-sm">
                    No tienes experimentos finalizados esperando análisis. ¡Finaliza un test activo en el Paso 5 para habilitar el reporte!
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                    {tests.filter(t => t.status === 'Finalizado').map((test) => (
                      <div key={test.id} className="bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
                        <div className="border-b border-slate-850 pb-2">
                          <span className="text-[10px] font-bold text-slate-500">EXPERIMENTO #{test.id.toString().slice(-4)}</span>
                          <p className="text-sm font-bold text-slate-200 mt-1">"{test.hypothesis}"</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {/* Datos de resultados */}
                          <div>
                            <label className="block text-xs font-bold text-slate-300 mb-1">Resultados obtenidos y Métricas clave:</label>
                            <input
                              type="text"
                              value={test.result}
                              onChange={(e) => updateTestAnalysis(test.id, 'result', e.target.value)}
                              placeholder="Ej: Logramos 145 leads en vez de 100, tasa subió al 28%."
                              className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2 text-xs text-white focus:outline-none"
                            />
                          </div>

                          {/* Validado / No Validado */}
                          <div>
                            <label className="block text-xs font-bold text-slate-300 mb-1">¿Se validó la Hipótesis?</label>
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => updateTestAnalysis(test.id, 'validated', 'validated')}
                                className={`flex-1 py-1.5 rounded text-xs font-semibold border transition ${test.validated === 'validated' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'}`}
                              >
                                ✅ Sí, validada
                              </button>
                              <button
                                type="button"
                                onClick={() => updateTestAnalysis(test.id, 'validated', 'refuted')}
                                className={`flex-1 py-1.5 rounded text-xs font-semibold border transition ${test.validated === 'refuted' ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'}`}
                              >
                                ❌ No validada
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Decisiones finales */}
                        <div>
                          <label className="block text-xs font-bold text-slate-300 mb-1">Decisión de Negocio Estratégica</label>
                          <div className="grid grid-cols-3 gap-2">
                            {[
                              { label: '🚀 ESCALAR', value: 'Escalar', desc: 'Hacerlo parte del proceso core' },
                              { label: '🔄 PIVOTAR', value: 'Pivotar', desc: 'Reestructurar hipótesis' },
                              { label: '🛑 DESCARTAR', value: 'Descartar', desc: 'Matar el test y archivar' }
                            ].map((opt) => (
                              <button
                                key={opt.value}
                                type="button"
                                onClick={() => {
                                  updateTestAnalysis(test.id, 'decision', opt.value);
                                  triggerNotification(`Decisión tomada: ${opt.value}`);
                                }}
                                className={`p-2 rounded-lg border text-left transition ${test.decision === opt.value ? 'bg-indigo-950/40 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-900'}`}
                              >
                                <div className="text-xs font-bold text-center">{opt.label}</div>
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

          {/* BOTONES DE NAVEGACIÓN DE FLUJO */}
          <div className="flex items-center justify-between border-t border-slate-850 pt-4 mt-6">
            <button
              onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
              disabled={activeStep === 1}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1 ${activeStep === 1 ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-500' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
            >
              ◀ Paso Anterior
            </button>
            <div className="text-xs text-slate-500 font-medium">
              Sprint: {objectives.duration || 'Plan 30 d'}
            </div>
            <button
              onClick={() => setActiveStep(prev => Math.min(6, prev + 1))}
              disabled={activeStep === 6}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1 ${activeStep === 6 ? 'opacity-30 cursor-not-allowed bg-slate-900 text-slate-500' : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'}`}
            >
              Siguiente Paso ▶
            </button>
          </div>

        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-850 bg-slate-950/60 text-slate-500 text-xs py-6 px-4 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-300">Dmente Digital Growth Tool</span> • Desarrollado con foco en ROI y experimentos ágiles.
          </div>
          <div className="flex gap-4">
            <span>Metodología High-Tempo Testing</span>
            <span>•</span>
            <span>Matriz ICE Score integrada</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { questionSets, setMeta, type Question, type SetNumber, type VisualSpec } from "./question-data";

const EXAM_SECONDS = 30 * 60;
const STORAGE_KEY = "genel-yetenek-active-session";
const LETTERS = ["A", "B", "C", "D", "E"];

type Screen = "home" | "exam" | "result";
type Answers = Record<number, number>;

type SavedSession = {
  set: SetNumber;
  current: number;
  answers: Answers;
  endsAt: number;
};

function formatTime(seconds: number) {
  const safe = Math.max(0, seconds);
  const minutes = Math.floor(safe / 60).toString().padStart(2, "0");
  const secs = Math.floor(safe % 60).toString().padStart(2, "0");
  return `${minutes}:${secs}`;
}

function polygonKind(sides: number) {
  return ({ 3: "triangle", 4: "diamond", 5: "pentagon", 6: "hexagon", 7: "heptagon", 8: "octagon" } as Record<number, string>)[sides] ?? "circle";
}

function ShapeIcon({ kind, filled = false, small = false }: { kind: string; filled?: boolean; small?: boolean }) {
  return <span className={`shape-icon shape-${kind} ${filled ? "is-filled" : "is-outline"} ${small ? "is-small" : ""}`} aria-hidden="true" />;
}

function Dot({ filled = true }: { filled?: boolean }) {
  return <span className={`visual-dot ${filled ? "is-filled" : "is-open"}`} aria-hidden="true" />;
}

function Arrow({ direction }: { direction: string }) {
  const arrows: Record<string, string> = { up: "↑", right: "→", down: "↓", left: "←" };
  return <span className="visual-arrow" aria-hidden="true">{arrows[direction] ?? "→"}</span>;
}

function LineGlyph({ lines }: { lines: string[] }) {
  return (
    <span className="line-glyph" aria-hidden="true">
      {lines.map((line, index) => <i key={`${line}-${index}`} className={`line-${line}`} />)}
    </span>
  );
}

function CornerToken({ token }: { token: [string, string, boolean] }) {
  const [corner, kind, filled] = token;
  return (
    <span className="corner-token">
      <span className={`corner-dot corner-${corner}`} />
      <ShapeIcon kind={kind} filled={filled} small />
    </span>
  );
}

function PolyDotToken({ token }: { token: [number, string, boolean] }) {
  const [sides, position, filled] = token;
  return (
    <span className="poly-dot-token">
      <ShapeIcon kind={polygonKind(sides)} filled={filled} small />
      <span className={`poly-external-dot dot-${position}`} />
    </span>
  );
}

function VisualToken({ type, token }: { type: string; token: unknown }) {
  if (token === null || token === undefined) return <span className="visual-question-mark">?</span>;
  const value = token as any[];

  if (["IconMatrix", "IconOptions"].includes(type)) {
    return <ShapeIcon kind={String(value[0])} filled={Boolean(value[1])} />;
  }
  if (["LegacyArrowMatrix", "ArrowOptions"].includes(type)) {
    return <span className="arrow-dot-token"><Arrow direction={String(value[0])} /><Dot filled={Boolean(value[1])} /></span>;
  }
  if (["PolygonMatrix", "PolygonOptions", "GrowingPolygonSequence"].includes(type)) {
    return <ShapeIcon kind={polygonKind(Number(value[0]))} filled={Boolean(value[1])} />;
  }
  if (["DotCountMatrix", "DotOptions"].includes(type)) {
    return <span className="dot-row">{Array.from({ length: Number(value[0]) }, (_, i) => <Dot key={i} filled={Boolean(value[1])} />)}</span>;
  }
  if (["CornerSequence", "CornerOptions"].includes(type)) {
    return <CornerToken token={value as [string, string, boolean]} />;
  }
  if (["ShapeCountMatrix", "ShapeCountOptions"].includes(type)) {
    const [kind, count, filled = false] = value;
    return <span className="shape-count-row">{Array.from({ length: Number(count) }, (_, i) => <ShapeIcon key={i} kind={String(kind)} filled={Boolean(filled)} small />)}</span>;
  }
  if (type === "PolygonChordOptions") {
    const [sides, chords] = value.map(Number);
    return (
      <span className="chord-token">
        <ShapeIcon kind={polygonKind(sides)} />
        <span className="chord-lines">{Array.from({ length: chords }, (_, i) => <i key={i} style={{ transform: `rotate(${(i - (chords - 1) / 2) * 28}deg)` }} />)}</span>
      </span>
    );
  }
  if (["ArrowCountMatrix", "ArrowCountOptions"].includes(type)) {
    const [direction, count, filled = false] = value;
    return <span className="arrow-count-token"><Arrow direction={String(direction)} /><span className="dot-row">{Array.from({ length: Number(count) }, (_, i) => <Dot key={i} filled={Boolean(filled)} />)}</span></span>;
  }
  if (["LineUnionMatrix", "LineSetOptions"].includes(type)) {
    return <LineGlyph lines={value.map(String)} />;
  }
  if (type === "NestedPolygonOptions") {
    const [inner, outer] = value.map(Number);
    return <span className="nested-token"><ShapeIcon kind={polygonKind(outer)} /><span className="nested-inner"><ShapeIcon kind={polygonKind(inner)} small /></span></span>;
  }
  if (["PolyDotMatrix", "PolyDotOptions", "PolyDotSequence"].includes(type)) {
    return <PolyDotToken token={value as [number, string, boolean]} />;
  }
  if (type === "ArrowDotRelationOptions") {
    const [direction, dx, dy] = value;
    const horizontal = Number(dx) > 0 ? "right" : Number(dx) < 0 ? "left" : "center";
    const vertical = Number(dy) > 0 ? "top" : Number(dy) < 0 ? "bottom" : "middle";
    return <span className="relation-token"><Arrow direction={String(direction)} /><span className={`relation-dot relation-${horizontal} relation-${vertical}`} /></span>;
  }
  if (type === "PolygonDotOdd") {
    const [sides, count] = value.map(Number);
    return <span className="polygon-dots-token"><ShapeIcon kind={polygonKind(sides)} /><span className="inside-dots">{Array.from({ length: count }, (_, i) => <Dot key={i} />)}</span></span>;
  }
  if (["ArrowDotSequence", "ArrowDotOptions"].includes(type)) {
    const [direction, fills] = value as [string, boolean[]];
    return <span className="arrow-double-token"><Arrow direction={direction} /><span className="dot-row"><Dot filled={fills[0]} /><Dot filled={fills[1]} /></span></span>;
  }
  return <span className="visual-question-mark">?</span>;
}

function staticMatrix(type: string): unknown[][] {
  if (type === "PolygonMatrix") return [[[3, false], [4, true], [5, false]], [[4, true], [5, false], [6, true]], [[5, false], [6, true], null]];
  if (type === "ShapeCountMatrix") return [[['triangle', 1, false], ['square', 2, true], ['circle', 3, false]], [['square', 2, true], ['circle', 3, false], ['triangle', 1, true]], [['circle', 3, false], ['triangle', 1, true], null]];
  if (type === "ArrowCountMatrix") return [[['up', 1, false], ['right', 2, true], ['down', 3, false]], [['right', 2, true], ['down', 3, false], ['left', 1, true]], [['down', 3, false], ['left', 1, true], null]];
  if (type === "PolyDotMatrix") return [[[3, 'top', false], [4, 'right', true], [5, 'bottom', false]], [[4, 'right', true], [5, 'bottom', false], [3, 'left', true]], [[5, 'bottom', false], [3, 'left', true], null]];
  return [];
}

function VisualPrompt({ spec }: { spec: VisualSpec }) {
  const type = spec.type;
  const sequenceTypes = ["CornerSequence", "GrowingPolygonSequence", "PolyDotSequence", "ArrowDotSequence"];
  if (sequenceTypes.includes(type)) {
    const items = (spec.items ?? []) as unknown[];
    return (
      <div className="visual-sequence" aria-label="Görsel örüntü">
        {items.map((item, index) => (
          <div className="sequence-fragment" key={index}>
            <div className="visual-cell"><VisualToken type={type} token={item} /></div>
            {index < items.length - 1 && <span className="sequence-arrow">→</span>}
          </div>
        ))}
      </div>
    );
  }
  const rows = ((spec.rows as unknown[][] | undefined) ?? staticMatrix(type));
  return (
    <div className="visual-matrix" aria-label="Şekil matrisi">
      {rows.flatMap((row, rowIndex) => row.map((item, colIndex) => (
        <div className="visual-cell" key={`${rowIndex}-${colIndex}`}><VisualToken type={type} token={item} /></div>
      )))}
    </div>
  );
}

function NumberMatrix({ rows }: { rows: Array<[number, number, string]> }) {
  return (
    <div className="number-matrix" role="table" aria-label="Sayı matrisi">
      <div className="matrix-head">A</div><div className="matrix-head">B</div><div className="matrix-head">SONUÇ</div>
      {rows.flatMap((row, rowIndex) => row.map((cell, colIndex) => <div className={`matrix-number ${cell === "?" ? "is-missing" : ""}`} key={`${rowIndex}-${colIndex}`}>{cell}</div>))}
    </div>
  );
}

function QuestionBody({ question }: { question: Question }) {
  return (
    <>
      {question.intro && <p className="question-intro">{question.intro}</p>}
      {question.context && <div className="context-box"><span>Açıklama</span><p>{question.context}</p></div>}
      {question.statements && <ul className="statement-list">{question.statements.map((statement, index) => <li key={index}>{statement}</li>)}</ul>}
      {question.fact && <div className="fact-box">{question.fact}</div>}
      {question.actions && <div className="action-list">{question.actions.map((action, index) => <div key={index}><strong>{index === 0 ? "I" : "II"}</strong><span>{action}</span></div>)}</div>}
      {question.sequence && <div className="number-sequence">{question.sequence}</div>}
      {question.matrix && <NumberMatrix rows={question.matrix} />}
      {question.visual && <VisualPrompt spec={question.visual} />}
      <h2 className="question-prompt">{question.prompt}</h2>
    </>
  );
}

function OptionContent({ question, index }: { question: Question; index: number }) {
  if (question.visualOptions) {
    const item = (question.visualOptions.items ?? [])[index];
    return <VisualToken type={question.visualOptions.type} token={item} />;
  }
  return <span>{question.options[index]}</span>;
}

function HomeScreen({ selected, onSelect, onStart }: { selected: SetNumber; onSelect: (set: SetNumber) => void; onStart: () => void }) {
  return (
    <main className="home-shell">
      <nav className="home-nav">
        <div className="brand-lockup"><span className="brand-mark">GY</span><span>Genel Yetenek</span></div>
        <span className="nav-note">30 soru · 30 dakika</span>
      </nav>
      <section className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">Kronometre açık. Mazeret kapalı.</div>
          <h1>30 soruda<br /><em>ritmini bul.</em></h1>
          <p>Gerçek sınav temposunda sayısal, sözel ve görsel akıl yürütme pratiği. Setini seç; süre Başla dediğin anda çalışsın.</p>
          <div className="hero-stats">
            <div><strong>4</strong><span>özgün set</span></div>
            <div><strong>120</strong><span>toplam soru</span></div>
            <div><strong>60 sn</strong><span>soru başına</span></div>
          </div>
        </div>
        <div className="set-panel">
          <div className="panel-heading"><span>01</span><div><h2>Bir set seç</h2><p>Zorluk her sette biraz daha yükselir.</p></div></div>
          <div className="set-grid">
            {([2, 3, 4, 5] as SetNumber[]).map((set) => {
              const active = selected === set;
              return (
                <button key={set} className={`set-card ${active ? "is-selected" : ""}`} style={{ "--set-accent": setMeta[set].accent } as React.CSSProperties} onClick={() => onSelect(set)} aria-pressed={active}>
                  <span className="set-radio">{active ? "✓" : ""}</span>
                  <span className="set-number">SET {set}</span>
                  <strong>{setMeta[set].level}</strong>
                  <small>{setMeta[set].note}</small>
                </button>
              );
            })}
          </div>
          <div className="start-row">
            <div><span>Seçimin</span><strong>Set {selected} · {setMeta[selected].level}</strong></div>
            <button className="primary-button" onClick={onStart}>Başla <span>→</span></button>
          </div>
        </div>
      </section>
      <footer className="home-footer"><span>Her sette tek doğru cevap.</span><span>Cevapların bu cihazda otomatik korunur.</span></footer>
    </main>
  );
}

function ExamScreen({ set, current, answers, remaining, onAnswer, onGo, onFinish }: { set: SetNumber; current: number; answers: Answers; remaining: number; onAnswer: (index: number) => void; onGo: (index: number) => void; onFinish: () => void }) {
  const questions = questionSets[set];
  const question = questions[current];
  const selected = answers[question.id];
  const answered = Object.keys(answers).length;
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [current]);

  return (
    <main className="exam-shell">
      <header className="exam-header">
        <div className="brand-lockup"><span className="brand-mark">GY</span><span>Set {set}</span></div>
        <div className="header-progress"><span>{answered}/30 cevaplandı</span><div><i style={{ width: `${(answered / 30) * 100}%` }} /></div></div>
        <div className={`timer ${remaining <= 300 ? "is-danger" : ""}`}><span>SÜRE</span><strong>{formatTime(remaining)}</strong></div>
      </header>
      <div className="exam-layout">
        <aside className="question-sidebar">
          <div className="sidebar-top"><span>SORU HARİTASI</span><strong>{current + 1}<small>/30</small></strong></div>
          <div className="question-map">
            {questions.map((item, index) => <button key={item.id} className={`${index === current ? "is-current" : ""} ${answers[item.id] !== undefined ? "is-answered" : ""}`} onClick={() => onGo(index)} aria-label={`Soru ${item.id}`}>{item.id}</button>)}
          </div>
          <div className="map-legend"><span><i className="legend-current" />Aktif</span><span><i className="legend-answered" />Cevaplandı</span></div>
          <div className="shortcut-note"><strong>Kısayol</strong><span>A-E cevapla</span><span>← → sorular arasında geç</span></div>
        </aside>
        <section className="question-stage">
          <div className="question-card">
            <div className="question-meta"><span className="question-index">{String(question.id).padStart(2, "0")}</span><span className="category-chip">{question.category}</span></div>
            <h1 ref={headingRef} tabIndex={-1} className="sr-only">Soru {question.id}</h1>
            <QuestionBody question={question} />
            <div className={`option-list ${question.visualOptions ? "is-visual-options" : ""}`}>
              {question.options.map((_, index) => (
                <button key={index} className={`option-button ${selected === index ? "is-selected" : ""}`} onClick={() => onAnswer(index)} aria-pressed={selected === index}>
                  <span className="option-letter">{LETTERS[index]}</span>
                  <span className="option-content"><OptionContent question={question} index={index} /></span>
                  <span className="option-check">✓</span>
                </button>
              ))}
            </div>
          </div>
          <div className="question-nav">
            <button className="secondary-button" onClick={() => onGo(current - 1)} disabled={current === 0}>← Önceki</button>
            <span>{selected === undefined ? "Bir seçenek işaretle" : `${LETTERS[selected]} seçildi`}</span>
            {current < 29 ? <button className="primary-button compact" onClick={() => onGo(current + 1)}>Sonraki →</button> : <button className="finish-button" onClick={onFinish}>Sınavı bitir</button>}
          </div>
        </section>
      </div>
    </main>
  );
}

function ResultsScreen({ set, answers, remaining, onRetake, onHome }: { set: SetNumber; answers: Answers; remaining: number; onRetake: () => void; onHome: () => void }) {
  const questions = questionSets[set];
  const correct = questions.filter((q) => answers[q.id] === q.answer).length;
  const answered = Object.keys(answers).length;
  const wrong = answered - correct;
  const empty = 30 - answered;
  const score = Math.round((correct / 30) * 100);
  const used = EXAM_SECONDS - remaining;

  return (
    <main className="result-shell">
      <div className="result-card">
        <div className="result-brand"><span className="brand-mark">GY</span><span>Set {set} tamamlandı</span></div>
        <div className="result-main">
          <div className="score-ring" style={{ "--score": `${score * 3.6}deg` } as React.CSSProperties}><div><strong>%{score}</strong><span>başarı</span></div></div>
          <div className="result-copy"><span className="eyebrow">SONUÇ ÖZETİ</span><h1>{score >= 80 ? "Tempo sende." : score >= 60 ? "İyi gidiyorsun." : "Ritmi biraz daha sıkılaştır."}</h1><p>Set {set} tamamlandı. Renkli soru haritasında doğru, yanlış ve boşlarını tek bakışta görebilirsin.</p></div>
        </div>
        <div className="result-stats"><div><strong>{correct}</strong><span>Doğru</span></div><div><strong>{wrong}</strong><span>Yanlış</span></div><div><strong>{empty}</strong><span>Boş</span></div><div><strong>{formatTime(used)}</strong><span>Kullanılan süre</span></div></div>
        <div className="result-map" aria-label="Sonuç soru haritası">{questions.map((q) => { const state = answers[q.id] === undefined ? "empty" : answers[q.id] === q.answer ? "correct" : "wrong"; return <span className={`result-dot is-${state}`} key={q.id} title={`Soru ${q.id}: ${state}`}>{q.id}</span>; })}</div>
        <div className="result-legend"><span><i className="result-correct" />Doğru</span><span><i className="result-wrong" />Yanlış</span><span><i className="result-empty" />Boş</span></div>
        <div className="result-actions"><button className="secondary-button" onClick={onHome}>Set seçimine dön</button><button className="primary-button" onClick={onRetake}>Seti tekrar çöz <span>↻</span></button></div>
      </div>
    </main>
  );
}

function FinishDialog({ unanswered, onCancel, onConfirm }: { unanswered: number; onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onCancel}>
      <div className="finish-dialog" role="dialog" aria-modal="true" aria-labelledby="finish-title" onMouseDown={(event) => event.stopPropagation()}>
        <span className="dialog-icon">✓</span><h2 id="finish-title">Sınavı bitirelim mi?</h2><p>{unanswered > 0 ? `${unanswered} soruyu boş bıraktın. Bitirdikten sonra cevaplarını değiştiremezsin.` : "Tüm soruları cevapladın. Sonuç ekranına geçebilirsin."}</p>
        <div><button className="secondary-button" onClick={onCancel}>Devam et</button><button className="finish-button" onClick={onConfirm}>Bitir ve sonucu gör</button></div>
      </div>
    </div>
  );
}

export default function Home() {
  const [hydrated, setHydrated] = useState(false);
  const [screen, setScreen] = useState<Screen>("home");
  const [selectedSet, setSelectedSet] = useState<SetNumber>(2);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(EXAM_SECONDS);
  const [showFinish, setShowFinish] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as SavedSession;
        const left = Math.ceil((saved.endsAt - Date.now()) / 1000);
        if (left > 0 && questionSets[saved.set]) {
          setSelectedSet(saved.set);
          setCurrent(Math.min(29, Math.max(0, saved.current)));
          setAnswers(saved.answers ?? {});
          setEndsAt(saved.endsAt);
          setRemaining(left);
          setScreen("exam");
        } else {
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || screen !== "exam" || !endsAt) return;
    const session: SavedSession = { set: selectedSet, current, answers, endsAt };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  }, [hydrated, screen, selectedSet, current, answers, endsAt]);

  useEffect(() => {
    if (screen !== "exam" || !endsAt) return;
    const tick = () => {
      const left = Math.max(0, Math.ceil((endsAt - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) {
        localStorage.removeItem(STORAGE_KEY);
        setShowFinish(false);
        setScreen("result");
      }
    };
    tick();
    const timer = window.setInterval(tick, 500);
    return () => window.clearInterval(timer);
  }, [screen, endsAt]);

  const questions = questionSets[selectedSet];
  const unanswered = useMemo(() => 30 - Object.keys(answers).length, [answers]);

  useEffect(() => {
    if (screen !== "exam" || showFinish) return;
    const onKey = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const letterIndex = ["a", "b", "c", "d", "e"].indexOf(key);
      const numberIndex = ["1", "2", "3", "4", "5"].indexOf(key);
      const optionIndex = letterIndex >= 0 ? letterIndex : numberIndex;
      if (optionIndex >= 0 && optionIndex < questions[current].options.length) {
        event.preventDefault();
        setAnswers((previous) => ({ ...previous, [questions[current].id]: optionIndex }));
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setCurrent((value) => Math.min(29, value + 1));
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setCurrent((value) => Math.max(0, value - 1));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [screen, showFinish, questions, current]);

  const startExam = () => {
    const end = Date.now() + EXAM_SECONDS * 1000;
    setAnswers({}); setCurrent(0); setRemaining(EXAM_SECONDS); setEndsAt(end); setScreen("exam");
  };
  const finishExam = () => {
    localStorage.removeItem(STORAGE_KEY); setShowFinish(false); setScreen("result");
  };
  const goHome = () => {
    localStorage.removeItem(STORAGE_KEY); setScreen("home"); setAnswers({}); setCurrent(0); setEndsAt(null); setRemaining(EXAM_SECONDS);
  };

  if (!hydrated) return <main className="loading-screen"><span className="brand-mark">GY</span><p>Sınav hazırlanıyor...</p></main>;
  return (
    <>
      {screen === "home" && <HomeScreen selected={selectedSet} onSelect={setSelectedSet} onStart={startExam} />}
      {screen === "exam" && <ExamScreen set={selectedSet} current={current} answers={answers} remaining={remaining} onAnswer={(index) => setAnswers((previous) => ({ ...previous, [questions[current].id]: index }))} onGo={(index) => setCurrent(Math.max(0, Math.min(29, index)))} onFinish={() => setShowFinish(true)} />}
      {screen === "result" && <ResultsScreen set={selectedSet} answers={answers} remaining={remaining} onRetake={startExam} onHome={goHome} />}
      {showFinish && <FinishDialog unanswered={unanswered} onCancel={() => setShowFinish(false)} onConfirm={finishExam} />}
    </>
  );
}

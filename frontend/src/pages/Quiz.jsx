import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { questionPool } from '../data/questions';

export default function Quiz() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const topic = searchParams.get('topic') || "Programming Concepts";

    // Adaptive Quiz Constants
    const CORRECT_STREAK_TO_INCREASE = 3;
    const INCORRECT_STREAK_TO_DECREASE = 1;
    const MAX_QUESTIONS_TO_ASK = 20;

    // State
    const [currentQuestionId, setCurrentQuestionId] = useState(null);
    const [questionHistory, setQuestionHistory] = useState([]);
    const [resultsMap, setResultsMap] = useState(new Map()); // Key: ID, Value: { answer, state }
    const [timeLeft, setTimeLeft] = useState(30 * 60);
    const [modalState, setModalState] = useState({ visible: false, direction: '', level: 1 });
    // We use refs for logic variables that don't need immediate re-renders or track streaks across questions
    const streaks = useRef({ correct: 0, incorrect: 0 });
    const currentBtlLevel = useRef(1);

    // Initialization
    useEffect(() => {
        const initialQ = questionPool.find(q => q.btl_level === 1);
        if (initialQ) {
            setCurrentQuestionId(initialQ.id);
            setQuestionHistory([initialQ.id]);
            setResultsMap(new Map([[initialQ.id, { answer: null, state: 'not-answered' }]]));
        }
    }, []);

    // Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    handleSubmit(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Helper: Format Time
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    // Helper: Parse Question Text (Code Blocks)
    const renderQuestionText = (text) => {
        const parts = text.split(/<code-block>([\s\S]*?)<\/code-block>/g);
        return parts.map((part, index) => {
            if (index % 2 === 1) { // Code block
                return (
                    <div key={index} className="code-box">
                        {part}
                    </div>
                );
            }
            return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
        });
    };

    // Logic: Save Current State
    const updateCurrentQuestionState = () => {
        if (!currentQuestionId) return;
        setResultsMap(prev => {
            const newMap = new Map(prev);
            const current = newMap.get(currentQuestionId);
            if (current) {
                const hasAnswer = current.answer !== null;
                if (current.state === 'marked' || current.state === 'marked-answered') {
                    current.state = hasAnswer ? 'marked-answered' : 'marked';
                } else {
                    current.state = hasAnswer ? 'answered' : 'not-answered';
                }
                newMap.set(currentQuestionId, current);
            }
            return newMap;
        });
    };

    // Logic: Show Modal
    const showFeedback = (level, direction) => {
        setModalState({ visible: true, direction, level });
        setTimeout(() => {
            setModalState(prev => ({ ...prev, visible: false }));
        }, 2500);
    };

    // Logic: Get Next Question (Adaptive)
    const getNextQuestionId = () => {
        const prevLevel = currentBtlLevel.current;
        const lastQId = questionHistory[questionHistory.length - 1];
        
        // 1. Evaluate last answer (if applicable)
        if (lastQId) {
            const lastQ = questionPool.find(q => q.id === lastQId);
            const result = resultsMap.get(lastQId);
            // Ensure we have a result for the last question before calculating streak
            if (result && result.answer !== null) {
                const isCorrect = result.answer === lastQ.correct;
                if (isCorrect) {
                    streaks.current.correct++;
                    streaks.current.incorrect = 0;
                } else {
                    streaks.current.incorrect++;
                    streaks.current.correct = 0;
                }
            }
        }

        // 2. Adjust Level
        if (streaks.current.correct >= CORRECT_STREAK_TO_INCREASE && currentBtlLevel.current < 3) {
            currentBtlLevel.current++;
            streaks.current.correct = 0;
        } else if (streaks.current.incorrect >= INCORRECT_STREAK_TO_DECREASE && currentBtlLevel.current > 1) {
            currentBtlLevel.current--;
            streaks.current.incorrect = 0;
        }

        // Feedback if level changed
        if (currentBtlLevel.current !== prevLevel) {
            showFeedback(currentBtlLevel.current, currentBtlLevel.current > prevLevel ? 'up' : 'down');
        }

        // 3. Find Next
        let nextQ = questionPool.find(q => resultsMap.has(q.id) && resultsMap.get(q.id).state === 'marked' && resultsMap.get(q.id).answer === null);
        // NOTE: Original Logic prioritized marked questions only if not answered? 
        // Original: resultsMap.has(q.id) && resultsMap.get(q.id).state === "marked"
        
        if (!nextQ) {
            const askedIds = questionHistory;
            const candidates = questionPool.filter(q => !askedIds.includes(q.id) && q.btl_level === currentBtlLevel.current);
            // Prioritize coding questions explicitly
            const codeQuestion = candidates.find(q => q.type === 'code');
            if (codeQuestion) {
                 nextQ = codeQuestion;
            } else {
                candidates.sort((a, b) => {
                    if (a.type === 'code' && b.type !== 'code') return -1;
                    if (a.type !== 'code' && b.type === 'code') return 1;
                    return 0;
                });
                nextQ = candidates[0];
            }
        }
        if (!nextQ) {
            // Fallback to any unasked
             const askedIds = questionHistory;
             nextQ = questionPool.find(q => !askedIds.includes(q.id));
        }

        return nextQ ? nextQ.id : null;
    };

    // Handlers
    const handleOptionChange = (val) => {
        setResultsMap(prev => {
            const newMap = new Map(prev);
            const current = newMap.get(currentQuestionId);
            current.answer = val;
            current.state = (current.state === 'marked' || current.state === 'marked-answered') ? 'marked-answered' : 'answered';
            newMap.set(currentQuestionId, current);
            return newMap;
        });

    };

    // Handler: Code Change
    const handleCodeChange = (val) => {
        setResultsMap(prev => {
            const newMap = new Map(prev);
            const current = newMap.get(currentQuestionId);
            current.answer = val;
            current.state = (current.state === 'marked' || current.state === 'marked-answered') ? 'marked-answered' : 'answered';
            // Reset passed status on edit
            current.passed = false; 
            newMap.set(currentQuestionId, current);
            return newMap;
        });
    };

    // Handler: Run Code
    const handleRunCode = async () => {
        const currentQ = questionPool.find(q => q.id === currentQuestionId);
        const currentRes = resultsMap.get(currentQuestionId);
        
        if (!currentRes?.answer) {
            alert("Please write some code first!");
            return;
        }

        setResultsMap(prev => {
             const newMap = new Map(prev);
             const current = newMap.get(currentQuestionId);
             current.feedback = []; // Reset feedback
             current.isRunning = true;
             newMap.set(currentQuestionId, current);
             return newMap;
        });

        const testCases = currentQ.testCases;
        let allPassed = true;
        const newFeedback = [];

        for (const tc of testCases) {
            try {
                const response = await fetch('/api/compile', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code: currentRes.answer, input: tc.input })
                });
                const data = await response.json();
                
                if (data.error) {
                    newFeedback.push({ input: tc.input, actual: data.output, expected: tc.expected, status: 'Error' });
                    allPassed = false;
                } else {
                    const actualTrimmed = data.output.trim();
                    const expectedTrimmed = tc.expected.trim();
                    if (actualTrimmed === expectedTrimmed) {
                        newFeedback.push({ input: tc.input, actual: actualTrimmed, expected: expectedTrimmed, status: 'Passed' });
                    } else {
                        newFeedback.push({ input: tc.input, actual: actualTrimmed, expected: expectedTrimmed, status: 'Failed' });
                        allPassed = false;
                    }
                }
            } catch (err) {
                console.error(err);
                newFeedback.push({ input: tc.input, actual: "Network Error", expected: tc.expected, status: 'Error' });
                allPassed = false;
            }
        }

        setResultsMap(prev => {
            const newMap = new Map(prev);
            const current = newMap.get(currentQuestionId);
            current.feedback = newFeedback;
            current.passed = allPassed;
            current.isRunning = false;
            newMap.set(currentQuestionId, current);
            return newMap;
        });
    };

    const handleNavigate = (direction) => {
        updateCurrentQuestionState();
        if (direction === 'next') {
            if (questionHistory.length >= MAX_QUESTIONS_TO_ASK) {
                handleSubmit();
                return;
            }
            const nextId = getNextQuestionId();
            if (nextId) {
                if (!resultsMap.has(nextId)) {
                    setResultsMap(prev => new Map(prev).set(nextId, { answer: null, state: 'not-visited' }));
                }
                if (!questionHistory.includes(nextId)) {
                    setQuestionHistory(prev => [...prev, nextId]);
                }
                setCurrentQuestionId(nextId);
            } else {
                handleSubmit();
            }
        } else {
            // Prev
            const idx = questionHistory.indexOf(currentQuestionId);
            if (idx > 0) {
                setCurrentQuestionId(questionHistory[idx - 1]);
            }
        }
    };

    const handleClear = () => {
        setResultsMap(prev => {
            const newMap = new Map(prev);
            const current = newMap.get(currentQuestionId);
            current.answer = null;
            if (current.state === 'answered') current.state = 'not-answered';
            if (current.state === 'marked-answered') current.state = 'marked';
            newMap.set(currentQuestionId, current);
            return newMap;
        });
    };

    const handleMarkReview = () => {
        setResultsMap(prev => {
            const newMap = new Map(prev);
            const current = newMap.get(currentQuestionId);
            const hasAnswer = current.answer !== null;
            current.state = hasAnswer ? 'marked-answered' : 'marked';
            newMap.set(currentQuestionId, current);
            return newMap;
        });
        handleNavigate('next');
    };

    const handleSubmit = (force = false) => {
        updateCurrentQuestionState(); 
        
        const totalAnswered = questionHistory.filter(qId => {
             const s = resultsMap.get(qId)?.state;
             return s === 'answered' || s === 'marked-answered';
        }).length;

        const totalMarked = questionHistory.filter(qId => {
             const s = resultsMap.get(qId)?.state;
             return s === 'marked' || s === 'marked-answered';
        }).length;

        const notAttempted = questionHistory.length - totalAnswered;

        if (!force && !window.confirm(`You have attempted ${totalAnswered} questions out of ${questionHistory.length} asked. ${notAttempted} not answered. ${totalMarked} marked. Submit?`)) {
            return;
        }

        let score = 0;
        const topicStats = {}; // { topicId: { total: 0, incorrect: 0 } }

        const results = questionHistory.map((qId, idx) => {
            const q = questionPool.find(i => i.id === qId);
            const res = resultsMap.get(qId);
            const userAns = res.answer;
            let status = 'Skipped';
            if (userAns === q.correct) {
                score++;
                status = 'Correct';
            } else if (q.type === 'code') {
                if (res.passed) {
                    score++;
                    status = 'Correct';
                } else {
                     status = 'Wrong';
                }
            } else if (userAns !== null) {
                status = 'Wrong';
            }

            // Track Stats
            if (q.topicId) {
                if (!topicStats[q.topicId]) topicStats[q.topicId] = { total: 0, incorrect: 0 };
                topicStats[q.topicId].total++;
                if (status !== 'Correct') {
                    topicStats[q.topicId].incorrect++;
                }
            }

            return {
                qNo: idx + 1,
                question: q.text.replace(/<code-block>([\s\S]*?)<\/code-block>/g, " [CODE BLOCK] ").trim(),
                status,
                userAns,
                correctAns: q.correct
            };
        });

        // Identify weak topics (Any topic with > 0 incorrect answers for now)
        const weakTopicIds = Object.keys(topicStats).filter(tid => topicStats[tid].incorrect > 0);

        alert(`Your Final Score: ${score}/${MAX_QUESTIONS_TO_ASK}`);
        navigate('/result', { state: { total: MAX_QUESTIONS_TO_ASK, results, weakTopicIds } });
    };

    // Render Setup
    if (!currentQuestionId) return <div className="p-10 text-center">Loading...</div>;

    const currentQ = questionPool.find(q => q.id === currentQuestionId);
    const currentResult = resultsMap.get(currentQuestionId) || { answer: null, state: 'not-visited' };
    const historyIndex = questionHistory.indexOf(currentQuestionId);

    // Helpers for palette class
    const getPaletteClass = (qId) => {
        const res = resultsMap.get(qId);
        let cls = "palette-btn";
        if (!res) return cls + " not-visited";
        
        if (res.state === 'answered' || res.state === 'marked-answered') cls += " answered";
        else if (res.state === 'not-answered') cls += " not-answered";
        else if (res.state === 'marked') cls += " marked";
        else cls += " not-visited";

        if (qId === currentQuestionId) cls += " current";
        return cls;
    };

    return (
        <div className="quiz-wrapper">
            {/* Modal */}
            <div className={`modal-overlay ${modalState.visible ? 'visible' : ''} ${modalState.direction === 'up' ? 'modal-up' : 'modal-down'}`}>
                <div className="modal-content">
                    <div className="graph-animation">
                        <div className="graph-bar"></div>
                        <div className="graph-bar"></div>
                        <div className="graph-bar"></div>
                    </div>
                    <h3>{modalState.direction === 'up' ? 'Level UP!' : 'Level Adjustment'}</h3>
                    <p>
                        {modalState.direction === 'up' 
                            ? `Advanced to BTL Level ${modalState.level}: Application/Analysis.` 
                            : `Complexity reduced to BTL Level ${modalState.level}: Remembering/Understanding.`}
                    </p>
                </div>
            </div>

            <div className="quiz-container">
                <header className="quiz-header">
                    <h1 id="quiz-title">{topic} Quiz</h1>
                    <div className="header-details">
                        <span><strong>Time Left:</strong> {formatTime(timeLeft)}</span>
                    </div>
                </header>

                <div className="quiz-body">
                    <main className="question-main">
                        <div className="question-header">
                            <span>Question No. {historyIndex + 1}</span>
                            <span className="btl-level-class">(Level {currentQ.btl_level})</span>
                        </div>
                        <div className="question-content">
                            <div id="q-text-wrapper">
                                {renderQuestionText(currentQ.text)}
                            </div>

                            
                            {currentQ.type === 'code' ? (
                                <div className="code-section mt-6">
                                    <textarea
                                        className="w-full h-48 bg-gray-900 text-green-400 font-mono p-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={currentResult.answer || currentQ.starterCode} // Use starter code if no answer
                                        onChange={(e) => handleCodeChange(e.target.value)}
                                        spellCheck="false"
                                    ></textarea>
                                    <div className="mt-4 flex gap-4">
                                        <button 
                                            className={`px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold ${currentResult.isRunning ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            onClick={handleRunCode}
                                            disabled={currentResult.isRunning}
                                        >
                                            {currentResult.isRunning ? 'Running...' : 'Run Code'}
                                        </button>
                                    </div>
                                    {currentResult.feedback && (
                                        <div className="mt-4 space-y-2">
                                            {currentResult.feedback.map((fb, idx) => (
                                                <div key={idx} className={`p-3 rounded text-sm ${fb.status === 'Passed' ? 'bg-green-900/50 border border-green-500' : 'bg-red-900/50 border border-red-500'}`}>
                                                    <div className="font-bold flex justify-between">
                                                        <span>Test Case {idx + 1}: {fb.status}</span>
                                                    </div>
                                                    {fb.status !== 'Passed' && (
                                                        <div className="mt-1 text-gray-300">
                                                            <div>Input: {fb.input}</div>
                                                            <div>Expected: {fb.expected}</div>
                                                            <div>Actual: {fb.actual}</div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="options mt-6">
                                    {currentQ.options.map((opt, i) => (
                                        <div key={i} className="option">
                                            <input 
                                                type="radio" 
                                                id={`opt${i}`} 
                                                name="answer" 
                                                value={opt}
                                                checked={currentResult.answer === opt}
                                                onChange={() => handleOptionChange(opt)} 
                                            />
                                            <label htmlFor={`opt${i}`}>
                                                {String.fromCharCode(65 + i)}. {opt}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="question-nav">
                            <button className="nav-btn mark-review" onClick={handleMarkReview}>Mark for Review & Next</button>
                            <button className="nav-btn clear" onClick={handleClear}>Clear Response</button>
                            <div className="nav-right">
                                {historyIndex > 0 && (
                                    <button className="nav-btn prev" onClick={() => handleNavigate('prev')}>Previous</button>
                                )}
                                <button className="nav-btn next" onClick={() => handleNavigate('next')}>Save & Next</button>
                            </div>
                        </div>
                    </main>

                    <aside className="question-palette">
                        <div className="palette-header">Question Palette</div>
                        <div className="palette-grid">
                            {Array.from({ length: MAX_QUESTIONS_TO_ASK }).map((_, i) => {
                                const qId = questionHistory[i];
                                const isDisabled = !qId;
                                return (
                                    <button 
                                        key={i} 
                                        className={isDisabled ? "palette-btn not-visited" : getPaletteClass(qId)}
                                        disabled={isDisabled}
                                        onClick={() => {
                                            if (qId) {
                                                updateCurrentQuestionState();
                                                setCurrentQuestionId(qId);
                                            }
                                        }}
                                    >
                                        {i + 1}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="palette-legend">
                            <div><span className="legend-box answered"></span> Answered</div>
                            <div><span className="legend-box not-answered"></span> Not Answered</div>
                            <div><span className="legend-box marked"></span> Marked for Review</div>
                            <div><span className="legend-box not-visited"></span> Not Visited</div>
                        </div>
                        <button className="submit-btn" onClick={() => handleSubmit(false)}>Submit Quiz</button>
                    </aside>
                </div>
            </div>
        </div>
    );
}

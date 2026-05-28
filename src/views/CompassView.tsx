import React, { useState } from 'react';
import { compassQuestions, compassResults, QuizQuestion } from '../data/mockData';

interface CompassViewProps {
  setView: (view: string) => void;
  setStreamFilter: (stream: string) => void;
}

export const CompassView: React.FC<CompassViewProps> = ({ setView, setStreamFilter }) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<{ [key: string]: number }>({
    Engineering: 0,
    Management: 0,
    Medical: 0,
    Law: 0,
    Science: 0,
    Arts: 0
  });
  const [quizFinished, setQuizFinished] = useState(false);
  const [topStream, setTopStream] = useState<string>('');

  const handleStart = () => {
    setQuizStarted(true);
    setCurrentIdx(0);
    setScores({ Engineering: 0, Management: 0, Medical: 0, Law: 0, Science: 0, Arts: 0 });
    setQuizFinished(false);
  };

  const handleAnswerSelect = (optionScores: { [key: string]: number }) => {
    // Add selected points to scores state
    setScores(prev => {
      const nextScores = { ...prev };
      Object.keys(optionScores).forEach(key => {
        nextScores[key] = (nextScores[key] || 0) + optionScores[key];
      });
      return nextScores;
    });

    const nextIndex = currentIdx + 1;
    if (nextIndex < compassQuestions.length) {
      setCurrentIdx(nextIndex);
    } else {
      // Calculate final top stream
      let highestScore = -1;
      let winningStream = 'Engineering';
      
      const nextScores = { ...scores };
      Object.keys(optionScores).forEach(key => {
        nextScores[key] = (nextScores[key] || 0) + optionScores[key];
      });

      Object.entries(nextScores).forEach(([stream, val]) => {
        if (val > highestScore) {
          highestScore = val;
          winningStream = stream;
        }
      });

      setTopStream(winningStream);
      setQuizFinished(true);
    }
  };

  const handleGoToColleges = () => {
    setStreamFilter(topStream);
    setView('directory');
  };

  const currentQuestion: QuizQuestion = compassQuestions[currentIdx];
  const progressPercent = ((currentIdx) / compassQuestions.length) * 100;
  const resultData = quizFinished ? compassResults[topStream] : null;

  return (
    <div className="compass-view-container">
      {/* Intro Header */}
      <section className="compass-intro-banner">
        <h1>Career Compass Psychometric Quiz</h1>
        <p>Unsure which educational stream to pursue? Answer 10 realistic questions to analyze your behavioral strengths and unlock matching degree pipelines.</p>
      </section>

      <div className="compass-quiz-card-wrapper">
        {!quizStarted && !quizFinished && (
          // Start Screen
          <div className="quiz-splash-card animate-scaleUp">
            <div className="splash-icon-holder">
              <svg className="h-16 w-16 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
              </svg>
            </div>
            <h2>Discover Your Professional Path</h2>
            <p>Our visual psychometric algorithms analyze your behavioral responses, conflict handling preferences, and subject affinities to match you with corresponding career fields and university programs.</p>
            <div className="quiz-specs-list">
              <span>⏱ Takes approx. 5 minutes</span>
              <span>⚡ 10 Visual Multiple Choice Questions</span>
              <span>✓ Instant Detailed Scorecard & Recommendations</span>
            </div>
            <button className="start-quiz-btn animate-pulse" onClick={handleStart}>
              Begin Career Compass Assessment
            </button>
          </div>
        )}

        {quizStarted && !quizFinished && currentQuestion && (
          // Question Screen
          <div className="quiz-question-card animate-fadeIn">
            <div className="quiz-progress-bar-container">
              <div className="progress-text-row">
                <span>Question <strong>{currentIdx + 1}</strong> of {compassQuestions.length}</span>
                <span>{Math.round(progressPercent)}% Done</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
              </div>
            </div>

            <h2 className="quiz-question-title">{currentQuestion.question}</h2>

            <div className="quiz-options-list">
              {currentQuestion.options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  className="quiz-option-btn animate-hover"
                  onClick={() => handleAnswerSelect(opt.scores)}
                >
                  <span className="option-indicator">{String.fromCharCode(65 + oIdx)}</span>
                  <span className="option-text">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {quizFinished && resultData && (
          // Results Screen
          <div className="quiz-results-card animate-scaleUp">
            <div className="results-badge-congrats">🎉 Compass Results Calculated</div>
            
            <h2>Your Career Archetype:</h2>
            <h1 className="archetype-title gradient-text">{resultData.title}</h1>
            
            <p className="archetype-desc">{resultData.desc}</p>

            <div className="archetype-details-grid">
              <div className="details-col">
                <h3>Core Strengths & Traits</h3>
                <div className="traits-chips-row">
                  {resultData.traits.map((tr, index) => (
                    <span key={index} className="trait-chip-pill">✦ {tr}</span>
                  ))}
                </div>

                <h3 className="mt-6">Ideal Professional Careers</h3>
                <ul className="careers-bullet-list">
                  {resultData.careers.map((car, index) => (
                    <li key={index}>{car}</li>
                  ))}
                </ul>
              </div>

              <div className="details-col recommendation-box-highlight">
                <h3>Recommended University Degrees</h3>
                <ul className="courses-bullet-list-highlight">
                  {resultData.courses.map((crs, index) => (
                    <li key={index}>{crs}</li>
                  ))}
                </ul>

                <p className="recommend-advice-text">Students with your profile have a 92% satisfaction rate in these specialized educational programs.</p>
              </div>
            </div>

            <div className="results-action-buttons">
              <button className="results-secondary-btn" onClick={handleStart}>Retake Assessment</button>
              <button className="results-primary-btn" onClick={handleGoToColleges}>Explore Matching Colleges</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

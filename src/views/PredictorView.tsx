import React, { useState } from 'react';
import { College } from '../data/colleges';

interface PredictorViewProps {
  colleges: College[];
  onApplyCollegeDirect: (collegeName: string) => void;
}

interface PredictionResult {
  college: College;
  probability: number; // Percentage
  status: 'High Chance' | 'Medium Chance' | 'Low Chance';
  badgeColor: string;
}

export const PredictorView: React.FC<PredictorViewProps> = ({ colleges, onApplyCollegeDirect }) => {
  const [exam, setExam] = useState('JEE Main');
  const [rank, setRank] = useState<string>('');
  const [category, setCategory] = useState('General');
  const [quota, setQuota] = useState('All');
  const [predictions, setPredictions] = useState<PredictionResult[] | null>(null);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    const rankVal = Number(rank);
    if (!rank || isNaN(rankVal) || rankVal <= 0) return;

    // Run prediction matching logic
    const results: PredictionResult[] = [];

    // Filter colleges accepting this exam
    const eligibleColleges = colleges.filter(col =>
      col.examsAccepted.includes(exam) ||
      (exam === 'JEE Advanced' && col.id === 'iit-delhi') ||
      (exam === 'JEE Main' && col.examsAccepted.includes('JEE Main'))
    );

    eligibleColleges.forEach(college => {
      let probability = 50;
      let scoreWeight = 1.0;

      // Adjust threshold by category
      if (category === 'OBC') scoreWeight = 1.15;
      else if (category === 'SC') scoreWeight = 1.35;
      else if (category === 'ST') scoreWeight = 1.5;

      const effectiveRank = rankVal / scoreWeight;

      if (exam === 'JEE Main' || exam === 'JEE Advanced' || exam === 'BITSAT' || exam === 'VITEEE') {
        // Engineering rank system (Lower rank is better)
        if (college.id === 'iit-delhi') {
          if (effectiveRank < 1500) probability = 92;
          else if (effectiveRank < 4000) probability = 65;
          else if (effectiveRank < 8000) probability = 35;
          else probability = 8;
        } else if (college.id === 'bits-pilani') {
          if (effectiveRank < 2500) probability = 94;
          else if (effectiveRank < 6000) probability = 70;
          else if (effectiveRank < 12000) probability = 40;
          else probability = 12;
        } else if (college.id === 'dtu-delhi') {
          if (effectiveRank < 8000) probability = 96;
          else if (effectiveRank < 18000) probability = 75;
          else if (effectiveRank < 35000) probability = 45;
          else probability = 18;
        } else if (college.id === 'vit-vellore') {
          if (effectiveRank < 20000) probability = 98;
          else if (effectiveRank < 45000) probability = 80;
          else if (effectiveRank < 80000) probability = 55;
          else probability = 25;
        }
      } else if (exam === 'CAT' || exam === 'XAT') {
        // Management Percentile/Score system (Higher rank/score is better, but since user inputs rank, let's treat it as Percentile 0 to 100)
        // Let's assume input is percentile e.g. 99.5
        const pct = rankVal;
        if (pct > 100 || pct < 0) return; // invalid
        
        let adjustedPct = pct * scoreWeight;
        if (adjustedPct > 100) adjustedPct = 99.9;

        if (college.id === 'iim-ahmedabad') {
          if (adjustedPct >= 99.5) probability = 90;
          else if (adjustedPct >= 98.5) probability = 60;
          else if (adjustedPct >= 97.0) probability = 30;
          else probability = 5;
        } else if (college.id === 'iim-bangalore') {
          if (adjustedPct >= 99.0) probability = 92;
          else if (adjustedPct >= 98.0) probability = 68;
          else if (adjustedPct >= 96.5) probability = 35;
          else probability = 8;
        } else if (college.id === 'xlri-jamshedpur') {
          if (adjustedPct >= 98.0) probability = 94;
          else if (adjustedPct >= 96.0) probability = 72;
          else if (adjustedPct >= 94.0) probability = 42;
          else probability = 12;
        } else if (college.id === 'fms-delhi') {
          if (adjustedPct >= 98.5) probability = 93;
          else if (adjustedPct >= 97.0) probability = 70;
          else if (adjustedPct >= 95.0) probability = 38;
          else probability = 10;
        }
      } else if (exam === 'NEET UG') {
        // Medical rank system (Lower rank is better)
        if (college.id === 'aiims-delhi') {
          if (effectiveRank < 100) probability = 95;
          else if (effectiveRank < 400) probability = 55;
          else if (effectiveRank < 1000) probability = 20;
          else probability = 2;
        } else if (college.id === 'mamc-delhi') {
          if (effectiveRank < 500) probability = 94;
          else if (effectiveRank < 1200) probability = 60;
          else if (effectiveRank < 3000) probability = 30;
          else probability = 5;
        } else if (college.id === 'cmc-vellore') {
          if (effectiveRank < 1200) probability = 92;
          else if (effectiveRank < 3500) probability = 65;
          else if (effectiveRank < 8000) probability = 38;
          else probability = 12;
        }
      } else if (exam === 'CLAT') {
        // Law rank system (Lower rank is better)
        if (college.id === 'nls-bangalore') {
          if (effectiveRank < 150) probability = 94;
          else if (effectiveRank < 400) probability = 60;
          else if (effectiveRank < 1000) probability = 25;
          else probability = 4;
        } else if (college.id === 'nalsar-hyderabad') {
          if (effectiveRank < 300) probability = 95;
          else if (effectiveRank < 700) probability = 68;
          else if (effectiveRank < 1800) probability = 35;
          else probability = 8;
        }
      } else if (exam === 'CUET UG') {
        // CUET Score system (e.g. out of 800)
        const score = rankVal;
        if (score > 800) return;
        const adjustedScore = score * scoreWeight;
        
        if (college.id === 'miranda-house-delhi') {
          if (adjustedScore >= 770) probability = 95;
          else if (adjustedScore >= 740) probability = 70;
          else if (adjustedScore >= 700) probability = 40;
          else probability = 10;
        } else if (college.id === 'st-stephens-delhi') {
          if (adjustedScore >= 780) probability = 93;
          else if (adjustedScore >= 750) probability = 65;
          else if (adjustedScore >= 710) probability = 35;
          else probability = 8;
        }
      }

      // Cap boundaries
      if (probability > 99) probability = 99;
      if (probability < 1) probability = 1;

      let status: 'High Chance' | 'Medium Chance' | 'Low Chance' = 'Medium Chance';
      let badgeColor = '#ff9800'; // orange
      
      if (probability >= 75) {
        status = 'High Chance';
        badgeColor = '#4caf50'; // green
      } else if (probability < 35) {
        status = 'Low Chance';
        badgeColor = '#f44336'; // red
      }

      results.push({
        college,
        probability,
        status,
        badgeColor
      });
    });

    // Sort by highest probability
    setPredictions(results.sort((a,b) => b.probability - a.probability));
  };

  const handleResetPredictor = () => {
    setRank('');
    setPredictions(null);
  };

  const isPercentileExam = exam === 'CAT' || exam === 'XAT';
  const isScoreExam = exam === 'CUET UG';

  return (
    <div className="predictor-view-container">
      {/* Intro Header */}
      <section className="predictor-intro-banner">
        <h1>Entrance Exam College Predictor</h1>
        <p>Estimate your chances of securing admissions in premium universities across India using historical cutoff algorithms.</p>
      </section>

      <div className="predictor-body-layout">
        {/* Input Parameters Box */}
        <div className="predictor-input-panel">
          <form className="predictor-form" onSubmit={handlePredict}>
            <h3>Calculate Probabilities</h3>
            
            <div className="form-group-pred">
              <label>Select Entrance Exam</label>
              <select value={exam} onChange={(e) => { setExam(e.target.value); setRank(''); setPredictions(null); }}>
                <option value="JEE Main">JEE Main (B.Tech)</option>
                <option value="JEE Advanced">JEE Advanced (IITs)</option>
                <option value="BITSAT">BITSAT (BITS Pilani)</option>
                <option value="NEET UG">NEET UG (Medical)</option>
                <option value="CAT">CAT (IIMs MBA)</option>
                <option value="XAT">XAT (XLRI MBA)</option>
                <option value="CLAT">CLAT (Law NLUs)</option>
                <option value="CUET UG">CUET UG (Arts & Sciences)</option>
              </select>
            </div>

            <div className="form-group-pred">
              <label>
                {isPercentileExam
                  ? 'Enter Percentile Score (e.g. 98.5)'
                  : isScoreExam
                  ? 'Enter CUET Score out of 800 (e.g. 740)'
                  : 'Enter Your All India Rank (AIR)'}
              </label>
              <input
                type="number"
                placeholder={isPercentileExam ? '0.00 - 100.00' : isScoreExam ? '100 - 800' : 'E.g., 2500'}
                required
                step={isPercentileExam ? '0.01' : '1'}
                value={rank}
                onChange={(e) => setRank(e.target.value)}
              />
            </div>

            <div className="form-group-pred">
              <label>Reservation Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="General">General / Open Quota</option>
                <option value="OBC">OBC-NCL</option>
                <option value="SC">Scheduled Caste (SC)</option>
                <option value="ST">Scheduled Tribe (ST)</option>
              </select>
            </div>

            <div className="form-group-pred">
              <label>State Quota (Home State)</label>
              <select value={quota} onChange={(e) => setQuota(e.target.value)}>
                <option value="All">All India Quota (No State Quota)</option>
                <option value="Delhi">Delhi State</option>
                <option value="Karnataka">Karnataka State</option>
                <option value="Tamil Nadu">Tamil Nadu State</option>
                <option value="Maharashtra">Maharashtra State</option>
              </select>
            </div>

            <div className="predictor-button-row">
              {predictions && <button type="button" className="pred-reset-btn" onClick={handleResetPredictor}>Clear</button>}
              <button type="submit" className="pred-submit-btn">Run Predictor Engine</button>
            </div>
          </form>
        </div>

        {/* Prediction Results Panel */}
        <div className="predictor-results-panel">
          {predictions ? (
            <div className="predictions-list-container animate-fadeIn">
              <div className="predictions-summary-badge">
                <h3>Prediction Report</h3>
                <p>Found {predictions.length} matching institutions based on {exam} score of <strong>{rank}</strong> ({category} category).</p>
              </div>

              <div className="predictions-cards-grid">
                {predictions.map((pred, i) => (
                  <div key={i} className="prediction-match-card animate-hover" style={{ borderLeft: `5px solid ${pred.badgeColor}` }}>
                    <div className="pred-card-left">
                      <div className="pred-col-logo" style={{ backgroundColor: pred.college.logoColor }}>
                        {pred.college.name.split('(').pop()?.substring(0,3).toUpperCase() || pred.college.name.substring(0,3).toUpperCase()}
                      </div>
                      <div className="pred-col-text">
                        <h4>{pred.college.name.split(',')[0]}</h4>
                        <span className="pred-col-meta">{pred.college.location}, {pred.college.state} • established {pred.college.established}</span>
                        <div className="pred-placement-alert">
                          Avg Package: <strong>{pred.college.avgPlacement} LPA</strong> | Fees: <strong>₹ {pred.college.avgFees.toLocaleString('en-IN')}/yr</strong>
                        </div>
                      </div>
                    </div>

                    <div className="pred-card-right">
                      {/* Acceptability Meter */}
                      <div className="probability-ring-wrapper">
                        <svg className="h-14 w-14" viewBox="0 0 36 36">
                          <path
                            className="bg-ring"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#eee"
                            strokeWidth="3.5"
                          />
                          <path
                            className="fill-ring"
                            strokeDasharray={`${pred.probability}, 100`}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke={pred.badgeColor}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                          />
                          <text x="18" y="20.35" className="ring-text" fill={pred.badgeColor}>{pred.probability}%</text>
                        </svg>
                      </div>
                      
                      <span className="chance-badge" style={{ backgroundColor: `${pred.badgeColor}15`, color: pred.badgeColor }}>
                        {pred.status}
                      </span>
                      
                      <button className="pred-apply-direct-btn" onClick={() => onApplyCollegeDirect(pred.college.name)}>
                        Apply CAF
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="predictor-empty-report">
              <svg className="h-20 w-20 text-muted mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
              </svg>
              <h3>Awaiting Input Parameters</h3>
              <p>Select your entrance examination, input your rank/scores, and let our audit engine predict your chances of matching premium universities across the country.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

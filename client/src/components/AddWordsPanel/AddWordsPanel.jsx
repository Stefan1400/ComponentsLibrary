import React, { useState, useEffect, useContext } from 'react';
import './AddWordsPanel.css';
import { WordContext } from '../../context/WordContext';
import { StatsContext } from '../../context/StatsContext';
import { NotificationContext } from '../../context/Notification/Notification';
import '../../Styles/pageStyles.css';

function AddWordsPanel() {

  const { addNewWord, getMyWords } = useContext(WordContext);
  const { message, showNotification } = useContext(NotificationContext);
  const { myStats, setMyStats, getAllStats } = useContext(StatsContext);
  const [bothFull, setBothFull] = useState(true);
  const [wordValue, setWordValue] = useState('');
  const [meaningValue, setMeaningValue] = useState('');
  const [knownValue, setKnownValue] = useState(false);

  useEffect(() => {
    if (!wordValue === '' && !meaningValue === '') {
      setBothFull(true);
    } else {
      return;
    }
  }, [wordValue, meaningValue]);

  const handleAddWord = async () => {
    if (!wordValue || !meaningValue || knownValue === undefined) return;

    const added = await addNewWord(wordValue, meaningValue, knownValue);

    if (added) {
      setWordValue('');
      setMeaningValue('');
      setKnownValue(false);

      getMyWords();
      getAllStats();

      showNotification('word added');
    }
  }

  return (
    <div className='add-word-panel page'>
      <h3 className='page-header'>Add Word</h3>
      <input onChange={(e) => setWordValue(e.target.value)} value={wordValue} className='word-input' type="text" placeholder='vocab' />
      <input onChange={(e) => setMeaningValue(e.target.value)} value={meaningValue} className='meaning-input' type="text" placeholder='meaning' />
      {/* <div className='known-div'> 
        <input checked={knownValue} onChange={(e) => setKnownValue(e.target.checked)} className='status-input' type="checkbox" />
        <span>Known?</span>
      </div> */}

      <input
        type="checkbox"
        id="toggle"
        checked={knownValue}
        onChange={(e) => setKnownValue(e.target.checked)}
        style={{ display: "none" }}
      />
      <div className="known-toggle-pill-div">
        <label
          className='known-pill-label'
          htmlFor="toggle"
          style={{
            display: "inline-block",
            padding: "16px 30px",
            borderRadius: "999px",
            cursor: "pointer"
          }}
        >
          <div className={`known-pill-inner-div ${knownValue ? 'on' : ''}`}>
            <div className='known-pill-switch'></div>
          </div>
        </label>
        <span className='known-pill-span'>{knownValue ? 'known' : 'learning'}</span>
      </div>
      <button onClick={handleAddWord} className={`add-word-submit-btn ${bothFull ? 'enabled' : ''} `}>ADD WORD</button>
    </div>
  )
}

export default AddWordsPanel
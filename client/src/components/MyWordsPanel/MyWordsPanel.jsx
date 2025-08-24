import React, { useState, useContext, useEffect, useRef } from 'react';
import './MyWordsPanel.css';
import { WordContext } from '../../context/WordContext';
import { StatsContext } from '../../context/StatsContext';
import { NotificationContext } from '../../context/Notification/Notification';
import MyStats from '../MyStatsPanel/MyStatsPanel';
import ModalPopup from './ModalPopup/ModalPopup';

const WordListItem = ({ 
  wordObj, 
  isEditing, 
  editedWord, 
  newWord, 
  newMeaning, 
  newKnown,
  setNewWord,
  setNewMeaning, 
  setNewKnown,
  startEditing,
  handleDelete,
  cancelEdit,
  completeEdit 
}) => (
  <li style={wordObj.known ? { backgroundColor: '#323232'} : { backgroundColor: 'white'} } className={`my-words-list-item ${wordObj.known ? 'known' : 'learning'}`} key={wordObj.id}>
    {/* WORD / MEANING / KNOWN */}
    {(!isEditing || (isEditing && wordObj.id !== editedWord)) && (
      <>
        <span className='my-words-displayed my-words-word'>{wordObj.word}</span>
        <span className='my-words-displayed my-words-meaning'>{wordObj.meaning}</span>
        {/* <span className='my-words-displayed my-words-known'>{wordObj.known ? "yes" : "no"}</span> */}
      </>
    )}
    {isEditing && wordObj.id === editedWord && (
      <>
        <input 
          className='my-words-edit-field' 
          onChange={(e) => setNewWord(e.target.value)} 
          value={newWord} 
          placeholder={wordObj.word}
        />
        <input 
          className='my-words-edit-field' 
          onChange={(e) => setNewMeaning(e.target.value)} 
          value={newMeaning} 
          placeholder={wordObj.meaning}
        />
        {/* <input 
          className='my-words-edit-field' 
          type='checkbox' 
          onChange={(e) => setNewKnown(e.target.checked)} 
          checked={newKnown}
        /> */}
      </>
    )}


    {/* ACTIONS */}
    {!isEditing && (
      <div className='my-words-flex-row'>
        <button onClick={() => startEditing(wordObj)} className='my-words-edit enabled'>
          <svg width="18" height="18" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.474 3.60677L21.3889 7.5217C21.5538 7.68663 21.5538 7.95573 21.3889 8.12066L11.9097 17.5998L7.88194 18.0469C7.34375 18.1076 6.88802 17.6519 6.94878 17.1137L7.39583 13.0859L16.875 3.60677C17.0399 3.44184 17.309 3.44184 17.474 3.60677ZM24.5052 2.61285L22.3872 0.494792C21.7274 -0.164931 20.6554 -0.164931 19.9913 0.494792L18.4549 2.03125C18.2899 2.19618 18.2899 2.46528 18.4549 2.63021L22.3698 6.54514C22.5347 6.71007 22.8038 6.71007 22.9687 6.54514L24.5052 5.00868C25.1649 4.34462 25.1649 3.27257 24.5052 2.61285ZM16.6667 15.0217V19.4401H2.77778V5.55122H12.7517C12.8906 5.55122 13.0208 5.49479 13.1207 5.39931L14.8568 3.66319C15.1866 3.33333 14.9523 2.77344 14.4878 2.77344H2.08333C0.93316 2.77344 0 3.7066 0 4.85677V20.1345C0 21.2847 0.93316 22.2179 2.08333 22.2179H17.3611C18.5113 22.2179 19.4444 21.2847 19.4444 20.1345V13.2856C19.4444 12.8212 18.8845 12.5911 18.5547 12.9167L16.8186 14.6528C16.7231 14.7526 16.6667 14.8828 16.6667 15.0217Z" fill="black"/>
          </svg>
        </button>
        <button onClick={() => handleDelete(wordObj.id)} className='my-words-delete enabled'>
        <svg width="18" height="18" viewBox="0 0 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.0938 1.56251H15.2344L14.7754 0.649423C14.6782 0.454215 14.5284 0.29001 14.3429 0.175281C14.1575 0.0605526 13.9437 -0.00014785 13.7256 8.5609e-06H8.14453C7.92694 -0.000827891 7.71352 0.0596463 7.52871 0.174503C7.34391 0.289359 7.19519 0.453951 7.09961 0.649423L6.64062 1.56251H0.78125C0.57405 1.56251 0.375336 1.64482 0.228823 1.79133C0.08231 1.93784 0 2.13656 0 2.34376L0 3.90626C0 4.11346 0.08231 4.31217 0.228823 4.45869C0.375336 4.6052 0.57405 4.68751 0.78125 4.68751H21.0938C21.301 4.68751 21.4997 4.6052 21.6462 4.45869C21.7927 4.31217 21.875 4.11346 21.875 3.90626V2.34376C21.875 2.13656 21.7927 1.93784 21.6462 1.79133C21.4997 1.64482 21.301 1.56251 21.0938 1.56251ZM2.59766 22.8027C2.63492 23.3978 2.89754 23.9562 3.33206 24.3644C3.76658 24.7727 4.34033 24.9999 4.93652 25H16.9385C17.5347 24.9999 18.1084 24.7727 18.5429 24.3644C18.9775 23.9562 19.2401 23.3978 19.2773 22.8027L20.3125 6.25001H1.5625L2.59766 22.8027Z" fill="black"/>
        </svg>
        </button>
      </div>
    )}
    
    {isEditing && wordObj.id === editedWord && (
      <div className='my-words-flex-row'>
        <button onClick={() => cancelEdit()} className='my-words-edit-cancel enabled'>
        <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.1094 0C5.41992 0 0 5.41992 0 12.1094C0 18.7988 5.41992 24.2188 12.1094 24.2188C18.7988 24.2188 24.2188 18.7988 24.2188 12.1094C24.2188 5.41992 18.7988 0 12.1094 0ZM18.0469 15.2881C18.2764 15.5176 18.2764 15.8887 18.0469 16.1182L16.1133 18.0469C15.8838 18.2764 15.5127 18.2764 15.2832 18.0469L12.1094 14.8438L8.93066 18.0469C8.70117 18.2764 8.33008 18.2764 8.10059 18.0469L6.17187 16.1133C5.94238 15.8838 5.94238 15.5127 6.17187 15.2832L9.375 12.1094L6.17187 8.93066C5.94238 8.70117 5.94238 8.33008 6.17187 8.10059L8.10547 6.16699C8.33496 5.9375 8.70605 5.9375 8.93555 6.16699L12.1094 9.375L15.2881 6.17187C15.5176 5.94238 15.8887 5.94238 16.1182 6.17187L18.0518 8.10547C18.2813 8.33496 18.2813 8.70605 18.0518 8.93555L14.8438 12.1094L18.0469 15.2881Z" 
          fill="black"/>
        </svg>

        </button>
        <button onClick={() => completeEdit(wordObj)} className='my-words-edit-confirm enabled'>
        <svg width="18" height="18" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.2188 12.1094C24.2188 18.7972 18.7972 24.2188 12.1094 24.2188C5.42153 24.2188 0 18.7972 0 12.1094C0 5.42153 5.42153 0 12.1094 0C18.7972 0 24.2188 5.42153 24.2188 12.1094ZM10.7087 18.5212L19.6931 9.53682C19.9981 9.23174 19.9981 8.73706 19.6931 8.43198L18.5882 7.32715C18.2832 7.02202 17.7885 7.02202 17.4833 7.32715L10.1562 14.6542L6.7354 11.2333C6.43032 10.9283 5.93564 10.9283 5.63052 11.2333L4.52568 12.3382C4.22061 12.6433 4.22061 13.1379 4.52568 13.443L9.60381 18.5211C9.90894 18.8263 10.4036 18.8263 10.7087 18.5212Z" 
          fill="black"/>
        </svg>
        </button>
      </div>
    )}
  </li>
);


function MyWordsPanel() {

   const { myWords, getMyWords, editWord, deleteWord, search } = useContext(WordContext);
   const { myStats, getAllStats } = useContext(StatsContext);

   const { showNotification } = useContext(NotificationContext);

   const [isEditing, setIsEditing] = useState(false);
   const [newWord, setNewWord] = useState('');
   const [newMeaning, setNewMeaning] = useState('');
   const [newKnown, setNewKnown] = useState(null);
   const [editedWord, setEditedWord] = useState(null);
   const [searchQuery, setSearchQuery] = useState('');
   const [isSearching, setIsSearching] = useState(false);
   const [searchResults, setSearchResults] = useState([]);
   const [searchActivated, setSearchActivated] = useState(false);

   useEffect(() => {
    getMyWords();
   }, []);

   useEffect(() => {
    if (!searchQuery) {
      setIsSearching(false);
      return;
    }
    
    const handleSearch = async () => {
      setIsSearching(true);
      const results = await search(searchQuery);

      if (results) {
        setSearchResults(results || []);
      }
    }

    handleSearch();
   }, [searchQuery]);

   const handleDelete = async (wordId) => {
      const deleted = await deleteWord(wordId);

      if (deleted) {
        getAllStats();
      }

      if (isSearching) {
         setSearchResults(prev => prev.filter(word => word.id !== wordId));
      }
   }

   const startEditing = async (wordObj) => {
    setEditedWord(wordObj.id); 
    setNewWord(wordObj.word); 
    setNewMeaning(wordObj.meaning); 
    setNewKnown(wordObj.known);
    
    setIsEditing(true);
   }

   const cancelEdit = () => {
    setIsEditing(false);
    setNewWord('');
    setNewMeaning('');
    setNewKnown('');
    setEditedWord(null);
   } 

   const completeEdit = async (wordObj) => {
  const { id, word, meaning, known } = wordObj;

  const updatedWord = newWord.trim() === '' ? word : newWord.trim();
  const updatedMeaning = newMeaning.trim() === '' ? meaning : newMeaning.trim();
  const updatedKnown = newKnown;

  if (
    updatedWord === word &&
    updatedMeaning === meaning &&
    updatedKnown === known
  ) {
    // showNotification('No changes made');
    cancelEdit();
    return;
  }

  const edited = await editWord(id, updatedWord, updatedMeaning, updatedKnown);

    if (edited) {
      getMyWords();
      getAllStats();

      if (isSearching) {
        setSearchResults(prev =>
          prev.map(w =>
            w.id === id ? { ...w, word: updatedWord, meaning: updatedMeaning, known: updatedKnown } : w
          )
        );
      }

      cancelEdit();
    }
      };

   const handleClearSearch = () => {
    if (!searchQuery) {
      return;
    }

    setSearchQuery('');
    setIsSearching(false);
    setSearchResults([]);
   }

   const handleSearchActivated = () => {
      setSearchActivated(true);
   } 

   const closeSearch = () => {
      setSearchActivated(false);
      setSearchQuery('');
   }

   const inputRef = useRef(null);

   useEffect(() => {
    if (searchActivated && inputRef.current) {
      inputRef.current.focus();
    }
   }, [searchActivated]);

   

  // {myStats && Object.entries(myStats)
  //         .filter(([key]) => key === "total_words")
  //         .map(([key, value]) => (
  //           <li className='my-stats-ul-li' key={key}>
  //             <span className='my-stats-title'>Total Words</span>
  //             <span className='my-stats-number'>{value}</span>
  //           </li>
  //         ))
   
  return (
    <div className="panel-wrapper page">


      <ul className="my-words-word-stats">
        {myStats && Object.entries(myStats)
        .filter(([key]) => key === "total_words")
        .map(([key, value]) => (
          <li className='my-words-word-stats-li' key={key}>
            <div className='my-words-stats-header-div'> 
              <div className='my-words-stats-color-indicator-total'></div>
              <span className='my-words-stats-title'>Total</span>
            </div>
            <span className='my-words-stats-number'>{value}</span>
          </li>
        ))}
        {myStats && Object.entries(myStats)
        .filter(([key]) => key === "known_words")
        .map(([key, value]) => (
          <li className='my-words-word-stats-li' key={key}>
            <div className='my-words-stats-header-div'>
              <div className='my-words-stats-color-indicator-known'></div>
              <span className='my-words-stats-title'>Known</span>
            </div>
            <span className='my-words-stats-number'>{value}</span>
          </li>
        ))}
        {myStats && Object.entries(myStats)
        .filter(([key]) => key === "learning_words")
        .map(([key, value]) => (
          <li className='my-words-word-stats-li' key={key}>
            <div className='my-words-stats-header-div'>
              <div className='my-words-stats-color-indicator-learning'></div>
              <span className='my-words-stats-title'>Learning</span>
            </div>
            <span className='my-words-stats-number'>{value}</span>
          </li>
        ))}
      </ul>
      
      {/* SEARCH BAR */}
      <div className="my-words-search-flex">
        <div className='my-words-search-searchbar-clear-flex'>
          {!searchActivated && (
            <svg onClick={handleSearchActivated} className='my-words-search-icon clickable' width="22" height="22" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7.41209" cy="7.41209" r="6.66209" stroke="#202020" strokeWidth="1.5"/>
              <line x1="12.5264" y1="12.4052" x2="18.5909" y2="18.4697" stroke="#202020" strokeWidth="1.5"/>
            </svg>
          )}

          {searchActivated && (
            <input 
              ref={inputRef} 
              onChange={(e) => {setSearchQuery(e.target.value)}} 
              value={searchQuery} 
              className='my-words-search-input' 
              type="text" 
              placeholder='search word, meaning' 
            />
          )}

          {isSearching && searchActivated && (
            <span onClick={handleClearSearch} className='my-words-search-clear enabled clickable'>clear</span>
          )}
          {searchActivated && (
            <svg onClick={closeSearch} className='my-words-search-close clickable' width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0.823223" y1="12.8232" x2="12.8232" y2="0.823224" stroke="#000" strokeWidth="0.75"/>
              <line x1="1.17678" y1="0.823223" x2="13.1768" y2="12.8232" stroke="#000" strokeWidth="0.75"/>
            </svg>
          )}
        </div>
      </div>

      {/* CONTENT AREA */}
      {isSearching && searchResults.length === 0 ? (
        <h3 className='my-words-no-results-h3'>
          No search results found
        </h3>
      ) : isSearching ? (
        <ul className="my-words-list">
          {[...searchResults].reverse().map((wordObj) => (
            <WordListItem 
              key={wordObj.id} 
              wordObj={wordObj}
              isEditing={isEditing}
              editedWord={editedWord}
              newWord={newWord}
              newMeaning={newMeaning}
              newKnown={newKnown}
              setNewWord={setNewWord}
              setNewMeaning={setNewMeaning}
              setNewKnown={setNewKnown}
              startEditing={startEditing}
              handleDelete={handleDelete}
              cancelEdit={cancelEdit}
              completeEdit={completeEdit}
            />
          ))}
        </ul>
      ) : (
        <ul className='my-words-panel-table'>
          {[...myWords].reverse().map((wordObj) => (
            <WordListItem 
              key={wordObj.id} 
              wordObj={wordObj}
              isEditing={isEditing}
              editedWord={editedWord}
              newWord={newWord}
              newMeaning={newMeaning}
              newKnown={newKnown}
              setNewWord={setNewWord}
              setNewMeaning={setNewMeaning}
              setNewKnown={setNewKnown}
              startEditing={startEditing}
              handleDelete={handleDelete}
              cancelEdit={cancelEdit}
              completeEdit={completeEdit}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyWordsPanel;
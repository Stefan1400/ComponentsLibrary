import React, { useState, useContext, useEffect, useRef } from 'react';
import './MyWordsPanel.css';
import { WordContext } from '../../context/WordContext';
import { StatsContext } from '../../context/StatsContext';
import { NotificationContext } from '../../context/Notification/Notification';
import { HorizontalElipsisIcon, RightArrowIcon, EditIcon, TrashIcon, XIcon, CircleXIcon, CircleCheckIcon, SearchIcon } from '../../assets/Icons/Icons';

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
  completeEdit,
  toggleKnown,
  isMobile,
  isMobileActionsOpen,
  toggleMobileActionsModal,
  deleteConfirmOpen,
  toggleDeleteConfirm,
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
        <input 
          className='my-words-edit-field' 
          type='checkbox' 
          onChange={(e) => setNewKnown(e.target.checked)} 
          checked={newKnown}
        />
      </>
    )}

    {deleteConfirmOpen && (
      <div style={{backgroundColor: 'white', color: 'black'}} className="delete-confirm-div">
        <span style={{backgroundColor: 'white', color: 'black'}} className='delete-confirm-message'>Are you sure you want to delete this word?</span>
        <button style={{backgroundColor: 'gray', color: 'white'}} onClick={() => handleDelete(wordObj.id)} className='delete-confirm-btn'>Delete</button>
      </div>
    )}


    {/* ACTIONS */}

    {/* MOBILE ACTIONS */}
    {!isEditing && isMobile && (
      <button className='my-words-mobile-actions-open' onClick={toggleMobileActionsModal}>
        <HorizontalElipsisIcon />
      </button>

    )}

    {(isMobileActionsOpen || deleteConfirmOpen) && (
      <div onClick={toggleMobileActionsModal} className="my-words-mobile-actions-modal-close-div"></div>
    )}

    {isMobileActionsOpen && isMobile && (
      <>


      
        <div className={`my-words-mobile-actions-modal ${isMobileActionsOpen ? 'show' : ''}`}>
          <button onClick={() => toggleKnown(wordObj.id, !wordObj.known)} className='my-words-known-switch enabled my-words-actions-modal-action'>
            <RightArrowIcon />

            <span className='my-words-mobile-actions-edit-span'>Change to {wordObj.known ? 'learning' : 'known'}</span>
          </button>
          
          <button onClick={() => startEditing(wordObj)} className='my-words-edit enabled my-words-actions-modal-action'>
            <EditIcon />
        
            <span className='my-words-mobile-actions-edit-span'>Edit word / meaning</span>
          </button>

          <button onClick={toggleDeleteConfirm} className='my-words-delete enabled my-words-actions-modal-action'>
            <TrashIcon />
            
            <span className='my-words-mobile-actions-edit-span'>Delete</span>
          </button>
        </div>
      </>
    )}


    {/* DESKTOP ACTIONS */}
    {!isEditing && !isMobile && (
      <div className='my-words-flex-row'>
        <button onClick={() => startEditing(wordObj)} className='my-words-edit enabled'>
          <EditIcon />
        </button>
        <button onClick={toggleDeleteConfirm} className='my-words-delete enabled'>
          <TrashIcon />
        </button>

        {/* known pill switch */}
            <input
            type="checkbox"
            id={`toggle-${wordObj.id}`} 
            checked={wordObj.known}
            onChange={(e) => toggleKnown(wordObj.id, e.target.checked)}
            style={{ display: "none" }}
          />
        <div className="known-toggle-pill-div">
          <label
            className='known-pill-label'
            htmlFor={`toggle-${wordObj.id}`} 
            style={{
              display: "inline-block",
              padding: "16px 30px",
              borderRadius: "999px",
              cursor: "pointer"
            }}
          >
            <div className={`known-pill-inner-div my-words-pill-inner-div ${wordObj.known ? 'on' : ''}`}>
              <div className='known-pill-switch my-words-pill-switch'></div>
            </div>
          </label>
          {/* <span className='known-pill-span'>{wordObj.known ? 'known' : 'learning'}</span> */}
        </div>

      </div>
    )}
    
    {isEditing && wordObj.id === editedWord && (
      <div className='my-words-flex-row'>
        <button onClick={() => cancelEdit()} className='my-words-edit-cancel enabled'>
          <CircleXIcon />
        </button>
        <button onClick={() => completeEdit(wordObj)} className='my-words-edit-confirm enabled'>
          <CircleCheckIcon />
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
  const [isMobileActionsOpen, setIsMobileActionsOpen] = useState(false);
   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

   const toggleMobileActionsModal = () => {
    if (isMobileActionsOpen || deleteConfirmOpen) {
      setIsMobileActionsOpen(false);
      setDeleteConfirmOpen(false);
    } else {
      setIsMobileActionsOpen(true);
    }
   }
   
   
   useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
  }, []);

   const toggleKnown = async (wordId, newValue) => {
      const wordObj = myWords.find(w => w.id === wordId);
      await editWord(wordId, wordObj.word, wordObj.meaning, newValue);
      getMyWords();
      getAllStats();
      setIsMobileActionsOpen(false);
   }

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

   const toggleDeleteConfirm = () => {
    setDeleteConfirmOpen(true);
    setIsMobileActionsOpen(false);
    
   }

   const handleDelete = async (wordId) => {
    
    setIsMobileActionsOpen(false);
      const deleted = await deleteWord(wordId);

      if (deleted) {
        getAllStats();
        setDeleteConfirmOpen(false);
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
    setIsMobileActionsOpen(false);
    
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
    // if (!searchQuery) {
    //   return;
    // }

    setSearchQuery('');
    // setIsSearching(false);
    setSearchResults([]);
   }

   const handleSearchActivated = () => {
      setSearchActivated(true);
   } 

   const closeSearch = () => {
      setSearchActivated(false);
      setSearchQuery('');
      // setIsSearching(false);
      setSearchResults([]);
   }

   const inputRef = useRef(null);

   useEffect(() => {
    if (searchActivated && inputRef.current) {
      inputRef.current.focus();
    }
   }, [searchActivated]);

   
  return (
    <div className="panel-wrapper page">

      {/* STATS */}
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
            <SearchIcon onClick={handleSearchActivated} className='my-words-search-icon clickable' />
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
            <XIcon onClick={closeSearch} className='my-words-search-close clickable' width="14" height="13" />
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
              toggleKnown={toggleKnown}
              isMobile={isMobile}
              toggleMobileActionsModal={toggleMobileActionsModal}
              isMobileActionsOpen={isMobileActionsOpen}
              toggleDeleteConfirm={toggleDeleteConfirm}
              deleteConfirmOpen={deleteConfirmOpen}
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
              toggleKnown={toggleKnown}
              isMobile={isMobile}
              toggleMobileActionsModal={toggleMobileActionsModal}
              isMobileActionsOpen={isMobileActionsOpen}
              toggleDeleteConfirm={toggleDeleteConfirm}
              deleteConfirmOpen={deleteConfirmOpen}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyWordsPanel;
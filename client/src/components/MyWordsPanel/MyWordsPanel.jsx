import React, { useState, useContext, useEffect, useRef } from 'react';
import './MyWordsPanel.css';
import { WordContext } from '../../context/WordContext';
import { StatsContext } from '../../context/StatsContext';
import { NotificationContext } from '../../context/Notification/Notification';
import MyStats from './MyStats/MyStats';
import SearchBar from './Search/SearchBar';
import WordCard from './WordCard/WordCard';

function MyWordsPanel({  }) {

  // CONTEXT
   const { myWords, getMyWords, editWord, deleteWord } = useContext(WordContext);
   const { myStats, getAllStats } = useContext(StatsContext);
   const { showNotification } = useContext(NotificationContext);

  //  STATE
   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
   
   const [isSearching, setIsSearching] = useState(false);
   const [searchResults, setSearchResults] = useState([]);

   const [isEditing, setIsEditing] = useState(false);
   const [newWord, setNewWord] = useState('');
   const [newMeaning, setNewMeaning] = useState('');
   const [newKnown, setNewKnown] = useState(null);
   const [editedWord, setEditedWord] = useState(null);

   const editRef = useRef();
   
    useEffect(() => {
      if (isEditing && editRef.current) {
        editRef.current.focus();
      }
    }, [isEditing]);
  

   // FUNCTIONS

   const handleDelete = async (wordId, closeChildModal) => {
      console.log(wordId);
    
    const deleted = await deleteWord(wordId);

      if (deleted) {
        getAllStats();
        if (closeChildModal) closeChildModal();
      }

      if (isSearching) {
         setSearchResults(prev => prev.filter(word => word.id !== wordId));
      }
   }

   const toggleKnown = async (wordId, newValue, closeChildModal) => {
      const wordObj = myWords.find(w => w.id === wordId);
      await editWord(wordId, wordObj.word, wordObj.meaning, newValue);
      getMyWords();
      getAllStats();
      if (closeChildModal) closeChildModal();
   }

   const startEditing = async (wordObj, closeChildModal) => {
    setEditedWord(wordObj.id); 
    setNewWord(wordObj.word); 
    setNewMeaning(wordObj.meaning); 
    setNewKnown(wordObj.known);
    if (closeChildModal) closeChildModal();
    
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
   
   // EFFECT
   
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

  useEffect(() => {
    getMyWords();
   }, []);


  // JSX
   
  return (
    <div className="panel-wrapper page">

      {/* STATS */}
      <ul className="my-words-word-stats">
        <MyStats statType='total_words' statName='total' />
        <MyStats statType='known_words' statName='known' />
        <MyStats statType='learning_words' statName='learning' />
      </ul>
      
      {/* SEARCH BAR */}
      <SearchBar isSearching={isSearching} setIsSearching={setIsSearching} setSearchResults={setSearchResults} />

      
      {/* DISPLAYED LISTS */}
      {isSearching && searchResults.length === 0 ? (
        <h3 className='my-words-no-results-h3'>
          No search results found
        </h3>
      ) : isSearching ? (
        <ul className="my-words-list">
          {[...searchResults].reverse().map((wordObj) => (
            <WordCard 
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
              editRef={editRef}
            />
          ))}
        </ul>
      ) : (
        <ul className='my-words-panel-table'>
          {[...myWords].reverse().map((wordObj) => (
            <WordCard 
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
              editRef={editRef}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyWordsPanel;
import React, { useState, useContext, useEffect, useRef } from 'react';
import './MyWordsPanel.css';
import { WordContext } from '../../context/WordContext';
import { StatsContext } from '../../context/StatsContext';
import { NotificationContext } from '../../context/Notification/Notification';

function MyWordsPanel() {

   const { myWords, getMyWords, editWord, deleteWord, search } = useContext(WordContext);
   const { getAllStats } = useContext(StatsContext);
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
        // console.log('results query: ', results);
        setSearchResults(results || []);
        
      }
    }

    handleSearch();

   }, [searchQuery]);

  //  useEffect(() => {
  //   console.log('search results: ', searchResults);
  //  }, [searchResults]);

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
    showNotification('No changes made');
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
    console.log('My words logic was successful');
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
   
  return (
    <div className="panel-wrapper page">
      <div className="my-words-search-flex">
        <div className='my-words-search-searchbar-clear-flex'>
          {!searchActivated && (
            <svg onClick={handleSearchActivated} className='my-words-search-icon' width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7.41209" cy="7.41209" r="6.66209" stroke="#202020" strokeWidth="1.5"/>
              <line x1="12.5264" y1="12.4052" x2="18.5909" y2="18.4697" stroke="#202020" strokeWidth="1.5"/>
            </svg>
          )}

          {searchActivated && (
            <input ref={inputRef} onChange={(e) => {setSearchQuery(e.target.value)}} value={searchQuery} className='my-words-search-input' type="text" placeholder='search word, meaning' />
          )}

          {isSearching && searchActivated && (
            <span onClick={handleClearSearch} className='my-words-search-clear enabled'>clear</span>
          )}
          {searchActivated && (
            <svg onClick={closeSearch} className='my-words-search-close' width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0.823223" y1="12.8232" x2="12.8232" y2="0.823224" stroke="#000" strokeWidth="0.75"/>
              <line x1="1.17678" y1="0.823223" x2="13.1768" y2="12.8232" stroke="#000" strokeWidth="0.75"/>
            </svg>
          )}

        </div>
      </div>

    {isSearching && searchResults.length === 0 ? 
        <h3 className='my-words-no-results-h3'>
          No search results found
        </h3> : (
      <table className='my-words-panel-table'>
        <thead>
          
          <tr>
            <th>Word</th>
            <th>Meaning</th>
            <th>Known</th>
            <th>Actions</th>
          </tr>

          
        </thead>
        <tbody>
          {[...searchResults].reverse().map((wordObj, index) => {
            return(
              <tr key={wordObj.id}>
                {/* WORD / MEANING / KNOWN */}
                {(!isEditing || (isEditing && wordObj.id !== editedWord)) && (
                  <>
                    <td className='my-words-displayed'>{wordObj.word}</td>
                    <td className='my-words-displayed'>{wordObj.meaning}</td>
                    <td className='my-words-displayed'>{wordObj.known ? "yes" : "no"}</td>
                  </>
                )}
                {isEditing && wordObj.id === editedWord && (
                  <>
                    <td>
                      <input className='my-words-edit-field' onChange={(e) => setNewWord(e.target.value)} value={newWord} placeholder={wordObj.word}/>
                    </td>
                    <td>
                      <input className='my-words-edit-field' onChange={(e) => setNewMeaning(e.target.value)} value={newMeaning} placeholder={wordObj.meaning}/>
                    </td>
                    <td>
                      <input className='my-words-edit-field' type='checkbox' onChange={(e) => setNewKnown(e.target.checked)} checked={newKnown}/>
                    </td>
                  </>
                )}
                

                {/* ACTIONS */}
                {!isEditing && (
                  <td className='my-words-flex-row'>

                    <button onClick={() => startEditing(wordObj)} className='my-words-edit enabled'>edit</button>
                    <button onClick={() => handleDelete(wordObj.id)} className='my-words-delete enabled'>delete</button>
                  </td>
                )}
                {isEditing && wordObj.id === editedWord && (
                  <td className='my-words-flex-row'>
                    
                    
                    <button onClick={() => cancelEdit()} className='my-words-edit-cancel enabled'>cancel</button>
                    <button onClick={() => completeEdit(wordObj)} className='my-words-edit-confirm enabled'>confirm</button>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    )}
      
    {!isSearching && (
      <table className='my-words-panel-table'>
        {/* <thead>
          <tr>
            <th>Word</th>
            <th>Meaning</th>
            <th>Known</th>
            <th>Actions</th>
          </tr>
        </thead> */}
        <tbody>
          {[...myWords].reverse().map((wordObj, index) => {
            return(
              <tr key={wordObj.id}>
                {/* WORD / MEANING / KNOWN */}
                {(!isEditing || (isEditing && wordObj.id !== editedWord)) && (
                  <>
                    <td>{wordObj.word}</td>
                    <td>{wordObj.meaning}</td>
                    <td>{wordObj.known ? "yes" : "no"}</td>
                  </>
                )}
                {isEditing && wordObj.id === editedWord && (
                  <>
                    <td>
                      <input className='my-words-edit-field' onChange={(e) => setNewWord(e.target.value)} value={newWord} placeholder={wordObj.word}/>
                    </td>
                    <td>
                      <input className='my-words-edit-field' onChange={(e) => setNewMeaning(e.target.value)} value={newMeaning} placeholder={wordObj.meaning}/>
                    </td>
                    <td>
                      <input className='my-words-edit-field' type='checkbox' onChange={(e) => setNewKnown(e.target.checked)} checked={newKnown}/>
                    </td>
                  </>
                )}


                {/* ACTIONS */}
                {!isEditing && (
                  <td className='my-words-flex-row'>
                    {/* <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.08646 1.94804L11.1222 4.06251C11.208 4.15159 11.208 4.29693 11.1222 4.38601L6.19306 9.50576L4.09861 9.74722C3.81875 9.78004 3.58177 9.53389 3.61337 9.24321L3.84583 7.06779L8.775 1.94804C8.86076 1.85896 9.0007 1.85896 9.08646 1.94804ZM12.7427 1.41121L11.6413 0.26724C11.2983 -0.0890799 10.7408 -0.0890799 10.3955 0.26724L9.59653 1.09709C9.51077 1.18617 9.51077 1.33151 9.59653 1.42059L11.6323 3.53507C11.7181 3.62415 11.858 3.62415 11.9438 3.53507L12.7427 2.70522C13.0858 2.34655 13.0858 1.76753 12.7427 1.41121ZM8.66667 8.1133V10.4997H1.44444V2.99824H6.6309C6.70313 2.99824 6.77083 2.96777 6.82274 2.91619L7.72552 1.97851C7.89705 1.80035 7.77517 1.49795 7.53368 1.49795H1.08333C0.485243 1.49795 0 2.00195 0 2.62317V10.8748C0 11.496 0.485243 12 1.08333 12H9.02778C9.62587 12 10.1111 11.496 10.1111 10.8748V7.17562C10.1111 6.92479 9.81997 6.80055 9.64844 6.97636L8.74566 7.91405C8.69601 7.96796 8.66667 8.03829 8.66667 8.1133Z" fill="#000"/>
                    </svg> */}






                    <button onClick={() => startEditing(wordObj)} className='my-words-edit enabled'>edit</button>
                    <button onClick={() => handleDelete(wordObj.id)} className='my-words-delete enabled'>delete</button>
                  </td>
                )}
                {isEditing && wordObj.id === editedWord && (
                  <td className='my-words-flex-row'>
                    <button onClick={() => cancelEdit()} className='my-words-edit-cancel enabled'>cancel</button>
                    <button onClick={() => completeEdit(wordObj)} className='my-words-edit-confirm enabled'>confirm</button>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    )}
    </div>
    
  )
}

export default MyWordsPanel;
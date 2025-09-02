import React from 'react';
import './WordCard.css';
import { useState, useEffect, useContext, useRef } from 'react';
import { WordContext } from '../../../context/WordContext';
import { StatsContext } from '../../../context/StatsContext';
import { NotificationContext } from '../../../context/Notification/Notification';
import { HorizontalElipsisIcon, RightArrowIcon, EditIcon, TrashIcon, CircleXIcon, CircleCheckIcon } from '../../../assets/Icons/Icons';

function WordCard({ 
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
}) {
  
   // STATES

   const [isMobileActionsOpen, setIsMobileActionsOpen] = useState(false);
   const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

   // CONTEXTS

   // FUNCTIONS

   const testDeleteFunction = (wordId) => {
      console.log(wordId);
      handleDelete(wordId);
   }

   const closeChildModal = () => {
      setIsMobileActionsOpen(false);
      setDeleteConfirmOpen(false);
   }
  
   const toggleMobileActionsModal = () => {
    if (isMobileActionsOpen || deleteConfirmOpen) {
      setIsMobileActionsOpen(false);
      setDeleteConfirmOpen(false);
    } else {
      setIsMobileActionsOpen(true);
    }
   }

   const toggleDeleteConfirm = () => {
    setDeleteConfirmOpen(true);
    setIsMobileActionsOpen(false);
    
   } 
  
   // JSX
  
   return (
    <li style={wordObj.known ? { backgroundColor: '#323232'} : { backgroundColor: 'white'} } className={`my-words-list-item ${wordObj.known ? 'known' : 'learning'}`} key={wordObj.id}>
    {/* WORD / MEANING / KNOWN */}
    {(!isEditing || (isEditing && wordObj.id !== editedWord)) && (
      <>
        <span className={`my-words-displayed my-words-word ${wordObj.known ? 'known' : 'learning'}`} >{wordObj.word}</span>
        <span className={`my-words-displayed my-words-meaning ${wordObj.known ? 'known' : 'learning'}`}>{wordObj.meaning}</span>
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
        <button style={{backgroundColor: 'gray', color: 'white'}} onClick={() => testDeleteFunction(wordObj.id)} className='delete-confirm-btn'>Delete</button>
      </div>
    )}


    {/* ACTIONS */}

    {/* MOBILE ACTIONS */}
    {!isEditing && isMobile && (
      <button style={{backgroundColor: wordObj.known ? '#323232' : 'white', color: wordObj.known ? '#323232' : 'white'}} className={`my-words-mobile-actions-open ${wordObj.known ? 'known' : 'learning'}`} onClick={toggleMobileActionsModal}>
        <HorizontalElipsisIcon />
      </button>

    )}

    {(isMobileActionsOpen || deleteConfirmOpen) && (
      <div onClick={closeChildModal} className="my-words-mobile-actions-modal-close-div"></div>
    )}

    {isMobileActionsOpen && isMobile && (
      <>
      
        <div className={`my-words-mobile-actions-modal ${isMobileActionsOpen ? 'show' : ''}`}>
          <button onClick={() => toggleKnown(wordObj.id, !wordObj.known)} className='my-words-known-switch my-words-actions-modal-action'>
            <RightArrowIcon />

            <span className='my-words-mobile-actions-edit-span'>Change to {wordObj.known ? 'learning' : 'known'}</span>
          </button>
          
          <button onClick={() => startEditing(wordObj)} className='my-words-edit my-words-actions-modal-action'>
            <EditIcon />
        
            <span className='my-words-mobile-actions-edit-span'>Edit word / meaning</span>
          </button>

          <button onClick={toggleDeleteConfirm} className='my-words-delete my-words-actions-modal-action'>
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
          <EditIcon className={`word-card-desktop-icon ${wordObj.known ? 'known' : 'learning'}`} />
        </button>
        <button onClick={toggleDeleteConfirm} className='my-words-delete enabled'>
          <TrashIcon className={`word-card-desktop-icon ${wordObj.known ? 'known' : 'learning'}`} />
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
        </div>

      </div>
    )}
    
    {isEditing && wordObj.id === editedWord && (
      <div className='my-words-flex-row'>
        <button onClick={() => cancelEdit()} className='my-words-edit-cancel enabled'>
          <CircleXIcon className={`word-card-desktop-icon ${wordObj.known ? 'known' : 'learning'}`} />
        </button>
        <button onClick={() => completeEdit(wordObj)} className='my-words-edit-confirm enabled'>
          <CircleCheckIcon className={`word-card-desktop-icon ${wordObj.known ? 'known' : 'learning'}`} />
        </button>
      </div>
    )}
  </li>
  )
}

export default WordCard;
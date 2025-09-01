import React from 'react';
import './SearchBar.css'
import { useState, useRef, useContext, useEffect } from 'react';
import { XIcon, SearchIcon } from '../../../assets/Icons/Icons';
import { WordContext } from '../../../context/WordContext';

function SearchBar({ isSearching, setIsSearching, setSearchResults }) {

   // CONTEXT

   const { search } = useContext(WordContext);

   // STATE
   const [searchActivated, setSearchActivated] = useState(false);
   const [searchQuery, setSearchQuery] = useState('');
   
   // REF
   const inputRef = useRef(null);

   // FUNCTIONS

   const handleSearchActivated = () => {
      setSearchActivated(true);
   } 

   const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
   }

   const closeSearch = () => {
      setSearchActivated(false);
      setSearchQuery('');
      setSearchResults([]);
   }

   // EFFECT
  
   useEffect(() => {
      if (searchActivated && inputRef.current) {
         inputRef.current.focus();
      }
   }, [searchActivated]);

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
  
   
   // JSX

   return (
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
  )
}

export default SearchBar;
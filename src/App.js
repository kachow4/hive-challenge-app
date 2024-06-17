import { useEffect, useState } from 'react';
import './App.css';
import DropdownMenu from './components/DropdownMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

// LOCAL DATA FOR TESTING
const NAMES = [{id: 'a', value: "Oliver Hansen"}, 
  {id: 'b', value: "Van Henry"}, 
  {id: 'c', value: "April Tucker"}, 
  {id: 'd', value: "Ralph Hubbard"}];

const NUMBERS = [{id: 'a', value: 1}, 
  {id: 'b', value: 2}, 
  {id: 'c', value: 3}, 
  {id: 'd', value: 4},
  {id: 'e', value: 5}, 
  {id: 'f', value: 6}, 
  {id: 'g', value: 7}, 
  {id: 'h', value: 8},
  {id: 'i', value: 9}, 
  {id: 'j', value: 10}, 
  {id: 'k', value: 11}, 
  {id: 'l', value: 12},
  {id: 'm', value: 13}, 
  {id: 'n', value: 14}, 
  {id: 'o', value: 15}, 
  {id: 'p', value: 16},
  {id: 'q', value: 17}, 
  {id: 'r', value: 18}, 
  {id: 's', value: 19}, 
  {id: 't', value: 20}];

//ARRAY OF 2,000,000 INDEXES
const BIG_ARRAY = Array.from({length: 2000000}, (x, i) => i + 1);

function App() {
  const [authorsList, setAuthorsList] = useState([]);

  //LIST OF AUTHORS FROM QUOTABLE API FOR TESTING
  useEffect(() => {
    try {
      fetch(`https://api.quotable.io/authors?limit=150`)
        .then((response) => {
          return response.json()
        }).then((data) => {
        setAuthorsList(data.results);
      })
    }
    catch(e) {
      console.log("Error!");
      console.log(e);
    }
  }, []);

  return (
    <div className="App">
      <h1 className='title'>Katie Chow - Hive Take Home Prompt</h1>
      <div className='dropdowns'>
        <DropdownMenu multiSelect={true} 
                      options={NAMES} 
                      label="Tag" 
                      height="30px"/>
        <DropdownMenu options={NUMBERS} 
                      label="Age" 
                      width="100px"/>
        <DropdownMenu multiSelect={true} 
                      options={authorsList.map(author => { return {id: author._id, value: author.name} })} 
                      label='Authors' 
                      height="50px"
                      maxWidth='200px'/>
        <DropdownMenu multiSelect={true} 
                      options={BIG_ARRAY.map(num => { return {id: crypto.randomUUID, value: num}})} />
      </div>
    </div>
  );
}

export default App;

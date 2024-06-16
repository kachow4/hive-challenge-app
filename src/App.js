import { useEffect, useState } from 'react';
import './App.css';
import DropdownMenu from './components/DropdownMenu';

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

function App() {
  const [authorsList, setAuthorsList] = useState([]);

  useEffect(() => {
    fetch(`https://api.quotable.io/authors?limit=150`)
      .then((response) => {
        return response.json()
      }).then((data) => {
       setAuthorsList(data.results);
       console.log(data.results);
    })
  }, []);

  return (
    <div className="App">
      <div className='dropdowns'>
        <DropdownMenu multiSelect={true} options={NAMES} placeholder="Tag"/>
        <DropdownMenu options={NUMBERS} placeholder="Age"/>
        <DropdownMenu multiSelect={true} options={authorsList.map(author => { return {id: author._id, value: author.name} })} />
      </div>
    </div>
  );
}

export default App;

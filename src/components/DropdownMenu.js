import React, { useState } from 'react';
import { FixedSizeList as List } from "react-window";
import './DropdownMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const DropdownMenu = ({multiSelect = false, options, placeholder = "Select value:"}) => {
    const [openDropdown, setOpenDropdown] = useState(false); // updates whether or not the dropdown is open or closed
    const [selected, setSelected] = useState([]); // updates which options in the dropdown are selected

    // opens and closes the dropdown
    const handleClick = () => {
        setOpenDropdown(!openDropdown);
    }

    //handles and updates the list of selected options
    const selectOption = ( option ) => {
        if ( multiSelect ) {
            selected.includes(option) ? 
                setSelected(prev => prev.filter(o => o !== option)) : 
                setSelected([...selected, option]);
        }
        else {
            selected.length === 1 && selected[0] === option ? setSelected([]) : setSelected([option]);
        }
    }

    // selects or deselects all dropdown options
    const handleSelectAll = () => {
        selected === options ? setSelected([]) : setSelected(options);
    }

    return (
        <div className='container'>
            <div className='label'>{selected.length > 0 && placeholder}</div>

            {/* SINGLE SELECT DROPDOWN */}
            { !multiSelect && 
                <button className='button-dropdown' onClick={handleClick}>
                    { selected.length === 0 ? placeholder : selected[0].value }
                    <FontAwesomeIcon icon={ openDropdown ? faChevronUp : faChevronDown}/>
                </button>
            }
            {openDropdown && !multiSelect && <div className='list-wrapper'>
                <List
                    height={200}
                    itemCount={options.length}
                    itemSize={30}
                    width={240}
                >
                    {({index, style}) => (
                        <div key={options[index].id} className='option' style={style}>
                            <input type="checkbox" 
                                checked={selected[0] === options[index]} 
                                onChange={() => selectOption(options[index])}>
                            </input>
                            <div>{options[index].value}</div>
                        </div>
                    )}
                </List>
            </div>}

            {/* MULTI SELECT DROPDOWN */}
            { multiSelect && <button className='button-dropdown' onClick={handleClick}>
                <span className='button-dropdown-text'>
                    { selected.length < 1 ? placeholder : selected.map((option) => (option.value)).join(", ")}
                </span>
                <FontAwesomeIcon icon={ openDropdown ? faChevronUp : faChevronDown}/>
            </button>}
            {openDropdown && multiSelect && <div className='list-wrapper'>
                {/* SELECT ALL OPTION */}
                <div key="all" className='option'>
                    <input type="checkbox" checked={selected === options} onChange={handleSelectAll}></input>
                    <div>Select All</div>
                </div>
                <List
                    height={200}
                    itemCount={options.length}
                    itemSize={30}
                    width={240}
                >
                    {({index, style}) => (
                        <div key={options[index].id} className='option' style={style}>
                            <input type="checkbox" 
                                checked={selected.includes(options[index])} 
                                onChange={() => selectOption(options[index])}>
                            </input>
                            <div>{options[index].value}</div>
                        </div>
                    )}
                </List>
            </div>}
        </div>
    );
}

export default DropdownMenu;
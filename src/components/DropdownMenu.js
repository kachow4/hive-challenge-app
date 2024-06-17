import React, { useState } from 'react';
import { FixedSizeList as List } from "react-window";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import './DropdownMenu.css';

const DropdownMenu = ({multiSelect = false, options, label = "Select value:"}) => {
    const [openDropdown, setOpenDropdown] = useState(false); // updates whether or not the dropdown is open or closed
    const [selected, setSelected] = useState([]); // updates which options in the dropdown are selected

    // opens and closes the dropdown
    const handleDropdown = () => {
        setOpenDropdown(!openDropdown);
    }

    //handles and updates the list of selected options
    const selectOption = ( option ) => {
        if ( multiSelect ) {
            if (selected.includes(option)){ 
                setSelected(prev => prev.filter(o => o !== option));
            }
            else if (selected.length + 1 === options.length) {
                setSelected(options);
            }
            else {
                setSelected(prev => [...prev, option]);
            }
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
            <div className='label'>{selected.length > 0 && label}</div>

            {/* SINGLE SELECT DROPDOWN */}
            { !multiSelect && 
                <button className={`button-dropdown ${openDropdown && 'active'}`} onClick={handleDropdown}>
                    <span className='button-dropdown-text'>
                        { selected.length === 0 ? label : selected[0].value }
                    </span>
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
            { multiSelect && <button className={`button-dropdown ${openDropdown && 'active'}`} onClick={handleDropdown}>
                <span className='button-dropdown-text'>
                    { selected.length < 1 ? label : selected.map((option) => (option.value)).join(", ")}
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
                    height={options.length > 10 ? 200 : options.length*30}
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
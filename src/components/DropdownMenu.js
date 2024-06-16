import React, { useState } from 'react';
import './DropdownMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';


const Option = ({option, isChecked, handleChange}) => {
    return (
        <div className='option'>
            <input type="checkbox" checked={isChecked} onChange={handleChange}></input>
            <div>{option.value}</div>
        </div>
    );
}

//options prop takes in a list of objects with the format {id: ___ , value: ___} assuming that the list of data is fetched from a database
//if the list data was locally generated, I would have made the options prop a list and generate keys using crypto.randomUUID()
const DropdownMenu = ({multiSelect = false, options, placeholder = "Select value:"}) => {
    const [openDropdown, setOpenDropdown] = useState(false);
    const [selected, setSelected] = useState([]); //single select state

    //opens and closes the dropdown
    const handleClick = () => {
        setOpenDropdown(!openDropdown);
    }

    //updates the list of selected options
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

    const handleSelectAll = () => {
        selected === options ? setSelected([]) : setSelected(options);
    }

    return (
        <div className='dropdown-container'>
            <div className='dropdown-label'>{selected.length > 0 && placeholder}</div>

            {/* SINGLE SELECT DROPDOWN */}
            { !multiSelect && 
                <button className='button-dropdown' onClick={handleClick}>
                    { selected.length === 0 ? placeholder : selected[0].value }
                    <FontAwesomeIcon icon={ openDropdown ? faChevronUp : faChevronDown}/>
                </button>
            }
            {openDropdown && !multiSelect && <div className='options-list'>
                {options.map((option) => (
                    <Option key={option.id} 
                        option={option} 
                        isChecked={selected[0] === option} 
                        handleChange={() => selectOption(option)} 
                    />
                ))}
            </div>}

            {/* MULTI SELECT DROPDOWN */}
            { multiSelect && <button className='button-dropdown' onClick={handleClick}>
                <span className='selected-list-text'>
                    { selected.length < 1 ? placeholder : selected.map((option) => (option.value)).join(", ")}
                </span>
                <FontAwesomeIcon icon={ openDropdown ? faChevronUp : faChevronDown}/>
            </button>}
            {openDropdown && multiSelect && <div className='options-list'>

                {/* SELECT ALL OPTION */}
                <div key="all" className='option'>
                    <input type="checkbox" value="Select All" checked={selected === options} onChange={handleSelectAll}></input>
                    <div>Select All</div>
                </div>
                {options.map((option) => (
                    <Option key={option.id} 
                        option={option} 
                        isChecked={selected.includes(option)} 
                        handleChange={() => selectOption(option)} 
                    />
                ))}
            </div>}
        </div>
    );
}

export default DropdownMenu;
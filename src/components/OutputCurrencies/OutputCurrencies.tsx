import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';

import { ISymbolsResponse } from '../../App';
import { ChevronIcon } from '../icons/ChevronIcon';

import './OutputCurrencies.scss';


interface IOutputCurrenciesProps {
    outputCurrencies: string[];
    setOutputCurrencies: React.Dispatch<React.SetStateAction<string[]>>;
    availableSymbols: ISymbolsResponse[];
}

const OutputCurrencies: React.FC<IOutputCurrenciesProps> = ({
        outputCurrencies,
        setOutputCurrencies,
        availableSymbols
    }) => {
    
    const [isOpened, setIsOpened] = useState(false);

    const outputCurrenciesRef =  useRef<HTMLDivElement>(null);
    
    /**
     * Handling Checking Output Currencies
     * 
     * @param code 
     */
    const handleOnCheckOutputCurrencies = (code: string) => {

        // Cloning the output currencies array
        const sel = Array.from(outputCurrencies);
        // Finding out if code is already exists or we should push it in
        const find = sel.indexOf(code);
        if (find > -1) {
            sel.splice(find, 1);
        } else {
            sel.push(code);
        }
        // Setting the new selections
        setOutputCurrencies(sel);
    }
    

    /**
     * Handle Closing Output Currencies Dropdown on clicking outside
     */
     useEffect(() => {
        function handleClickOutside(e: any) {
          if (outputCurrenciesRef.current  && !outputCurrenciesRef?.current?.contains(e.target)) {
            setIsOpened(false);
          }
        }
        // Bind the event listener
        document.addEventListener("click", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("click", handleClickOutside);
        };
    }, [outputCurrenciesRef]);
    
    return (
        <div ref={outputCurrenciesRef} className="outputCurrencies">
            <div className={
                clsx(
                    "dropdown-toggler", {
                        active: isOpened
                    })
                } onClick={() => setIsOpened(prevState => !prevState)}>
                <label>Output Currencies <ChevronIcon /></label>
            </div>
            <div className={
                clsx(
                    "dropdown-menu", {
                        active: isOpened
                    })
                }>
                <ul>
                {
                    availableSymbols.map( ( { name, code }, index ) => (
                    <li key={index}>
                        <input
                        type="checkbox"
                        id={`output-currency-${index}`}
                        checked={ outputCurrencies.includes(code) }
                        onChange={ () => handleOnCheckOutputCurrencies(code) }
                        />
                        <label htmlFor={`output-currency-${index}`}>({code}) {name}</label>
                    </li>
                    ))
                }
                </ul>
            </div>
        </div>
    )
}

export default OutputCurrencies

import React from 'react';

import { ISymbolsResponse } from '../../App';

import './BaseCurrencySelect.scss';


interface IBaseCurrencySelectProps {
    baseCurrency: string;
    setBaseCurrency: React.Dispatch<React.SetStateAction<string>>;
    availableSymbols: ISymbolsResponse[];
}

const BaseCurrencySelect: React.FC<IBaseCurrencySelectProps> = ({
    baseCurrency,
    setBaseCurrency,
    availableSymbols
    }) => {
    
    return (
        <div className="baseCurrency">
            <label>Base Currency</label>
            <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.currentTarget.value)}>
            {
                availableSymbols.map(({name, code}, index) => (
                <option key={index} value={code}>{name} ( {code} )</option>
                ))
            }
            </select>
        </div>
    )
}

export default BaseCurrencySelect

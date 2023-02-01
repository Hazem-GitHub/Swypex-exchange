import React from 'react';

import dayjs from 'dayjs';

import clsx from 'clsx';

import { IExchangeRatesResponse } from '../../App';

import { LoaderIcon } from '../icons/LoaderIcon';

import './ExchangeRatesResults.scss';


interface IExchangeRatesProps {
    exchangeRatesData: IExchangeRatesResponse[];
    baseCurrency: string;
    outputCurrencies: string[];
    isLoadingRatesState: boolean;
}

const ExchangeRatesResults:React.FC<IExchangeRatesProps> = ({
        exchangeRatesData,
        baseCurrency,
        outputCurrencies,
        isLoadingRatesState
    }) => {
    
    return (
        <>
            {/* Selected Values */}
            <div className="exchangeRates-selectedValues__container">

                {/* Selected Base Currency */}
                <div className="exchangeRates-baseCurrency">
                    <label>Base Currency</label>
                    <p>{baseCurrency}</p>
                </div>

                {/* Selected Output Currencies */}
                <div className="exchangeRates-outputCurrencies">
                    <label>Output Currencies</label>
                    <p>{outputCurrencies.join(', ')}</p>
                </div>

            </div>
            <div className="exchangeRates">
                {/* Data Loading Indicator */}
                <div className={
                    clsx(
                        "exchangeRates-dataLoader", {
                            active: isLoadingRatesState
                        }
                    )}>
                    <LoaderIcon />
                </div>
                
                {/* Exchange Rates Results Table */}
                <table className="exchangeRates-table">
                    <thead>
                    <tr>
                        <th scope='col'>DATE</th>
                        {
                            outputCurrencies.map((currency, index) => (
                                <th key={currency+'_header_'+index}>{currency}</th>
                            ))    
                        }  
                    </tr>
                    </thead>
                    <tbody>
                    {
                        exchangeRatesData.map((exchangeRate, index) => (
                        <tr key={ index }>
                            <th scope="row">
                                { dayjs(exchangeRate.date).format("MMMM DD, YYYY").toString() }
                            </th>
                            {
                                outputCurrencies.map((currency, index) => (
                                    <td key={ currency + '_rate_' + index }>
                                        { exchangeRate.currencies[currency] || '-' }
                                    </td>
                                ))    
                            }    
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ExchangeRatesResults

import React, { useEffect, useState } from 'react';

import { Dayjs } from 'dayjs';

import DateRangePicker from './components/DateRangePicker/DateRangePicker';

import swypexLogo from './swypex-logo.png';

import './App.scss';
import axios from 'axios';
import clsx from 'clsx';
import { ErrorIcon } from './components/icons/ErrorIcon';
import ExchangeRatesResults from './components/ExchangeRatesResults/ExchangeRatesResults';
import { useMemo } from 'react';
import { useCallback } from 'react';
import BaseCurrencySelect from './components/BaseCurrencySelect/BaseCurrencySelect';
import OutputCurrencies from './components/OutputCurrencies/OutputCurrencies';

// API URL
const API_BASE_URL = `https://api.exchangerate.host`;

interface IAppProps { }


export interface IExchangeRatesResponse {
  date: string;
  currencies: any;
}

export interface ISymbolsResponse {
  name: string;
  code: string;
}

const App: React.FC<IAppProps> = () => {

  // Default Values
  const defaultBaseCurrency = 'EUR';
  const defaultOutputCurrencies = useMemo(() => ['EGP', 'CAD'], []);

  // Date Range Picker
  const [startDate, setStartDate] = useState<Dayjs | any>('Start Date');
  const [endDate, setEndDate] = useState<Dayjs | any>('End Date');
  
  // Currencies Available
  const [availableSymbols, setAvailableSymbols] = useState<ISymbolsResponse[]>([]);
  
  // Base Currency
  const [baseCurrency, setBaseCurrency] = useState<string>(defaultBaseCurrency);

  // Output Currencies
  const [outputCurrencies, setOutputCurrencies] = useState<string[]>(defaultOutputCurrencies);
  
  
  // Exchange rates
  const [exchangeRatesState, setExchangeRatesState] = useState<IExchangeRatesResponse[]>([]);

  // Loading State
  const [isLoadingRatesState, setIsLoadingRatesState] = useState(false);

  // Errors
  const [errorState, setErrorState] = useState<string>('');
  const [isShowError, setIsShowError] = useState<boolean>(false);


  /**
   * Fetching currencies list initially
   */
  useEffect(() => {
    // Constructing the TIME SERIES ENDPOINT to fetch the data
    const SYMBOLS_ENDPOINT = `${API_BASE_URL}/symbols`;

    // Fetching the data
    axios.get(SYMBOLS_ENDPOINT).then(response => {
      const responseData = response.data.symbols;
      // Preparing symbols Data Array
      const symbolsData: ISymbolsResponse[] = [];
      // Constructing Symbols Data Array
      for(const key in responseData) {
        symbolsData.push({ name: responseData[key].description, code: responseData[key].code });
      }
      // Updating the state for rendering
      setAvailableSymbols(symbolsData);
    }).catch(function (error) {
      // Handling Error if there is any error
      setErrorState(error.message);
      setIsShowError(true);
    });
  }, []);


  /**
   * Fetching exchange rates on changing Date Ranges
   */
  useEffect(() => {
    // Type Checking
    if ( typeof (startDate) !== 'string' && typeof (endDate) !== 'string' ) {
      // Check if Start & End Dates are valid
      if (startDate.isValid() && endDate.isValid()) {

        // Show Loader
        setIsLoadingRatesState(true);

        // keeping it clean a little bit
        const selectedBaseCurrency = baseCurrency;
        const selectedOutputCurrencies = outputCurrencies.join(',');
        const selectedStartDate = startDate.format('YYYY-MM-DD').toString();
        const selectedEndDate = endDate.format('YYYY-MM-DD').toString();

        // Constructing the TIME SERIES ENDPOINT to fetch the data
        const TIMESERIES_ENDPOINT = `${API_BASE_URL}/timeseries?start_date=${selectedStartDate}&end_date=${selectedEndDate}&base=${selectedBaseCurrency}&symbols=${selectedOutputCurrencies}&places=2`;

        // Fetching the data
        axios.get(TIMESERIES_ENDPOINT).then(response => {
          const responseData = response.data.rates;
          // Preparing Rates Data Array
          const ratesData: IExchangeRatesResponse[] = [];
          // Mapping Rates Data Array
          for (const key in responseData) {
            ratesData.push({ date: key, currencies: responseData[key] });
          }

          // Updating the state for rendering
          setExchangeRatesState(ratesData);

          // Hide Loader
          setIsLoadingRatesState(false);

        }).catch(function (error) {
          // Handling Error if there is any error
          setErrorState(error.message);
          setIsShowError(true);

          // Hide Loader
          setIsLoadingRatesState(false);

        });
      }
    }
  }, [startDate, endDate, baseCurrency, outputCurrencies])


  // Error message notification
  useEffect(() => {
    if (errorState) {
      setTimeout(() => {
        setIsShowError(false);
        setTimeout(() => {
          setErrorState('');
        }, 300);
      }, errorState.length * 500);
    }
  }, [errorState])

  

  return (
    <div className="App">

      {/* App Header */}
      <header className={"App-header"}>
        <div className={"contents"}>
          {/* Logo */}
          <div className={"App-header__logo"}>
            <img src={ swypexLogo } loading="lazy" alt="Swypex" title="Swypex | Currency Exchange Rates" />
          </div>
          {/* Title */}
          <h1>Currency Exchange Rates</h1>
        </div>
        
      </header>

      <div className="currencyOptions">
        {/* Base Currency */}
        <BaseCurrencySelect
          baseCurrency={baseCurrency}
          setBaseCurrency={setBaseCurrency}
          availableSymbols={availableSymbols} />

        {/* Output Currencies */}
        <OutputCurrencies
          outputCurrencies={outputCurrencies}
          setOutputCurrencies={setOutputCurrencies}
          availableSymbols={availableSymbols} />
      </div>

      {/* Date Range Picker */}
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      
      {/* Results */}
      {
        exchangeRatesState.length > 0 &&
        <ExchangeRatesResults
          exchangeRatesData={exchangeRatesState}
          baseCurrency={baseCurrency}
          outputCurrencies={outputCurrencies}
          isLoadingRatesState={isLoadingRatesState}
        />
      }

      {/* Error Alert */}
      <div className={
        clsx("error-message",
          {
            active: isShowError && errorState
          }
        )}>
          <p><ErrorIcon /> { errorState }</p>
      </div>
    </div>
  );
}

export default App;

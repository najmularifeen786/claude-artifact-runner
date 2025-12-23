import { useState } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay('0.');
      setNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleOperation = (op) => {
    const current = parseFloat(display);
    
    if (prevValue === null) {
      setPrevValue(current);
    } else if (operation) {
      const result = calculate(prevValue, current, operation);
      setDisplay(String(result));
      setPrevValue(result);
    }
    
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return b !== 0 ? a / b : 'Error';
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && prevValue !== null) {
      const current = parseFloat(display);
      const result = calculate(prevValue, current, operation);
      setDisplay(String(result));
      setPrevValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setNewNumber(true);
    }
  };

  const handlePercentage = () => {
    const current = parseFloat(display);
    setDisplay(String(current / 100));
    setNewNumber(true);
  };

  const handleToggleSign = () => {
    const current = parseFloat(display);
    setDisplay(String(current * -1));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="bg-gray-800 p-6 rounded-2xl shadow-2xl w-80">
        <div className="bg-gray-900 p-4 rounded-xl mb-4 text-right">
          <div className="text-gray-500 text-sm h-6">
            {prevValue !== null && operation ? `${prevValue} ${operation}` : ''}
          </div>
          <div className="text-white text-4xl font-light overflow-hidden">
            {display}
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-3">
          <button onClick={handleClear} className="bg-gray-600 hover:bg-gray-500 text-white rounded-xl p-4 text-xl font-semibold transition">
            C
          </button>
          <button onClick={handleToggleSign} className="bg-gray-600 hover:bg-gray-500 text-white rounded-xl p-4 text-xl font-semibold transition">
            +/-
          </button>
          <button onClick={handlePercentage} className="bg-gray-600 hover:bg-gray-500 text-white rounded-xl p-4 text-xl font-semibold transition">
            %
          </button>
          <button onClick={() => handleOperation('÷')} className="bg-orange-500 hover:bg-orange-400 text-white rounded-xl p-4 text-xl font-semibold transition">
            ÷
          </button>

          <button onClick={() => handleNumber('7')} className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl p-4 text-xl font-semibold transition">
            7
          </button>
          <button onClick={() => handleNumber('8')} className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl p-4 text-xl font-semibold transition">
            8
          </button>
          <button onClick={() => handleNumber('9')} className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl p-4 text-xl font-semibold transition">
            9
          </button>
          <button onClick={() => handleOperation('×')} className="bg-orange-500 hover:bg-orange-400 text-white rounded-xl p-4 text-xl font-semibold transition">
            ×
          </button>

          <button onClick={() => handleNumber('4')} className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl p-4 text-xl font-semibold transition">
            4
          </button>
          <button onClick={() => handleNumber('5')} className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl p-4 text-xl font-semibold transition">
            5
          </button>
          <button onClick={() => handleNumber('6')} className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl p-4 text-xl font-semibold transition">
            6
          </button>
          <button onClick={() => handleOperation('-')} className="bg-orange-500 hover:bg-orange-400 text-white rounded-xl p-4 text-xl font-semibold transition">
            -
          </button>

          <button onClick={() => handleNumber('1')} className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl p-4 text-xl font-semibold transition">
            1
          </button>
          <button onClick={() => handleNumber('2')} className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl p-4 text-xl font-semibold transition">
            2
          </button>
          <button onClick={() => handleNumber('3')} className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl p-4 text-xl font-semibold transition">
            3
          </button>
          <button onClick={() => handleOperation('+')} className="bg-orange-500 hover:bg-orange-400 text-white rounded-xl p-4 text-xl font-semibold transition">
            +
          </button>

          <button onClick={() => handleNumber('0')} className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white rounded-xl p-4 text-xl font-semibold transition">
            0
          </button>
          <button onClick={handleDecimal} className="bg-gray-700 hover:bg-gray-600 text-white rounded-xl p-4 text-xl font-semibold transition">
            .
          </button>
          <button onClick={handleEquals} className="bg-orange-500 hover:bg-orange-400 text-white rounded-xl p-4 text-xl font-semibold transition">
            =
          </button>
        </div>
      </div>
    </div>
  );
}
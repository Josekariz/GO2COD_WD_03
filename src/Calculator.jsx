import React, { useState, useEffect } from 'react';

const Calculator = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState('');

    // Handle keyboard input
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.key >= '0' && e.key <= '9') || ['+', '-', '*', '/'].includes(e.key)) {
                setInput((prev) => prev + e.key);
            } else if (e.key === 'Enter') {
                calculateResult();
            } else if (e.key === 'Backspace') {
                setInput((prev) => prev.slice(0, -1));
            } else if (e.key === 'Escape') {
                clearInput();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Calculate result
    const calculateResult = () => {
        try {
            setResult(eval(input).toString());
        } catch {
            setResult('Error');
        }
    };

    // Clear input and result
    const clearInput = () => {
        setInput('');
        setResult('');
    };

    // Handle button clicks
    const handleInput = (value) => {
        if (value === '=') {
            calculateResult();
        } else if (value === 'C') {
            clearInput();
        } else {
            setInput((prev) => prev + value);
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen flex justify-center items-center p-4">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
                <div className="bg-gray-900 text-cyan-400 font-mono text-3xl p-4 mb-4 text-right overflow-x-auto">
                    {input || '0'}
                </div>
                <div className="text-orange-500 text-right p-4">{result}</div>
                <div className="grid grid-cols-4 gap-2 text-gray-200">
                    <Button onClick={() => handleInput('7')}>7</Button>
                    <Button onClick={() => handleInput('8')}>8</Button>
                    <Button onClick={() => handleInput('9')}>9</Button>
                    <Button onClick={clearInput}>C</Button>
                    <Button onClick={() => handleInput('4')}>4</Button>
                    <Button onClick={() => handleInput('5')}>5</Button>
                    <Button onClick={() => handleInput('6')}>6</Button>
                    <Button onClick={() => handleInput('/')}>
                        /
                    </Button>
                    <Button onClick={() => handleInput('1')}>1</Button>
                    <Button onClick={() => handleInput('2')}>2</Button>
                    <Button onClick={() => handleInput('3')}>3</Button>
                    <Button onClick={() => handleInput('*')}>
                        *
                    </Button>
                    <Button onClick={() => handleInput('0')}>0</Button>
                    <Button onClick={() => handleInput('.')}>.</Button>
                    <Button onClick={() => handleInput('-')}>
                        -
                    </Button>
                    <Button onClick={() => handleInput('+')}>
                        +
                    </Button>
                    <Button className="col-span-4" onClick={() => handleInput('=')}>
                        =
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Button component
const Button = ({ onClick, children, className = '' }) => (
    <button
        onClick={onClick}
        className={`bg-gray-700 hover:bg-cyan-400 text-gray-200 p-4 rounded focus:outline-none transition-colors duration-200 ${className}`}
    >
        {children}
    </button>
);

export default Calculator;
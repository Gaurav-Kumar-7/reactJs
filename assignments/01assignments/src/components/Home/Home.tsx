import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { InputValueProvider } from "../contexts/inputValue";
import { useState } from "react";
function Home() {
    const [value, setValue] = useState("");
    const [upperCaseVal, setupperCaseVal] = useState("");
    const [lowerCaseVal, setlowerCaseVal] = useState("");
    const [error, setError] = useState(false);
    const [startIndex, setStartIndex] = useState('');
    const [endIndex, setEndIndex] = useState('');
    const [substring, setSubstring] = useState('');
    const [isPalindrome, setIsPalindrome] = useState(false);
    

    const reverseVal = (event: any) => {
        setValue(event.target.value);
        setError(false);
    }

    const handleSubmit = () => {
        if (value.trim() === "") {
            setError(true);
        } else {
            const trimmedValue = value.replace(/\s/g, '');
            const reversedStr = trimmedValue.split('').reverse().join('');
            setValue(reversedStr);
            if(value===reversedStr){ 
                setIsPalindrome(true)
            } else {
                setIsPalindrome(false)
            }
        }
    }

    const handleUpperCase = () => {
        if (value === "") {
            setError(true);
        } else {
            let enteredValue = value
            setValue(enteredValue.toUpperCase());
        }
    }

    const handleLowerCase = () => {
        if (value === "") {
            setError(true);
        } else {
            let enteredValue = value
            setValue(enteredValue.toLowerCase());
        }
    }

    const handleStartIndex = (evt:any) => {
        let valLength = Number(value.length)
        let startIndexLen = Number(evt.target.value)
        if(startIndexLen <= valLength) {
            setError(false);
            setStartIndex(evt.target.value);
        } else {
            setError(true)
        }
    }

    const handleEndIndex = (evt:any) => {
        let valLength = Number(value.length)
        let endIndexLen = Number(evt.target.value)
        if(endIndexLen < valLength) {
            setError(false);
            setEndIndex(evt.target.value);
        } else {
            setError(true)
        }
    }

    const handleExtractSubstring = () => {
        if (value === '' || startIndex === '' || endIndex === '') {
            setError(true);
        } else {
            const start = parseInt(startIndex);
            const end = parseInt(endIndex);
            if (!isNaN(start) && !isNaN(end) && start >= 0 && end >= 0 && end >= start && end <= value.length) {
                setSubstring(value.substring(start, end));
            } else {
                setError(true);
            }
        }
    };

  return (
    <InputValueProvider value={{value, reverseVal}}>
      <div style={{ minHeight: "calc(100vh - 130px)", padding: "30px" }}>
        <TextField id="outlined-basic" label="Enter Value" variant="outlined" 
        value={value} 
        onChange={reverseVal} 
        error={error}
        helperText={error ? "Value is required" : ""} 
        required
         />
         <p>Entered value: {value} and its length is {value.length}</p>
         <p>{isPalindrome ? 'Entered string is a palindrome' : 'Entered string is not a palindrome'}</p>
        <Button style={{ margin: "10px", marginLeft: "0px" }} variant="contained" 
        onClick={handleSubmit}
        >
          Reverse
        </Button>
        <Button style={{ margin: "10px" }} variant="contained" 
        onClick={handleUpperCase}
        >
          UpperCase
        </Button>
        <Button style={{ margin: "10px" }} variant="contained" 
        onClick={handleLowerCase}
        >
          LowerCase
        </Button>
        <div style={{ marginTop: '20px' }}>
                    <TextField
                        label="Start Index"
                        variant="outlined"
                        value={startIndex}
                        onChange={handleStartIndex}
                        type="number"
                        style={{ marginRight: '10px' }} 
                        disabled={value.length === 0}
                    />
                    <TextField
                        label="End Index"
                        variant="outlined"
                        value={endIndex}
                        onChange={handleEndIndex}
                        type="number"
                        style={{ marginRight: '10px' }}
                        disabled={value.length === 0}
                    />
                    <Button style={{marginTop: "20px"}} variant="contained" onClick={handleExtractSubstring}>
                        Extract Substring
                    </Button>
                </div>

                {substring && (
                    <p>
                        Extracted Substring: {substring}
                    </p>
                )}
      </div>

    </InputValueProvider>
  );
}
export default Home;

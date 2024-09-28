import { useState } from "react";

interface Props {
  onChange: (text: string) => void;
}

const SearchBox = ({ onChange }: Props) => {
  const [inputText, setInputText] = useState('');  // Manage inputText state

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a movie!"
        className="input"
        value={inputText}  // Bind the state to the input value
        onChange={(e) => setInputText(e.target.value)}  // Update inputText on each change
        onKeyDown={(e) => {
          if (e.key === 'Enter' && inputText) {  // Use the updated state when Enter is pressed
            onChange(inputText);
          }
        }}
      />
    </div>
  );
};

export default SearchBox;

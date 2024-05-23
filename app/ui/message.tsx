import { Entity } from "../lib/definitions";
import Image from "next/image";
import { useEffect, useRef } from 'react'; // Import useEffect and useRef

interface MessageProps {
    text : string;
}

export default function Message({text} : MessageProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Create a ref for the textarea

  useEffect(() => {
    if (textareaRef.current) { // Check if textareaRef.current is not null
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight; // Scroll to the bottom
    }
  }, [text]); // Add text as a dependency
  

  return (
    <div className="flex flex-col items-center">
        <textarea ref={textareaRef} className="w-full p-3 text-md text-gray-700 placeholder-gray-600 border-2 border-gray-300 rounded-md" 
            style={{border: '2px solid black', outline: '2px solid black'}}
            rows={4} 
            readOnly
            disabled
            value={text}>
        </textarea>
    </div>
  )
}

import { useEffect, useRef } from 'react';

interface MessageProps {
  text: string;
}

export default function Message({ text }: MessageProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [text]);

  return (
    <div className="flex flex-col items-center h-full">
      <textarea
        ref={textareaRef}
        className="w-full h-full p-2 sm:p-3 text-xs sm:text-sm md:text-base text-gray-700 placeholder-gray-600 border-2 border-gray-300 rounded-md"
        style={{ border: '2px solid black', outline: '2px solid black' }}
        rows={4}
        readOnly
        disabled
        value={text}
      />
    </div>
  );
}

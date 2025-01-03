import { useRef, useState } from 'react';
import './App.css'

function App() {
  const inputRef = useRef<HTMLDivElement>(null);
  const [response, setResponse] = useState<string>('');
  const groqApiKey = "";
  const modelId = "llama-3.3-70b-versatile";
  const url = "https://api.groq.com/openai/v1/chat/completions";

  const onClick = async () => {
    if(inputRef !== null && inputRef.current !== null) {
      const content = inputRef.current.innerHTML;
      setResponse("Thinking ...");
      const body = {
        model: modelId,
        messages: [
          {
            role: "system",
            content: "You are an intuitive and intelligent AI assistant."
          },
          {
            role: "user",
            content: "```plaintext\n" + content + "\n```\n" + "I have a client who likes to to ramble and tends to sometimes go offtopic on his rants. Above plaintext segment is a message i received from him. I would like you to summarise his rant and give me actionable bulletpoints if they exist so i am able to quickly understand what he is trying to say."
          }
        ]
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqApiKey}`
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      const output = data.choices[0].message.content;
      setResponse(output);
    }
  }

  return (
    <div className="page">
      <h1>TLDR</h1>
      <div className='app'>
        <div className='input' ref={inputRef} contentEditable>
          Replace your content here
        </div>
        <div className='btn-main' onClick={onClick}>
          TLDR It
        </div>
        <pre className='output'>{response}</pre>
      </div>
    </div>
  )
}

export default App

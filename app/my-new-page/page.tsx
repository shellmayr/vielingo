'use client' // Required for onClick event handlers

// This component will intentionally throw a fun runtime error
export default function FunErrorPage() {
  const makeComputerYell = () => {
    // This will throw "TypeError: document.yell is not a function"
    // It's a bit fun because it sounds like you're asking the document to yell.
    (document as any).yell("I'm a computer and I'm mad as hell!"); 
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', textAlign: 'center' }}>
      <h1>🤯 Oops! Page 🤯</h1>
      <p>This page has a tiny, mischievous bug.</p>
      <p>Click the button below to see if you can find it (spoiler: you will).</p>
      <button 
        onClick={makeComputerYell}
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px', 
          color: 'white', 
          backgroundColor: '#ff6347', /* Tomato color */
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer' 
        }}
      >
        Don't Click Me!
      </button>
      <p style={{ marginTop: '20px', fontSize: '12px', color: '#777' }}>
        (Seriously, it's designed to break... for science!)
      </p>
    </div>
  );
} 
  // src/components/QueryInput.js
  import React, { useState } from 'react';
  import QueryResponse from './QueryResponse';

  const QueryInput = () => {
    const [query, setQuery] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch('http://localhost:5001/api/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });
        console.log(`front log: ${res}`);
        
        const data = await res.json();
        console.log(data);
        setResponse(data.response);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    return (
      <div className="query-input">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask a question..."
          />
          <button type="submit" disabled={!query.trim()}>Submit</button>
        </form>
        <pre>
          {response && <QueryResponse response={response} />}

        </pre>
      </div>
    );
  };

  export default QueryInput;


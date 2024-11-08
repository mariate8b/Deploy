// src/components/QueryResponse.js
import React from 'react';

const QueryResponse = ({ response }) => {
  return (
    <div className="query-response">
      <p><strong>Response:</strong> {response}</p>
    </div>
  );
};

export default QueryResponse;

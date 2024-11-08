// src/components/DroneDataTable.js
import React from 'react';

const DroneDataTable = ({ data }) => {
  return (
    <div className="drone-data-table">
      <table>
        <thead>
          <tr>
            <th>Image ID</th>
            <th>Timestamp</th>
            <th>Altitude (m)</th>
            <th>Battery Level (%)</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.image_id}>
              <td>{item.image_id}</td>
              <td>{item.timestamp}</td>
              <td>{item.altitude_m}</td>
              <td>{item.battery_level_pct}</td>
              <td>{item.image_tags.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DroneDataTable;

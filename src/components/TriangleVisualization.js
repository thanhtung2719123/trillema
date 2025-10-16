import React from 'react';
import './TriangleVisualization.css';

/**
 * Visual representation of the Impossible Trinity triangle
 */
const TriangleVisualization = ({ violatedConstraint, severity, language = 'vi' }) => {
  const labels = language === 'vi' 
    ? {
        mi: 'Độc Lập\nTiền Tệ',
        ers: 'Ổn Định\nTỷ Giá',
        kao: 'Tích Hợp\nTài Chính'
      }
    : {
        mi: 'Monetary\nIndependence',
        ers: 'Exchange Rate\nStability',
        kao: 'Financial\nIntegration'
      };

  const getNodeClass = (node) => {
    const base = 'triangle-node';
    if (violatedConstraint === node) {
      return `${base} violated ${severity}`;
    }
    return `${base} active`;
  };

  const getEdgeClass = (edge) => {
    const [node1, node2] = edge.split('-');
    if (violatedConstraint !== node1 && violatedConstraint !== node2 && violatedConstraint !== 'none') {
      return 'triangle-edge active';
    }
    return 'triangle-edge inactive';
  };

  return (
    <div className="triangle-container">
      <svg viewBox="0 0 400 350" className="triangle-svg">
        {/* Triangle edges */}
        <line 
          x1="200" y1="50" 
          x2="50" y2="300" 
          className={getEdgeClass('mi-ers')}
          strokeWidth="3"
        />
        <line 
          x1="200" y1="50" 
          x2="350" y2="300" 
          className={getEdgeClass('mi-kao')}
          strokeWidth="3"
        />
        <line 
          x1="50" y1="300" 
          x2="350" y2="300" 
          className={getEdgeClass('ers-kao')}
          strokeWidth="3"
        />

        {/* Nodes */}
        {/* MI - Top */}
        <g className={getNodeClass('mi')}>
          <circle cx="200" cy="50" r="40" className="node-circle" />
          <text x="200" y="45" className="node-label" textAnchor="middle">
            {labels.mi.split('\n')[0]}
          </text>
          <text x="200" y="60" className="node-label" textAnchor="middle">
            {labels.mi.split('\n')[1]}
          </text>
        </g>

        {/* ERS - Bottom Left */}
        <g className={getNodeClass('ers')}>
          <circle cx="50" cy="300" r="40" className="node-circle" />
          <text x="50" y="295" className="node-label" textAnchor="middle">
            {labels.ers.split('\n')[0]}
          </text>
          <text x="50" y="310" className="node-label" textAnchor="middle">
            {labels.ers.split('\n')[1]}
          </text>
        </g>

        {/* KAO - Bottom Right */}
        <g className={getNodeClass('kao')}>
          <circle cx="350" cy="300" r="40" className="node-circle" />
          <text x="350" y="295" className="node-label" textAnchor="middle">
            {labels.kao.split('\n')[0]}
          </text>
          <text x="350" y="310" className="node-label" textAnchor="middle">
            {labels.kao.split('\n')[1]}
          </text>
        </g>

        {/* Center warning icon if there's a violation */}
        {violatedConstraint !== 'none' && (
          <g className="warning-icon">
            <circle cx="200" cy="220" r="30" fill="#ff6b6b" opacity="0.2" />
            <text x="200" y="232" fontSize="40" textAnchor="middle" fill="#ff6b6b">⚠</text>
          </g>
        )}
      </svg>

      {/* Legend */}
      <div className="triangle-legend">
        <div className="legend-item">
          <div className="legend-color active"></div>
          <span>{language === 'vi' ? 'Đạt được' : 'Achieved'}</span>
        </div>
        <div className="legend-item">
          <div className="legend-color violated"></div>
          <span>{language === 'vi' ? 'Bị vi phạm' : 'Violated'}</span>
        </div>
      </div>
    </div>
  );
};

export default TriangleVisualization;



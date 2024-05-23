import React from 'react';

const DownArrow = () => (
    <div className="flex justify-center items-center h-full">
        <svg width="32" height="64" viewBox="0 0 24 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-down">
            <line x1="12" y1="5" x2="12" y2="43"></line>
            <polyline points="19 36 12 43 5 36"></polyline>
        </svg>
    </div>
);

export default DownArrow;

import React from 'react';

const RightArrow = () => (
    <div className="flex justify-center items-center h-full">
        <svg width="64" height="32" viewBox="0 0 48 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right">
            <line x1="5" y1="12" x2="43" y2="12"></line>
            <polyline points="36 19 43 12 36 5"></polyline>
        </svg>
    </div>
);

export default RightArrow;
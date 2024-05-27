import React, { useState, useEffect } from 'react';
import { Turn } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { Underdog } from 'next/font/google';

interface RollTableProps {
    turn: Turn;
    triggerFunction: Function;
    setSelfOverlay: Function;
    setOtherOverlay: Function;
    isLast : boolean;
}

export default function RollTable({ turn, triggerFunction, setSelfOverlay, setOtherOverlay, isLast }: RollTableProps) {
  const [showMove, setShowMove] = useState(false);
  const [showLabel1, setShowLabel1] = useState(false);
  const [showLabel2, setShowLabel2] = useState(false);
  const [showLabel3, setShowLabel3] = useState(false);
  const [showLabel4, setShowLabel4] = useState(false);
  const [showField1, setShowField1] = useState(false);
  const [showField2, setShowField2] = useState(false);
  const [showField3, setShowField3] = useState(false);
  const [showField4, setShowField4] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [overlayContent, setOverlayContent] = useState('');

  const hasRoll = !!turn.roll;

  useEffect(() => {
    const interval = 60;
    let startTime = 300;

    if(hasRoll){
      const actions = [
        () => setShowMove(true),
        () => setShowLabel1(true),
        () => setShowLabel2(true),
        () => setShowLabel3(true),
        () => setShowLabel4(true),
        () => setShowField1(true),
        () => setShowField2(true),
        () => setShowField3(true),
        () => setShowField4(true),
        () => setShowResult(true),
        () => triggerOverlay(),
        () => triggerFunction(),
      ];
  
      const longIntervals = [5, 6, 7, 8, 9, 10, 11];
  
      actions.forEach((action, index) => {
          let timeout = startTime + interval * index;
          if (longIntervals.includes(index)) {
              let i = longIntervals.indexOf(index) + 1;
              timeout += interval * 4 * i;
              if(isLast && index === actions.length - 1){
                timeout += interval * 4;
              }
          }
          setTimeout(action, timeout);
      });
    }
    else{
      setTimeout(() => {setShowMove(true)}, startTime);
      setTimeout(() => {setShowResult(true)}, startTime + interval * 4);
      setTimeout(() => {triggerOverlay()}, startTime + interval * 8);
      const triggerTimeout = isLast ? startTime + interval * 16 : startTime + interval * 12;
      setTimeout(() => {triggerFunction()}, triggerTimeout);
    }
    
  }, [turn, triggerFunction, hasRoll]);

  function triggerOverlay() {
    if (turn.success != undefined) {
      if(turn.roll !== undefined){
        setOverlayContent(turn.success ? 'HIT' : 'MISS');
      }
      else {
        setOverlayContent(turn.success ? 'SUCCESS' : 'FAIL');
      }
      setOverlayVisible(true);
    }
    if(turn.effect){
      if(turn.target === 'SELF'){
        setSelfOverlay(turn.effect);
      }
      else{
        setOtherOverlay(turn.effect);
      }
    }
  };

  return (
      <div className="relative overflow-x-auto">
          {overlayVisible && (
              <div className={`absolute inset-0 flex justify-center items-center bg-opacity-50 transition-opacity duration-500 ${overlayVisible ? 'opacity-100' : 'opacity-0'}`}>
                  <div className={`text-2xl md:text-4xl font-bold ${turn.success ? 'text-green-500' : 'text-red-500'}`}>
                      {overlayContent}
                  </div>
              </div>
          )}
          <table className="table-auto w-full border-collapse border border-gray-200 bg-white">
              <tbody>
                  <tr className="bg-gray-200">
                      <td className="border border-white p-2 md:p-4 text-xs sm:text-sm md:text-base lg:text-lg" colSpan={2}>
                          <span className={showMove ? '' : 'invisible'}>
                              {turn.moveString}
                          </span>
                      </td>
                  </tr>
                  {hasRoll && (
                      <>
                          <tr className="bg-white">
                              <td className="border border-gray-200 p-2 md:p-4 text-xs sm:text-sm md:text-base lg:text-lg">
                                  <span className={showLabel1 ? '' : 'invisible'}>
                                      Min
                                  </span>
                              </td>
                              <td className="border border-gray-200 p-2 md:p-4 text-xs sm:text-sm md:text-base lg:text-lg">
                                  <span className={showField1 ? '' : 'invisible'}>
                                      {turn.minimum}
                                  </span>
                              </td>
                          </tr>
                          <tr className="bg-gray-200">
                              <td className="border border-white p-2 md:p-4 text-xs sm:text-sm md:text-base lg:text-lg">
                                  <span className={showLabel2 ? '' : 'invisible'}>
                                      Success Bonus
                                  </span>
                              </td>
                              <td className="border border-white p-2 md:p-4 text-xs sm:text-sm md:text-base lg:text-lg">
                                  <span className={showField2 ? '' : 'invisible'}>
                                      +{turn.bonus}
                                  </span>
                              </td>
                          </tr>
                          <tr className="bg-white">
                              <td className="border border-gray-200 p-2 md:p-4 text-xs sm:text-sm md:text-base lg:text-lg">
                                  <span className={showLabel3 ? '' : 'invisible'}>
                                      Roll
                                  </span>
                              </td>
                              <td className="border border-gray-200 p-2 md:p-4 text-xs sm:text-sm md:text-base lg:text-lg">
                                  <span className={showField3 ? '' : 'invisible'}>
                                      {turn.roll}
                                  </span>
                              </td>
                          </tr>
                          <tr className="bg-gray-200">
                              <td className="border border-white p-2 md:p-4 text-xs sm:text-sm md:text-base lg:text-lg">
                                  <span className={showLabel4 ? '' : 'invisible'}>
                                      Total
                                  </span>
                              </td>
                              <td className="border border-white p-2 md:p-4 text-xs sm:text-sm md:text-base lg:text-lg">
                                  <span className={showField4 ? '' : 'invisible'}>
                                      {turn.total}
                                  </span>
                              </td>
                          </tr>
                      </>
                  )}
                  <tr className="bg-white">
                      <td className="border border-gray-200 p-2 md:p-4 text-xs sm:text-sm md:text-base lg:text-lg" colSpan={2}>
                          <span className={showResult ? '' : 'invisible'}>
                              {turn.resultString}
                          </span>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
  );
}
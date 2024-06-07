import { useEffect, useRef, useState } from "react";
import { Player, Entity } from "../lib/definitions";
import Image from "next/image";

interface EntityStatsProps {
  entity: Entity;
  hideGPAP?: boolean;
}

export default function EntityStats({ entity, hideGPAP }: EntityStatsProps) {
  let defense = 10 + entity.spd + entity.armor;
  const [isTwoColumn, setIsTwoColumn] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);
  const isPlayer = (entity as Player).equipList !== undefined;

  const checkWidth = () => {
    if (gridRef.current) {
      const width = gridRef.current.offsetWidth;
      setIsTwoColumn(width < 170); // Adjust this value based on your requirements
    }
  };

  useEffect(() => {
    if(isPlayer){
      window.addEventListener('resize', checkWidth);
      checkWidth(); // Initial check

      return () => {
        window.removeEventListener('resize', checkWidth);
      };
    }
  }, []);


  return (
    <div className="flex flex-col w-full gap-2 border border-black rounded-lg p-2 items-center justify-center h-full">
      <div className="flex flex-col items-center justify-center">
        <Image
          src={entity.imgSrc}
          width={100}
          height={76}
          className="w-full h-auto min-w-[85px] max-w-[150px]"
          alt="Entity image"
        />
      </div>
      <div className="flex flex-col items-center justify-start gap-2 w-full flex-grow">
        <div className="flex flex-col w-full">
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold mb-1">
            {entity.name}
          </h1>
          <div className="text-base md:text-lg lg:text-xl mb-1">
            HP: {entity.currHP}/{entity.totalHP}
          </div>
          <div className={`text-base md:text-lg lg:text-xl mb-1 ${isPlayer ? '' : 'invisible'}`}>
            MP: {entity.currMP}/{entity.totalMP}
          </div>
        </div>
        <div className="flex flex-col flex-grow w-full justify-center">
          <div ref={gridRef} className={`grid gap-2 text-right ${isTwoColumn ? 'grid-cols-2' : 'grid-cols-4'}`}>
            <div className="lg:text-sm text-xs">DEF:</div>
            <div className="lg:text-sm text-xs text-left">{defense}</div>
            {isPlayer && (
              <>
                <div className="lg:text-sm text-xs">ARM:</div>
                <div className="lg:text-sm text-xs text-left">{entity.armor}</div>
                <div className="lg:text-sm text-xs">SPD:</div>
                <div className="lg:text-sm text-xs text-left">{entity.spd}</div>
                <div className="lg:text-sm text-xs">STR:</div>
                <div className="lg:text-sm text-xs text-left">{entity.str}</div>
              </>
            )}
          </div>
        </div>
        <div className="w-full">
          {isPlayer ? (
            <div className="flex flex-grow justify-between items-end">
              <div className="grid grid-cols-[auto_auto] grid-rows-[auto_auto] gap-2">
                {!hideGPAP && (
                  <>
                    <div className="lg:text-sm text-xs">GP:</div>
                    <div className="lg:text-sm text-xs">{entity.gp}</div>
                  </>
                )}
              </div>
              <div className="grid grid-cols-[auto_auto] grid-rows-[auto_auto] gap-2">
                {!hideGPAP && (
                  <>
                    <div className="lg:text-sm text-xs">AP:</div>
                    <div className="lg:text-sm text-xs">{(entity as Player).ap}</div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-grow items-end justify-center">
              <div className="grid grid-cols-[auto_auto] grid-rows-[auto_auto] gap-2">
                <div className="lg:text-sm text-xs">LVL:</div>
                <div className="lg:text-sm text-xs">{entity.level}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );  
}

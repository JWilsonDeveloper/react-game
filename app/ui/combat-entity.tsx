import { useEffect, useRef, useState } from "react";
import { Player, Entity } from "../lib/definitions";
import Image from "next/image";

interface CombatEntityProps {
  entity: Entity;
}

export default function CombatEntity({ entity }: CombatEntityProps) {
  //const [isStacked, setIsStacked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div
      ref={containerRef}
      className="flex-col w-full gap-2 border border-black rounded-lg p-2 h-full items-center justify-center grid-cols-1"
    >
      <div className="flex flex-col items-center justify-center">
        <Image
          src={entity.imgSrc}
          width={100}
          height={76}
          className="w-full h-auto max-w-[150px]" // Make the image responsive
          alt="Entity image"
        />
      </div>
    </div>
  );
}

import { useCallback, useState } from "react";
import { Player, Entity, Turn } from "@/app/lib/definitions";
import CombatEntity from "@/app/ui/combat-entity";
import MoveTable from "@/app/ui/roll-table";

interface CombatRoundProps {
  player: Player;
  enemy: Entity;
  playerTurn: Turn;
  enemyTurn: Turn;
  setShowOverlay: (show: boolean) => void;
}

export default function CombatRound({ player, enemy, playerTurn, enemyTurn, setShowOverlay }: CombatRoundProps) {
  const [showEnemyTable, setShowEnemyTable] = useState(false);
  const [playerOverlay1, setPlayerOverlay1] = useState('');
  const [enemyOverlay1, setEnemyOverlay1] = useState('');
  const [playerOverlay2, setPlayerOverlay2] = useState('');
  const [enemyOverlay2, setEnemyOverlay2] = useState('');

  const playerTrigger = useCallback(() => {
    if (enemyTurn.moveString === "") {
      setShowOverlay(false);
    } else {
      setShowEnemyTable(true);
    }
  }, [enemyTurn.moveString, setShowOverlay]);

  const enemyTrigger = useCallback(() => {
    setShowOverlay(false);
  }, [setShowOverlay]);

  return (
    <div className="grid gap-4 grid-cols-2 rounded-lg justify-center">
      <div className="relative">
        <div className="absolute inset-5 flex justify-between">
          {playerOverlay1 && (
            <span className={`flex items-center justify-center text-2xl md:text-4xl font-bold bg-white rounded-full ${parseInt(playerOverlay1) > 0 ? "text-green-500" : "text-red-500"} w-16 h-16 md:w-24 md:h-24`}>
              {playerOverlay1}
            </span>
          )}
          {playerOverlay2 && (
            <span className={`flex items-center justify-center text-2xl md:text-4xl font-bold bg-white rounded-full ${parseInt(playerOverlay2) > 0 ? "text-green-500" : "text-red-500"} w-16 h-16 md:w-24 md:h-24`}>
              {playerOverlay2}
            </span>
          )}
        </div>
        <div className="bg-white rounded-lg">
          <CombatEntity entity={player} />
        </div>
        <MoveTable turn={playerTurn} triggerFunction={playerTrigger} setSelfOverlay={setPlayerOverlay1} setOtherOverlay={setEnemyOverlay1} isLast={enemyTurn.moveString === ""} />
      </div>
      <div className="relative">
        <div className="absolute inset-5 flex justify-between">
          {enemyOverlay1 && (
            <span className={`flex items-center justify-center text-2xl md:text-4xl font-bold bg-white rounded-full ${parseInt(enemyOverlay1) > 0 ? "text-green-500" : "text-red-500"} w-16 h-16 md:w-24 md:h-24`}>
              {enemyOverlay1}
            </span>
          )}
          {enemyOverlay2 && (
            <span className={`flex items-center justify-center text-2xl md:text-4xl font-bold bg-white rounded-full ${parseInt(enemyOverlay2) > 0 ? "text-green-500" : "text-red-500"} w-16 h-16 md:w-24 md:h-24`}>
              {enemyOverlay2}
            </span>
          )}
        </div>
        <div className="bg-white rounded-lg">
          <CombatEntity entity={enemy} />
        </div>
        {showEnemyTable && enemyTurn.moveString !== "" && (
          <MoveTable turn={enemyTurn} triggerFunction={enemyTrigger} setSelfOverlay={setEnemyOverlay2} setOtherOverlay={setPlayerOverlay2} isLast={true} />
        )}
      </div>
    </div>
  );
}

import { useCallback, useState } from "react";
import { Player, Entity, Turn , Round} from "@/app/lib/definitions";
import CombatEntity from "@/app/ui/combat-entity";
import RollTable from "@/app/ui/roll-table";

interface CombatRoundProps {
  round : Round;
  setShowOverlay: (show: boolean) => void;
}

export default function CombatRound({ round, setShowOverlay }: CombatRoundProps) {
  const [showEnemyTable, setShowEnemyTable] = useState(false);
  const [playerOverlay1, setPlayerOverlay1] = useState('');
  const [enemyOverlay1, setEnemyOverlay1] = useState('');
  const [playerOverlay2, setPlayerOverlay2] = useState('');
  const [enemyOverlay2, setEnemyOverlay2] = useState('');
  const player = round.playerTurn.entity;
  const enemy = round.enemyTurn.entity;
  const playerTurn = round.playerTurn;
  const enemyTurn = round.enemyTurn;


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
            <span className={`flex items-center justify-center text-xl md:text-2xl font-bold bg-gray-200 rounded-full border border-black border-4 ${parseInt(playerOverlay1) > 0 ? "text-green-500" : "text-red-500"} w-8 h-8 md:w-12 md:h-12`}>
              {playerOverlay1}
            </span>
          )}
          {playerOverlay2 && (
            <span className={`flex items-center justify-center text-xl md:text-2xl font-bold bg-gray-200 rounded-full border border-black border-2 ${parseInt(playerOverlay2) > 0 ? "text-green-500" : "text-red-500"} w-8 h-8 md:w-12 md:h-12`}>
              {playerOverlay2}
            </span>
          )}
        </div>
        <div className="bg-white rounded-lg">
          <CombatEntity entity={player} />
        </div>
        <RollTable turn={playerTurn} triggerFunction={playerTrigger} setSelfOverlay={setPlayerOverlay1} setOtherOverlay={setEnemyOverlay1} isLast={enemyTurn.moveString === ""} />
      </div>
      <div className="relative">
        <div className="absolute inset-5 flex justify-between">
          {enemyOverlay1 && (
            <span className={`flex items-center justify-center text-xl md:text-2xl font-bold bg-gray-200 rounded-full border border-black border-2 ${parseInt(enemyOverlay1) > 0 ? "text-green-500" : "text-red-500"} w-8 h-8 md:w-12 md:h-12`}>
              {enemyOverlay1}
            </span>
          )}
          {enemyOverlay2 && (
            <span className={`flex items-center justify-center text-xl md:text-2xl font-bold bg-gray-200 rounded-full border border-black border-2 ${parseInt(enemyOverlay2) > 0 ? "text-green-500" : "text-red-500"} w-8 h-8 md:w-12 md:h-12`}>
              {enemyOverlay2}
            </span>
          )}
        </div>
        <div className="bg-white rounded-lg">
          <CombatEntity entity={enemy} />
        </div>
        {showEnemyTable && enemyTurn.moveString !== "" && (
          <RollTable turn={enemyTurn} triggerFunction={enemyTrigger} setSelfOverlay={setEnemyOverlay2} setOtherOverlay={setPlayerOverlay2} isLast={true} />
        )}
      </div>
    </div>
  );
}

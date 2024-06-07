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
  const [playerModifierOverlay1, setPlayerModifierOverlay1] = useState('');
  const [enemyModifierOverlay1, setEnemyModifierOverlay1] = useState('');
  const [playerModifierOverlay2, setPlayerModifierOverlay2] = useState('');
  const [enemyModifierOverlay2, setEnemyModifierOverlay2] = useState('');
  const [showClickText, setShowClickText] = useState(false);
  const player = round.playerTurn.entity;
  const enemy = round.enemyTurn.entity;
  const playerTurn = round.playerTurn;
  const enemyTurn = round.enemyTurn;

  function awaitForUserTap() {
    const handleGlobalClick = () => {
        document.removeEventListener('click', handleGlobalClick);
        setShowOverlay(false);
    };
    document.addEventListener('click', handleGlobalClick);
    setShowClickText(true);
}

  const playerTrigger = useCallback(() => {
    if (enemyTurn.moveString === "") {
      awaitForUserTap();
    } else {
      setShowEnemyTable(true);
    }
  }, [enemyTurn.moveString, setShowOverlay]);

  const enemyTrigger = useCallback(() => {
    awaitForUserTap();
  }, [setShowOverlay]);

  return (
    <div className="flex flex-col gap-4">
      <h1 className={"bg-white rounded-lg text-xl md:text-2xl"}>Combat Round</h1>
      <div className="grid gap-4 grid-cols-2 rounded-lg justify-center">
        <div className="relative">
          <div className="absolute inset-5 flex justify-between">
            {playerModifierOverlay1 && (
              <span className={`flex items-center justify-center text-lg md:text-xl font-bold bg-gray-200 rounded-full border border-black border-4 ${parseInt(playerModifierOverlay1) > 0 ? "text-green-500" : "text-red-500"} w-10 h-10 md:w-15 md:h-15`}>
                {playerModifierOverlay1}
              </span>
            )}
            {playerModifierOverlay2 && (
              <span className={`flex items-center justify-center text-lg md:text-xl font-bold bg-gray-200 rounded-full border border-black border-2 ${parseInt(playerModifierOverlay2) > 0 ? "text-green-500" : "text-red-500"} w-10 h-10 md:w-15 md:h-15`}>
                {playerModifierOverlay2}
              </span>
            )}
          </div>
          <div className="bg-white rounded-lg">
            <CombatEntity entity={player} />
          </div>
          <RollTable turn={playerTurn} triggerFunction={playerTrigger} setSelfOverlay={setPlayerModifierOverlay1} setOtherOverlay={setEnemyModifierOverlay1} isLast={enemyTurn.moveString === ""} start={true} />
        </div>
        <div className="relative">
          <div className="absolute inset-5 flex justify-between">
            {enemyModifierOverlay1 && (
              <span className={`flex items-center justify-center text-lg md:text-xl font-bold bg-gray-200 rounded-full border border-black border-2 ${parseInt(enemyModifierOverlay1) > 0 ? "text-green-500" : "text-red-500"} w-10 h-10 md:w-15 md:h-15`}>
                {enemyModifierOverlay1}
              </span>
            )}
            {enemyModifierOverlay2 && (
              <span className={`flex items-center justify-center text-lg md:text-xl font-bold bg-gray-200 rounded-full border border-black border-2 ${parseInt(enemyModifierOverlay2) > 0 ? "text-green-500" : "text-red-500"} w-10 h-10 md:w-15 md:h-15`}>
                {enemyModifierOverlay2}
              </span>
            )}
          </div>
          <div className="bg-white rounded-lg">
            <CombatEntity entity={enemy} />
          </div>
          <div className={showEnemyTable && enemyTurn.moveString ? "" : "invisible"}>
            <RollTable turn={enemyTurn} triggerFunction={enemyTrigger} setSelfOverlay={setEnemyModifierOverlay2} setOtherOverlay={setPlayerModifierOverlay2} isLast={true} start={showEnemyTable} />
          </div>
        </div>
      </div>
      <div className={`${showClickText ? "text-white": "invisible"}`}>
        Click or tap to continue
      </div>
    </div>
  );
}

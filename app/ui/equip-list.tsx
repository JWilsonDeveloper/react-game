import MoveButton from '@/app/ui/move-button';
import { Move, Player} from '../lib/definitions';
import Equip from '@/app/ui/equip';

interface EquipListProps {
    player: Player;
    actionSelected: Function;
    height? : string;
  }
  
  
  export default function EquipList({ player, actionSelected, height}: EquipListProps) {
    const h = height ? height : "h-full";

    return (
        <div className={h + " flex flex-col justify-between mt-4"}>
            {['Armor', 'Magic Item'].map((title, slot) => (
                <div key={slot} className="flex flex-col flex-grow items-center w-full">
                    <h1 className="text-sm font-bold justify-center" style={{ minWidth: '3rem', display: 'flex', alignItems: 'center' }}>{title}</h1>
                    <div className="flex flex-wrap justify-center">
                        {player.equipList
                            .filter(e => e.slot === slot) // Filter actions by slot
                            .map((e, index) => (
                                <Equip
                                    key={index}
                                    player={player}
                                    showCost={false}
                                    equipment={e}
                                    showContentBelow={true}
                                    equipClicked={() => {}}
                                />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
      
}

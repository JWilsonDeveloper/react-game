import MoveButton from '@/app/ui/move-button';
import ActionTable from '@/app/ui/action-table';
import ItemTable from '@/app/ui/item-table';
import { Move, Action, Player} from '../lib/definitions';

interface ActionListProps {
    player: Player;
    actionSelected: Function;
  }
  
  
  export default function ActionList({ player, actionSelected}: ActionListProps) {
    //const actions: Action[] = player.actionList.filter((action): action is Action => action.type === 'ACTION');

    function moveClicked(move : Move){
        actionSelected(move);
        if ('uses' in move && typeof move.uses === 'number' && move.uses > 0) {
            move.uses -= 1;
        }
    }

    return ( 
        <div>
            <div className="flex flex-col h-full gap-4">
                {['Melee', 'Ranged', 'Spell', 'Flee'].map((title, slot) => (
                    <div key={slot} className="grid grid-cols-3 gap-4 items-center w-full">
                            <h1 className="text-sm font-bold justify-end " style={{ minWidth: '3rem', display: 'flex', alignItems: 'center' }}>{title}</h1>
                        <div className="flex flex-wrap justify-center col-span-2">
                            {player.actionList
                                .filter(action => action.slot === slot) // Filter actions by slot
                                .map((action, index) => (
                                    <MoveButton
                                        key={index}
                                        move={action}
                                        moveClicked={moveClicked}
                                        player={player}
                                        showCost={false}
                                    />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    
}
import MoveButton from '@/app/ui/move-button';
import { Move, Player} from '../lib/definitions';
import ActionList from './action-list';
import ItemList from './item-list';

interface MoveListProps {
    player: Player;
    actionSelected: Function;
  }
  
  
  export default function MoveList({ player, actionSelected}: MoveListProps) {
    return (
        <div className="flex-grow grid grid-cols-1 gap-4">
            <div>
                <div className="border border-black rounded-lg p-2">
                    <h1 className="text-xl font-bold">Attacks</h1>
                    <ActionList player={player} actionSelected={actionSelected} />
                </div>
                <div className="border border-black rounded-lg p-2">
                    <h1 className="text-xl font-bold">Items</h1>
                    <ItemList player={player} actionSelected={actionSelected} />
                </div>
            </div>
        </div>
    );
}

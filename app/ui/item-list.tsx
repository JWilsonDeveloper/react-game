import MoveButton from '@/app/ui/move-button';
import { Move, Player} from '../lib/definitions';

interface ItemListProps {
    player: Player;
    actionSelected: Function;
    height? : string;
  }
  
  
  export default function ItemList({ player, actionSelected, height}: ItemListProps) {
    const h = height ? height : "h-full";

    function moveClicked(move : Move){
        actionSelected(move);
        if ('uses' in move && typeof move.uses === 'number' && move.uses > 0) {
            move.uses -= 1;
        }
    }


    return (
        <div className={h} style={{ overflowX: 'auto' }}>
            <div className="grid text-center h-full" style={{ minWidth: '100%' }}>
                {['HP Potion', 'MP Potion', 'Scroll'].map((title, slot) => (
                    <div key={slot} className="flex items-center gap-4">
                        <h1 className="text-sm font-bold max-w-[40px]">{title}</h1>
                        {player.itemList
                            .filter(item => item.title === title && item.uses > 0)
                            .map((item, index) => (
                            <MoveButton
                                key={index}
                                move={item}
                                moveClicked={moveClicked}
                                player={player}
                                showCost={false}
                                showContentBelow={true}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
      
}



import {Button} from '@/app/ui/button';
import { Move, Entity} from '../lib/definitions';

interface OptionsProps {
    entity: Entity;
    resolveChoice: Function;
  }
  
export default function Options({ entity, resolveChoice }: OptionsProps) {
    

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">Options</h1>
            <div className="grid grid-cols-2 gap-4">
                {entity.actionList.map((attack, index) => (
                    <Button key={index} onClick={() => resolveChoice(attack)}>
                        {"Hi"}
                    </Button>
                ))}
            </div>
        </div>
    )
}
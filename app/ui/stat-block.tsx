import { Entity } from "../lib/definitions";

interface StatBlockProps {
    entity: Entity;
  }
  
  export default function StatBlock({entity} : StatBlockProps) {
    let shownStats;
    if(entity.id !== 0){
        shownStats = 
        <div className="grid grid-cols-2 gap-4">
            <div className="p-2 border border-gray-200">Level: {entity.level}</div>
            <div className="p-2 border border-gray-200">HP: {entity.currHP}/{entity.totalHP}</div>
        </div>
    }
    else{
        shownStats = 
        <div className="grid grid-cols-2 gap-4">
            <div className="p-2 border border-gray-200">Level: {entity.level}</div>
            <div className="p-2 border border-gray-200">HP: {entity.currHP}/{entity.totalHP}</div>
            <div className="p-2 border border-gray-200">XP: {entity.xp}</div>
            <div className="p-2 border border-gray-200">MP: {entity.currMP}/{entity.totalMP}</div>
            <div className="p-2 border border-gray-200">Armor: {entity.armor}</div>
            <div className="p-2 border border-gray-200">Speed: {entity.speed}</div>
        </div>
    }

    return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">{entity.name}</h1>
        {shownStats}
      </div>
    )
  }
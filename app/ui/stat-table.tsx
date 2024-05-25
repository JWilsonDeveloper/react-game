import React from 'react';
import { Player } from '@/app/lib/definitions';

interface StatTableProps {
  player: Player;
  tempPlayer: Player;
}

export default function ItemTable({ player, tempPlayer }: StatTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-200 bg-white">
        <tbody>
          <tr className="bg-gray-200">
            <td className="border border-white p-2" rowSpan={2}>HP</td>
            <td className="border border-white p-2">Old</td>
            <td className="border border-white p-2">New</td>
          </tr>
          <tr className="bg-gray-200">
            <td className="border border-white p-2">{player.totalHP}</td>
            <td className="border border-white p-2">{tempPlayer.totalHP}</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2" rowSpan={2}>MP</td>
            <td className="border border-gray-200 p-2">Old</td>
            <td className="border border-gray-200 p-2">New</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2">{player.totalMP}</td>
            <td className="border border-gray-200 p-2">{tempPlayer.totalMP}</td>
          </tr>
          <tr className="bg-gray-200">
            <td className="border border-white p-2" rowSpan={2}>STR</td>
            <td className="border border-white p-2">Old</td>
            <td className="border border-white p-2">New</td>
          </tr>
          <tr className="bg-gray-200">
            <td className="border border-white p-2">{player.strength}</td>
            <td className="border border-white p-2">{tempPlayer.strength}</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2" rowSpan={2}>SPD</td>
            <td className="border border-gray-200 p-2">Old</td>
            <td className="border border-gray-200 p-2">New</td>
          </tr>
          <tr>
            <td className="border border-gray-200 p-2">{player.speed}</td>
            <td className="border border-gray-200 p-2">{tempPlayer.speed}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

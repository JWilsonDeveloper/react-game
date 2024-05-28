import { useEffect, useRef } from 'react';

interface RulesProps {}

export default function Rules({}: RulesProps) {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-white p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Rules</h1>
            <div className="w-full max-w-2xl">
                <section className="mb-6">
                    <p className="text-sm md:text-base text-gray-700">
                        {/* Detailed rules about battling go here */}
                        Defeat monsters to collect experience points <strong>(XP)</strong> and gold pieces <strong>(GP)</strong>.
                        Gain enough XP to reach level 5 and win the game! 
                        The game consists of three main components: battling, shopping, and leveling up.
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold mb-2">Battling</h2>
                    <div>
                        <section className="mb-2">
                            <p className="text-sm md:text-base text-gray-700">
                                Defeat your opponent in battle by selecting actions to reduce its hit points <strong>(HP)</strong> to zero. 
                                Alternatively, select a FLEE action to attempt to escape without receiving XP or GP. 
                                If your HP is reduced to 0, you are defeated and lose the game.
                            </p>
                        </section>
                        <section className="mb-2">
                            <h3 className="text-base font-semibold mb-1">Combat Rounds</h3>
                            <p className="text-sm md:text-base text-gray-700">
                                There are a variety of actions, including making an attack, using an item, and attempting to escape.
                                Selecting an action triggers a round of combat. 
                                If your action does not result in the end of the battle, your opponent will perform an action. 
                                If your opponent&apos;s action does not result in the end of the battle, you will be prompted to select your next action.
                            </p>
                        </section>
                        <section>
                            <h3 className="text-base font-semibold mb-1">Success Rolls and Effect Rolls</h3>
                            <p className="text-sm md:text-base text-gray-700">
                                Unless it succeeds automatically, selecting an action triggers a success roll to determine whether or not you succeed. 
                                The success roll provides you with a random number between 1 and 20. 
                                This number is added to your action&apos;s <strong>success bonus</strong>.
                                If the total is less than the target value, the action fails and nothing happens.
                                If the total is greater than or equal to the target value, the action succeeds. 
                                A successful action triggers an effect roll to determine how powerful the effect is. 
                                An action&apos;s <strong>effect</strong> is the range of possible values that may be returned by the effect roll.
                            </p>
                            <section className="mt-2">
                                <p className="text-sm italic md:text-base text-gray-700">
                                    Example: You select the Punch action, which has a success bonus of +3 and an effect of 1-4 damage <strong>(DMG)</strong>. 
                                    The target value is 12. 
                                    You make a success roll and get a 9. 
                                    Your total is 12 (9 + 3), which is what you needed to succeed! 
                                    Because you succeeded, you make an effect roll. 
                                    The effect roll returns a number between 1 and 4.
                                    In this case, you get a 2 on your effect roll. 
                                    You deal 2 DMG to your opponent, and your action is complete!
                                </p>
                            </section>
                            <section className="mt-2">
                                <h3 className="text-base font-semibold mb-1">A Few Other Notes</h3>
                                <ul className="list-disc list-inside text-sm md:text-base text-gray-700">
                                    <li>Certain actions, such as using an HP Potion, succeed automatically.</li>
                                    <li>Certain actions, such as fleeing, do not have an effect because they do not impact HP or other stats.</li>
                                    <li>The target value for a success roll is equal to your opponent&apos;s defense.</li>
                                </ul>
                            </section>
                        </section>
                    </div>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold mb-2">Shopping</h2>
                    <section className="mb-2">
                        <p className="text-sm md:text-base text-gray-700">
                        {/* Detailed rules about shopping go here */}
                        Every time a battle ends, you have the option to buy new items and equipment using the GP you&apos;ve collected from defeated opponents.
                        </p>
                    </section>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold mb-2">Leveling Up</h2>
                    <p className="text-sm md:text-base text-gray-700">
                        {/* Detailed rules about leveling up go here */}
                        Collecting enough XP allows you to level up! 
                        Leveling up boosts your stats, and provides you with more ability points <strong>(AP)</strong>. 
                        While leveling up, you can use your AP to purchase new abilities!
                    </p>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold mb-2">Items Vs Equipment</h2>
                    <section className="mb-2">
                        {/* Detailed rules about items vs equipment go here */}
                        <ul className="list-none list-inside text-sm md:text-base text-gray-700">
                            <li><strong>Items</strong> have a limited number of uses, and they count as an action when selected.</li>
                            <li><strong>Equipment</strong> cannot be selected as an action, but it has a persistent effect on stats, such as increasing your armor or HP.</li>
                        </ul>
                    </section>
                </section>
                <section className="mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold mb-2">Stats</h2>
                    <section className="mb-2">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-2 border-black bg-white">
                            <thead>
                            <tr className="border border-b-2 border-black">
                                <th className="border border-gray-200 sm:p-2 text-xs md:text-sm">Stat</th>
                                <th className="border border-gray-200 sm:p-2 text-xs md:text-sm">Abbr.</th>
                                <th className="border border-gray-200 sm:p-2 text-xs md:text-sm">Description</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr className="border border-b-2 border-black">
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Hit Points</td>
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">HP</td>
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Health - Determines whether or not you are able to continue in battle</td>
                                </tr>
                                <tr className="border border-b-2 border-black">
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Mana Points</td>
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">MP</td>
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Consumed when casting spells</td>
                                </tr>
                                <tr className="border border-b-2 border-black">
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Speed</td>
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">SPD</td>
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Can influence success bonuses and attack damage; Contributes to Defense</td>
                                </tr>
                                <tr className="border border-b-2 border-black">
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Strength</td>
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">STR</td>
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Can influence success bonuses and attack damage</td>
                                </tr>
                                <tr className="border border-b-2 border-black">
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Armor</td>
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">-</td>
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Contributes to Defense</td>
                                </tr>
                                <tr className="border border-b-2 border-black">
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Gold Pieces</td>
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">GP</td>
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Used to purchase items and equipment when shopping</td>
                                </tr>
                                <tr className="border border-b-2 border-black">
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Ability Points</td>
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">AP</td>
                                    <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Used to purchase new abilities when leveling up</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </section>
                </section>
            </div>
        </div>
    );
}

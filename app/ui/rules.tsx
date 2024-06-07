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
                                Defeat your opponent in battle by reducing its hit points <strong>(HP)</strong> to 0. 
                                Alternatively, attempt to escape without receiving XP or GP. 
                                If your HP is reduced to 0, you are defeated and lose the game.
                            </p>
                        </section>
                        <section className="mb-2">
                            <h3 className="text-base font-semibold mb-1 text-black">Actions</h3>
                            <p className="text-sm md:text-base text-gray-700">
                                Actions include abilties and items:
                            </p>
                            <div className={"flex flex-wrap w-full pl-8 gap-2 sm:gap-0"}>
                                <div className='w-full sm:w-1/2 pr-4'>
                                    <p className={"text-sm md:text-base"}>Abilities:</p>   
                                    <div className={"pl-5 text-sm md:text-base text-gray-700"}>
                                        <ul className={"list-disc"}>
                                            <li>Melee Attacks</li>
                                            <li>Ranged Attacks</li>
                                            <li>Spells</li>
                                            <li>Flee Abilities</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='w-full sm:w-1/2'>
                                    <p className={"text-sm md:text-base"}>Items:</p>   
                                    <div className={"pl-5 text-sm md:text-base text-gray-700"}>
                                        <ul className={"list-disc"}>
                                            <li>HP Potions</li>
                                            <li>MP Potions</li>
                                            <li>Scrolls</li>
                                        </ul>
                                    </div> 
                                </div>
                            </div>
                        </section>
                        <section className="mb-2">
                            <h3 className="text-base font-semibold mb-1 text-black">Combat Rounds</h3>
                            <p className="text-sm md:text-base text-gray-700">
                                Selecting an action triggers a round of combat. 
                                If your action does not result in the end of the battle, your opponent will execute an action. 
                                After your opponent&apos;s action, the combat round ends. 
                                If the battle has still not ended, you may select a new action to begin a new combat round.
                            </p>
                        </section>
                        <section className="text-sm md:text-base text-gray-700">
                            <h3 className="text-base font-semibold mb-1  text-black">Success Rolls and Effect Rolls</h3>
                            <p>Unless it succeeds automatically, selecting an action triggers a success roll to determine whether or not anything happens. </p>
                            <div className={"pl-8 my-2"}>
                                <p>A success roll uses three values:</p>
                                <div className={"pl-5"}>
                                    <ol className={"list-decimal"}>
                                        <li>A target value (usually the opponent's Defense)</li>
                                        <li>The action&apos;s <strong>success bonus</strong></li>
                                        <li>A random number between 1 and 20</li>
                                    </ol>
                                </div>
                            </div>
                            <p>
                                If the sum of the success bonus and the random number is less than the target value, the action fails and nothing happens. 
                                If the sum is greater than or equal to the target value, the action succeeds. 
                                A successful action triggers an effect roll to determine how powerful the effect is. 
                                An action&apos;s <strong>effect</strong> is the range of possible values that may be returned by the effect roll.
                            </p>
                            <section className="text-sm italic md:text-base text-gray-700 mt-2">
                                <p>Example:</p>
                                <div className={"pl-8"}>
                                <p>You select the Punch action.</p>
                                <div className={"pl-5"}>
                                    <ol className={"list-decimal"}>
                                        <li>The target value is 12</li>
                                        <li>The success bonus is 3</li>
                                        <li>The random number for your success roll is 9</li>
                                    </ol>
                                </div>
                                </div>
                                <p className='mt-2 pl-8'> 
                                    Your total is 12 (9 + 3), which is what you needed to succeed! 
                                    Because you succeeded, you make an effect roll. 
                                    The effect roll for Punch returns a number between 1 and 4.
                                    In this case, you get a 3 on your effect roll. 
                                    You deal 3 DMG to your opponent, and your action is complete!
                                </p>
                            </section>
                            <section className="mt-2">
                                <h3 className="text-base font-semibold mb-1">A Few Other Notes</h3>
                                <div className={"pl-5"}>
                                    <ul className="list-disc text-sm md:text-base text-gray-700">
                                        <li>Certain actions, such as using an HP Potion, succeed automatically</li>
                                        <li>Certain actions, such as fleeing, do not have an effect because they do not impact HP or other stats</li>
                                        <li>When attacking, the target value for the success roll is your opponent&apos;s defense</li>
                                        <li>When fleeing, the target value is the sum of the opponent&apos;s speed and a random number between 1 and 20</li>
                                    </ul>
                                </div>
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
                        <p><strong>Items</strong> have a limited number of uses, and they count as an action when selected.</p>
                        <p><strong>Equipment</strong> cannot be selected as an action, but it has a persistent effect on stats, such as increasing your armor or HP.</p>
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
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">
                                            <p>Must be greater than 0 to continue in battle</p>
                                        </td>
                                    </tr>
                                    <tr className="border border-b-2 border-black">
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Mana Points</td>
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">MP</td>
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">
                                            <p>Consumed when casting spells</p>
                                        </td>
                                    </tr>
                                    <tr className="border border-b-2 border-black">
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Defense</td>
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">DEF</td>
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">
                                            <p>The target value an opponent must meet or exceed when attacking</p>
                                            <p>Defense = Armor + Speed</p>
                                        </td>
                                    </tr>
                                    <tr className="border border-b-2 border-black">
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Armor</td>
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">ARM</td>
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">
                                            <p>Contributes to Defense</p>
                                        </td>
                                    </tr>
                                    <tr className="border border-b-2 border-black">
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Speed</td>
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">SPD</td>
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">
                                            <p>Contributes to Defense</p>
                                            <p>May influence success bonuses or effect</p>
                                        </td>
                                    </tr>
                                    <tr className="border border-b-2 border-black">
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Strength</td>
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">STR</td>
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">
                                            <p>May influence success bonuses or effect</p>
                                        </td>
                                    </tr>
                                    <tr className="border border-b-2 border-black">
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Gold Pieces</td>
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">GP</td>
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">
                                            <p>Used to purchase items and equipment when shopping</p>
                                        </td>
                                    </tr>
                                    <tr className="border border-b-2 border-black">
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">Ability Points</td>
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">AP</td>
                                        <td className="border border-gray-200 sm:p-2 text-xs md:text-sm">
                                            <p>Used to purchase new abilities when leveling up</p>
                                        </td>
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

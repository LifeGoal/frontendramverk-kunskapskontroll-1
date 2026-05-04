import Champion from './ChampionItem';

function ChampionList({ champions }) {
    return (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-2 sm:mt-4 lg:mt-6 xl:mt-16 w-full">
            {champions.sort((a, b) => a.name.localeCompare(b.name, "sv")).map(champion => (
                <Champion key={champion.id} champion={champion} />
            ))}
        </ul>
    );
}

export default ChampionList;
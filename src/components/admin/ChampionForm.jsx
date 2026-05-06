import { useEffect, useState } from "react";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

const championTags = ["Fighter", "Tank", "Assassin", "Mage", "Marksman", "Support"];

const championStats = [
    { id: "magic", label: "Magic" },
    { id: "attack", label: "Attack" },
    { id: "defense", label: "Defense" },
    { id: "difficulty", label: "Difficulty" },
];

const baseStats = [
    { id: "hp", label: "HP" },
    { id: "mp", label: "MP" },
    { id: "armor", label: "Armor" },
    { id: "spellblock", label: "Spell Block" },
    { id: "movespeed", label: "Movespeed" },
    { id: "attackrange", label: "Attack Range" },
    { id: "attackdamage", label: "Attack Damage" },
    { id: "attackspeed", label: "Attack Speed" },
    { id: "crit", label: "Crit" },
    { id: "hpregen", label: "HP Regen" },
    { id: "mpregen", label: "MP Regen" },
];

const perLevelStats = [
    { id: "hpperlevel", label: "HP" },
    { id: "mpperlevel", label: "MP" },
    { id: "armorperlevel", label: "Armor" },
    { id: "spellblockperlevel", label: "Spell Block" },
    { id: "attackdamageperlevel", label: "Attack Damage" },
    { id: "attackspeedperlevel", label: "Attack Speed" },
    { id: "hpregenperlevel", label: "HP Regen" },
    { id: "mpregenperlevel", label: "MP Regen" },
    { id: "critperlevel", label: "Crit" },
];

const skinStructure = [
    { key: "id", label: "ID", placeholder: "e.g. 82000" },
    { key: "num", label: "Num", placeholder: "e.g. 0" },
    { key: "name", label: "Name", placeholder: "e.g. default" },
    { key: "splash", label: "Splash URL", placeholder: "https://..." },
];

const abilitiesStructure = {
    Q: { key: "Q", name: "", image: "", description: "", cost: [0, 0, 0, 0, 0], cooldown: [0, 0, 0, 0, 0] },
    W: { key: "W", name: "", image: "", description: "", cost: [0, 0, 0, 0, 0], cooldown: [0, 0, 0, 0, 0] },
    E: { key: "E", name: "", image: "", description: "", cost: [0, 0, 0, 0, 0], cooldown: [0, 0, 0, 0, 0] },
    R: { key: "R", name: "", image: "", description: "", cost: [0, 0, 0], cooldown: [0, 0, 0] },
};

const abilityLevelCounts = { Q: 5, W: 5, E: 5, R: 3 };

const createAbilityState = (sourceAbilities = []) => {
    return Object.keys(abilitiesStructure).reduce((acc, key) => {
        const sourceAbility = sourceAbilities.find((ability) => ability.key === key) ?? abilitiesStructure[key];
        const levelCount = abilityLevelCounts[key];

        acc[key] = {
            key,
            name: sourceAbility.name ?? "",
            image: sourceAbility.image ?? "",
            description: sourceAbility.description ?? "",
            cost: Array.from({ length: levelCount }, (_, index) => String(sourceAbility.cost?.[index] ?? 0)),
            cooldown: Array.from({ length: levelCount }, (_, index) => String(sourceAbility.cooldown?.[index] ?? 0)),
        };

        return acc;
    }, {});
};

const createInitialFormValues = (initialValues = {}) => {
    const info = initialValues.info ?? {};
    const stats = initialValues.stats ?? {};

    return {
        id: initialValues.id ?? "",
        name: initialValues.name ?? "",
        title: initialValues.title ?? "",
        blurb: initialValues.blurb ?? initialValues.description ?? "",
        image: initialValues.image ?? "",
        info: {
            magic: String(info.magic ?? 0),
            attack: String(info.attack ?? 0),
            defense: String(info.defense ?? 0),
            difficulty: String(info.difficulty ?? 0),
        },
        stats: {
            hp: String(stats.hp ?? 0),
            mp: String(stats.mp ?? 0),
            armor: String(stats.armor ?? 0),
            spellblock: String(stats.spellblock ?? 0),
            movespeed: String(stats.movespeed ?? 0),
            attackrange: String(stats.attackrange ?? 0),
            attackdamage: String(stats.attackdamage ?? 0),
            attackspeed: String(stats.attackspeed ?? 0),
            crit: String(stats.crit ?? 0),
            hpregen: String(stats.hpregen ?? 0),
            mpregen: String(stats.mpregen ?? 0),
            hpperlevel: String(stats.hpperlevel ?? 0),
            mpperlevel: String(stats.mpperlevel ?? 0),
            armorperlevel: String(stats.armorperlevel ?? 0),
            spellblockperlevel: String(stats.spellblockperlevel ?? 0),
            attackdamageperlevel: String(stats.attackdamageperlevel ?? 0),
            attackspeedperlevel: String(stats.attackspeedperlevel ?? 0),
            hpregenperlevel: String(stats.hpregenperlevel ?? 0),
            mpregenperlevel: String(stats.mpregenperlevel ?? 0),
            critperlevel: String(stats.critperlevel ?? 0),
        },
    };
};

const sanitizeChampionId = (name) => name.replace(/[^a-zA-Z0-9]/g, "");

const isValidHttpUrl = (value) => {
    try {
        const parsed = new URL(value);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
};

const parseNonNegativeNumber = (value) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 0) {
        return null;
    }

    return parsed;
};

function ChampionForm({ initialValues, onSubmit, submitLabel = "Create Champion" }) {
    const sourceValues = initialValues ?? {};
    const [formValues, setFormValues] = useState(() => createInitialFormValues(sourceValues));
    const [selectedTags, setSelectedTags] = useState(() => [...(sourceValues.tags ?? [])]);
    const [skins, setSkins] = useState(() => [...(sourceValues.skins ?? [])]);
    const [skinForm, setSkinForm] = useState({ id: "", name: "", num: "", splash: "" });
    const [passive, setPassive] = useState(() => ({
        name: sourceValues.spells?.passive?.name ?? "",
        image: sourceValues.spells?.passive?.image ?? "",
        description: sourceValues.spells?.passive?.description ?? "",
    }));
    const [abilities, setAbilities] = useState(() => createAbilityState(sourceValues.spells?.abilities ?? []));
    const [formError, setFormError] = useState("");

    useEffect(() => {
        const currentValues = initialValues ?? {};

        setFormValues(createInitialFormValues(currentValues));
        setSelectedTags([...(currentValues.tags ?? [])]);
        setSkins([...(currentValues.skins ?? [])]);
        setSkinForm({ id: "", name: "", num: "", splash: "" });
        setPassive({
            name: currentValues.spells?.passive?.name ?? "",
            image: currentValues.spells?.passive?.image ?? "",
            description: currentValues.spells?.passive?.description ?? "",
        });
        setAbilities(createAbilityState(currentValues.spells?.abilities ?? []));
    }, [initialValues]);

    const updateField = (field, value) => {
        setFormValues(prev => ({ ...prev, [field]: value }));
    };

    const updateNestedField = (section, field, value) => {
        setFormValues(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    const handleTagChange = (event) => {
        const tag = event.target.value;
        if (event.target.checked) {
            setSelectedTags(prev => [...prev, tag]);
            return;
        }

        setSelectedTags(prev => prev.filter((currentTag) => currentTag !== tag));
    };

    const addSkin = () => {
        if (skinForm.id && skinForm.name && skinForm.num && skinForm.splash) {
            setSkins(prev => [...prev, skinForm]);
            setFormError("");
            setSkinForm({ id: "", name: "", num: "", splash: "" });
            return;
        }

        setFormError("Fill in all fields in the skin form before adding a skin.");
    };

    const removeSkin = (index) => {
        setSkins(prev => prev.filter((_, currentIndex) => currentIndex !== index));
    };

    const updateAbility = (key, field, value) => {
        setAbilities(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } }));
    };

    const updateAbilityArray = (key, field, index, value) => {
        setAbilities(prev => {
            const updated = [...prev[key][field]];
            updated[index] = value;
            return { ...prev, [key]: { ...prev[key], [field]: updated } };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedName = formValues.name.trim();
        const generatedId = sanitizeChampionId(trimmedName);
        const trimmedTitle = formValues.title.trim();
        const trimmedBlurb = formValues.blurb.trim();
        const trimmedImage = formValues.image.trim();

        if (!generatedId) {
            setFormError("Name must include at least one letter or number so an ID can be generated.");
            return;
        }

        if (!trimmedName) {
            setFormError("Name is required.");
            return;
        }

        if (!trimmedTitle) {
            setFormError("Title is required.");
            return;
        }

        if (!trimmedBlurb) {
            setFormError("Lore (Blurb) is required.");
            return;
        }

        if (!isValidHttpUrl(trimmedImage)) {
            setFormError("Champion Image URL must be a valid http/https link.");
            return;
        }

        if (selectedTags.length === 0) {
            setFormError("You must select at least one tag.");
            return;
        }

        const hasInvalidTag = selectedTags.some((tag) => !championTags.includes(tag));
        if (hasInvalidTag) {
            setFormError("One or more selected tags are invalid.");
            return;
        }

        if (skins.length === 0) {
            setFormError("You must add at least one skin.");
            return;
        }

        const parsedInfo = {};
        for (const { id, label } of championStats) {
            const value = parseNonNegativeNumber(formValues.info[id]);
            if (value === null) {
                setFormError(`${label} must be a valid number (0 or greater).`);
                return;
            }
            parsedInfo[id] = value;
        }

        const parsedStats = {};
        for (const { id, label } of [...baseStats, ...perLevelStats]) {
            const value = parseNonNegativeNumber(formValues.stats[id]);
            if (value === null) {
                setFormError(`${label} must be a valid number (0 or greater).`);
                return;
            }
            parsedStats[id] = value;
        }

        const normalizedSkins = [];
        for (let skinIndex = 0; skinIndex < skins.length; skinIndex += 1) {
            const skin = skins[skinIndex];
            const skinId = String(skin.id ?? "").trim();
            const skinName = String(skin.name ?? "").trim();
            const splashUrl = String(skin.splash ?? "").trim();
            const skinNum = Number(skin.num);

            if (!skinId || !/^[0-9]+$/.test(skinId)) {
                setFormError(`Skin #${skinIndex + 1}: ID must contain digits only.`);
                return;
            }

            if (!skinName) {
                setFormError(`Skin #${skinIndex + 1}: Name is required.`);
                return;
            }

            if (!Number.isInteger(skinNum) || skinNum < 0) {
                setFormError(`Skin #${skinIndex + 1}: Num must be an integer (0 or greater).`);
                return;
            }

            if (!isValidHttpUrl(splashUrl)) {
                setFormError(`Skin #${skinIndex + 1}: Splash URL must be a valid http/https link.`);
                return;
            }

            normalizedSkins.push({
                id: skinId,
                num: skinNum,
                name: skinName,
                splash: splashUrl,
            });
        }

        const passiveName = passive.name.trim();
        const passiveImage = passive.image.trim();
        const passiveDescription = passive.description.trim();

        if (!passiveName || !passiveDescription) {
            setFormError("Passive Name and Description are required.");
            return;
        }

        if (!isValidHttpUrl(passiveImage)) {
            setFormError("Passive Image URL must be a valid http/https link.");
            return;
        }

        const normalizedAbilities = [];
        for (const ability of Object.values(abilities)) {
            const abilityName = ability.name.trim();
            const abilityImage = ability.image.trim();
            const abilityDescription = ability.description.trim();
            const expectedLevels = abilityLevelCounts[ability.key];

            if (!abilityName || !abilityDescription) {
                setFormError(`${ability.key}: Name and Description are required.`);
                return;
            }

            if (!isValidHttpUrl(abilityImage)) {
                setFormError(`${ability.key}: Image URL must be a valid http/https link.`);
                return;
            }

            if (ability.cost.length !== expectedLevels || ability.cooldown.length !== expectedLevels) {
                setFormError(`${ability.key}: invalid number of level values for cost/cooldown.`);
                return;
            }

            const parsedCost = [];
            for (const costValue of ability.cost) {
                const parsed = parseNonNegativeNumber(costValue);
                if (parsed === null) {
                    setFormError(`${ability.key}: Cost must be a valid number (0 or greater).`);
                    return;
                }
                parsedCost.push(parsed);
            }

            const parsedCooldown = [];
            for (const cooldownValue of ability.cooldown) {
                const parsed = parseNonNegativeNumber(cooldownValue);
                if (parsed === null) {
                    setFormError(`${ability.key}: Cooldown must be a valid number (0 or greater).`);
                    return;
                }
                parsedCooldown.push(parsed);
            }

            normalizedAbilities.push({
                key: ability.key,
                name: abilityName,
                image: abilityImage,
                description: abilityDescription,
                cost: parsedCost,
                cooldown: parsedCooldown,
            });
        }

        setFormError("");

        const payload = {
            id: sourceValues.id || generatedId,
            name: trimmedName,
            title: trimmedTitle,
            blurb: trimmedBlurb,
            image: trimmedImage,
            tags: selectedTags,
            info: parsedInfo,
            stats: parsedStats,
            skins: normalizedSkins,
            spells: {
                passive: {
                    name: passiveName,
                    image: passiveImage,
                    description: passiveDescription,
                },
                abilities: normalizedAbilities,
            },
        };

        if (onSubmit) {
            await onSubmit(payload);
            return;
        }

        console.log(payload);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 w-full sm:w-3/4 lg:w-1/2">
            <div className="flex flex-row justify-between gap-4">
                <div className="flex flex-col w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                    <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Enter champion name" value={formValues.name} onChange={(e) => updateField("name", e.target.value)} />
                </div>
                <div className="flex flex-col w-full">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
                    <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="Enter champion title" value={formValues.title} onChange={(e) => updateField("title", e.target.value)} />
                </div>
            </div>

            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Lore (Blurb)</label>
                <textarea required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Enter champion lore (blurb)" value={formValues.blurb} onChange={(e) => updateField("blurb", e.target.value)} />
            </div>

            <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">Tags</label>
                <div className="flex flex-wrap gap-2">
                    {championTags.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return <button key={tag} type="button" onClick={() => handleTagChange({ target: { value: tag, checked: !isSelected } })} className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold border-2 transition-all duration-150 cursor-pointer select-none ${isSelected ? "bg-blue-500 border-blue-600 text-white shadow-md scale-105" : "bg-white border-gray-300 text-gray-600 hover:border-blue-400 hover:text-blue-500"}`}>{tag}</button>;
                    })}
                </div>
                {selectedTags.length > 0 && <p className="mt-2 text-xs text-gray-500">Selected: {selectedTags.join(", ")}</p>}
            </div>

            <div className="flex flex-col">
                <p className="text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide border-b pb-1">Champion Stats</p>
                <div className="flex flex-row gap-4">
                    {championStats.map(({ id, label }) => (
                        <div key={id} className="flex flex-col w-full">
                            <label className="block text-gray-700 text-xs font-semibold mb-1" htmlFor={id}>{label}</label>
                            <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={id} type="number" placeholder={`${label} (0-10)`} min="0" max="10" value={formValues.info[id]} onChange={(e) => updateNestedField("info", id, e.target.value)} />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <p className="text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide border-b pb-1">Base Stats</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {baseStats.map(({ id, label }) => (
                        <div key={id} className="flex flex-col">
                            <label className="block text-gray-700 text-xs font-semibold mb-1" htmlFor={id}>{label}</label>
                            <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={id} type="number" value={formValues.stats[id]} onChange={(e) => updateNestedField("stats", id, e.target.value)} />
                        </div>
                    ))}
                </div>

                <p className="text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide border-b pb-1">Per Level Stats</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {perLevelStats.map(({ id, label }) => (
                        <div key={id} className="flex flex-col">
                            <label className="block text-gray-700 text-xs font-semibold mb-1" htmlFor={id}>{label}</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={id} type="number" value={formValues.stats[id]} onChange={(e) => updateNestedField("stats", id, e.target.value)} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col">
                <p className="text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide border-b pb-1">Champion Image & Skins</p>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col w-full">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image URL</label>
                        <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="image" type="text" placeholder="https://ddragon.leagueoflegends.com/cdn/16.9.1/img/champion/Leblanc.png" value={formValues.image} onChange={(e) => updateField("image", e.target.value)} />
                    </div>

                    <div className="bg-white border rounded p-4">
                        <p className="text-gray-700 text-sm font-bold mb-3 uppercase tracking-wide border-b pb-1">Add Skin</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                            {skinStructure.map(({ key, label, placeholder }) => (
                                <div key={key} className="flex flex-col">
                                    <label className="block text-gray-600 text-xs font-semibold mb-1">{label}</label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={placeholder} value={skinForm[key]} onChange={(e) => setSkinForm(prev => ({ ...prev, [key]: e.target.value }))} />
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addSkin} className="flex items-center bg-green-500 hover:bg-green-600 text-white text-sm font-bold py-2 px-4 rounded focus:outline-none"><PlusCircleIcon className="w-4 h-4 mr-1" /> Add Skin</button>
                    </div>
                    {formError && <p className="text-red-600 text-sm font-semibold">{formError}</p>}

                    {skins.length > 0 && (
                        <div>
                            <p className="text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide">Skins ({skins.length})</p>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {skins.map((skin, index) => (
                                    <div key={index} className="relative rounded overflow-hidden shadow border bg-white group">
                                        {skin.splash ? (<img src={skin.splash} alt={skin.name} className="w-full h-28 object-cover object-top" />) : (<div className="w-full h-28 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">No image</div>)}
                                        <div className="p-2">
                                            <p className="text-gray-800 text-sm font-semibold truncate">{skin.name}</p>
                                            <p className="text-gray-400 text-xs">ID: {skin.id} · Num: {skin.num}</p>
                                        </div>
                                        <button type="button" onClick={() => removeSkin(index)} className="flex justify-center items-center absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"><TrashIcon className="w-4 h-4" /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <p className="text-gray-700 text-sm font-bold uppercase tracking-wide border-b pb-1">Abilities</p>
                <div className="bg-white border rounded p-4">
                    <p className="text-gray-700 text-sm font-bold mb-3 uppercase tracking-wide border-b pb-1">Passive</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div className="flex flex-col">
                            <label className="block text-gray-600 text-xs font-semibold mb-1">Name</label>
                            <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Passive name" value={passive.name} onChange={(e) => setPassive(prev => ({ ...prev, name: e.target.value }))} />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-gray-600 text-xs font-semibold mb-1">Image URL</label>
                            <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="https://..." value={passive.image} onChange={(e) => setPassive(prev => ({ ...prev, image: e.target.value }))} />
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <label className="block text-gray-600 text-xs font-semibold mb-1">Description</label>
                        <textarea required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" placeholder="Passive description" value={passive.description} onChange={(e) => setPassive(prev => ({ ...prev, description: e.target.value }))} />
                    </div>
                </div>
                {Object.values(abilities).map((ability) => {
                    const levels = ability.cost.length;

                    return (
                        <div key={ability.key} className="bg-white border rounded p-4">
                            <p className="text-gray-700 text-sm font-bold mb-3">{ability.key}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                                <div className="flex flex-col">
                                    <label className="block text-gray-600 text-xs font-semibold mb-1">Name</label>
                                    <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder={`${ability.key} ability name`} value={ability.name} onChange={(e) => updateAbility(ability.key, "name", e.target.value)} />
                                </div>
                                <div className="flex flex-col">
                                    <label className="block text-gray-600 text-xs font-semibold mb-1">Image URL</label>
                                    <input required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="https://..." value={ability.image} onChange={(e) => updateAbility(ability.key, "image", e.target.value)} />
                                </div>
                            </div>

                            <div className="flex flex-col mb-3">
                                <label className="block text-gray-600 text-xs font-semibold mb-1">Description</label>
                                <textarea required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline" placeholder={`${ability.key} description`} value={ability.description} onChange={(e) => updateAbility(ability.key, "description", e.target.value)} />
                            </div>

                            <div className="mb-3">
                                <label className="block text-gray-600 text-xs font-semibold mb-1">Cost (per level — {levels} levels)</label>
                                <div className="flex gap-2">
                                    {ability.cost.map((val, i) => (
                                        <div key={i} className="flex flex-col items-center w-full">
                                            <span className="text-gray-400 text-xs mb-1">{i + 1}</span>
                                            <input required className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 text-sm text-center leading-tight focus:outline-none focus:shadow-outline" type="number" step="any" min="0" value={val} onChange={(e) => updateAbilityArray(ability.key, "cost", i, e.target.value)} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-600 text-xs font-semibold mb-1">Cooldown (per level — {levels} levels)</label>
                                <div className="flex gap-2">
                                    {ability.cooldown.map((val, i) => (
                                        <div key={i} className="flex flex-col items-center w-full">
                                            <span className="text-gray-400 text-xs mb-1">{i + 1}</span>
                                            <input required className="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 text-sm text-center leading-tight focus:outline-none focus:shadow-outline" type="number" step="any" min="0" value={val} onChange={(e) => updateAbilityArray(ability.key, "cooldown", i, e.target.value)} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">{submitLabel}</button>
        </form>
    );
}

export default ChampionForm;
import War3Map from './w3x-parser.js' 
import parseINI from "../utilities/parse-ini.js";
import parse7xxItemStrings from "../utilities/parse-7.xx-item-strings.js";
import parseSLK from "../utilities/parse-slk.js";
import getProperNames from "../utilities/get-propernames.js";

const handleMap = async (file) => {
	let header = file.slice(0, 4), onBrowser = typeof Blob !== 'undefined'
	header = onBrowser ?  await header.text() : header.toString()
	
	try {
		if (header === "HM3W") { // Check if it's a WC3 map by its first 4 bytes
			const buffer = onBrowser ? await file.arrayBuffer() : file.buffer
			const dotaMap = new War3Map()
	
			dotaMap.load(buffer, true)
			
			const abilityStrings = parseINI([
				dotaMap.get("Units\\OrcAbilityStrings.txt").text(),
				dotaMap.get("Units\\HumanAbilityStrings.txt").text(),
				dotaMap.get("Units\\NightElfAbilityStrings.txt").text(),
				dotaMap.get("Units\\UndeadAbilityStrings.txt").text()
			].join("\r\n"));
			const abilityFunc = parseINI([
				dotaMap.get("Units\\OrcAbilityFunc.txt").text(),
				dotaMap.get("Units\\HumanAbilityFunc.txt").text(),
				dotaMap.get("Units\\NightElfAbilityFunc.txt").text(),
				dotaMap.get("Units\\UndeadAbilityFunc.txt").text()
			].join("\r\n"));
			const war3mapMisc = parseINI(dotaMap.get("war3mapMisc.txt").text(), false)
			const unitAbilities = parseSLK(dotaMap.get("Units\\UnitAbilities.slk").text())
			const unitBalance = parseSLK(dotaMap.get("Units\\UnitBalance.slk").text())
			const unitData = parseSLK(dotaMap.get("Units\\UnitData.slk").text())
			const unitWeapons = parseSLK(dotaMap.get("Units\\UnitWeapons.slk").text())
			const unitUI = parseSLK(dotaMap.get("Units\\unitUI.slk").text())
			const heroTalentTrees = parse7xxItemStrings(dotaMap.get("Units\\ItemStrings.txt").text())
			
			const tavernEntries = Object.entries(abilityFunc).filter(
				(entry) =>
					entry[1].art === "ReplaceableTextures\\CommandButtons\\BTNTavern.blp"
			);
			
			const { 
				AgiAttackSpeedBonus, AgiDefenseBonus, AgiDefenseBase, 
				StrRegenBonus, StrHitPointBonus, 
				IntManaBonus, IntRegenBonus, MaxHeroLevel 
			} = war3mapMisc;
			
			const miscData = {
				AgiAttackSpeedBonus, AgiDefenseBonus, AgiDefenseBase, 
				StrRegenBonus, StrHitPointBonus, 
				IntManaBonus, IntRegenBonus, MaxHeroLevel
			};
			
			// turn all values from string to number
			for (const property in miscData) {
				miscData[property] = Number(miscData[property])
			}
			
			const taverns = Object.fromEntries(
				tavernEntries.map(([key, val]) => {
					const name = abilityStrings[key].name;
					const sellunits = val.sellunits.split(",");
	
					return [key, { name, sellunits }];
				})
			);
			
			const heroes = Object.fromEntries(
				tavernEntries.flatMap(([key, val]) => {
					const tavernHeroes = val.sellunits.split(",");
					const heroes = tavernHeroes.map((heroId) => {
						const { art, buttonpos, missilespeed } = abilityFunc[heroId];
						const { heroAbilList } = unitAbilities[heroId];
						const { moveHeight, turnRate } = unitData[heroId];
						const { name, propernames, ubertip } = abilityStrings[heroId];
						const { file, unitSound, modelScale, red, green, blue, scale } = unitUI[heroId];
						const {	
							Primary, STR, INT, AGI, STRplus, INTplus, AGIplus, 
							spd, def, sight, nsight, 
							HP, regenHP, manaN, regenMana 
						} = unitBalance[heroId];
						const {	castpt, castbsw, rangeN1, cool1, dmgpt1, backSw1, dice1, sides1, dmgplus1, weapTp1 } = unitWeapons[heroId];
	
						const abilities = Object.fromEntries(
							heroAbilList
								.split(",")
								.sort((a, b) => {
									const aButtonpos = abilityFunc[a].hasOwnProperty("researchbuttonpos")
										? abilityFunc[a].researchbuttonpos
										: "0,0";
									const bButtonpos = abilityFunc[b].hasOwnProperty("researchbuttonpos")
										? abilityFunc[b].researchbuttonpos
										: "0,0";
	
									return aButtonpos.localeCompare(bButtonpos);
								})
								.map((abilityId) => {
									const { name, ubertip, researchubertip } = abilityStrings[abilityId];
									const { art, buttonpos, researchart, researchhotkey } = abilityFunc[abilityId];
									const ability = {
										name,
										ubertip,
										researchubertip,
										researchhotkey,
										art: art 
										? art 
										: abilityId === "A0BR" 
											? "ReplaceableTextures\\PassiveButtons\\BTNSacrificialSkull.blp" 
											: researchart + ".blp",
										buttonpos
									};
	
									return [abilityId, ability];
								})
						);
						
						const faction = taverns[key].name.includes("Sentinel") ? 0 : 1
	
						const hero = {
							name,
							ubertip,
							abilities,
							art,
							buttonpos,
							model: {
								file,
								scale,
								unitSound,
								modelScale,
								moveHeight,
								rgb: [ red, green, blue ]
							},
							propernames: getProperNames(propernames),
							tavernId: key,
							talentTree: heroTalentTrees[heroId],
							Primary,
							STR,
							INT,
							AGI,
							STRplus: STRplus || 0,
							INTplus: INTplus || 0,
							AGIplus: AGIplus || 0,
							spd,
							def: def || 0,
							turnRate,
							sight,
							nsight,
							castpt: castpt || 0,
							castbsw: castbsw || 0,
							rangeN1,
							cool1,
							dmgpt1,
							backSw1: backSw1 || 0,
							dice1,
							sides1,
							dmgplus1,
							weapTp1,
							HP,
							regenHP,
							manaN,
							regenMana,
							missilespeed,
							faction
						};
	
						return [heroId, hero];
					});
					return heroes;
				})
			);
	
			const jsonData = JSON.stringify({ heroes, taverns, miscData });
			
			return jsonData
		} else {
			throw Error("Invalid file header, selected file is not a WC3 map")
		}
	} catch (e) {
		return console.error(e)
	}
}

export default handleMap
/**
 * Specialized parser that extracts hero talent data from DotA 7.xx ItemStrings.txt.
 * Maps the `//indexid_xxxx` comments to unit IDs with each talent branch id section name as key.
 * Sample input:
 * 
 * ```
 * //indexid_Mars
 * [T721]
 * name="+20 Movement Speed"
 * [T722]
 * name="+8 Armor"
 * [T723]
 * name="+1s Spear Stun"
 * [T724]
 * name="Arena Of Blood Grants Team +100 HP Regen"
 * [T725]
 * name="+8 Strength"
 * [T726]
 * name="+25 Damage"
 * [T727]
 * name="Spear of Mars +200 Damage"
 * [T728]
 * name="+80% God's Rebuke Crit"
 * ```
 * to
 * 
 * ```
 * "HMRS": {
 *   "T721": "+20 Movement Speed",
 *   "T722": "+8 Armor",
 *   "T723": "+1s Spear Stun",
 *   "T724": "Arena Of Blood Grants Team +100 HP Regen",
 *   "T725": "+8 Strength",
 *   "T726": "+25 Damage",
 *   "T727": "Spear of Mars +200 Damage",
 *   "T728": "+80% God's Rebuke Crit"
 * }
 * ``` 
 * 
 * @param {string} ini Contents of DotA 7.xx ItemStrings.txt as string
 * @return {object} Nested object with comment index IDs as property name
 */

export default function parse7xxItemStrings(ini) {
  const heroes = {};
  const indexIdToHeroId = {
    VS: "Hvwd",
    Zeus: "Hmbr",
    Enchantress: "Emoo",
    Morphling: "O00P",
    CM: "Hjai",
    Sven: "H001",
    NagaSiren: "HC49",
    ES: "Otch",
    Riki: "HC92",
    LoneDruid: "N01O",
    Lina: "H004",
    Juggernaut: "Nbbc",
    Silencer: "N01A",
    Treant: "Hamg",
    Chieftain: "O015",
    Kotl: "Hblm",
    Ursa: "Huth",
    OgreMagi: "Hmkg",
    Tinker: "Ntin",
    Furion: "Emns",
    PL: "Ogrh",
    Tiny: "Ucrl",
    Techies: "H00K",
    Chen: "H00A",
    Luna: "E005",
    Sniper: "Usyl",
    Troll: "N016",
    Rhasta: "Orkn",
    Wisp: "O01F",
    Pandaren: "Npbm",
    Centaur: "H000",
    Bounty: "Naka",
    DK: "Hlgr",
    AM: "Edem",
    Trax: "Nbrn",
    Omni: "Harf",
    Beastmaster: "H00D",
    THD: "E00P",
    Alchemist: "N01I",
    Potm: "N01V",
    Storm: "H00S",
    Huskar: "H00Q",
    Lanaya: "E01Y",
    Puck: "N00B",
    Clock: "H00T",
    Admiral: "H06S",
    WR: "N0EG",
    Gyro: "E02N",
    Disruptor: "E02J",
    Tusk: "E02I",
    Phoenix: "E02F",
    BB: "H008",
    Rubick: "E02X",
    Xin: "N0M0",
    Legion: "E02K",
    Skywrath: "H0DO",
    Timber: "E032",
    Earth: "N0MU",
    Oracle: "N0MD",
    PA: "Ewar",
    Medusa: "H00V",
    Bala: "Udre",
    Leoric: "NC00",
    Doom: "UC42",
    NA: "U000",
    Slardar: "UC91",
    QoP: "UC01",
    Bone: "E004",
    Void: "EC45",
    Viper: "EC77",
    Razor: "E002",
    Lifestealer: "U00C",
    Pugna: "H00H",
    Tide: "Ofar",
    Bane: "Oshd",
    Necrolyte: "U00E",
    Pudge: "U00F",
    Barathum: "O00J",
    Weaver: "Ubal",
    SF: "Nfir",
    SK: "U00K",
    Axe: "Opgh",
    BS: "Hvsh",
    Abaddon: "Udea",
    Spectre: "E01B",
    WD: "E01A",
    OD: "U00P",
    WL: "E01C",
    Geomancer: "H00I",
    Dazzle: "N01W",
    Pit: "N00R",
    Zombie: "H00R",
    DS: "H00N",
    Invoker: "H00U",
    Enigma: "Uktl",
    Batrider: "O016",
    AA: "N0HP",
    Slark: "H071",
    TB: "Eevi",
    Leshrak: "Ekee",
    SD: "E02H",
    Lich: "Ulic",
    Banshee: "UC76",
    Lion: "UC18",
    Veno: "EC57",
    Magnus: "UC11",
    Visage: "UC60",
    Nessaj: "U00A",
    Wyvern: "N0M7",
    Zet: "N0MK",
    Lycan: "U008",
    Brood: "U006",
    MK: "H0MK",
    Mars: "HMRS"
  };
  const regex = {
    indexId: /^(\/\/indexid_)(.*)$/,
    section: /^\[(.+?)\]/,
    property: /^(.+?)="(.*?)"$/
  };

  let match, heroId, talentId;

  for (let line of ini.split("\r\n")) {
    if (line.length) {
      match = line.match(regex.indexId);
      if (match) {
        const indexId = match[2];
        heroId = indexIdToHeroId[indexId];
        heroes[heroId] = {};
      } else if (heroId) {
        match = line.match(regex.section);
        if (match) {
          talentId = match[1].trim();
        } else {
          const match = line.match(regex.property);
          if (match && match[1] === "name") {
            const value = match[2];
            heroes[heroId][talentId] = value;
          }
        }
      }
    }
  }

  return heroes;
}

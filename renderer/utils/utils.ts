export interface StatsJson {
  publicId: string;
  offlineData: OfflineData;
  onlineDataCache: OnlineDataCache;
  version: number;
}

export interface OfflineData {
  supplyPoints: SupplyPoints;
  skullTotemPoints: SkullTotemPoints;
  decks: JsonDeck[];
  recentCharacters: string[];
  unlocks: string[];
  consumables: { [key: string]: SkullTotemPoints };
  stats: Stats;
  startingLocations: { [key: string]: number };
  campaignRuns: { [key: string]: CampaignRun };
  trainingRuns: TrainingRuns;
  caravans: any[];
  badgeData: BadgeData;
  sprayData: SprayData;
  appliedWeaponSkins: AppliedWeaponSkins;
  equippedCharacterCustomizationSets: { [key: string]: EquippedCharacterCustomizationSet };
  reconciliationTimestamps: ReconciliationTimestamps;
  deviceType: string;
  pendingDeletions: PendingDeletions;
}

export interface AppliedWeaponSkins {
  HG04: string;
  HG04Auto: string;
  AR01: string;
  FireAxe: string;
  AR05: string;
  SMG02: string;
  HG05: string;
  HG03: string;
  SG03: string;
  LMG02: string;
  SG01: string;
  LMG01: string;
  SG02: string;
  SG04: string;
  SG05: string;
  Sni02: string;
  HG01: string;
  HG02: string;
  HG02Burst: string;
  AR02: string;
  AR04: string;
  AR03: string;
  Sni01: string;
  Machete: string;
  BaseballBat: string;
  Hatchet: string;
  SMG03: string;
  AR06: string;
  SMG01: string;
  SMG05: string;
  SMG04: string;
}

export interface BadgeData {
  emblem: number;
  title: number;
  banner: number;
}

export interface CampaignRun {
  iD: number;
  map: string;
  difficulty: string;
  retriesRemaining: number;
  version: number;
  state: string;
  data: string;
  lastUpdateTimestamp: number;
  dataVersion: number;
  highestTU: number;
  highestCL: number;
}

export interface SkullTotemPoints {
  acquired: number;
  spent: number;
}

export interface JsonDeck {
  iD: number;
  type: DeckType;
  name: string;
  cards: string[];
  version: number;
}

export interface EquippedCharacterCustomizationSet {
  customizationSlots: string[];
  lastEquipSlot: string;
}

export interface PendingDeletions {
  decks: any[];
  caravans: any[];
  campaignRuns: any[];
}

export interface ReconciliationTimestamps {
  recentCharacters: number;
  badgeData: number;
  sprayData: number;
  appliedWeaponSkins: number;
  equippedCharacterCustomizationSets: number;
}

export interface SprayData {
  foregroundIcon: number;
  foregroundVariant: number;
  backgroundIcon: number;
  backgroundVariant: number;
}

export interface Stats {
  ammoDropped: AmmoDropped;
  barSongsHeard: BarSongsHeard;
  bespoke_Secured: BarSongsHeard;
  bespoke_Unsecured: BarSongsHeard;
  caravanItemsPurchased: AmmoDropped;
  cardsPlayed: AmmoDropped;
  cleanersRescued: AmmoDropped;
  cleanersRevived: AmmoDropped;
  commonRiddenDamageInflicted: AmmoDropped;
  enemyCleanerDamageInflicted: AmmoDropped;
  enemyDamageInflicted: AmmoDropped;
  friendlyCleanersKilled: AmmoDropped;
  friendlyDamageInflicted: AmmoDropped;
  healingApplied: HealingApplied;
  hordesTriggered: AmmoDropped;
  missionsCompleted_Secured: BarSongsHeard;
  missionsCompleted_Unsecured: BarSongsHeard;
  pVPGamesPlayed: AmmoDropped;
  pVPGamesWon: AmmoDropped;
  pVPIncapsAsRidden: AmmoDropped;
  pVPKillsAsCleaners: AmmoDropped;
  pVPKillsAsRidden: AmmoDropped;
  riddenBossesKilled: AmmoDropped;
  riddenKilled: AmmoDropped;
  riddenKilledByType: BarSongsHeard;
  riddenKilledByWeapon: BarSongsHeard;
  riddenKilledWhileIncapped: AmmoDropped;
  riddenMutationsKilled: AmmoDropped;
  snitchersSilenced: AmmoDropped;
  specialRiddenDamageInflicted: AmmoDropped;
  teamAchievements_Unsecured: TeamAchievementsUnsecured;
  timesDiedAsCleaner: AmmoDropped;
  timesIncappedAsCleaner: AmmoDropped;
  treasureDoorsOpened: AmmoDropped;
  weakSpotDamageInflicted: AmmoDropped;
}

export interface AmmoDropped {
  base: number;
  keys: TrainingRuns;
}

export interface TrainingRuns {
}

export interface BarSongsHeard {
  base: number;
  keys: { [key: string]: number };
}

export interface HealingApplied {
  base: number;
  keys: HealingAppliedKeys;
}

export interface HealingAppliedKeys {
  Other: number;
  Self: number;
}

export interface TeamAchievementsUnsecured {
  base: number;
  keys: TeamAchievementsUnsecuredKeys;
}

export interface TeamAchievementsUnsecuredKeys {
  grab_bag_010: number;
  grab_bag_018: number;
}

export interface SupplyPoints {
  balanceFromInventory: number;
  acquired: number;
  spent: number;
}

export interface OnlineDataCache {
  supplyPoints: number;
  decks: any[];
  recentCharacters: any[];
  ownables: any[];
  stats: TrainingRuns;
  startingLocations: TrainingRuns;
  campaignRuns: TrainingRuns;
  caravans: any[];
  badgeData: BadgeData;
  sprayData: SprayData;
  appliedWeaponSkins: TrainingRuns;
  equippedCharacterCustomizationSets: TrainingRuns;
  deviceType: string;
}

export enum DeckType {
  PVE = 'pvE',
  PVP = 'pvP',
  Solo = 'solo',
}

export interface DeckConstructorProps {
  id: number
  type: DeckType
  name: string
  cards: Array<Card>
  version: number
}

export class Deck {
  _id: number
  _type: DeckType
  _name: string
  _cards: Array<Card>
  _version: number

  constructor ({ id, type, name, cards, version }: DeckConstructorProps) {
    this._id = id
    this._type = type
    this._name = name
    this._cards = cards
    this._version = version
  }

}

export class Card {
  _id: string
  _name: string

  constructor (data: string) {
    this._id = data
    // TODO mapping id to real name
    this._name = data
  }

}

export enum MissionsId {
  // Act 1
  Resurgence = 'evans_a',
  TunnelOfBlood = 'evans_b',
  PainTrain = 'evans_c',
  TheCrossing = 'evans_d',

  ACleanSweep = 'finley_rescue_a',
  BookWorms = 'finley_rescue_b',
  BarRoomBlitz = 'finley_rescue_c',

  SpecialDelivery = 'finley_diner_a',
  TheDiner = 'finley_diner_b',

  BadSeeds = 'bluedog_a',
  HellsBells = 'bluedog_b',
  Abandoned = 'bluedog_c',
  TheSoundOfThunder = 'bluedog_d',

  // Act 2
  ACallToArms = 'finley_police_a',
  TheHandyMan = 'finley_police_b',

  PipeCleaners = 'clog_a',
  Hinterland = 'clog_b',
  TrailerTrashed = 'clog_c',
  TheClog = 'clog_d',
  TheBrokenBird = 'clog_e',

  HeraldsOfTheWormPart1 = 'finley_church_a',
  HeraldsOfTheWormPart2 = 'finley_church_b',
  GraveDanger = 'finley_church_c',

  // Act 3
  FartherAfield = 'manor_a',
  BlazingTrails = 'manor_b',
  CabinsByTheLake = 'manor_c',
  GardenParty = 'manor_d',
  T5 = 'manor_e',

  AFriendInNeed = 'cdc_a',
  MakingTheGrade = 'cdc_b',
  TheRoadToHell = 'cdc_c',
  TheBodyDump = 'cdc_d',

  // Act 4
  TheAbomination = 'titan_a',
}

export interface ByMission {
  id: MissionsId
  name: string
  completed: number
}

export enum CleanersId {
  Evangelo = 'hero_1',
  Walker = 'hero_2',
  Holly = 'hero_3',
  Hoffman = 'hero_4',
  Doc = 'hero_5',
  Jim = 'hero_6',
  Karlee = 'hero_7',
  Mom = '',
}

export interface ByCleaners {
  id: CleanersId
  name: string
  completed: number
}

export enum DifficultiesId {
  Easy = 'easy',
  Normal = 'normal',
  Hard = 'hard',
  Pvp = 'pvp',
}

export interface ByDifficulties {
  id: DifficultiesId
  name: string
  completed: number
}

export interface IdAndText {
  id: string
  text: string
}

export interface LatestMission {
  mission: IdAndText
  act: IdAndText
  cleaner: IdAndText
  difficulty: IdAndText
}

export interface Missions {
  rawData: BarSongsHeard
  all: number
  // byMissions: Array<ByMission>
  // byCleaners: Array<ByCleaners>
  // byDifficulties: Array<ByDifficulties>
  latest?: LatestMission
}

export interface PlayerProfileSettingsConstructorProps {
  supplyPoints: number
  skullTotemPoints: number
  decks: Array<Deck>
  stats: PlayerStats
  missions: Missions
}

export interface PlayerStats {
  ammoDropped: number;
  // barSongsHeard: BarSongsHeard;
  // bespoke_Secured: BarSongsHeard;
  // bespoke_Unsecured: BarSongsHeard;
  caravanItemsPurchased: number;
  cardsPlayed: number;
  cleanersRescued: number;
  cleanersRevived: number;
  commonRiddenDamageInflicted: number;
  enemyCleanerDamageInflicted: number;
  enemyDamageInflicted: number;
  friendlyCleanersKilled: number;
  friendlyDamageInflicted: number;
  // healingApplied: HealingApplied;
  hordesTriggered: number;
  // missionsCompleted_Secured: BarSongsHeard;
  // missionsCompleted_Unsecured: BarSongsHeard;
  // pVPGamesPlayed: AmmoDropped;
  // pVPGamesWon: AmmoDropped;
  // pVPIncapsAsRidden: AmmoDropped;
  // pVPKillsAsCleaners: AmmoDropped;
  // pVPKillsAsRidden: AmmoDropped;
  riddenBossesKilled: number;
  riddenKilled: number;
  // riddenKilledByType: BarSongsHeard;
  // riddenKilledByWeapon: BarSongsHeard;
  riddenKilledWhileIncapped: number;
  riddenMutationsKilled: number;
  snitchersSilenced: number;
  specialRiddenDamageInflicted: number;
  // teamAchievements_Unsecured: TeamAchievementsUnsecured;
  timesDiedAsCleaner: number;
  timesIncappedAsCleaner: number;
  treasureDoorsOpened: number;
  weakSpotDamageInflicted: number;
}

const missionNameMap = new Map([
  ['evans_a', { missionName: 'Resurgence', actName: 'Act 1' }],
  ['evans_b', { missionName: 'Tunnel Of Blood', actName: 'Act 1' }],
  ['evans_c', { missionName: 'Pain Train', actName: 'Act 1' }],
  ['evans_d', { missionName: 'The Crossing', actName: 'Act 1' }],
  ['finley_rescue_a', { missionName: 'A Clean Sweep', actName: 'Act 1' }],
  ['finley_rescue_b', { missionName: 'Book Worms', actName: 'Act 1' }],
  ['finley_rescue_c', { missionName: 'Bar Room Blitz', actName: 'Act 1' }],
  ['finley_diner_a', { missionName: 'Special Delivery', actName: 'Act 1' }],
  ['finley_diner_b', { missionName: 'The Diner', actName: 'Act 1' }],
  ['bluedog_a', { missionName: 'Bad Seeds', actName: 'Act 1' }],
  ['bluedog_b', { missionName: 'Hells Bells', actName: 'Act 1' }],
  ['bluedog_c', { missionName: 'Abandoned', actName: 'Act 1' }],
  ['bluedog_d', { missionName: 'The Sound Of Thunder', actName: 'Act 1' }],
  ['finley_police_a', { missionName: 'A Call To Arms', actName: 'Act 2' }],
  ['finley_police_b', { missionName: 'The Handy Man', actName: 'Act 2' }],
  ['clog_a', { missionName: 'Pipe Cleaners', actName: 'Act 2' }],
  ['clog_b', { missionName: 'Hinterland', actName: 'Act 2' }],
  ['clog_c', { missionName: 'Trailer Trashed', actName: 'Act 2' }],
  ['clog_d', { missionName: 'The Clog', actName: 'Act 2' }],
  ['clog_e', { missionName: 'The Broken Bird', actName: 'Act 2' }],
  ['finley_church_a', { missionName: 'Heralds Of The Worm Part 1', actName: 'Act 2' }],
  ['finley_church_b', { missionName: 'Heralds Of The Worm Part 2', actName: 'Act 2' }],
  ['finley_church_c', { missionName: 'Grave Danger', actName: 'Act 2' }],
  ['manor_a', { missionName: 'Farther Afield', actName: 'Act 3' }],
  ['manor_b', { missionName: 'Blazing Trails', actName: 'Act 3' }],
  ['manor_c', { missionName: 'Cabins By The Lake', actName: 'Act 3' }],
  ['manor_d', { missionName: 'Garden Party', actName: 'Act 3' }],
  ['manor_e', { missionName: 'T5', actName: 'Act 3' }],
  ['cdc_a', { missionName: 'A Friend In Need', actName: 'Act 3' }],
  ['cdc_b', { missionName: 'Making The Grade', actName: 'Act 3' }],
  ['cdc_c', { missionName: 'The Road To Hell', actName: 'Act 3' }],
  ['cdc_d', { missionName: 'The Body Dump', actName: 'Act 3' }],
  ['titan_a', { missionName: 'The Abomination', actName: 'Act 4' }],
])
const cleanerMap = new Map([
  ['hero_1', 'Evangelo'],
  ['hero_2', 'Walker'],
  ['hero_3', 'Holly'],
  ['hero_4', 'Hoffman'],
  ['hero_5', 'Doc'],
  ['hero_6', 'Jim'],
  ['hero_7', 'Karlee'],
  ['hero_8', 'Mom'],
])
const difficultyMap = new Map([
  ['easy', 'Recruit'],
  ['normal', 'Veteran'],
  ['hard', 'Nightmare'],
  ['pvp', 'Pvp']
])
const getLatestMission = (missions1: BarSongsHeard, missions2: BarSongsHeard): LatestMission => {
  if (missions1.base - missions2.base === 0) {
    return undefined
  }

  const missionsKeys = Object.getOwnPropertyNames(missions1.keys)
  let latestKey: Array<string> | undefined
  missionsKeys.forEach((key) => {
    if (missions1.keys[key] - missions2.keys[key] > 0 && key.split('::').length === 3) {
      latestKey = key.split('::')
    }
  })

  const { missionName, actName } = missionNameMap.get(latestKey[0])

  return {
    mission: { id: latestKey[0], text: missionName },
    cleaner: { id: latestKey[2], text: cleanerMap.get(latestKey[2]) },
    difficulty: { id: latestKey[1], text: difficultyMap.get(latestKey[1]) },
    act: { id: actName, text: actName }
  }
}

export class PlayerProfileSettings {
  _supplyPoints: number
  _skullTotemPoints: number
  _decks: Array<Deck>
  _stats: PlayerStats
  _missions: Missions

  constructor ({
    supplyPoints,
    skullTotemPoints,
    decks,
    stats,
    missions
  }: PlayerProfileSettingsConstructorProps) {
    this._supplyPoints = supplyPoints
    this._skullTotemPoints = skullTotemPoints
    this._decks = decks
    this._stats = stats
    this._missions = missions
  }

  print () {
    console.log('################################################################')
    console.log('########################### STATS ##############################')
    console.log('################################################################')
    console.log('Supply points:', this._supplyPoints)
    console.log('Skull totems:', this._skullTotemPoints)
    console.log('Decks:', this._decks)
    console.log('Stats:', this._stats)
  }

  /**
   * Subtract the player2 from player1 (player1 - player2)
   *
   * @param {PlayerProfileSettings} player1
   * @param {PlayerProfileSettings} player2
   */
  static subtract (player1: PlayerProfileSettings, player2: PlayerProfileSettings) {
    return new PlayerProfileSettings({
      supplyPoints: player1._supplyPoints - player2._supplyPoints,
      skullTotemPoints: player1._skullTotemPoints = player2._skullTotemPoints,
      decks: player1._decks,
      stats: {
        ammoDropped: player1._stats.ammoDropped - player2._stats.ammoDropped,
        weakSpotDamageInflicted: player1._stats.weakSpotDamageInflicted - player2._stats.weakSpotDamageInflicted,
        treasureDoorsOpened: player1._stats.treasureDoorsOpened - player2._stats.treasureDoorsOpened,
        timesIncappedAsCleaner: player1._stats.timesIncappedAsCleaner - player2._stats.timesIncappedAsCleaner,
        timesDiedAsCleaner: player1._stats.timesDiedAsCleaner - player2._stats.timesDiedAsCleaner,
        specialRiddenDamageInflicted: player1._stats.specialRiddenDamageInflicted - player2._stats.specialRiddenDamageInflicted,
        snitchersSilenced: player1._stats.snitchersSilenced - player2._stats.snitchersSilenced,
        riddenMutationsKilled: player1._stats.riddenMutationsKilled - player2._stats.riddenMutationsKilled,
        riddenKilledWhileIncapped: player1._stats.riddenKilledWhileIncapped - player2._stats.riddenKilledWhileIncapped,
        riddenKilled: player1._stats.riddenKilled - player2._stats.riddenKilled,
        riddenBossesKilled: player1._stats.riddenBossesKilled - player2._stats.riddenBossesKilled,
        hordesTriggered: player1._stats.hordesTriggered - player2._stats.hordesTriggered,
        friendlyDamageInflicted: player1._stats.friendlyDamageInflicted - player2._stats.friendlyDamageInflicted,
        friendlyCleanersKilled: player1._stats.friendlyCleanersKilled - player2._stats.friendlyCleanersKilled,
        enemyDamageInflicted: player1._stats.enemyDamageInflicted - player2._stats.enemyDamageInflicted,
        enemyCleanerDamageInflicted: player1._stats.enemyCleanerDamageInflicted - player2._stats.enemyCleanerDamageInflicted,
        commonRiddenDamageInflicted: player1._stats.commonRiddenDamageInflicted - player2._stats.commonRiddenDamageInflicted,
        cleanersRevived: player1._stats.cleanersRevived - player2._stats.cleanersRevived,
        cleanersRescued: player1._stats.cleanersRescued - player2._stats.cleanersRescued,
        cardsPlayed: player1._stats.cardsPlayed - player2._stats.cardsPlayed,
        caravanItemsPurchased: player1._stats.caravanItemsPurchased - player2._stats.caravanItemsPurchased
      },
      missions: {
        all: player1._missions.all - player2._missions.all,
        rawData: player1._missions.rawData,
        latest: (player1._missions.all - player2._missions.all !== 0) ? getLatestMission(player1._missions.rawData, player2._missions.rawData) : undefined
      }
    })
  }

  static hasNewMissionCompleted (stat1: PlayerProfileSettings, stat2: PlayerProfileSettings) {
    return stat1._missions.all !== stat2._missions.all
  }
}

const jsonUtils = {
  jsonToPlayerStats: (json: StatsJson) => {
    const _supplyPoints = json.offlineData.supplyPoints
    const _skullTotemPoints = json.offlineData.skullTotemPoints
    const _decks = json.offlineData.decks
    const _stats = json.offlineData.stats

    // TODO recent characters
    // TODO unlocked stuffs
    // TODO consumables = burn cards

    const playerStats = new PlayerProfileSettings({
      supplyPoints: _supplyPoints.acquired + _supplyPoints.balanceFromInventory - _supplyPoints.spent,
      skullTotemPoints: _skullTotemPoints.acquired - _skullTotemPoints.spent,
      decks: _decks.map((deck: JsonDeck) => {
        return new Deck({
          id: deck.iD,
          type: deck.type,
          name: deck.name,
          cards: deck.cards.map((card) => new Card(card.substring(card.indexOf('RowName="') + 9, card.lastIndexOf('"')))),
          version: deck.version
        })
      }),
      stats: {
        ammoDropped: _stats.ammoDropped.base,
        caravanItemsPurchased: _stats.caravanItemsPurchased.base,
        cardsPlayed: _stats.cardsPlayed.base,
        cleanersRescued: _stats.cleanersRescued.base,
        cleanersRevived: _stats.cleanersRevived.base,
        commonRiddenDamageInflicted: _stats.commonRiddenDamageInflicted.base,
        enemyCleanerDamageInflicted: _stats.enemyCleanerDamageInflicted.base,
        enemyDamageInflicted: _stats.enemyDamageInflicted.base,
        friendlyCleanersKilled: _stats.friendlyCleanersKilled.base,
        friendlyDamageInflicted: _stats.friendlyDamageInflicted.base,
        hordesTriggered: _stats.hordesTriggered.base,
        riddenBossesKilled: _stats.riddenBossesKilled.base,
        riddenKilled: _stats.riddenKilled.base,
        riddenKilledWhileIncapped: _stats.riddenKilledWhileIncapped.base,
        riddenMutationsKilled: _stats.riddenMutationsKilled.base,
        snitchersSilenced: _stats.snitchersSilenced.base,
        specialRiddenDamageInflicted: _stats.specialRiddenDamageInflicted.base,
        timesDiedAsCleaner: _stats.timesDiedAsCleaner.base,
        timesIncappedAsCleaner: _stats.timesIncappedAsCleaner.base,
        treasureDoorsOpened: _stats.treasureDoorsOpened.base,
        weakSpotDamageInflicted: _stats.weakSpotDamageInflicted.base
      },
      missions: {
        all: _stats.missionsCompleted_Secured.base,
        rawData: _stats.missionsCompleted_Secured
      }
    })
    return playerStats
  }
}

export { jsonUtils }

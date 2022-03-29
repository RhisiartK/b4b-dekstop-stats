export interface StatsJson {
  publicId: string;
  offlineData: OfflineData;
  onlineDataCache: OnlineDataCache;
  version: number;
}

export interface OfflineData {
  supplyPoints: SupplyPoints;
  skullTotemPoints: SkullTotemPoints;
  decks: Deck[];
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

export interface Deck {
  iD: number;
  type: Type;
  name: string;
  cards: string[];
  version: number;
}

export enum Type {
  PVE = 'pvE',
  PVP = 'pvP',
  Solo = 'solo',
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

export class PlayerStats {
  constructor (
    public supplyPoints,
    public skullTotemPoints
  ) {}

  print () {
    console.log('################################################################')
    console.log('########################### STATS ##############################')
    console.log('################################################################')
    console.log('Supply points:', this.supplyPoints)
    console.log('Skull totems:', this.skullTotemPoints)
  }
}

const jsonUtils = {
  jsonChanges: (json1: StatsJson, json2: StatsJson) => {
    console.log(json2.offlineData.supplyPoints.acquired + json2.offlineData.supplyPoints.balanceFromInventory - json2.offlineData.supplyPoints.spent)

    const playerStats = new PlayerStats(
      (json2.offlineData.supplyPoints.acquired + json2.offlineData.supplyPoints.balanceFromInventory - json2.offlineData.supplyPoints.spent) - (json1.offlineData.supplyPoints.acquired + json1.offlineData.supplyPoints.balanceFromInventory - json1.offlineData.supplyPoints.spent),
      json2.offlineData.skullTotemPoints.acquired = json1.offlineData.skullTotemPoints.spent
    )
    playerStats.print()
  }
}

export { jsonUtils }

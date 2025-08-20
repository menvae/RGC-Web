/* tslint:disable */
/* eslint-disable */
export function write_to_osu(chart: Chart): string;
export function write_to_sm(chart: Chart): string;
export function write_to_qua(chart: Chart): string;
export function write_to_fsc(chart: Chart): string;
export function parse_from_osu(raw_chart: string): Chart;
export function parse_from_sm(raw_chart: string): Chart;
export function parse_from_qua(raw_chart: string): Chart;
export function parse_from_fsc(raw_chart: string): Chart;
export enum CatchHitobjectType {
  Empty = 0,
  Fruit = 1,
  Juice = 2,
  Banana = 3,
  Hyperfruit = 4,
  Unknown = 5,
}
export enum HitSoundType {
  Normal = 0,
  Clap = 1,
  Whistle = 2,
  Finish = 3,
}
export enum KeyType {
  Empty = 0,
  Normal = 1,
  SliderStart = 2,
  SliderEnd = 3,
  Mine = 4,
  Fake = 5,
  Unknown = 6,
}
export enum OsuHitobjectType {
  Empty = 0,
  HitCircle = 1,
  Slider = 2,
  Spinner = 3,
  Unknown = 4,
}
export enum TaikoHitobjectType {
  Empty = 0,
  Don = 1,
  Kat = 2,
  BonusDon = 3,
  BonusKat = 4,
  DrumRoll = 5,
  BonusDrumRoll = 6,
  Balloon = 7,
  Unknown = 8,
}
export enum TimingChangeType {
  Bpm = 0,
  Sv = 1,
  Stop = 2,
}
export class CatchHitobject {
  private constructor();
  free(): void;
  static empty(): CatchHitobject;
  static fruit(x_position: number): CatchHitobject;
  static juice(x_position: number): CatchHitobject;
  static banana(x_position: number, end_time: number): CatchHitobject;
  static hyperfruit(x_position: number): CatchHitobject;
  static unknown(): CatchHitobject;
  end_time(): number | undefined;
  is_hyperdash(): boolean;
  object_type: CatchHitobjectType;
  x_position: number;
  get end_time(): number | undefined;
  set end_time(value: number | null | undefined);
  hyperdash: boolean;
}
export class Chart {
  private constructor();
  free(): void;
  metadata: Metadata;
  chartinfo: ChartInfo;
  timing_points: TimingPoints;
  hitobjects: HitObjects;
  get soundbank(): SoundBank | undefined;
  set soundbank(value: SoundBank | null | undefined);
}
export class ChartInfo {
  private constructor();
  free(): void;
  static new(difficulty_name: string, hp: number, od: number, bg_path: string, video_path: string, song_path: string, audio_offset: number, preview_time: number, key_count: number): ChartInfo;
  static empty(): ChartInfo;
  difficulty_name: string;
  od: number;
  hp: number;
  bg_path: string;
  video_path: string;
  song_path: string;
  audio_offset: number;
  preview_time: number;
  key_count: number;
}
export class HitObjects {
  private constructor();
  free(): void;
}
export class Key {
  private constructor();
  free(): void;
  static empty(): Key;
  static normal(): Key;
  static slider_start(value?: number | null): Key;
  static slider_end(): Key;
  static mine(): Key;
  static fake(): Key;
  static unknown(): Key;
  slider_end_time(): number | undefined;
  key_type: KeyType;
  get slider_end_time(): number | undefined;
  set slider_end_time(value: number | null | undefined);
}
export class KeySound {
  private constructor();
  free(): void;
  volume: number;
  hitsound_type: HitSoundType;
  get sample(): number | undefined;
  set sample(value: number | null | undefined);
  has_custom: boolean;
}
export class KeySoundRow {
  private constructor();
  free(): void;
  is_empty: boolean;
}
export class Metadata {
  private constructor();
  free(): void;
  title: string;
  alt_title: string;
  artist: string;
  alt_artist: string;
  creator: string;
  genre: string;
  tags: string[];
  source: string;
}
export class OsuHitobject {
  private constructor();
  free(): void;
  static empty(): OsuHitobject;
  static hit_circle(x: number, y: number): OsuHitobject;
  static slider(x: number, y: number): OsuHitobject;
  static spinner(end_time: number): OsuHitobject;
  static unknown(): OsuHitobject;
  with_new_combo(): OsuHitobject;
  with_combo_skip(skip: number): OsuHitobject;
  end_time(): number | undefined;
  is_new_combo(): boolean;
  combo_skip(): number;
  object_type: OsuHitobjectType;
  x: number;
  y: number;
  get end_time(): number | undefined;
  set end_time(value: number | null | undefined);
  new_combo: boolean;
  combo_skip: number;
}
export class SoundBank {
  free(): void;
  constructor();
  add_sound_sample(path: string): number;
  add_sound_sample_with_index(index: number, path: string): void;
  add_sound_effect(sound_effect: SoundEffect): void;
  get_sound_sample(index: number): string | undefined;
  get_index_sample(sample_path: string): number | undefined;
  get_sample_paths(): string[];
  contains_path(path: string): boolean;
  sample_count(): number;
  is_empty(): boolean;
  audio_tracks: string[];
  sound_effects: SoundEffect[];
}
export class SoundEffect {
  free(): void;
  constructor(time: number, volume: number, sample: number);
  time: number;
  volume: number;
  sample: number;
}
export class TaikoHitobject {
  private constructor();
  free(): void;
  static empty(): TaikoHitobject;
  static don(): TaikoHitobject;
  static kat(): TaikoHitobject;
  static bonus_don(): TaikoHitobject;
  static bonus_kat(): TaikoHitobject;
  static drum_roll(end_time: number): TaikoHitobject;
  static bonus_drum_roll(end_time: number): TaikoHitobject;
  static balloon(end_time: number): TaikoHitobject;
  static unknown(): TaikoHitobject;
  end_time(): number | undefined;
  note_type: TaikoHitobjectType;
  get end_time(): number | undefined;
  set end_time(value: number | null | undefined);
}
export class TimingPoints {
  private constructor();
  free(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly write_to_osu: (a: number) => [number, number, number, number];
  readonly write_to_sm: (a: number) => [number, number, number, number];
  readonly write_to_qua: (a: number) => [number, number, number, number];
  readonly write_to_fsc: (a: number) => [number, number, number, number];
  readonly __wbg_key_free: (a: number, b: number) => void;
  readonly __wbg_get_key_key_type: (a: number) => number;
  readonly __wbg_set_key_key_type: (a: number, b: number) => void;
  readonly key_empty: () => number;
  readonly key_normal: () => number;
  readonly key_slider_start: (a: number) => number;
  readonly key_slider_end: () => number;
  readonly key_mine: () => number;
  readonly key_fake: () => number;
  readonly key_unknown: () => number;
  readonly __wbg_taikohitobject_free: (a: number, b: number) => void;
  readonly __wbg_get_taikohitobject_note_type: (a: number) => number;
  readonly __wbg_set_taikohitobject_note_type: (a: number, b: number) => void;
  readonly taikohitobject_kat: () => number;
  readonly taikohitobject_drum_roll: (a: number) => number;
  readonly taikohitobject_bonus_drum_roll: (a: number) => number;
  readonly taikohitobject_balloon: (a: number) => number;
  readonly taikohitobject_unknown: () => number;
  readonly __wbg_catchhitobject_free: (a: number, b: number) => void;
  readonly __wbg_get_catchhitobject_object_type: (a: number) => number;
  readonly __wbg_set_catchhitobject_object_type: (a: number, b: number) => void;
  readonly __wbg_get_catchhitobject_x_position: (a: number) => number;
  readonly __wbg_set_catchhitobject_x_position: (a: number, b: number) => void;
  readonly __wbg_get_catchhitobject_end_time: (a: number) => number;
  readonly __wbg_set_catchhitobject_end_time: (a: number, b: number) => void;
  readonly __wbg_get_catchhitobject_hyperdash: (a: number) => number;
  readonly __wbg_set_catchhitobject_hyperdash: (a: number, b: number) => void;
  readonly catchhitobject_empty: () => number;
  readonly catchhitobject_fruit: (a: number) => number;
  readonly catchhitobject_juice: (a: number) => number;
  readonly catchhitobject_banana: (a: number, b: number) => number;
  readonly catchhitobject_hyperfruit: (a: number) => number;
  readonly catchhitobject_unknown: () => number;
  readonly catchhitobject_end_time: (a: number) => number;
  readonly catchhitobject_is_hyperdash: (a: number) => number;
  readonly __wbg_osuhitobject_free: (a: number, b: number) => void;
  readonly __wbg_get_osuhitobject_object_type: (a: number) => number;
  readonly __wbg_set_osuhitobject_object_type: (a: number, b: number) => void;
  readonly __wbg_get_osuhitobject_y: (a: number) => number;
  readonly __wbg_set_osuhitobject_y: (a: number, b: number) => void;
  readonly __wbg_get_osuhitobject_new_combo: (a: number) => number;
  readonly __wbg_set_osuhitobject_new_combo: (a: number, b: number) => void;
  readonly __wbg_get_osuhitobject_combo_skip: (a: number) => number;
  readonly __wbg_set_osuhitobject_combo_skip: (a: number, b: number) => void;
  readonly osuhitobject_empty: () => number;
  readonly osuhitobject_hit_circle: (a: number, b: number) => number;
  readonly osuhitobject_slider: (a: number, b: number) => number;
  readonly osuhitobject_spinner: (a: number) => number;
  readonly osuhitobject_unknown: () => number;
  readonly osuhitobject_with_new_combo: (a: number) => number;
  readonly osuhitobject_with_combo_skip: (a: number, b: number) => number;
  readonly osuhitobject_is_new_combo: (a: number) => number;
  readonly osuhitobject_combo_skip: (a: number) => number;
  readonly __wbg_timingpoints_free: (a: number, b: number) => void;
  readonly __wbg_set_osuhitobject_x: (a: number, b: number) => void;
  readonly __wbg_get_osuhitobject_x: (a: number) => number;
  readonly taikohitobject_empty: () => number;
  readonly taikohitobject_don: () => number;
  readonly taikohitobject_bonus_don: () => number;
  readonly taikohitobject_bonus_kat: () => number;
  readonly __wbg_set_taikohitobject_end_time: (a: number, b: number) => void;
  readonly __wbg_set_key_slider_end_time: (a: number, b: number) => void;
  readonly __wbg_set_osuhitobject_end_time: (a: number, b: number) => void;
  readonly __wbg_get_taikohitobject_end_time: (a: number) => number;
  readonly __wbg_get_key_slider_end_time: (a: number) => number;
  readonly __wbg_get_osuhitobject_end_time: (a: number) => number;
  readonly taikohitobject_end_time: (a: number) => number;
  readonly key_slider_end_time: (a: number) => number;
  readonly osuhitobject_end_time: (a: number) => number;
  readonly __wbg_metadata_free: (a: number, b: number) => void;
  readonly __wbg_get_metadata_title: (a: number) => [number, number];
  readonly __wbg_set_metadata_title: (a: number, b: number, c: number) => void;
  readonly __wbg_get_metadata_alt_title: (a: number) => [number, number];
  readonly __wbg_set_metadata_alt_title: (a: number, b: number, c: number) => void;
  readonly __wbg_get_metadata_artist: (a: number) => [number, number];
  readonly __wbg_set_metadata_artist: (a: number, b: number, c: number) => void;
  readonly __wbg_get_metadata_alt_artist: (a: number) => [number, number];
  readonly __wbg_set_metadata_alt_artist: (a: number, b: number, c: number) => void;
  readonly __wbg_get_metadata_creator: (a: number) => [number, number];
  readonly __wbg_set_metadata_creator: (a: number, b: number, c: number) => void;
  readonly __wbg_get_metadata_genre: (a: number) => [number, number];
  readonly __wbg_set_metadata_genre: (a: number, b: number, c: number) => void;
  readonly __wbg_get_metadata_tags: (a: number) => [number, number];
  readonly __wbg_set_metadata_tags: (a: number, b: number, c: number) => void;
  readonly __wbg_get_metadata_source: (a: number) => [number, number];
  readonly __wbg_set_metadata_source: (a: number, b: number, c: number) => void;
  readonly __wbg_chartinfo_free: (a: number, b: number) => void;
  readonly __wbg_get_chartinfo_difficulty_name: (a: number) => [number, number];
  readonly __wbg_set_chartinfo_difficulty_name: (a: number, b: number, c: number) => void;
  readonly __wbg_get_chartinfo_od: (a: number) => number;
  readonly __wbg_set_chartinfo_od: (a: number, b: number) => void;
  readonly __wbg_get_chartinfo_hp: (a: number) => number;
  readonly __wbg_set_chartinfo_hp: (a: number, b: number) => void;
  readonly __wbg_get_chartinfo_bg_path: (a: number) => [number, number];
  readonly __wbg_set_chartinfo_bg_path: (a: number, b: number, c: number) => void;
  readonly __wbg_get_chartinfo_video_path: (a: number) => [number, number];
  readonly __wbg_set_chartinfo_video_path: (a: number, b: number, c: number) => void;
  readonly __wbg_get_chartinfo_song_path: (a: number) => [number, number];
  readonly __wbg_set_chartinfo_song_path: (a: number, b: number, c: number) => void;
  readonly __wbg_get_chartinfo_audio_offset: (a: number) => number;
  readonly __wbg_set_chartinfo_audio_offset: (a: number, b: number) => void;
  readonly __wbg_get_chartinfo_preview_time: (a: number) => number;
  readonly __wbg_set_chartinfo_preview_time: (a: number, b: number) => void;
  readonly __wbg_get_chartinfo_key_count: (a: number) => number;
  readonly __wbg_set_chartinfo_key_count: (a: number, b: number) => void;
  readonly chartinfo_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number) => number;
  readonly chartinfo_empty: () => number;
  readonly __wbg_soundeffect_free: (a: number, b: number) => void;
  readonly __wbg_get_soundeffect_time: (a: number) => number;
  readonly __wbg_set_soundeffect_time: (a: number, b: number) => void;
  readonly __wbg_get_soundeffect_volume: (a: number) => number;
  readonly __wbg_set_soundeffect_volume: (a: number, b: number) => void;
  readonly __wbg_get_soundeffect_sample: (a: number) => number;
  readonly __wbg_set_soundeffect_sample: (a: number, b: number) => void;
  readonly soundeffect_new: (a: number, b: number, c: number) => number;
  readonly __wbg_keysound_free: (a: number, b: number) => void;
  readonly __wbg_get_keysound_volume: (a: number) => number;
  readonly __wbg_set_keysound_volume: (a: number, b: number) => void;
  readonly __wbg_get_keysound_hitsound_type: (a: number) => number;
  readonly __wbg_set_keysound_hitsound_type: (a: number, b: number) => void;
  readonly __wbg_get_keysound_sample: (a: number) => number;
  readonly __wbg_set_keysound_sample: (a: number, b: number) => void;
  readonly __wbg_get_keysound_has_custom: (a: number) => number;
  readonly __wbg_set_keysound_has_custom: (a: number, b: number) => void;
  readonly __wbg_keysoundrow_free: (a: number, b: number) => void;
  readonly __wbg_get_keysoundrow_is_empty: (a: number) => number;
  readonly __wbg_set_keysoundrow_is_empty: (a: number, b: number) => void;
  readonly __wbg_soundbank_free: (a: number, b: number) => void;
  readonly __wbg_get_soundbank_audio_tracks: (a: number) => [number, number];
  readonly __wbg_set_soundbank_audio_tracks: (a: number, b: number, c: number) => void;
  readonly __wbg_get_soundbank_sound_effects: (a: number) => [number, number];
  readonly __wbg_set_soundbank_sound_effects: (a: number, b: number, c: number) => void;
  readonly soundbank_new: () => number;
  readonly soundbank_add_sound_sample: (a: number, b: number, c: number) => number;
  readonly soundbank_add_sound_sample_with_index: (a: number, b: number, c: number, d: number) => void;
  readonly soundbank_add_sound_effect: (a: number, b: number) => void;
  readonly soundbank_get_sound_sample: (a: number, b: number) => [number, number];
  readonly soundbank_get_index_sample: (a: number, b: number, c: number) => number;
  readonly soundbank_get_sample_paths: (a: number) => [number, number];
  readonly soundbank_contains_path: (a: number, b: number, c: number) => number;
  readonly soundbank_sample_count: (a: number) => number;
  readonly soundbank_is_empty: (a: number) => number;
  readonly __wbg_hitobjects_free: (a: number, b: number) => void;
  readonly parse_from_osu: (a: number, b: number) => [number, number, number];
  readonly parse_from_sm: (a: number, b: number) => [number, number, number];
  readonly parse_from_qua: (a: number, b: number) => [number, number, number];
  readonly parse_from_fsc: (a: number, b: number) => [number, number, number];
  readonly __wbg_chart_free: (a: number, b: number) => void;
  readonly __wbg_get_chart_metadata: (a: number) => number;
  readonly __wbg_set_chart_metadata: (a: number, b: number) => void;
  readonly __wbg_get_chart_chartinfo: (a: number) => number;
  readonly __wbg_set_chart_chartinfo: (a: number, b: number) => void;
  readonly __wbg_get_chart_timing_points: (a: number) => number;
  readonly __wbg_set_chart_timing_points: (a: number, b: number) => void;
  readonly __wbg_get_chart_hitobjects: (a: number) => number;
  readonly __wbg_set_chart_hitobjects: (a: number, b: number) => void;
  readonly __wbg_get_chart_soundbank: (a: number) => number;
  readonly __wbg_set_chart_soundbank: (a: number, b: number) => void;
  readonly __wbindgen_export_0: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __externref_drop_slice: (a: number, b: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;

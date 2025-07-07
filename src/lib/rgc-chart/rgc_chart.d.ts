/* tslint:disable */
/* eslint-disable */
export function parse_from_osu(raw_chart: string): Chart;
export function parse_from_sm(raw_chart: string): Chart;
export function parse_from_qua(raw_chart: string): Chart;
export function write_to_osu(chart: Chart): string;
export function write_to_sm(chart: Chart): string;
export function write_to_qua(chart: Chart): string;
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
export enum TimingChangeType {
  Bpm = 0,
  Sv = 1,
  Stop = 2,
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
  static new(difficulty_name: string, bg_path: string, song_path: string, audio_offset: number, preview_time: number, key_count: number): ChartInfo;
  static empty(): ChartInfo;
  difficulty_name: string;
  bg_path: string;
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
export class TimingPoints {
  private constructor();
  free(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly parse_from_osu: (a: number, b: number) => [number, number, number];
  readonly parse_from_sm: (a: number, b: number) => [number, number, number];
  readonly parse_from_qua: (a: number, b: number) => [number, number, number];
  readonly write_to_osu: (a: number) => [number, number, number, number];
  readonly write_to_sm: (a: number) => [number, number, number, number];
  readonly write_to_qua: (a: number) => [number, number, number, number];
  readonly __wbg_timingpoints_free: (a: number, b: number) => void;
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
  readonly __wbg_chartinfo_free: (a: number, b: number) => void;
  readonly __wbg_get_chartinfo_difficulty_name: (a: number) => [number, number];
  readonly __wbg_set_chartinfo_difficulty_name: (a: number, b: number, c: number) => void;
  readonly __wbg_get_chartinfo_bg_path: (a: number) => [number, number];
  readonly __wbg_set_chartinfo_bg_path: (a: number, b: number, c: number) => void;
  readonly __wbg_get_chartinfo_song_path: (a: number) => [number, number];
  readonly __wbg_set_chartinfo_song_path: (a: number, b: number, c: number) => void;
  readonly __wbg_get_chartinfo_audio_offset: (a: number) => number;
  readonly __wbg_set_chartinfo_audio_offset: (a: number, b: number) => void;
  readonly __wbg_get_chartinfo_preview_time: (a: number) => number;
  readonly __wbg_set_chartinfo_preview_time: (a: number, b: number) => void;
  readonly __wbg_get_chartinfo_key_count: (a: number) => number;
  readonly __wbg_set_chartinfo_key_count: (a: number, b: number) => void;
  readonly chartinfo_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => number;
  readonly chartinfo_empty: () => number;
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
  readonly __wbg_hitobjects_free: (a: number, b: number) => void;
  readonly __wbg_key_free: (a: number, b: number) => void;
  readonly __wbg_get_key_key_type: (a: number) => number;
  readonly __wbg_set_key_key_type: (a: number, b: number) => void;
  readonly __wbg_get_key_slider_end_time: (a: number) => number;
  readonly __wbg_set_key_slider_end_time: (a: number, b: number) => void;
  readonly key_empty: () => number;
  readonly key_normal: () => number;
  readonly key_slider_start: (a: number) => number;
  readonly key_slider_end: () => number;
  readonly key_mine: () => number;
  readonly key_fake: () => number;
  readonly key_unknown: () => number;
  readonly key_slider_end_time: (a: number) => number;
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

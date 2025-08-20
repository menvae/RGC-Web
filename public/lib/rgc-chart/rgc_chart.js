let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_0.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}
/**
 * @param {Chart} chart
 * @returns {string}
 */
export function write_to_osu(chart) {
    let deferred2_0;
    let deferred2_1;
    try {
        _assertClass(chart, Chart);
        const ret = wasm.write_to_osu(chart.__wbg_ptr);
        var ptr1 = ret[0];
        var len1 = ret[1];
        if (ret[3]) {
            ptr1 = 0; len1 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @param {Chart} chart
 * @returns {string}
 */
export function write_to_sm(chart) {
    let deferred2_0;
    let deferred2_1;
    try {
        _assertClass(chart, Chart);
        const ret = wasm.write_to_sm(chart.__wbg_ptr);
        var ptr1 = ret[0];
        var len1 = ret[1];
        if (ret[3]) {
            ptr1 = 0; len1 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @param {Chart} chart
 * @returns {string}
 */
export function write_to_qua(chart) {
    let deferred2_0;
    let deferred2_1;
    try {
        _assertClass(chart, Chart);
        const ret = wasm.write_to_qua(chart.__wbg_ptr);
        var ptr1 = ret[0];
        var len1 = ret[1];
        if (ret[3]) {
            ptr1 = 0; len1 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

/**
 * @param {Chart} chart
 * @returns {string}
 */
export function write_to_fsc(chart) {
    let deferred2_0;
    let deferred2_1;
    try {
        _assertClass(chart, Chart);
        const ret = wasm.write_to_fsc(chart.__wbg_ptr);
        var ptr1 = ret[0];
        var len1 = ret[1];
        if (ret[3]) {
            ptr1 = 0; len1 = 0;
            throw takeFromExternrefTable0(ret[2]);
        }
        deferred2_0 = ptr1;
        deferred2_1 = len1;
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_free(deferred2_0, deferred2_1, 1);
    }
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_export_0.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_0.set(idx, obj);
    return idx;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4, 4) >>> 0;
    for (let i = 0; i < array.length; i++) {
        const add = addToExternrefTable0(array[i]);
        getDataViewMemory0().setUint32(ptr + 4 * i, add, true);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}
/**
 * @param {string} raw_chart
 * @returns {Chart}
 */
export function parse_from_osu(raw_chart) {
    const ptr0 = passStringToWasm0(raw_chart, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.parse_from_osu(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return Chart.__wrap(ret[0]);
}

/**
 * @param {string} raw_chart
 * @returns {Chart}
 */
export function parse_from_sm(raw_chart) {
    const ptr0 = passStringToWasm0(raw_chart, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.parse_from_sm(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return Chart.__wrap(ret[0]);
}

/**
 * @param {string} raw_chart
 * @returns {Chart}
 */
export function parse_from_qua(raw_chart) {
    const ptr0 = passStringToWasm0(raw_chart, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.parse_from_qua(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return Chart.__wrap(ret[0]);
}

/**
 * @param {string} raw_chart
 * @returns {Chart}
 */
export function parse_from_fsc(raw_chart) {
    const ptr0 = passStringToWasm0(raw_chart, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.parse_from_fsc(ptr0, len0);
    if (ret[2]) {
        throw takeFromExternrefTable0(ret[1]);
    }
    return Chart.__wrap(ret[0]);
}

/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5}
 */
export const CatchHitobjectType = Object.freeze({
    Empty: 0, "0": "Empty",
    Fruit: 1, "1": "Fruit",
    Juice: 2, "2": "Juice",
    Banana: 3, "3": "Banana",
    Hyperfruit: 4, "4": "Hyperfruit",
    Unknown: 5, "5": "Unknown",
});
/**
 * @enum {0 | 1 | 2 | 3}
 */
export const HitSoundType = Object.freeze({
    Normal: 0, "0": "Normal",
    Clap: 1, "1": "Clap",
    Whistle: 2, "2": "Whistle",
    Finish: 3, "3": "Finish",
});
/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6}
 */
export const KeyType = Object.freeze({
    Empty: 0, "0": "Empty",
    Normal: 1, "1": "Normal",
    SliderStart: 2, "2": "SliderStart",
    SliderEnd: 3, "3": "SliderEnd",
    Mine: 4, "4": "Mine",
    Fake: 5, "5": "Fake",
    Unknown: 6, "6": "Unknown",
});
/**
 * @enum {0 | 1 | 2 | 3 | 4}
 */
export const OsuHitobjectType = Object.freeze({
    Empty: 0, "0": "Empty",
    HitCircle: 1, "1": "HitCircle",
    Slider: 2, "2": "Slider",
    Spinner: 3, "3": "Spinner",
    Unknown: 4, "4": "Unknown",
});
/**
 * @enum {0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}
 */
export const TaikoHitobjectType = Object.freeze({
    Empty: 0, "0": "Empty",
    Don: 1, "1": "Don",
    Kat: 2, "2": "Kat",
    BonusDon: 3, "3": "BonusDon",
    BonusKat: 4, "4": "BonusKat",
    DrumRoll: 5, "5": "DrumRoll",
    BonusDrumRoll: 6, "6": "BonusDrumRoll",
    Balloon: 7, "7": "Balloon",
    Unknown: 8, "8": "Unknown",
});
/**
 * @enum {0 | 1 | 2}
 */
export const TimingChangeType = Object.freeze({
    Bpm: 0, "0": "Bpm",
    Sv: 1, "1": "Sv",
    Stop: 2, "2": "Stop",
});

const CatchHitobjectFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_catchhitobject_free(ptr >>> 0, 1));

export class CatchHitobject {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(CatchHitobject.prototype);
        obj.__wbg_ptr = ptr;
        CatchHitobjectFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        CatchHitobjectFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_catchhitobject_free(ptr, 0);
    }
    /**
     * @returns {CatchHitobjectType}
     */
    get object_type() {
        const ret = wasm.__wbg_get_catchhitobject_object_type(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {CatchHitobjectType} arg0
     */
    set object_type(arg0) {
        wasm.__wbg_set_catchhitobject_object_type(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get x_position() {
        const ret = wasm.__wbg_get_catchhitobject_x_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set x_position(arg0) {
        wasm.__wbg_set_catchhitobject_x_position(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number | undefined}
     */
    get end_time() {
        const ret = wasm.__wbg_get_catchhitobject_end_time(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set end_time(arg0) {
        wasm.__wbg_set_catchhitobject_end_time(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
    }
    /**
     * @returns {boolean}
     */
    get hyperdash() {
        const ret = wasm.__wbg_get_catchhitobject_hyperdash(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set hyperdash(arg0) {
        wasm.__wbg_set_catchhitobject_hyperdash(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {CatchHitobject}
     */
    static empty() {
        const ret = wasm.catchhitobject_empty();
        return CatchHitobject.__wrap(ret);
    }
    /**
     * @param {number} x_position
     * @returns {CatchHitobject}
     */
    static fruit(x_position) {
        const ret = wasm.catchhitobject_fruit(x_position);
        return CatchHitobject.__wrap(ret);
    }
    /**
     * @param {number} x_position
     * @returns {CatchHitobject}
     */
    static juice(x_position) {
        const ret = wasm.catchhitobject_juice(x_position);
        return CatchHitobject.__wrap(ret);
    }
    /**
     * @param {number} x_position
     * @param {number} end_time
     * @returns {CatchHitobject}
     */
    static banana(x_position, end_time) {
        const ret = wasm.catchhitobject_banana(x_position, end_time);
        return CatchHitobject.__wrap(ret);
    }
    /**
     * @param {number} x_position
     * @returns {CatchHitobject}
     */
    static hyperfruit(x_position) {
        const ret = wasm.catchhitobject_hyperfruit(x_position);
        return CatchHitobject.__wrap(ret);
    }
    /**
     * @returns {CatchHitobject}
     */
    static unknown() {
        const ret = wasm.catchhitobject_unknown();
        return CatchHitobject.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    end_time() {
        const ret = wasm.catchhitobject_end_time(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    is_hyperdash() {
        const ret = wasm.catchhitobject_is_hyperdash(this.__wbg_ptr);
        return ret !== 0;
    }
}

const ChartFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_chart_free(ptr >>> 0, 1));

export class Chart {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Chart.prototype);
        obj.__wbg_ptr = ptr;
        ChartFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ChartFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_chart_free(ptr, 0);
    }
    /**
     * @returns {Metadata}
     */
    get metadata() {
        const ret = wasm.__wbg_get_chart_metadata(this.__wbg_ptr);
        return Metadata.__wrap(ret);
    }
    /**
     * @param {Metadata} arg0
     */
    set metadata(arg0) {
        _assertClass(arg0, Metadata);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_chart_metadata(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {ChartInfo}
     */
    get chartinfo() {
        const ret = wasm.__wbg_get_chart_chartinfo(this.__wbg_ptr);
        return ChartInfo.__wrap(ret);
    }
    /**
     * @param {ChartInfo} arg0
     */
    set chartinfo(arg0) {
        _assertClass(arg0, ChartInfo);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_chart_chartinfo(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {TimingPoints}
     */
    get timing_points() {
        const ret = wasm.__wbg_get_chart_timing_points(this.__wbg_ptr);
        return TimingPoints.__wrap(ret);
    }
    /**
     * @param {TimingPoints} arg0
     */
    set timing_points(arg0) {
        _assertClass(arg0, TimingPoints);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_chart_timing_points(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {HitObjects}
     */
    get hitobjects() {
        const ret = wasm.__wbg_get_chart_hitobjects(this.__wbg_ptr);
        return HitObjects.__wrap(ret);
    }
    /**
     * @param {HitObjects} arg0
     */
    set hitobjects(arg0) {
        _assertClass(arg0, HitObjects);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_chart_hitobjects(this.__wbg_ptr, ptr0);
    }
    /**
     * @returns {SoundBank | undefined}
     */
    get soundbank() {
        const ret = wasm.__wbg_get_chart_soundbank(this.__wbg_ptr);
        return ret === 0 ? undefined : SoundBank.__wrap(ret);
    }
    /**
     * @param {SoundBank | null} [arg0]
     */
    set soundbank(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, SoundBank);
            ptr0 = arg0.__destroy_into_raw();
        }
        wasm.__wbg_set_chart_soundbank(this.__wbg_ptr, ptr0);
    }
}

const ChartInfoFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_chartinfo_free(ptr >>> 0, 1));

export class ChartInfo {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ChartInfo.prototype);
        obj.__wbg_ptr = ptr;
        ChartInfoFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ChartInfoFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_chartinfo_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get difficulty_name() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_chartinfo_difficulty_name(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set difficulty_name(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_chartinfo_difficulty_name(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {number}
     */
    get od() {
        const ret = wasm.__wbg_get_chartinfo_od(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set od(arg0) {
        wasm.__wbg_set_chartinfo_od(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get hp() {
        const ret = wasm.__wbg_get_chartinfo_hp(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set hp(arg0) {
        wasm.__wbg_set_chartinfo_hp(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {string}
     */
    get bg_path() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_chartinfo_bg_path(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set bg_path(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_chartinfo_bg_path(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get video_path() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_chartinfo_video_path(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set video_path(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_chartinfo_video_path(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get song_path() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_chartinfo_song_path(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set song_path(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_chartinfo_song_path(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {number}
     */
    get audio_offset() {
        const ret = wasm.__wbg_get_chartinfo_audio_offset(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set audio_offset(arg0) {
        wasm.__wbg_set_chartinfo_audio_offset(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get preview_time() {
        const ret = wasm.__wbg_get_chartinfo_preview_time(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set preview_time(arg0) {
        wasm.__wbg_set_chartinfo_preview_time(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get key_count() {
        const ret = wasm.__wbg_get_chartinfo_key_count(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set key_count(arg0) {
        wasm.__wbg_set_chartinfo_key_count(this.__wbg_ptr, arg0);
    }
    /**
     * @param {string} difficulty_name
     * @param {number} hp
     * @param {number} od
     * @param {string} bg_path
     * @param {string} video_path
     * @param {string} song_path
     * @param {number} audio_offset
     * @param {number} preview_time
     * @param {number} key_count
     * @returns {ChartInfo}
     */
    static new(difficulty_name, hp, od, bg_path, video_path, song_path, audio_offset, preview_time, key_count) {
        const ptr0 = passStringToWasm0(difficulty_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(bg_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(video_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passStringToWasm0(song_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        const ret = wasm.chartinfo_new(ptr0, len0, hp, od, ptr1, len1, ptr2, len2, ptr3, len3, audio_offset, preview_time, key_count);
        return ChartInfo.__wrap(ret);
    }
    /**
     * @returns {ChartInfo}
     */
    static empty() {
        const ret = wasm.chartinfo_empty();
        return ChartInfo.__wrap(ret);
    }
}

const HitObjectsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_hitobjects_free(ptr >>> 0, 1));

export class HitObjects {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(HitObjects.prototype);
        obj.__wbg_ptr = ptr;
        HitObjectsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        HitObjectsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_hitobjects_free(ptr, 0);
    }
}

const KeyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_key_free(ptr >>> 0, 1));

export class Key {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Key.prototype);
        obj.__wbg_ptr = ptr;
        KeyFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        KeyFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_key_free(ptr, 0);
    }
    /**
     * @returns {KeyType}
     */
    get key_type() {
        const ret = wasm.__wbg_get_key_key_type(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {KeyType} arg0
     */
    set key_type(arg0) {
        wasm.__wbg_set_key_key_type(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number | undefined}
     */
    get slider_end_time() {
        const ret = wasm.__wbg_get_catchhitobject_end_time(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set slider_end_time(arg0) {
        wasm.__wbg_set_catchhitobject_end_time(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
    }
    /**
     * @returns {Key}
     */
    static empty() {
        const ret = wasm.key_empty();
        return Key.__wrap(ret);
    }
    /**
     * @returns {Key}
     */
    static normal() {
        const ret = wasm.key_normal();
        return Key.__wrap(ret);
    }
    /**
     * @param {number | null} [value]
     * @returns {Key}
     */
    static slider_start(value) {
        const ret = wasm.key_slider_start(isLikeNone(value) ? 0x100000001 : (value) >> 0);
        return Key.__wrap(ret);
    }
    /**
     * @returns {Key}
     */
    static slider_end() {
        const ret = wasm.key_slider_end();
        return Key.__wrap(ret);
    }
    /**
     * @returns {Key}
     */
    static mine() {
        const ret = wasm.key_mine();
        return Key.__wrap(ret);
    }
    /**
     * @returns {Key}
     */
    static fake() {
        const ret = wasm.key_fake();
        return Key.__wrap(ret);
    }
    /**
     * @returns {Key}
     */
    static unknown() {
        const ret = wasm.key_unknown();
        return Key.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    slider_end_time() {
        const ret = wasm.catchhitobject_end_time(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
}

const KeySoundFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_keysound_free(ptr >>> 0, 1));

export class KeySound {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        KeySoundFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_keysound_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get volume() {
        const ret = wasm.__wbg_get_keysound_volume(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set volume(arg0) {
        wasm.__wbg_set_keysound_volume(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {HitSoundType}
     */
    get hitsound_type() {
        const ret = wasm.__wbg_get_keysound_hitsound_type(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {HitSoundType} arg0
     */
    set hitsound_type(arg0) {
        wasm.__wbg_set_keysound_hitsound_type(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number | undefined}
     */
    get sample() {
        const ret = wasm.__wbg_get_keysound_sample(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set sample(arg0) {
        wasm.__wbg_set_keysound_sample(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >>> 0);
    }
    /**
     * @returns {boolean}
     */
    get has_custom() {
        const ret = wasm.__wbg_get_keysound_has_custom(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set has_custom(arg0) {
        wasm.__wbg_set_keysound_has_custom(this.__wbg_ptr, arg0);
    }
}

const KeySoundRowFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_keysoundrow_free(ptr >>> 0, 1));

export class KeySoundRow {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        KeySoundRowFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_keysoundrow_free(ptr, 0);
    }
    /**
     * @returns {boolean}
     */
    get is_empty() {
        const ret = wasm.__wbg_get_keysoundrow_is_empty(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set is_empty(arg0) {
        wasm.__wbg_set_keysoundrow_is_empty(this.__wbg_ptr, arg0);
    }
}

const MetadataFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_metadata_free(ptr >>> 0, 1));

export class Metadata {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Metadata.prototype);
        obj.__wbg_ptr = ptr;
        MetadataFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        MetadataFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_metadata_free(ptr, 0);
    }
    /**
     * @returns {string}
     */
    get title() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_metadata_title(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set title(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_metadata_title(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get alt_title() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_metadata_alt_title(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set alt_title(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_metadata_alt_title(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get artist() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_metadata_artist(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set artist(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_metadata_artist(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get alt_artist() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_metadata_alt_artist(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set alt_artist(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_metadata_alt_artist(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get creator() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_metadata_creator(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set creator(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_metadata_creator(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get genre() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_metadata_genre(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set genre(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_metadata_genre(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string[]}
     */
    get tags() {
        const ret = wasm.__wbg_get_metadata_tags(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {string[]} arg0
     */
    set tags(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_metadata_tags(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {string}
     */
    get source() {
        let deferred1_0;
        let deferred1_1;
        try {
            const ret = wasm.__wbg_get_metadata_source(this.__wbg_ptr);
            deferred1_0 = ret[0];
            deferred1_1 = ret[1];
            return getStringFromWasm0(ret[0], ret[1]);
        } finally {
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
     * @param {string} arg0
     */
    set source(arg0) {
        const ptr0 = passStringToWasm0(arg0, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_metadata_source(this.__wbg_ptr, ptr0, len0);
    }
}

const OsuHitobjectFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_osuhitobject_free(ptr >>> 0, 1));

export class OsuHitobject {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(OsuHitobject.prototype);
        obj.__wbg_ptr = ptr;
        OsuHitobjectFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        OsuHitobjectFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_osuhitobject_free(ptr, 0);
    }
    /**
     * @returns {OsuHitobjectType}
     */
    get object_type() {
        const ret = wasm.__wbg_get_osuhitobject_object_type(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {OsuHitobjectType} arg0
     */
    set object_type(arg0) {
        wasm.__wbg_set_osuhitobject_object_type(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get x() {
        const ret = wasm.__wbg_get_catchhitobject_x_position(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set x(arg0) {
        wasm.__wbg_set_catchhitobject_x_position(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get y() {
        const ret = wasm.__wbg_get_osuhitobject_y(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set y(arg0) {
        wasm.__wbg_set_osuhitobject_y(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number | undefined}
     */
    get end_time() {
        const ret = wasm.__wbg_get_catchhitobject_end_time(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set end_time(arg0) {
        wasm.__wbg_set_catchhitobject_end_time(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
    }
    /**
     * @returns {boolean}
     */
    get new_combo() {
        const ret = wasm.__wbg_get_osuhitobject_new_combo(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @param {boolean} arg0
     */
    set new_combo(arg0) {
        wasm.__wbg_set_osuhitobject_new_combo(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get combo_skip() {
        const ret = wasm.__wbg_get_osuhitobject_combo_skip(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set combo_skip(arg0) {
        wasm.__wbg_set_osuhitobject_combo_skip(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {OsuHitobject}
     */
    static empty() {
        const ret = wasm.osuhitobject_empty();
        return OsuHitobject.__wrap(ret);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @returns {OsuHitobject}
     */
    static hit_circle(x, y) {
        const ret = wasm.osuhitobject_hit_circle(x, y);
        return OsuHitobject.__wrap(ret);
    }
    /**
     * @param {number} x
     * @param {number} y
     * @returns {OsuHitobject}
     */
    static slider(x, y) {
        const ret = wasm.osuhitobject_slider(x, y);
        return OsuHitobject.__wrap(ret);
    }
    /**
     * @param {number} end_time
     * @returns {OsuHitobject}
     */
    static spinner(end_time) {
        const ret = wasm.osuhitobject_spinner(end_time);
        return OsuHitobject.__wrap(ret);
    }
    /**
     * @returns {OsuHitobject}
     */
    static unknown() {
        const ret = wasm.osuhitobject_unknown();
        return OsuHitobject.__wrap(ret);
    }
    /**
     * @returns {OsuHitobject}
     */
    with_new_combo() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.osuhitobject_with_new_combo(ptr);
        return OsuHitobject.__wrap(ret);
    }
    /**
     * @param {number} skip
     * @returns {OsuHitobject}
     */
    with_combo_skip(skip) {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.osuhitobject_with_combo_skip(ptr, skip);
        return OsuHitobject.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    end_time() {
        const ret = wasm.catchhitobject_end_time(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {boolean}
     */
    is_new_combo() {
        const ret = wasm.osuhitobject_is_new_combo(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    combo_skip() {
        const ret = wasm.osuhitobject_combo_skip(this.__wbg_ptr);
        return ret;
    }
}

const SoundBankFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_soundbank_free(ptr >>> 0, 1));

export class SoundBank {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SoundBank.prototype);
        obj.__wbg_ptr = ptr;
        SoundBankFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SoundBankFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_soundbank_free(ptr, 0);
    }
    /**
     * @returns {string[]}
     */
    get audio_tracks() {
        const ret = wasm.__wbg_get_soundbank_audio_tracks(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {string[]} arg0
     */
    set audio_tracks(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_soundbank_audio_tracks(this.__wbg_ptr, ptr0, len0);
    }
    /**
     * @returns {SoundEffect[]}
     */
    get sound_effects() {
        const ret = wasm.__wbg_get_soundbank_sound_effects(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {SoundEffect[]} arg0
     */
    set sound_effects(arg0) {
        const ptr0 = passArrayJsValueToWasm0(arg0, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.__wbg_set_soundbank_sound_effects(this.__wbg_ptr, ptr0, len0);
    }
    constructor() {
        const ret = wasm.soundbank_new();
        this.__wbg_ptr = ret >>> 0;
        SoundBankFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {string} path
     * @returns {number}
     */
    add_sound_sample(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.soundbank_add_sound_sample(this.__wbg_ptr, ptr0, len0);
        return ret >>> 0;
    }
    /**
     * @param {number} index
     * @param {string} path
     */
    add_sound_sample_with_index(index, path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.soundbank_add_sound_sample_with_index(this.__wbg_ptr, index, ptr0, len0);
    }
    /**
     * @param {SoundEffect} sound_effect
     */
    add_sound_effect(sound_effect) {
        _assertClass(sound_effect, SoundEffect);
        var ptr0 = sound_effect.__destroy_into_raw();
        wasm.soundbank_add_sound_effect(this.__wbg_ptr, ptr0);
    }
    /**
     * @param {number} index
     * @returns {string | undefined}
     */
    get_sound_sample(index) {
        const ret = wasm.soundbank_get_sound_sample(this.__wbg_ptr, index);
        let v1;
        if (ret[0] !== 0) {
            v1 = getStringFromWasm0(ret[0], ret[1]).slice();
            wasm.__wbindgen_free(ret[0], ret[1] * 1, 1);
        }
        return v1;
    }
    /**
     * @param {string} sample_path
     * @returns {number | undefined}
     */
    get_index_sample(sample_path) {
        const ptr0 = passStringToWasm0(sample_path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.soundbank_get_index_sample(this.__wbg_ptr, ptr0, len0);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @returns {string[]}
     */
    get_sample_paths() {
        const ret = wasm.soundbank_get_sample_paths(this.__wbg_ptr);
        var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
    }
    /**
     * @param {string} path
     * @returns {boolean}
     */
    contains_path(path) {
        const ptr0 = passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.soundbank_contains_path(this.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
     * @returns {number}
     */
    sample_count() {
        const ret = wasm.soundbank_sample_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {boolean}
     */
    is_empty() {
        const ret = wasm.soundbank_is_empty(this.__wbg_ptr);
        return ret !== 0;
    }
}

const SoundEffectFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_soundeffect_free(ptr >>> 0, 1));

export class SoundEffect {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(SoundEffect.prototype);
        obj.__wbg_ptr = ptr;
        SoundEffectFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    static __unwrap(jsValue) {
        if (!(jsValue instanceof SoundEffect)) {
            return 0;
        }
        return jsValue.__destroy_into_raw();
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SoundEffectFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_soundeffect_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    get time() {
        const ret = wasm.__wbg_get_soundeffect_time(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set time(arg0) {
        wasm.__wbg_set_soundeffect_time(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get volume() {
        const ret = wasm.__wbg_get_soundeffect_volume(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {number} arg0
     */
    set volume(arg0) {
        wasm.__wbg_set_soundeffect_volume(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number}
     */
    get sample() {
        const ret = wasm.__wbg_get_soundeffect_sample(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} arg0
     */
    set sample(arg0) {
        wasm.__wbg_set_soundeffect_sample(this.__wbg_ptr, arg0);
    }
    /**
     * @param {number} time
     * @param {number} volume
     * @param {number} sample
     */
    constructor(time, volume, sample) {
        const ret = wasm.soundeffect_new(time, volume, sample);
        this.__wbg_ptr = ret >>> 0;
        SoundEffectFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
}

const TaikoHitobjectFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_taikohitobject_free(ptr >>> 0, 1));

export class TaikoHitobject {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TaikoHitobject.prototype);
        obj.__wbg_ptr = ptr;
        TaikoHitobjectFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TaikoHitobjectFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_taikohitobject_free(ptr, 0);
    }
    /**
     * @returns {TaikoHitobjectType}
     */
    get note_type() {
        const ret = wasm.__wbg_get_taikohitobject_note_type(this.__wbg_ptr);
        return ret;
    }
    /**
     * @param {TaikoHitobjectType} arg0
     */
    set note_type(arg0) {
        wasm.__wbg_set_taikohitobject_note_type(this.__wbg_ptr, arg0);
    }
    /**
     * @returns {number | undefined}
     */
    get end_time() {
        const ret = wasm.__wbg_get_catchhitobject_end_time(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
    /**
     * @param {number | null} [arg0]
     */
    set end_time(arg0) {
        wasm.__wbg_set_catchhitobject_end_time(this.__wbg_ptr, isLikeNone(arg0) ? 0x100000001 : (arg0) >> 0);
    }
    /**
     * @returns {TaikoHitobject}
     */
    static empty() {
        const ret = wasm.key_empty();
        return TaikoHitobject.__wrap(ret);
    }
    /**
     * @returns {TaikoHitobject}
     */
    static don() {
        const ret = wasm.key_normal();
        return TaikoHitobject.__wrap(ret);
    }
    /**
     * @returns {TaikoHitobject}
     */
    static kat() {
        const ret = wasm.taikohitobject_kat();
        return TaikoHitobject.__wrap(ret);
    }
    /**
     * @returns {TaikoHitobject}
     */
    static bonus_don() {
        const ret = wasm.key_slider_end();
        return TaikoHitobject.__wrap(ret);
    }
    /**
     * @returns {TaikoHitobject}
     */
    static bonus_kat() {
        const ret = wasm.key_mine();
        return TaikoHitobject.__wrap(ret);
    }
    /**
     * @param {number} end_time
     * @returns {TaikoHitobject}
     */
    static drum_roll(end_time) {
        const ret = wasm.taikohitobject_drum_roll(end_time);
        return TaikoHitobject.__wrap(ret);
    }
    /**
     * @param {number} end_time
     * @returns {TaikoHitobject}
     */
    static bonus_drum_roll(end_time) {
        const ret = wasm.taikohitobject_bonus_drum_roll(end_time);
        return TaikoHitobject.__wrap(ret);
    }
    /**
     * @param {number} end_time
     * @returns {TaikoHitobject}
     */
    static balloon(end_time) {
        const ret = wasm.taikohitobject_balloon(end_time);
        return TaikoHitobject.__wrap(ret);
    }
    /**
     * @returns {TaikoHitobject}
     */
    static unknown() {
        const ret = wasm.taikohitobject_unknown();
        return TaikoHitobject.__wrap(ret);
    }
    /**
     * @returns {number | undefined}
     */
    end_time() {
        const ret = wasm.catchhitobject_end_time(this.__wbg_ptr);
        return ret === 0x100000001 ? undefined : ret;
    }
}

const TimingPointsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_timingpoints_free(ptr >>> 0, 1));

export class TimingPoints {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(TimingPoints.prototype);
        obj.__wbg_ptr = ptr;
        TimingPointsFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TimingPointsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_timingpoints_free(ptr, 0);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_soundeffect_new = function(arg0) {
        const ret = SoundEffect.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbg_soundeffect_unwrap = function(arg0) {
        const ret = SoundEffect.__unwrap(arg0);
        return ret;
    };
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_0;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('rgc_chart_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;

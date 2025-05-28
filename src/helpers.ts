export function parseColor(colorString: string): { r: number; g: number; b: number; a?: number } {
    let match;
    let alpha = 1;

    // #rrggbb or #rgb
    match = colorString.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i);
    if (match) {
        return {
            r: parseInt(match[1] + match[1], 16),
            g: parseInt(match[2] + match[2], 16),
            b: parseInt(match[3] + match[3], 16)
        };
    }

    // #rrggbbaa or #rgba
    match = colorString.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i);
    if (match) {
        return {
            r: parseInt(match[1], 16),
            g: parseInt(match[2], 16),
            b: parseInt(match[3], 16),
            a: match[4] ? parseInt(match[4], 16) / 255 : undefined
        };
    }

    // #rgba(r, g, b, a)
    match = colorString.match(/^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i);
    if (match) {
        return {
            r: parseInt(match[1] + match[1], 16),
            g: parseInt(match[2] + match[2], 16),
            b: parseInt(match[3] + match[3], 16),
            a: match[4] ? parseInt(match[4] + match[4], 16) / 255 : undefined
        };
    }

    // rgb(r, g, b)
    match = colorString.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)/i);
    if (match) {
        return {
            r: parseInt(match[1], 10),
            g: parseInt(match[2], 10),
            b: parseInt(match[3], 10),
            a: match[4] ? parseFloat(match[4]) : undefined
        };
    }

    // hsl(h, s, l)
    match = colorString.match(/hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([\d.]+)\s*)?\)/i);
    if (match) {
        const h = parseInt(match[1], 10) / 360;
        const s = parseInt(match[2], 10) / 100;
        const l = parseInt(match[3], 10) / 100;
        alpha = match[4] ? parseFloat(match[4]) : 1;

        if (s === 0) {
            return {
                r: Math.round(l * 255),
                g: Math.round(l * 255),
                b: Math.round(l * 255),
                a: alpha
            };
        }

        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        return {
            r: Math.round(hue2rgb(p, q, h + 1/3) * 255),
            g: Math.round(hue2rgb(p, q, h) * 255),
            b: Math.round(hue2rgb(p, q, h - 1/3) * 255),
            a: alpha
        };
    }

    console.warn(`Couldn't parse color: "${colorString}". defaulting to grey.`);
    return { r: 61, g: 61, b: 61 };
}


export async function sleep(ms: number): Promise<void>  {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function debugLog(...args: any[]) {
  if (typeof _DEBUG !== 'undefined' && _DEBUG) {
    console.log('%c[DEBUG]', 'color:rgb(72, 180, 76); font-weight: bold;', ...args);
  }
}


export function parseError(message: string, ...args: any[]) {
  console.error(
    `%c[PARSE ERROR]%c ${message}`,
    'color: rgb(255, 187, 0); font-weight: bold;',
    '',
    ...args
  );
}

export function convertError(message: string, ...args: any[]) {
  console.error(
    `%c[CONVERT ERROR]%c ${message}`,
    'color: rgb(255, 59, 48); font-weight: bold;',
    '',
    ...args
  );
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function formatTime(milliseconds: number): string {
    if (milliseconds < 1000) {
        return `${milliseconds} milliseconds`;
    } else if (milliseconds < 60000) {
        return `${(milliseconds / 1000).toFixed(1)} seconds`;
    } else {
        return `${(milliseconds / 60000).toFixed(1)} minutes`;
    }
}


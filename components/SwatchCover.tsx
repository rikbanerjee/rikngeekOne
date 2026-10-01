// Generative "paint swatch" cover art for posts without an image.
// Deterministic: the same seed (post slug) always produces the same art,
// so server and client renders match and each post keeps its look.

const PALETTES = [
    ['#f97316', '#facc15', '#ef4444', '#fb7185', '#fde68a'],   // sunset
    ['#06b6d4', '#3b82f6', '#8b5cf6', '#22d3ee', '#a5b4fc'],   // ocean
    ['#10b981', '#84cc16', '#14b8a6', '#facc15', '#bbf7d0'],   // citrus garden
    ['#ec4899', '#a855f7', '#6366f1', '#f472b6', '#c4b5fd'],   // neon bloom
    ['#f59e0b', '#ef4444', '#0ea5e9', '#22c55e', '#e879f9'],   // primary pop
    ['#fb7185', '#fdba74', '#fde047', '#86efac', '#93c5fd'],   // pastel rainbow
    ['#0f766e', '#f97316', '#fde68a', '#0ea5e9', '#f43f5e'],   // retro
    ['#7c3aed', '#db2777', '#f59e0b', '#2563eb', '#10b981'],   // jewel tones
]

const W = 400
const H = 225

function hashString(s: string): number {
    let h = 2166136261
    for (let i = 0; i < s.length; i++) {
        h ^= s.charCodeAt(i)
        h = Math.imul(h, 16777619)
    }
    return h >>> 0
}

// mulberry32 PRNG
function rng(seed: number) {
    let a = seed
    return () => {
        a = (a + 0x6d2b79f5) | 0
        let t = Math.imul(a ^ (a >>> 15), 1 | a)
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

type Rand = () => number
const pick = <T,>(rand: Rand, arr: T[]) => arr[Math.floor(rand() * arr.length)]

/** Grid of paint-chip tiles. */
function mosaic(rand: Rand, palette: string[]) {
    const cols = 6 + Math.floor(rand() * 3)   // 6–8
    const rows = 3 + Math.floor(rand() * 2)   // 3–4
    const gap = 6
    const tw = (W - gap * (cols + 1)) / cols
    const th = (H - gap * (rows + 1)) / rows
    const tiles = []
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            tiles.push(
                <rect
                    key={`${r}-${c}`}
                    x={gap + c * (tw + gap)}
                    y={gap + r * (th + gap)}
                    width={tw}
                    height={th}
                    rx={6}
                    fill={pick(rand, palette)}
                    opacity={0.75 + rand() * 0.25}
                />
            )
        }
    }
    return tiles
}

/** Vertical paint-chip strips of varying widths. */
function stripes(rand: Rand, palette: string[]) {
    const strips = []
    let x = 0
    let i = 0
    while (x < W) {
        const w = 24 + rand() * 56
        strips.push(<rect key={i++} x={x} y={0} width={w + 1} height={H} fill={pick(rand, palette)} />)
        x += w
    }
    return strips
}

/** Overlapping translucent color blobs. */
function blobs(rand: Rand, palette: string[]) {
    const shapes = [<rect key="bg" width={W} height={H} fill={palette[0]} />]
    for (let i = 0; i < 7; i++) {
        shapes.push(
            <circle
                key={i}
                cx={rand() * W}
                cy={rand() * H}
                r={50 + rand() * 90}
                fill={palette[1 + (i % (palette.length - 1))]}
                opacity={0.55 + rand() * 0.35}
            />
        )
    }
    return shapes
}

const LAYOUTS = [mosaic, stripes, blobs]

export default function SwatchCover({ seed, className = '' }: { seed: string; className?: string }) {
    const rand = rng(hashString(seed))
    const palette = pick(rand, PALETTES)
    const layout = pick(rand, LAYOUTS)

    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid slice"
            className={`absolute inset-0 w-full h-full ${className}`}
            aria-hidden="true"
        >
            <rect width={W} height={H} fill="#0f172a" />
            {layout(rand, palette)}
        </svg>
    )
}

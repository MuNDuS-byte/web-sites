import orbitalSilencePoster from '@/assets/posters/orbital-silence.svg'
import orbitalSilenceBackdrop from '@/assets/backdrops/orbital-silence.svg'
import neonMeridianPoster from '@/assets/posters/neon-meridian.svg'
import neonMeridianBackdrop from '@/assets/backdrops/neon-meridian.svg'
import theGlassHarborPoster from '@/assets/posters/the-glass-harbor.svg'
import theGlassHarborBackdrop from '@/assets/backdrops/the-glass-harbor.svg'
import velvetAlibiPoster from '@/assets/posters/velvet-alibi.svg'
import velvetAlibiBackdrop from '@/assets/backdrops/velvet-alibi.svg'
import cinderCrownPoster from '@/assets/posters/cinder-crown.svg'
import cinderCrownBackdrop from '@/assets/backdrops/cinder-crown.svg'
import apexProtocolPoster from '@/assets/posters/apex-protocol.svg'
import apexProtocolBackdrop from '@/assets/backdrops/apex-protocol.svg'
import lettersFromKyotoPoster from '@/assets/posters/letters-from-kyoto.svg'
import lettersFromKyotoBackdrop from '@/assets/backdrops/letters-from-kyoto.svg'
import paperLanternsPoster from '@/assets/posters/paper-lanterns-of-the-sky.svg'
import paperLanternsBackdrop from '@/assets/backdrops/paper-lanterns-of-the-sky.svg'
import redHorizonPoster from '@/assets/posters/red-horizon.svg'
import redHorizonBackdrop from '@/assets/backdrops/red-horizon.svg'
import theSeventhRoomPoster from '@/assets/posters/the-seventh-room.svg'
import theSeventhRoomBackdrop from '@/assets/backdrops/the-seventh-room.svg'
import winterSymphonyPoster from '@/assets/posters/winter-symphony.svg'
import winterSymphonyBackdrop from '@/assets/backdrops/winter-symphony.svg'
import echoesOfTheDeepPoster from '@/assets/posters/echoes-of-the-deep.svg'
import echoesOfTheDeepBackdrop from '@/assets/backdrops/echoes-of-the-deep.svg'
import starlightClockworkPoster from '@/assets/posters/starlight-clockwork.svg'
import starlightClockworkBackdrop from '@/assets/backdrops/starlight-clockwork.svg'
import theAmberForestPoster from '@/assets/posters/the-amber-forest.svg'
import theAmberForestBackdrop from '@/assets/backdrops/the-amber-forest.svg'
import staticFrequencyPoster from '@/assets/posters/static-frequency.svg'
import staticFrequencyBackdrop from '@/assets/backdrops/static-frequency.svg'

export const FALLBACK_POSTER =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 900">
      <defs>
        <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#141926"/>
          <stop offset="100%" stop-color="#090c12"/>
        </linearGradient>
      </defs>
      <rect width="600" height="900" fill="url(#g)"/>
      <circle cx="300" cy="410" r="72" fill="none" stroke="#334155" stroke-width="3"/>
      <path d="M282 378L334 410L282 442V378Z" fill="#64748b"/>
      <text x="300" y="535" text-anchor="middle" fill="#64748b" font-family="sans-serif" font-size="22" letter-spacing="3">MOVIE EXPLORER</text>
    </svg>`
  )

export const MOVIES = [
  {
    id: 'orbital-silence',
    title: 'Orbital Silence',
    year: 2025,
    genre: 'Sci-Fi',
    rating: 8.8,
    runtime: '148 min',
    director: 'Elena Vance',
    cast: ['Maren Lind', 'Daniel Osei', 'Taro Sato'],
    tagline: 'Beyond the last relay, every signal carries a ghost.',
    description:
      'Stationed aboard a solitary deep-space beacon orbiting a fading white dwarf, telemetry engineer Mara Vance intercepts a mathematical cadence repeating from inside the star’s gravity well. With her return window shrinking to forty hours, she must decide whether to sever contact or cross the silent horizon to verify the source.',
    accentColor: '#f59e0b',
    poster: orbitalSilencePoster,
    backdrop: orbitalSilenceBackdrop
  },
  {
    id: 'letters-from-kyoto',
    title: 'Letters from Kyoto',
    year: 2022,
    genre: 'Drama',
    rating: 8.9,
    runtime: '122 min',
    director: 'Haruka Mori',
    cast: ['Aoi Takahashi', 'Renji Kobayashi', 'Hana Yoshida'],
    tagline: 'Some stories wait years for the right page to open.',
    description:
      'Inside a quiet secondhand bookshop tucked beneath maple eaves in Kyoto, an architectural restorer discovers a handwritten letter tucked into an out-of-print essay collection. Across three changing autumns, an anonymous correspondence unfolds between two strangers learning to let go of the past.',
    accentColor: '#fb7185',
    poster: lettersFromKyotoPoster,
    backdrop: lettersFromKyotoBackdrop
  },
  {
    id: 'cinder-crown',
    title: 'Cinder Crown',
    year: 2025,
    genre: 'Fantasy',
    rating: 8.7,
    runtime: '154 min',
    director: 'Rowan Alaric',
    cast: ['Freya Halvorsen', 'Caleb Thorne', 'Soraia Mendes'],
    tagline: 'When the eternal forge cools, the map remembers.',
    description:
      'As the volcanic archipelago’s ancient hearth begins to die, a disgraced royal cartographer is sent beyond the ash reefs to chart a mythic star-gate erased from imperial atlases. Pursued by rival guild fleets, she uncovers an older pact bound to the islands themselves.',
    accentColor: '#f97316',
    poster: cinderCrownPoster,
    backdrop: cinderCrownBackdrop
  },
  {
    id: 'paper-lanterns-of-the-sky',
    title: 'Paper Lanterns of the Sky',
    year: 2023,
    genre: 'Animation',
    rating: 8.6,
    runtime: '104 min',
    director: 'Mei-Ling Zhou',
    cast: ['Lin Wei', 'Keiko Tanaka', 'Julian Park'],
    tagline: 'Sail above the clouds to bring the night home.',
    description:
      'When a runaway autumn gale scatters the lanterns that guide constellations across the upper atmosphere, a spirited young wind-weaver launches a folded paper skiff into the cloud sea. Alongside a grumpy barometer spirit, she races the sunrise to restore the sky’s lost stars.',
    accentColor: '#fbbf24',
    poster: paperLanternsPoster,
    backdrop: paperLanternsBackdrop
  },
  {
    id: 'static-frequency',
    title: 'Static Frequency',
    year: 2026,
    genre: 'Thriller',
    rating: 8.6,
    runtime: '124 min',
    director: 'Julian Mercer',
    cast: ['Nora Albers', 'Gideon Brooks', 'Samira Haddad'],
    tagline: 'Tomorrow is already broadcasting.',
    description:
      'During a winter blackout, a late-night shortwave archivist tunes into an unlicensed numbers station whose coded weather bulletins describe real accidents exactly forty-eight hours before they occur. Tracing the transmitter’s moving coordinates pulls him into a high-stakes game of prediction and fate.',
    accentColor: '#22c55e',
    poster: staticFrequencyPoster,
    backdrop: staticFrequencyBackdrop
  },
  {
    id: 'neon-meridian',
    title: 'Neon Meridian',
    year: 2024,
    genre: 'Sci-Fi',
    rating: 8.5,
    runtime: '132 min',
    director: 'Kenji Sato',
    cast: ['Yuki Morita', 'Devon Vance', 'Claire DuBois'],
    tagline: 'In a rain-drenched city, memory is the rarest currency.',
    description:
      'An independent data courier navigating the vertical avenues of Neo-Kobe takes a routine overnight parcel only to discover it holds an unencrypted neural recording tied to a corporate blackout. Hunted by autonomous drones and rival brokers, he has until dawn to expose who rewrote the city’s archive.',
    accentColor: '#ec4899',
    poster: neonMeridianPoster,
    backdrop: neonMeridianBackdrop
  },
  {
    id: 'winter-symphony',
    title: 'Winter Symphony',
    year: 2020,
    genre: 'Drama',
    rating: 8.5,
    runtime: '129 min',
    director: 'Sofia Lindqvist',
    cast: ['Ingrid Solberg', 'Lukas Berg', 'Maja Novak'],
    tagline: 'Listen closely to what remains when the silence settles.',
    description:
      'Confronted with progressive hearing loss at the height of her career, principal cellist Astrid Holm retreats to a coastal Nordic conservatory to prepare one final concerto. Through tactile rehearsal and an unexpected mentorship with an eccentric acoustic engineer, she rediscovers music as pure resonance.',
    accentColor: '#93c5fd',
    poster: winterSymphonyPoster,
    backdrop: winterSymphonyBackdrop
  },
  {
    id: 'the-glass-harbor',
    title: 'The Glass Harbor',
    year: 2023,
    genre: 'Thriller',
    rating: 8.4,
    runtime: '119 min',
    director: 'Henrik Lindholm',
    cast: ['Mikkel Sørensen', 'Eva Lind', 'Tomasz Kowalski'],
    tagline: 'Every tide returns what the fog tried to keep.',
    description:
      'When an automated research trawler drifts back into a remote North Sea fjord completely intact—and completely empty—maritime investigator Kasper Nordin is dispatched before insurers seal the hull. The deeper he digs into the vessel’s bridge logs, the clearer it becomes that the crew never meant to vanish.',
    accentColor: '#2dd4bf',
    poster: theGlassHarborPoster,
    backdrop: theGlassHarborBackdrop
  },
  {
    id: 'starlight-clockwork',
    title: 'Starlight Clockwork',
    year: 2024,
    genre: 'Animation',
    rating: 8.4,
    runtime: '98 min',
    director: 'Lucas Beaumont',
    cast: ['Amélie Laurent', 'Arthur Finch', 'Mateo Silva'],
    tagline: 'One missing gear can freeze the night forever.',
    description:
      'Deep inside a towering brass planetarium that regulates twilight and dawn for an enchanted valley, a timid apprentice accidentally loosens the lunar escapement. With midnight stretching endlessly over the rooftops, she must climb the mechanical heavens and rebuild the sky’s heartbeat.',
    accentColor: '#fcd34d',
    poster: starlightClockworkPoster,
    backdrop: starlightClockworkBackdrop
  },
  {
    id: 'the-seventh-room',
    title: 'The Seventh Room',
    year: 2023,
    genre: 'Mystery',
    rating: 8.3,
    runtime: '116 min',
    director: 'Arthur Pendelton',
    cast: ['Helena Vance', 'Victor Hugo', 'Priya Nair'],
    tagline: 'The blueprint has six rooms. Count the doors again.',
    description:
      'Six acclaimed architects are invited to an isolated modernist villa in the Swiss Alps to bid on restoring a late visionary’s estate. When a sudden avalanche cuts off the valley road, they notice the building’s interior geometry conceals an unrecorded seventh chamber—and someone among them already holds the key.',
    accentColor: '#10b981',
    poster: theSeventhRoomPoster,
    backdrop: theSeventhRoomBackdrop
  },
  {
    id: 'the-amber-forest',
    title: 'The Amber Forest',
    year: 2022,
    genre: 'Fantasy',
    rating: 8.3,
    runtime: '137 min',
    director: 'Freya Solberg',
    cast: ['Sienna Brooks', 'Ewan MacLeod', 'Klara Lind'],
    tagline: 'Ancient roots never forget a promise.',
    description:
      'Venturing beyond the petrified timberline to find a cure for her village’s creeping frost, a young herbalist enters a primordial woodland where golden tree resin preserves living fragments of forgotten centuries. Guided by a luminous stag, she learns the forest’s remedy demands a steep exchange.',
    accentColor: '#f59e0b',
    poster: theAmberForestPoster,
    backdrop: theAmberForestBackdrop
  },
  {
    id: 'velvet-alibi',
    title: 'Velvet Alibi',
    year: 2024,
    genre: 'Mystery',
    rating: 8.2,
    runtime: '114 min',
    director: 'Clara Moreau',
    cast: ['Olivier Laurent', 'Bianca Rossi', 'Stefan Klein'],
    tagline: 'Every melody hides a witness.',
    description:
      'In rain-slicked 1964 Vienna, a retired jazz pianist is asked to authenticate a stolen, unfinished concerto discovered in an antique vault. As each bar of the manuscript points back to an unsolved gala disappearance, his quiet comeback becomes a perilous nocturnal investigation.',
    accentColor: '#eab308',
    poster: velvetAlibiPoster,
    backdrop: velvetAlibiBackdrop
  },
  {
    id: 'apex-protocol',
    title: 'Apex Protocol',
    year: 2024,
    genre: 'Action',
    rating: 8.1,
    runtime: '126 min',
    director: 'Marcus Thorne',
    cast: ['Liam Mercer', 'Zara Reyes', 'Viktor Petrov'],
    tagline: 'Six hours. One line. Zero margin for error.',
    description:
      'After an automated high-altitude freight corridor is hijacked mid-blizzard, a veteran crisis specialist boards the runaway express to disarm a compromised guidance core before it reaches the valley terminal. Outnumbered and cut off from command, every carriage demands split-second precision.',
    accentColor: '#ef4444',
    poster: apexProtocolPoster,
    backdrop: apexProtocolBackdrop
  },
  {
    id: 'echoes-of-the-deep',
    title: 'Echoes of the Deep',
    year: 2025,
    genre: 'Thriller',
    rating: 8.0,
    runtime: '111 min',
    director: 'Nadia Okafor',
    cast: ['Simone Baptiste', 'Rohan Mehta', 'Jonas Weber'],
    tagline: 'At ten thousand meters, the ocean answers back.',
    description:
      'A three-person bathymetry team mapping hydrothermal vents along an uncharted Pacific trench picks up rhythmic acoustic pulses matching their own sonar pings. As hull pressure mounts and topside comms drop to static, the crew realizes they are not alone in the dark.',
    accentColor: '#06b6d4',
    poster: echoesOfTheDeepPoster,
    backdrop: echoesOfTheDeepBackdrop
  },
  {
    id: 'red-horizon',
    title: 'Red Horizon',
    year: 2021,
    genre: 'Action',
    rating: 7.9,
    runtime: '118 min',
    director: 'Diego Salazar',
    cast: ['Mateo Cruz', 'Elena Morales', 'Jack Dawson'],
    tagline: 'Outrun the dust. Beat the dawn.',
    description:
      'Stranded in the remote salt flats of the Atacama Desert after an endurance rally goes off-grid, two rival drivers are forced to share one battered vehicle when an armed salvage crew closes in on a downed satellite canister. Survival means crossing two hundred kilometers of canyon terrain before sunrise.',
    accentColor: '#ea580c',
    poster: redHorizonPoster,
    backdrop: redHorizonBackdrop
  }
]

export const GENRES = ['All', ...Array.from(new Set(MOVIES.map((movie) => movie.genre))).sort()]

export function getMovieById(id) {
  return MOVIES.find((movie) => movie.id === String(id)) || null
}

export function getRelatedMovies(movie, limit = 4) {
  if (!movie) return []
  const sameGenre = MOVIES.filter((item) => item.id !== movie.id && item.genre === movie.genre)
  if (sameGenre.length >= limit) {
    return sameGenre.slice(0, limit)
  }
  const others = MOVIES.filter(
    (item) => item.id !== movie.id && !sameGenre.some((related) => related.id === item.id)
  )
  return [...sameGenre, ...others].slice(0, limit)
}

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

export const ALL_GENRE = 'Все'

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
      <text x="300" y="535" text-anchor="middle" fill="#64748b" font-family="sans-serif" font-size="22" letter-spacing="4">КИНОГИД</text>
    </svg>`
  )

export const MOVIES = [
  {
    id: 'orbital-silence',
    title: 'Орбитальная тишина',
    year: 2025,
    genre: 'Фантастика',
    rating: 8.8,
    runtime: '148 мин',
    director: 'Елена Вэнс',
    cast: ['Марен Линд', 'Дэниел Осей', 'Таро Сато'],
    tagline: 'За последним ретранслятором каждый сигнал хранит призрака.',
    description:
      'На одиноком глубококосмическом маяке, вращающемся вокруг угасающего белого карлика, инженер телеметрии Мара Вэнс перехватывает математический ритм, исходящий из самой гравитационной воронки звезды. Пока окно возвращения сжимается до сорока часов, ей предстоит решить: разорвать связь или пересечь безмолвный горизонт ради разгадки.',
    accentColor: '#f59e0b',
    poster: orbitalSilencePoster,
    backdrop: orbitalSilenceBackdrop
  },
  {
    id: 'letters-from-kyoto',
    title: 'Письма из Киото',
    year: 2022,
    genre: 'Драма',
    rating: 8.9,
    runtime: '122 мин',
    director: 'Харука Мори',
    cast: ['Аой Такахаси', 'Рэндзи Кобаяси', 'Хана Ёсида'],
    tagline: 'Некоторые истории годами ждут, чтобы открыли нужную страницу.',
    description:
      'В тихой букинистической лавке под кленовыми крышами Киото реставратор старинных зданий находит рукописное письмо, забытое в редком сборнике эссе. На протяжении трёх осенних сезонов между двумя незнакомцами завязывается анонимная переписка, помогающая обоим отпустить прошлое.',
    accentColor: '#fb7185',
    poster: lettersFromKyotoPoster,
    backdrop: lettersFromKyotoBackdrop
  },
  {
    id: 'cinder-crown',
    title: 'Пепельная корона',
    year: 2025,
    genre: 'Фэнтези',
    rating: 8.7,
    runtime: '154 мин',
    director: 'Роуэн Аларик',
    cast: ['Фрейя Хальворсен', 'Калеб Торн', 'Сорайя Мендеш'],
    tagline: 'Когда вечная кузница остывает, память сохраняет только карта.',
    description:
      'Когда древний очаг вулканического архипелага начинает угасать, опального королевского картографа отправляют за пепельные рифы на поиски мифических звёздных врат, стёртых со всех имперских атласов. Преследуемая флотами враждующих гильдий, она раскрывает забытый договор, скрепляющий сами острова.',
    accentColor: '#f97316',
    poster: cinderCrownPoster,
    backdrop: cinderCrownBackdrop
  },
  {
    id: 'paper-lanterns-of-the-sky',
    title: 'Бумажные фонари небес',
    year: 2023,
    genre: 'Анимация',
    rating: 8.6,
    runtime: '104 мин',
    director: 'Мэй-Лин Чжоу',
    cast: ['Линь Вэй', 'Кэйко Танака', 'Джулиан Пак'],
    tagline: 'Поднимись выше облаков, чтобы вернуть ночь домой.',
    description:
      'Когда шальной осенний вихрь рассеивает фонари, ведущие созвездия по верхним слоям неба, отважная юная ткачиха ветров спускает на облачное море сложенный из бумаги чёлн. Вместе с ворчливым духом барометра она спешит опередить рассвет и вернуть небу потерянные звёзды.',
    accentColor: '#fbbf24',
    poster: paperLanternsPoster,
    backdrop: paperLanternsBackdrop
  },
  {
    id: 'static-frequency',
    title: 'Частота помех',
    year: 2026,
    genre: 'Триллер',
    rating: 8.6,
    runtime: '124 мин',
    director: 'Джулиан Мерсер',
    cast: ['Нора Альберс', 'Гидеон Брукс', 'Самира Хаддад'],
    tagline: 'Завтрашний день уже вышел в эфир.',
    description:
      'Во время зимнего отключения электричества архивист коротковолнового радио настраивается на незарегистрированную номерную станцию, чьи зашифрованные сводки погоды с пугающей точностью описывают реальные происшествия за сорок восемь часов до них. Поиски передвижного передатчика втягивают его в опасную игру с предвидением и судьбой.',
    accentColor: '#22c55e',
    poster: staticFrequencyPoster,
    backdrop: staticFrequencyBackdrop
  },
  {
    id: 'neon-meridian',
    title: 'Неоновый меридиан',
    year: 2024,
    genre: 'Фантастика',
    rating: 8.5,
    runtime: '132 мин',
    director: 'Кэндзи Сато',
    cast: ['Юки Морита', 'Девон Вэнс', 'Клэр Дюбуа'],
    tagline: 'В городе вечного дождя память — самая дорогая валюта.',
    description:
      'Независимый курьер данных, курсирующий по вертикальным проспектам Нео-Кобе, берётся за обычную ночную доставку и обнаруживает внутри незашифрованную нейрозапись о масштабном корпоративном блэкауте. Преследуемый автономными дронами и брокерами теневого рынка, он должен успеть до рассвета раскрыть того, кто переписал городской архив.',
    accentColor: '#ec4899',
    poster: neonMeridianPoster,
    backdrop: neonMeridianBackdrop
  },
  {
    id: 'winter-symphony',
    title: 'Зимняя симфония',
    year: 2020,
    genre: 'Драма',
    rating: 8.5,
    runtime: '129 мин',
    director: 'София Линдквист',
    cast: ['Ингрид Сольберг', 'Лукас Берг', 'Майя Новак'],
    tagline: 'Прислушайся к тому, что остаётся, когда наступает тишина.',
    description:
      'Столкнувшись с прогрессирующей потерей слуха на пике карьеры, ведущая виолончелистка Астрид Хольм уезжает в прибрежную северную консерваторию, чтобы подготовить свой последний концерт. Через тактильные репетиции и неожиданное знакомство с эксцентричным инженером-акустиком она заново открывает музыку как чистый резонанс.',
    accentColor: '#93c5fd',
    poster: winterSymphonyPoster,
    backdrop: winterSymphonyBackdrop
  },
  {
    id: 'the-glass-harbor',
    title: 'Стеклянная гавань',
    year: 2023,
    genre: 'Триллер',
    rating: 8.4,
    runtime: '119 мин',
    director: 'Хенрик Линдхольм',
    cast: ['Миккель Сёренсен', 'Ева Линд', 'Томаш Ковальски'],
    tagline: 'Каждый прилив возвращает то, что пытался скрыть туман.',
    description:
      'Когда автоматизированный исследовательский траулер возвращается в уединённый фьорд Северного моря абсолютно невредимым — и совершенно пустым, — морского следователя Каспера Нордина вызывают раньше, чем страховщики опечатают корпус. Чем глубже он изучает судовые журналы, тем очевиднее становится, что экипаж не исчезал случайно.',
    accentColor: '#2dd4bf',
    poster: theGlassHarborPoster,
    backdrop: theGlassHarborBackdrop
  },
  {
    id: 'starlight-clockwork',
    title: 'Звёздный механизм',
    year: 2024,
    genre: 'Анимация',
    rating: 8.4,
    runtime: '98 мин',
    director: 'Лукас Бомон',
    cast: ['Амели Лоран', 'Артур Финч', 'Матео Сильва'],
    tagline: 'Одна потерянная шестерёнка может заморозить ночь навсегда.',
    description:
      'Глубоко внутри исполинского латунного планетария, управляющего сменой сумерек и рассветов над зачарованной долиной, застенчивая ученица случайно срывает лунный анкер. Пока полночь бесконечно тянется над крышами, ей предстоит взобраться к механическим небесам и заново запустить сердцебиение неба.',
    accentColor: '#fcd34d',
    poster: starlightClockworkPoster,
    backdrop: starlightClockworkBackdrop
  },
  {
    id: 'the-seventh-room',
    title: 'Седьмая комната',
    year: 2023,
    genre: 'Детектив',
    rating: 8.3,
    runtime: '116 мин',
    director: 'Артур Пендлтон',
    cast: ['Хелена Вэнс', 'Виктор Гюго', 'Прия Наир'],
    tagline: 'На чертеже шесть комнат. Пересчитай двери ещё раз.',
    description:
      'Шестерых знаменитых архитекторов приглашают в уединённую модернистскую виллу в Швейцарских Альпах, чтобы побороться за проект реставрации поместья покойного визионера. Когда внезапная лавина отрезает дорогу в долину, гости замечают, что внутренняя геометрия дома скрывает неучтённую седьмую комнату — и ключ от неё уже у кого-то в руках.',
    accentColor: '#10b981',
    poster: theSeventhRoomPoster,
    backdrop: theSeventhRoomBackdrop
  },
  {
    id: 'the-amber-forest',
    title: 'Янтарный лес',
    year: 2022,
    genre: 'Фэнтези',
    rating: 8.3,
    runtime: '137 мин',
    director: 'Фрейя Сольберг',
    cast: ['Сиенна Брукс', 'Юэн Маклауд', 'Клара Линд'],
    tagline: 'Древние корни никогда не забывают обещаний.',
    description:
      'Отправившись за границу окаменелого леса в поисках лекарства от надвигающейся на деревню стужи, молодая травница попадает в первозданную чащу, где золотистая смола хранит живые отголоски забытых веков. Ведомая светящимся оленем, она узнаёт, что дар леса потребует высокой цены.',
    accentColor: '#f59e0b',
    poster: theAmberForestPoster,
    backdrop: theAmberForestBackdrop
  },
  {
    id: 'velvet-alibi',
    title: 'Бархатное алиби',
    year: 2024,
    genre: 'Детектив',
    rating: 8.2,
    runtime: '114 мин',
    director: 'Клара Моро',
    cast: ['Оливье Лоран', 'Бьянка Росси', 'Штефан Кляйн'],
    tagline: 'В каждой мелодии скрыт свидетель.',
    description:
      'В дождливой Вене 1964 года джазового пианиста на пенсии просят подтвердить подлинность украденного незаконченного концерта, найденного в старинном хранилище. Когда каждый такт партитуры начинает указывать на нераскрытое исчезновение во время гала-вечера, его тихое возвращение оборачивается опасным ночным расследованием.',
    accentColor: '#eab308',
    poster: velvetAlibiPoster,
    backdrop: velvetAlibiBackdrop
  },
  {
    id: 'apex-protocol',
    title: 'Протокол «Апекс»',
    year: 2024,
    genre: 'Боевик',
    rating: 8.1,
    runtime: '126 мин',
    director: 'Маркус Торн',
    cast: ['Лиам Мерсер', 'Зара Рейес', 'Виктор Петров'],
    tagline: 'Шесть часов. Одна ветка. Ноль права на ошибку.',
    description:
      'После захвата автоматизированной высокогорной железнодорожной линии посреди снежной бури опытный специалист по кризисным операциям пробирается на неуправляемый экспресс, чтобы обезвредить взломанный модуль наведения до выхода к терминалу в долине. В меньшинстве и без связи со штабом каждый вагон требует безупречной точности.',
    accentColor: '#ef4444',
    poster: apexProtocolPoster,
    backdrop: apexProtocolBackdrop
  },
  {
    id: 'echoes-of-the-deep',
    title: 'Эхо глубин',
    year: 2025,
    genre: 'Триллер',
    rating: 8.0,
    runtime: '111 мин',
    director: 'Надия Окафор',
    cast: ['Симона Батист', 'Рохан Мехта', 'Йонас Вебер'],
    tagline: 'На глубине десять тысяч метров океан начинает отвечать.',
    description:
      'Экипаж батискафа из трёх исследователей, картографирующий гидротермальные источники в неисследованной впадине Тихого океана, фиксирует ритмичные акустические импульсы, в точности повторяющие сигналы их сонара. Давление на корпус растёт, связь с поверхностью тонет в помехах, и команда понимает, что в этой темноте они не одни.',
    accentColor: '#06b6d4',
    poster: echoesOfTheDeepPoster,
    backdrop: echoesOfTheDeepBackdrop
  },
  {
    id: 'red-horizon',
    title: 'Красный горизонт',
    year: 2021,
    genre: 'Боевик',
    rating: 7.9,
    runtime: '118 мин',
    director: 'Диего Салазар',
    cast: ['Матео Крус', 'Елена Моралес', 'Джек Доусон'],
    tagline: 'Обгони пыль. Успей до рассвета.',
    description:
      'Оказавшись в ловушке среди солончаков пустыни Атакама после схода с маршрута ралли-рейда, двое непримиримых соперников вынуждены делить один потрёпанный внедорожник, когда на след упавшей спутниковой капсулы выходит вооружённый отряд. Чтобы выжить, им нужно преодолеть двести километров каньонов до восхода солнца.',
    accentColor: '#ea580c',
    poster: redHorizonPoster,
    backdrop: redHorizonBackdrop
  }
]

export const GENRES = [
  ALL_GENRE,
  ...Array.from(new Set(MOVIES.map((movie) => movie.genre))).sort((a, b) =>
    a.localeCompare(b, 'ru')
  )
]

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

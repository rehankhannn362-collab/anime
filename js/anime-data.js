/**
 * AnimeVerse Data Source
 * Curated list of popular anime, manga masterpieces, character profiles, and weekly airing schedule.
 * All anime and manga entries feature their exact, authentic official artwork & posters.
 */

const ANIME_DATA = [
    {
        id: "one-piece",
        title: "One Piece",
        japaneseTitle: "ワンピース",
        romaji: "Wan Pīsu",
        poster: "https://cdn.myanimelist.net/images/anime/1244/138851.jpg",
        banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21-wf37VakJmZqd.jpg",
        rating: 9.5,
        votes: "2.4M",
        rank: "#1 Global",
        genres: ["Action", "Adventure", "Fantasy", "Shonen"],
        category: "shonen",
        episodes: "1100+ Episodes",
        status: "Ongoing",
        season: "Fall 1999 - Present",
        studio: "Toei Animation",
        source: "Manga by Eiichiro Oda",
        description: "Monkey D. Luffy sets off on an epic voyage with his eclectic crew of Straw Hat Pirates across the treacherous Grand Line to find the legendary treasure 'One Piece' and claim the title of King of the Pirates.",
        synopsis: "Gol D. Roger, the King of the Pirates, obtained everything in this world. His last words at the execution stand inspired thousands to set sail into the Grand Line in search of his grand treasure. Twenty-four years later, young Monkey D. Luffy eats the Gum-Gum Fruit and embarks on a legendary voyage across treacherous seas, confronting Warlords, Emperors, and the World Government with his unbreakable pirate crew.",
        trailerUrl: "https://www.youtube.com/embed/MCb13lbK6W8",
        featured: true,
        stats: {
            action: 98,
            story: 99,
            animation: 92,
            music: 95
        },
        characters: [
            { name: "Monkey D. Luffy", role: "Captain", voice: "Mayumi Tanaka", avatar: "https://cdn.myanimelist.net/images/characters/9/310307.jpg" },
            { name: "Roronoa Zoro", role: "Swordsman", voice: "Kazuya Nakai", avatar: "https://cdn.myanimelist.net/images/characters/3/100534.jpg" },
            { name: "Nami", role: "Navigator", voice: "Akemi Okamura", avatar: "https://cdn.myanimelist.net/images/characters/2/263249.jpg" }
        ]
    },
    {
        id: "jujutsu-kaisen",
        title: "Jujutsu Kaisen",
        japaneseTitle: "呪術廻戦",
        romaji: "Jujutsu Kaisen",
        poster: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
        banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/113415-jQBSkxWAAk83.jpg",
        rating: 9.4,
        votes: "1.9M",
        rank: "#2 Trending",
        genres: ["Dark Fantasy", "Action", "Supernatural", "Shonen"],
        category: "dark-fantasy",
        episodes: "47 Episodes",
        status: "Season 3 Announced",
        season: "Fall 2020 - 2023",
        studio: "MAPPA",
        source: "Manga by Gege Akutami",
        description: "Yuji Itadori swallows a cursed talisman—the finger of the King of Curses Ryomen Sukuna—and plunges into the perilous world of Jujutsu sorcerers to exorcise malevolent curses.",
        synopsis: "In a world where negative human emotions manifest as deadly Curses, high schooler Yuji Itadori possesses extraordinary physical talent. To save his friends from a demonic curse, he swallows the rotting finger of Ryomen Sukuna, becoming his vessel. Mentored by the enigmatic, god-tier sorcerer Satoru Gojo, Yuji enters Tokyo Prefectural Jujutsu High School to master cursed energy and seek out the remaining fragments of Sukuna.",
        trailerUrl: "https://www.youtube.com/embed/pkKu9hLT-t8",
        featured: true,
        stats: {
            action: 99,
            story: 94,
            animation: 99,
            music: 96
        },
        characters: [
            { name: "Satoru Gojo", role: "Special Grade Sorcerer", voice: "Yuichi Nakamura", avatar: "https://cdn.myanimelist.net/images/characters/14/428317.jpg" },
            { name: "Yuji Itadori", role: "Sukuna Vessel", voice: "Junya Enoki", avatar: "https://cdn.myanimelist.net/images/characters/16/424151.jpg" },
            { name: "Megumi Fushiguro", role: "Shadow Puppeteer", voice: "Yuma Uchida", avatar: "https://cdn.myanimelist.net/images/characters/15/424155.jpg" }
        ]
    },
    {
        id: "demon-slayer",
        title: "Demon Slayer: Kimetsu no Yaiba",
        japaneseTitle: "鬼滅の刃",
        romaji: "Kimetsu no Yaiba",
        poster: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
        banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/101922-YfZhKBUDDS6L.jpg",
        rating: 9.3,
        votes: "2.1M",
        rank: "#3 Visual Masterpiece",
        genres: ["Action", "Historical", "Supernatural", "Shonen"],
        category: "action",
        episodes: "55+ Episodes",
        status: "Infinity Castle Arc",
        season: "Spring 2019 - Present",
        studio: "ufotable",
        source: "Manga by Koyoharu Gotouge",
        description: "Tanjiro Kamado joins the Demon Slayer Corps to avenge his slaughtered family and find a cure to turn his demonized sister Nezuko back into a human.",
        synopsis: "In Taisho-era Japan, kindhearted Tanjiro Kamado makes a living selling charcoal. His peaceful life is shattered when demons slaughter his entire family, leaving only his sister Nezuko alive—transformed into a demon. Driven by fraternal devotion, Tanjiro wields the Nichirin sword, masters Water Breathing and the Sun Breathing dance, and climbs the ranks of the Demon Slayer Corps alongside the Hashira.",
        trailerUrl: "https://www.youtube.com/embed/VQGCKyvzIM4",
        featured: true,
        stats: {
            action: 99,
            story: 90,
            animation: 100,
            music: 98
        },
        characters: [
            { name: "Tanjiro Kamado", role: "Sun Breathing Slayer", voice: "Natsuki Hanae", avatar: "https://cdn.myanimelist.net/images/characters/7/386007.jpg" },
            { name: "Nezuko Kamado", role: "Demon Maiden", voice: "Akari Kito", avatar: "https://cdn.myanimelist.net/images/characters/12/386060.jpg" },
            { name: "Zenitsu Agatsuma", role: "Thunder Slayer", voice: "Hiro Shimono", avatar: "https://cdn.myanimelist.net/images/characters/15/386062.jpg" }
        ]
    },
    {
        id: "attack-on-titan",
        title: "Attack on Titan",
        japaneseTitle: "進撃の巨人",
        romaji: "Shingeki no Kyojin",
        poster: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
        banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/16498-8jpFCOcDmnei.jpg",
        rating: 9.6,
        votes: "2.8M",
        rank: "#1 Masterpiece",
        genres: ["Dark Fantasy", "Action", "Mystery", "Psychological"],
        category: "dark-fantasy",
        episodes: "89 Episodes",
        status: "Completed",
        season: "Spring 2013 - Fall 2023",
        studio: "WIT Studio / MAPPA",
        source: "Manga by Hajime Isayama",
        description: "Humanity huddles behind colossal walls to escape human-eating Titans. When a Colossal Titan breaches the outer wall, Eren Yeager vows to eradicate every Titan from the earth.",
        synopsis: "After his hometown is devastated and his mother killed by invading Titans, Eren Yeager enlists in the Scout Regiment alongside childhood friends Mikasa and Armin. As Eren discovers his own ability to transform into an Attack Titan, humanity slowly uncovers the dark truths of their history, the Marleyan empire, and the ultimate moral cataclysm known as the Rumbling.",
        trailerUrl: "https://www.youtube.com/embed/MGRm4IzK1SQ",
        featured: true,
        stats: {
            action: 98,
            story: 100,
            animation: 97,
            music: 100
        },
        characters: [
            { name: "Eren Yeager", role: "The Attack Titan", voice: "Yuki Kaji", avatar: "https://cdn.myanimelist.net/images/characters/10/216895.jpg" },
            { name: "Levi Ackerman", role: "Humanity's Strongest", voice: "Hiroshi Kamiya", avatar: "https://cdn.myanimelist.net/images/characters/2/241413.jpg" },
            { name: "Mikasa Ackerman", role: "Elite Scout", voice: "Yui Ishikawa", avatar: "https://cdn.myanimelist.net/images/characters/9/208571.jpg" }
        ]
    },
    {
        id: "naruto-shippuden",
        title: "Naruto Shippuden",
        japaneseTitle: "NARUTO -ナルト- 疾風伝",
        romaji: "Naruto Shippūden",
        poster: "https://cdn.myanimelist.net/images/anime/1565/111305.jpg",
        banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/1735-51w3mK8iC85y.jpg",
        rating: 9.2,
        votes: "2.3M",
        rank: "#4 Classic Legend",
        genres: ["Action", "Shonen", "Martial Arts", "Adventure"],
        category: "shonen",
        episodes: "500 Episodes",
        status: "Completed",
        season: "Winter 2007 - Spring 2017",
        studio: "Studio Pierrot",
        source: "Manga by Masashi Kishimoto",
        description: "Naruto Uzumaki returns from training to protect the Hidden Leaf Village from the Akatsuki, retrieve his best friend Sasuke, and fulfill his dream of becoming Hokage.",
        synopsis: "After two and a half years of intense training with Master Jiraiya, Naruto Uzumaki returns to Konohagakure with immense growth. As the sinister Akatsuki organization hunts down all tailed beasts, Naruto must master Sage Mode and the Nine-Tails' chakra to save the shinobi world from the Great Ninja War.",
        trailerUrl: "https://www.youtube.com/embed/1dy2zPPrKD0",
        featured: false,
        stats: {
            action: 95,
            story: 93,
            animation: 90,
            music: 98
        },
        characters: [
            { name: "Naruto Uzumaki", role: "Nine-Tails Jinchuriki", voice: "Junko Takeuchi", avatar: "https://cdn.myanimelist.net/images/characters/2/284121.jpg" },
            { name: "Sasuke Uchiha", role: "Sharingan Prodigy", voice: "Noriaki Sugiyama", avatar: "https://cdn.myanimelist.net/images/characters/9/131317.jpg" },
            { name: "Kakashi Hatake", role: "Copy Ninja", voice: "Kazuhiko Inoue", avatar: "https://cdn.myanimelist.net/images/characters/7/284129.jpg" }
        ]
    },
    {
        id: "dragon-ball-super",
        title: "Dragon Ball Super",
        japaneseTitle: "ドラゴンボール超",
        romaji: "Doragon Bōru Sūpā",
        poster: "https://cdn.myanimelist.net/images/anime/7/74607.jpg",
        banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/21175-1033.jpg",
        rating: 8.9,
        votes: "1.7M",
        rank: "#5 Power Scaler",
        genres: ["Action", "Martial Arts", "Sci-Fi", "Shonen"],
        category: "shonen",
        episodes: "131 Episodes",
        status: "Completed (Movies Ongoing)",
        season: "Summer 2015 - Spring 2018",
        studio: "Toei Animation",
        source: "Original by Akira Toriyama",
        description: "Goku and Vegeta encounter Gods of Destruction, alternate universes, and the multi-universal Tournament of Power to transcend mortal limits into Ultra Instinct.",
        synopsis: "Following the defeat of Majin Buu, Lord Beerus the God of Destruction awakens seeking the Super Saiyan God. Goku ascends beyond standard Saiyan forms, sparring across the 12 Universes, entering the epic Tournament of Power where universe existence hangs in the balance.",
        trailerUrl: "https://www.youtube.com/embed/vx_o_1_8j8I",
        featured: false,
        stats: {
            action: 97,
            story: 85,
            animation: 91,
            music: 94
        },
        characters: [
            { name: "Son Goku", role: "Ultra Instinct Saiyan", voice: "Masako Nozawa", avatar: "https://cdn.myanimelist.net/images/characters/15/264049.jpg" },
            { name: "Vegeta", role: "Ultra Ego Saiyan Prince", voice: "Ryo Horikawa", avatar: "https://cdn.myanimelist.net/images/characters/10/276472.jpg" },
            { name: "Lord Beerus", role: "God of Destruction", voice: "Koichi Yamadera", avatar: "https://cdn.myanimelist.net/images/characters/3/207439.jpg" }
        ]
    },
    {
        id: "solo-leveling",
        title: "Solo Leveling",
        japaneseTitle: "俺だけレベルアップな件",
        romaji: "Ore dake Reberuappu na Ken",
        poster: "https://cdn.myanimelist.net/images/anime/1899/141018.jpg",
        banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/151807-6Z1sM4gH4n0D.jpg",
        rating: 9.1,
        votes: "1.2M",
        rank: "#6 Rising Phenom",
        genres: ["Action", "Fantasy", "Supernatural"],
        category: "action",
        episodes: "12+ Episodes",
        status: "Season 2 Airing Soon",
        season: "Winter 2024",
        studio: "A-1 Pictures",
        source: "Manhwa by Chugong & DUBU",
        description: "Sung Jinwoo, known as the 'Weakest Hunter of All Mankind', gains a mysterious gaming quest interface that grants him the unique power to infinitely level up.",
        synopsis: "In a world where dimensional gates connect our reality with deadly monster dungeons, Sung Jinwoo is an E-rank hunter constantly on the brink of death. After surviving a double-dungeon massacre, he wakes up in a hospital with a holographic 'System' visible only to him, initiating a ruthless quest toward becoming the Shadow Monarch.",
        trailerUrl: "https://www.youtube.com/embed/9g_8aZq_DMo",
        featured: false,
        stats: {
            action: 98,
            story: 91,
            animation: 96,
            music: 95
        },
        characters: [
            { name: "Sung Jinwoo", role: "Shadow Monarch", voice: "Taito Ban", avatar: "https://cdn.myanimelist.net/images/characters/6/528343.jpg" },
            { name: "Cha Hae-In", role: "S-Rank Huntress", voice: "Reina Ueda", avatar: "https://cdn.myanimelist.net/images/characters/11/534720.jpg" }
        ]
    },
    {
        id: "bleach-tybw",
        title: "Bleach: Thousand-Year Blood War",
        japaneseTitle: "BLEACH 千年血戦篇",
        romaji: "Burīchi: Sennen Kessen-hen",
        poster: "https://cdn.myanimelist.net/images/anime/1764/126627.jpg",
        banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/114446-2jL16pW3kG0K.jpg",
        rating: 9.4,
        votes: "1.5M",
        rank: "#7 Quincy War",
        genres: ["Supernatural", "Action", "Swordplay", "Shonen"],
        category: "action",
        episodes: "26+ Episodes",
        status: "Part 3 in Production",
        season: "Fall 2022 - Present",
        studio: "Studio Pierrot",
        source: "Manga by Tite Kubo",
        description: "The Quincy King Yhwach awakes after a 1000-year slumber to annihilate the Soul Society, forcing Ichigo Kurosaki to unlock his deepest ancestral Bankai.",
        synopsis: "When Soul Reapers and Hollows mysteriously vanish across both realms, the Wandenreich—an unseen empire of Quincies led by Father of the Quincy Yhwach—declares war on the Gotei 13. Ichigo travels to the Soul King's Palace to forge his true Zanpakuto and confront the ancient past.",
        trailerUrl: "https://www.youtube.com/embed/78WIYzX_Ed8",
        featured: false,
        stats: {
            action: 99,
            story: 94,
            animation: 99,
            music: 99
        },
        characters: [
            { name: "Ichigo Kurosaki", role: "Substitute Soul Reaper", voice: "Masakazu Morita", avatar: "https://cdn.myanimelist.net/images/characters/3/53805.jpg" },
            { name: "Yhwach", role: "The Almighty Quincy King", voice: "Takayuki Sugo", avatar: "https://cdn.myanimelist.net/images/characters/5/489066.jpg" }
        ]
    },
    {
        id: "chainsaw-man",
        title: "Chainsaw Man",
        japaneseTitle: "チェンソーマン",
        romaji: "Chensō Man",
        poster: "https://cdn.myanimelist.net/images/anime/1806/126216.jpg",
        banner: "https://s4.anilist.co/file/anilistcdn/media/anime/banner/127230-eU0jFkYdK9d4.jpg",
        rating: 9.0,
        votes: "1.6M",
        rank: "#8 Dark Cyberpunk",
        genres: ["Dark Fantasy", "Action", "Supernatural", "Gore"],
        category: "dark-fantasy",
        episodes: "12 Episodes",
        status: "Reze Arc Movie Announced",
        season: "Fall 2022",
        studio: "MAPPA",
        source: "Manga by Tatsuki Fujimoto",
        description: "Denji merges with his chainsaw devil pet Pochita after a betrayal, becoming Chainsaw Man and joining Public Safety Devil Hunters under the mysterious Makima.",
        synopsis: "Living in rock-bottom poverty to pay his deceased father's debt to the yakuza, Denji hunts minor devils with his chainsaw devil canine Pochita. When double-crossed and killed, Pochita fuses with Denji's heart. Revived with cord-pulling chainsaw limbs, Denji enters Makima's enigmatic special division.",
        trailerUrl: "https://www.youtube.com/embed/q15CRdE5Bv0",
        featured: false,
        stats: {
            action: 97,
            story: 92,
            animation: 98,
            music: 97
        },
        characters: [
            { name: "Denji", role: "Chainsaw Hybrid", voice: "Kikunosuke Toya", avatar: "https://cdn.myanimelist.net/images/characters/3/492407.jpg" },
            { name: "Makima", role: "Control Devil / Leader", voice: "Tomori Kusunoki", avatar: "https://cdn.myanimelist.net/images/characters/6/492415.jpg" }
        ]
    }
];

const MANGA_DATA = [
    {
        id: "berserk",
        title: "Berserk",
        japaneseTitle: "ベルセルク",
        author: "Kentaro Miura",
        rating: 9.8,
        volumes: "41 Volumes",
        chapters: "375+ Chapters",
        cover: "https://cdn.myanimelist.net/images/manga/1/157897.jpg",
        tag: "Dark Fantasy Masterpiece",
        synopsis: "Guts, a former mercenary known as the 'Black Swordsman', is out for vengeance against his former friend Griffith, who sacrificed his comrades to become a demonic god.",
        status: "Continuing by Studio Gaga"
    },
    {
        id: "vagabond",
        title: "Vagabond",
        japaneseTitle: "バガボンド",
        author: "Takehiko Inoue",
        rating: 9.7,
        volumes: "37 Volumes",
        chapters: "327 Chapters",
        cover: "https://cdn.myanimelist.net/images/manga/1/259070.jpg",
        tag: "Philosophical Samurai",
        synopsis: "The legendary swordsman Miyamoto Musashi wanders 16th century Japan seeking enlightenment through the pinnacle of the blade.",
        status: "Hiatus / Classic"
    },
    {
        id: "tokyo-ghoul",
        title: "Tokyo Ghoul",
        japaneseTitle: "東京喰種",
        author: "Sui Ishida",
        rating: 9.3,
        volumes: "14 Volumes (+:re)",
        chapters: "322 Chapters",
        cover: "https://cdn.myanimelist.net/images/manga/3/85215.jpg",
        tag: "Psychological Horror",
        synopsis: "Ken Kaneki survives an encounter with a ghoul who is later transplanted into him, forcing him to navigate the underground ghoul society of Tokyo.",
        status: "Completed"
    },
    {
        id: "blue-lock",
        title: "Blue Lock",
        japaneseTitle: "ブルーロック",
        author: "Muneyuki Kaneshiro",
        rating: 9.2,
        volumes: "28 Volumes",
        chapters: "260+ Chapters",
        cover: "https://cdn.myanimelist.net/images/manga/3/218086.jpg",
        tag: "Egoist Football",
        synopsis: "Three hundred elite high school strikers are locked in a prison-like facility called Blue Lock, competing in a ruthless battle royale to create Japan's ultimate egoist striker.",
        status: "Ongoing"
    }
];

const CHARACTER_VAULT = [
    {
        id: "gojo",
        name: "Satoru Gojo",
        japaneseName: "五条 悟",
        anime: "Jujutsu Kaisen",
        title: "The Honored One",
        quote: "“Throughout Heaven and Earth, I alone am the honored one.”",
        image: "https://cdn.myanimelist.net/images/characters/14/428317.jpg",
        glowColor: "#00f0ff",
        stats: {
            power: 100,
            speed: 99,
            intelligence: 98,
            technique: 100,
            aura: 100
        },
        abilities: ["Limitless Cursed Technique", "Six Eyes", "Domain Expansion: Infinite Void", "Hollow Purple: 200%"]
    },
    {
        id: "naruto",
        name: "Naruto Uzumaki",
        japaneseName: "うずまき ナルト",
        anime: "Naruto Shippuden",
        title: "The Seventh Hokage",
        quote: "“I'm not gonna run away, I never go back on my word! That's my nindō: my ninja way!”",
        image: "https://cdn.myanimelist.net/images/characters/2/284121.jpg",
        glowColor: "#ff8c2a",
        stats: {
            power: 99,
            speed: 97,
            intelligence: 91,
            technique: 98,
            aura: 100
        },
        abilities: ["Six Paths Sage Mode", "Kurama Chakra Mode", "Rasenshuriken", "Tailed Beast Rasenshuriken"]
    },
    {
        id: "luffy",
        name: "Monkey D. Luffy",
        japaneseName: "モンキー・D・ルフィ",
        anime: "One Piece",
        title: "Warrior of Liberation / Sun God Nika",
        quote: "“If you don’t take risks, you can’t create a future!”",
        image: "https://cdn.myanimelist.net/images/characters/9/310307.jpg",
        glowColor: "#ffd166",
        stats: {
            power: 99,
            speed: 96,
            intelligence: 85,
            technique: 95,
            aura: 99
        },
        abilities: ["Gear 5: Sun God Nika", "Advanced Conqueror's Haki", "Ryuu Armor Infusion", "Gomu Gomu Bajrang Gun"]
    },
    {
        id: "levi",
        name: "Levi Ackerman",
        japaneseName: "リヴァイ・アッカーマン",
        anime: "Attack on Titan",
        title: "Humanity's Strongest Soldier",
        quote: "“The only thing we’re allowed to do is to believe that we won’t regret the choice we made.”",
        image: "https://cdn.myanimelist.net/images/characters/2/241413.jpg",
        glowColor: "#06b6d4",
        stats: {
            power: 96,
            speed: 100,
            intelligence: 95,
            technique: 100,
            aura: 98
        },
        abilities: ["Ackerman Awakening", "Omni-Directional Mobility Mastery", "Thunder Spear Precision", "Dual Blade Hurricane"]
    },
    {
        id: "tanjiro",
        name: "Tanjiro Kamado",
        japaneseName: "竈門 炭治郎",
        anime: "Demon Slayer",
        title: "Sun Breathing Successor",
        quote: "“No matter how many people you may lose, you have no choice but to go on living.”",
        image: "https://cdn.myanimelist.net/images/characters/7/386007.jpg",
        glowColor: "#ff2a85",
        stats: {
            power: 94,
            speed: 95,
            intelligence: 92,
            technique: 98,
            aura: 96
        },
        abilities: ["Hinokami Kagura (Sun Breathing)", "Transparent World Vision", "Demon Slayer Mark", "Selfless State"]
    },
    {
        id: "zoro",
        name: "Roronoa Zoro",
        japaneseName: "ロロノア・ゾロ",
        anime: "One Piece",
        title: "King of Hell",
        quote: "“Scars on the back are a swordsman's shame.”",
        image: "https://cdn.myanimelist.net/images/characters/3/100534.jpg",
        glowColor: "#10b981",
        stats: {
            power: 98,
            speed: 94,
            intelligence: 86,
            technique: 99,
            aura: 99
        },
        abilities: ["Three-Sword Style", "King of Hell Infusion", "Asura: Nine Blades", "Enma Sword Mastery"]
    }
];

const AIRING_SCHEDULE = [
    {
        day: "Monday",
        japaneseDay: "月曜日",
        shows: [
            { title: "Solo Leveling: Arise", time: "23:00 JST", ep: "Ep 13", studio: "A-1 Pictures", tag: "Hot" },
            { title: "Tower of God Season 2", time: "23:30 JST", ep: "Ep 08", studio: "The Answer Studio", tag: "Airing" }
        ]
    },
    {
        day: "Tuesday",
        japaneseDay: "火曜日",
        shows: [
            { title: "Bleach: Thousand-Year Blood War", time: "23:00 JST", ep: "Ep 27", studio: "Studio Pierrot", tag: "Highlight" },
            { title: "Blue Lock Season 2", time: "23:45 JST", ep: "Ep 05", studio: "8bit", tag: "New" }
        ]
    },
    {
        day: "Wednesday",
        japaneseDay: "水曜日",
        shows: [
            { title: "Chainsaw Man: Reze Special", time: "22:00 JST", ep: "Preview", studio: "MAPPA", tag: "Movie Teaser" },
            { title: "Wind Breaker", time: "23:55 JST", ep: "Ep 12", studio: "CloverWorks", tag: "Airing" }
        ]
    },
    {
        day: "Thursday",
        japaneseDay: "木曜日",
        shows: [
            { title: "Jujutsu Kaisen: Culling Game", time: "23:56 JST", ep: "Teaser", studio: "MAPPA", tag: "Anticipated" },
            { title: "Dungeon Meshi", time: "22:30 JST", ep: "Ep 24", studio: "Trigger", tag: "Season Finale" }
        ]
    },
    {
        day: "Friday",
        japaneseDay: "金曜日",
        shows: [
            { title: "Frieren: Beyond Journey's End", time: "23:00 JST", ep: "Ep 28", studio: "Madhouse", tag: "Masterpiece" },
            { title: "Kaiju No. 8", time: "23:00 JST", ep: "Ep 10", studio: "Production I.G", tag: "Action" }
        ]
    },
    {
        day: "Saturday",
        japaneseDay: "土曜日",
        shows: [
            { title: "My Hero Academia Final Season", time: "17:30 JST", ep: "Ep 150", studio: "BONES", tag: "Climax" },
            { title: "Demon Slayer: Infinity Castle", time: "23:15 JST", ep: "Special", studio: "ufotable", tag: "Trending #1" }
        ]
    },
    {
        day: "Sunday",
        japaneseDay: "日曜日",
        shows: [
            { title: "One Piece: Egghead Island", time: "09:30 JST", ep: "Ep 1115", studio: "Toei Animation", tag: "Global Epic" },
            { title: "Black Clover: Spade Kingdom Return", time: "18:00 JST", ep: "Ep 171", studio: "Studio Pierrot", tag: "Airing" }
        ]
    }
];

import { Movie } from "../types/movie";

export const MOCK_MOVIES: Movie[] = [
  {
    id: "inception",
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project.",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80",
    genres: ["Sci-Fi", "Action", "Thriller"],
    rating: 8.8,
    releaseYear: 2010,
    language: "English",
    runtime: 148,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page", "Tom Hardy", "Marion Cotillard"],
    streamingPlatforms: ["Netflix", "Prime Video", "Max"],
    trailerKey: "YoHD9XEInc0",
    budget: "$160M",
    revenue: "$836M",
    popularity: 98,
    keywords: ["dreams", "subconscious", "heist", "mind-bending", "spinning top"],
    reviews: [
      { id: "r1", author: "Cinephile_99", rating: 9, content: "A masterpiece of modern cinema. Mind-bending plot paired with flawless visual effects.", date: "2026-01-15" },
      { id: "r2", author: "MovieBuff", rating: 10, content: "The sheer ambition of this film is staggering. Hans Zimmer's score is iconic.", date: "2026-03-02" }
    ]
  },
  {
    id: "interstellar",
    title: "Interstellar",
    overview: "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    posterUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&auto=format&fit=crop&q=80",
    genres: ["Sci-Fi", "Drama", "Adventure"],
    rating: 8.7,
    releaseYear: 2014,
    language: "English",
    runtime: 169,
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine", "Matt Damon"],
    streamingPlatforms: ["Prime Video", "Max", "Paramount+"],
    trailerKey: "zSWdZVtXT7E",
    budget: "$165M",
    revenue: "$701M",
    popularity: 99,
    keywords: ["space travel", "black hole", "wormhole", "time dilation", "father-daughter"],
    reviews: [
      { id: "r3", author: "GravityBound", rating: 10, content: "Emotionally devastating and scientifically spectacular. Cried like a baby at the bookshelf scene.", date: "2025-11-20" },
      { id: "r4", author: "SciFiGuy", rating: 8, content: "A visual spectacle that is highly ambitious, even if some of the dialogue gets preachy.", date: "2025-12-14" }
    ]
  },
  {
    id: "dark-knight",
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    posterUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80",
    genres: ["Action", "Crime", "Drama", "Thriller"],
    rating: 9.0,
    releaseYear: 2008,
    language: "English",
    runtime: 152,
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Maggie Gyllenhaal", "Gary Oldman"],
    streamingPlatforms: ["Max", "Netflix"],
    trailerKey: "EXeTwQWrcwY",
    budget: "$185M",
    revenue: "$1.006B",
    popularity: 100,
    keywords: ["joker", "vigilante", "gotham", "moral dilemma", "hero's fall"],
    reviews: [
      { id: "r5", author: "JokerFanatic", rating: 10, content: "Heath Ledger gave the greatest acting performance of all time. Period.", date: "2026-02-10" }
    ]
  },
  {
    id: "parasite",
    title: "Parasite",
    overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    posterUrl: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&auto=format&fit=crop&q=80",
    genres: ["Thriller", "Drama", "Comedy"],
    rating: 8.5,
    releaseYear: 2019,
    language: "Korean",
    runtime: 132,
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong", "Choi Woo-shik", "Park So-dam"],
    streamingPlatforms: ["Max", "Hulu"],
    trailerKey: "5xH0HfJHsaY",
    budget: "$11M",
    revenue: "$263M",
    popularity: 95,
    keywords: ["class struggle", "con-artists", "basement", "social satire", "unexpected twist"],
    reviews: [
      { id: "r6", author: "BongJoonHoStan", rating: 10, content: "Deserved every bit of its historic Best Picture win. It transitions from comedy to thriller seamlessly.", date: "2026-04-18" }
    ]
  },
  {
    id: "dune-part-two",
    title: "Dune: Part Two",
    overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe, he endeavors to prevent a terrible future only he can foresee.",
    posterUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200&auto=format&fit=crop&q=80",
    genres: ["Sci-Fi", "Adventure", "Action"],
    rating: 8.6,
    releaseYear: 2024,
    language: "English",
    runtime: 166,
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson", "Austin Butler", "Florence Pugh"],
    streamingPlatforms: ["Max"],
    trailerKey: "Way9Dexny3w",
    budget: "$190M",
    revenue: "$712M",
    popularity: 97,
    keywords: ["desert", "messiah", "spice", "sandworm", "galactic empire"],
    reviews: [
      { id: "r7", author: "ArrakisDream", rating: 10, content: "This is our generation's Empire Strikes Back. Denis Villeneuve is a wizard.", date: "2026-05-01" }
    ]
  },
  {
    id: "everything-everywhere",
    title: "Everything Everywhere All at Once",
    overview: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.",
    posterUrl: "https://images.unsplash.com/photo-1492446845049-9c50cc313f00?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=1200&auto=format&fit=crop&q=80",
    genres: ["Sci-Fi", "Comedy", "Action", "Drama"],
    rating: 8.1,
    releaseYear: 2022,
    language: "English",
    runtime: 139,
    director: "Daniel Kwan, Daniel Scheinert",
    cast: ["Michelle Yeoh", "Ke Huy Quan", "Stephanie Hsu", "Jamie Lee Curtis", "James Hong"],
    streamingPlatforms: ["Netflix", "Prime Video"],
    trailerKey: "wxN1T1uxQ2g",
    budget: "$25M",
    revenue: "$143M",
    popularity: 94,
    keywords: ["multiverse", "taxes", "googly eyes", "existentialism", "mother-daughter"],
    reviews: [
      { id: "r8", author: "GooglyEyeSkeptic", rating: 9, content: "Absolute beautiful madness. It's ridiculous, poignant, and philosophical all at once.", date: "2026-01-22" }
    ]
  },
  {
    id: "whiplash",
    title: "Whiplash",
    overview: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
    posterUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80",
    genres: ["Drama", "Music"],
    rating: 8.5,
    releaseYear: 2014,
    language: "English",
    runtime: 106,
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons", "Paul Reiser", "Melissa Benoist"],
    streamingPlatforms: ["Netflix", "Prime Video"],
    trailerKey: "7d_jQyGld4Y",
    budget: "$3.3M",
    revenue: "$49M",
    popularity: 91,
    keywords: ["jazz", "drumming", "obsession", "abusive mentor", "perfectionism"],
    reviews: [
      { id: "r9", author: "TempoMaster", rating: 10, content: "The final 10 minutes of this movie will make you hold your breath. J.K. Simmons is terrifying.", date: "2026-03-10" }
    ]
  },
  {
    id: "la-la-land",
    title: "La La Land",
    overview: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    posterUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80",
    genres: ["Romance", "Music", "Drama", "Comedy"],
    rating: 8.0,
    releaseYear: 2016,
    language: "English",
    runtime: 128,
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone", "John Legend", "Rosemarie DeWitt"],
    streamingPlatforms: ["Netflix", "Hulu"],
    trailerKey: "0pdqf4P9MB8",
    budget: "$30M",
    revenue: "$447M",
    popularity: 92,
    keywords: ["jazz", "hollywood", "musicals", "auditions", "nostalgia"],
    reviews: [
      { id: "r10", author: "Mia_Seb", rating: 9, content: "A bittersweet love letter to dreams, art, and the city of stars. Emma Stone is magical.", date: "2026-02-14" }
    ]
  },
  {
    id: "get-out",
    title: "Get Out",
    overview: "A young Afro-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception eventually reaches a boiling point.",
    posterUrl: "https://images.unsplash.com/photo-1505635552518-3448ff116af3?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=1200&auto=format&fit=crop&q=80",
    genres: ["Horror", "Thriller", "Mystery"],
    rating: 7.8,
    releaseYear: 2017,
    language: "English",
    runtime: 104,
    director: "Jordan Peele",
    cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford", "Catherine Keener", "Lil Rel Howery"],
    streamingPlatforms: ["Netflix", "Prime Video"],
    trailerKey: "A27xS6gX0pQ",
    budget: "$4.5M",
    revenue: "$255M",
    popularity: 90,
    keywords: ["social commentary", "hypnosis", "sunken place", "suburbia", "survival"],
    reviews: [
      { id: "r11", author: "SunkenPlaceTraveler", rating: 9, content: "One of the most tightly written screenplays of the decade. Fusing psychological horror with biting social satire.", date: "2026-03-22" }
    ]
  },
  {
    id: "knives-out",
    title: "Knives Out",
    overview: "A detective investigates the death of a patriarch of an eccentric, combative family.",
    posterUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=1200&auto=format&fit=crop&q=80",
    genres: ["Comedy", "Mystery", "Thriller"],
    rating: 7.9,
    releaseYear: 2019,
    language: "English",
    runtime: 130,
    director: "Rian Johnson",
    cast: ["Daniel Craig", "Ana de Armas", "Chris Evans", "Jamie Lee Curtis", "Christopher Plummer"],
    streamingPlatforms: ["Prime Video", "Netflix"],
    trailerKey: "qGqiHJYsRcA",
    budget: "$40M",
    revenue: "$312M",
    popularity: 89,
    keywords: ["whodunit", "eccentric family", "doughnut hole", "inheritance", "poisoning"],
    reviews: [
      { id: "r12", author: "BenoitBlancStan", rating: 10, content: "Insanely fun. Daniel Craig's Southern accent is hilariously charming, and Ana de Armas is the beating heart.", date: "2026-04-10" }
    ]
  },
  {
    id: "spirited-away",
    title: "Spirited Away",
    overview: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=1200&auto=format&fit=crop&q=80",
    genres: ["Animation", "Adventure", "Fantasy", "Family"],
    rating: 8.6,
    releaseYear: 2001,
    language: "Japanese",
    runtime: 125,
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki", "Takashi Naito"],
    streamingPlatforms: ["Max", "Netflix"],
    trailerKey: "ByXuk9QqQkk",
    budget: "$19M",
    revenue: "$395M",
    popularity: 96,
    keywords: ["bathhouse", "spirits", "witch", "dragons", "coming of age"],
    reviews: [
      { id: "r13", author: "GhibliLover", rating: 10, content: "Every frame is a painting. A majestic, magical epic that speaks deeply to the transition into adulthood.", date: "2026-05-15" }
    ]
  },
  {
    id: "spider-verse",
    title: "Spider-Man: Into the Spider-Verse",
    overview: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
    posterUrl: "https://images.unsplash.com/photo-1608889175123-8ec330b86f84?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&auto=format&fit=crop&q=80",
    genres: ["Animation", "Action", "Adventure", "Sci-Fi"],
    rating: 8.4,
    releaseYear: 2018,
    language: "English",
    runtime: 117,
    director: "Bob Persichetti, Peter Ramsey, Rodney Rothman",
    cast: ["Shameik Moore", "Jake Johnson", "Hailee Steinfeld", "Mahershala Ali", "Nicolas Cage"],
    streamingPlatforms: ["Disney+", "Netflix"],
    trailerKey: "g4HnO9_A-R4",
    budget: "$90M",
    revenue: "$384M",
    popularity: 93,
    keywords: ["superhero", "graffiti", "dimensions", "leap of faith", "origin story"],
    reviews: [
      { id: "r14", author: "SpiderFanatic", rating: 10, content: "Reinvented the entire medium of animation. Outstanding music, heart, and visual splendor.", date: "2026-06-01" }
    ]
  },
  {
    id: "arrival",
    title: "Arrival",
    overview: "A linguist is recruited by the military to assist in translating communications with extraterrestrial visitors who have initiated contact with humanity across twelve mysterious spacecraft around the globe.",
    posterUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1200&auto=format&fit=crop&q=80",
    genres: ["Sci-Fi", "Drama", "Mystery"],
    rating: 7.9,
    releaseYear: 2016,
    language: "English",
    runtime: 116,
    director: "Denis Villeneuve",
    cast: ["Amy Adams", "Jeremy Renner", "Forest Whitaker", "Michael Stuhlbarg"],
    streamingPlatforms: ["Prime Video", "Paramount+"],
    trailerKey: "tFMo3UJ4B4g",
    budget: "$47M",
    revenue: "$203M",
    popularity: 88,
    keywords: ["aliens", "linguistics", "heptapods", "circular language", "nonlinear time"],
    reviews: [
      { id: "r15", author: "LinguisticNerd", rating: 10, content: "An incredibly deep, philosophical take on communication and time. Amy Adams deserved an Oscar nomination.", date: "2026-02-28" }
    ]
  },
  {
    id: "mad-max-fury-road",
    title: "Mad Max: Fury Road",
    overview: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=1200&auto=format&fit=crop&q=80",
    genres: ["Action", "Sci-Fi", "Adventure"],
    rating: 8.1,
    releaseYear: 2015,
    language: "English",
    runtime: 120,
    director: "George Miller",
    cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult", "Hugh Keays-Byrne"],
    streamingPlatforms: ["Max", "Netflix"],
    trailerKey: "hEJnMQG9ev8",
    budget: "$150M",
    revenue: "$380M",
    popularity: 92,
    keywords: ["post-apocalyptic", "car chase", "desert", "survival", "war boys"],
    reviews: [
      { id: "r16", author: "FuryRoadWarrior", rating: 10, content: "Two hours of pure, adrenaline-fueled practical effect mastery. Charlize Theron as Furiosa is an instant icon.", date: "2026-03-05" }
    ]
  },
  {
    id: "whiplash-motivational",
    title: "The Pursuit of Happyness",
    overview: "A struggling salesman takes custody of his son as he's poised to begin a life-changing professional career, battling homelessness and absolute despair on the streets of San Francisco.",
    posterUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=1200&auto=format&fit=crop&q=80",
    genres: ["Drama", "Biography"],
    rating: 8.0,
    releaseYear: 2006,
    language: "English",
    runtime: 117,
    director: "Gabriele Muccino",
    cast: ["Will Smith", "Jaden Smith", "Thandiwe Newton", "Brian Howe"],
    streamingPlatforms: ["Netflix", "Prime Video"],
    trailerKey: "89Kq8SDyvfg",
    budget: "$55M",
    revenue: "$307M",
    popularity: 87,
    keywords: ["homelessness", "stock broker", "father-son", "rubik's cube", "motivation"],
    reviews: [
      { id: "r17", author: "HustleHarder", rating: 9, content: "Will Smith's finest hour. An incredibly inspiring tale that proves perseverance conquers all.", date: "2026-01-30" }
    ]
  },
  {
    id: "the-conjuring",
    title: "The Conjuring",
    overview: "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
    posterUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1533240332313-0db49b439ad3?w=1200&auto=format&fit=crop&q=80",
    genres: ["Horror", "Mystery", "Thriller"],
    rating: 7.5,
    releaseYear: 2013,
    language: "English",
    runtime: 112,
    director: "James Wan",
    cast: ["Vera Farmiga", "Patrick Wilson", "Lili Taylor", "Ron Livingston"],
    streamingPlatforms: ["Netflix", "Max"],
    trailerKey: "k10ETZ42q5o",
    budget: "$20M",
    revenue: "$320M",
    popularity: 86,
    keywords: ["haunted house", "demonic possession", "exorcism", "paranormal", "based on true events"],
    reviews: [
      { id: "r18", author: "HauntedNights", rating: 8, content: "One of the scariest modern horror movies. James Wan is a master of building terrifying dread.", date: "2026-05-10" }
    ]
  },
  {
    id: "about-time",
    title: "About Time",
    overview: "At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.",
    posterUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1494972308805-463bc619b34e?w=1200&auto=format&fit=crop&q=80",
    genres: ["Romance", "Comedy", "Drama", "Fantasy"],
    rating: 7.8,
    releaseYear: 2013,
    language: "English",
    runtime: 123,
    director: "Richard Curtis",
    cast: ["Domhnall Gleeson", "Rachel McAdams", "Bill Nighy", "Margot Robbie"],
    streamingPlatforms: ["Prime Video", "Netflix"],
    trailerKey: "T7A810duHvw",
    budget: "$12M",
    revenue: "$87M",
    popularity: 85,
    keywords: ["time travel", "london", "father-son", "wedding", "sweet romance"],
    reviews: [
      { id: "r19", author: "HopelessRomantic", rating: 10, content: "This movie starts as a delightful rom-com and turns into one of the most beautiful family dramas ever made. Cherish every day.", date: "2026-04-01" }
    ]
  },
  {
    id: "gladiator",
    title: "Gladiator",
    overview: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
    posterUrl: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    genres: ["Action", "Adventure", "Drama"],
    rating: 8.5,
    releaseYear: 2000,
    language: "English",
    runtime: 155,
    director: "Ridley Scott",
    cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen", "Oliver Reed"],
    streamingPlatforms: ["Prime Video", "Paramount+"],
    trailerKey: "P5ieIbInFpg",
    budget: "$103M",
    revenue: "$503M",
    popularity: 94,
    keywords: ["roman empire", "colosseum", "revenge", "slavery", "gladiator"],
    reviews: [
      { id: "r20", author: "RomeConqueror", rating: 10, content: "Are you not entertained? Gladiator is a roaring, emotional epic that never gets old.", date: "2026-02-28" }
    ]
  }
];

// Helper to match a movie's mood
export function getMoviesByMood(mood: string): Movie[] {
  switch (mood.toLowerCase()) {
    case "happy":
    case "comedy":
      return MOCK_MOVIES.filter(m => m.genres.includes("Comedy") || m.genres.includes("Animation"));
    case "sad":
      return MOCK_MOVIES.filter(m => m.genres.includes("Drama") && !m.genres.includes("Comedy") && !m.genres.includes("Romance"));
    case "romantic":
      return MOCK_MOVIES.filter(m => m.genres.includes("Romance"));
    case "action":
      return MOCK_MOVIES.filter(m => m.genres.includes("Action"));
    case "thriller":
      return MOCK_MOVIES.filter(m => m.genres.includes("Thriller") || m.genres.includes("Mystery"));
    case "sci-fi":
      return MOCK_MOVIES.filter(m => m.genres.includes("Sci-Fi"));
    case "horror":
      return MOCK_MOVIES.filter(m => m.genres.includes("Horror"));
    case "motivational":
      return MOCK_MOVIES.filter(m => m.keywords.includes("motivation") || m.id === "whiplash" || m.genres.includes("Biography"));
    default:
      return MOCK_MOVIES;
  }
}

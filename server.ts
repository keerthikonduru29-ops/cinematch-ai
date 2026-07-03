import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Shareable Mock movies data to use for recommendation matching or fallback
const STATIC_FALLBACK_MOVIES = [
  {
    id: "inception",
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project.",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80",
    genres: ["Sci-Fi", "Action", "Thriller"],
    rating: 8.8,
    releaseYear: 2010,
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Tom Hardy"],
    streamingPlatforms: ["Netflix", "Prime Video", "Max"],
    trailerKey: "YoHD9XEInc0",
    budget: "$160M",
    revenue: "$836M",
    popularity: 98,
    keywords: ["dreams", "subconscious", "heist", "mind-bending"]
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
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    streamingPlatforms: ["Prime Video", "Max", "Paramount+"],
    trailerKey: "zSWdZVtXT7E",
    budget: "$165M",
    revenue: "$701M",
    popularity: 99,
    keywords: ["space travel", "black hole", "wormhole", "father-daughter"]
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
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Gary Oldman"],
    streamingPlatforms: ["Max", "Netflix"],
    trailerKey: "EXeTwQWrcwY",
    budget: "$185M",
    revenue: "$1.006B",
    popularity: 100,
    keywords: ["joker", "vigilante", "gotham", "moral dilemma"]
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
    director: "Bong Joon Ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
    streamingPlatforms: ["Max", "Hulu"],
    trailerKey: "5xH0HfJHsaY",
    budget: "$11M",
    revenue: "$263M",
    popularity: 95,
    keywords: ["class struggle", "con-artists", "basement"]
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
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Zendaya", "Rebecca Ferguson"],
    streamingPlatforms: ["Max"],
    trailerKey: "Way9Dexny3w",
    budget: "$190M",
    revenue: "$712M",
    popularity: 97,
    keywords: ["desert", "messiah", "spice", "sandworm"]
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
    director: "Daniel Kwan, Daniel Scheinert",
    cast: ["Michelle Yeoh", "Ke Huy Quan", "Stephanie Hsu"],
    streamingPlatforms: ["Netflix", "Prime Video"],
    trailerKey: "wxN1T1uxQ2g",
    budget: "$25M",
    revenue: "$143M",
    popularity: 94,
    keywords: ["multiverse", "taxes", "existentialism"]
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
    director: "Damien Chazelle",
    cast: ["Miles Teller", "J.K. Simmons", "Paul Reiser"],
    streamingPlatforms: ["Netflix", "Prime Video"],
    trailerKey: "7d_jQyGld4Y",
    budget: "$3.3M",
    revenue: "$49M",
    popularity: 91,
    keywords: ["jazz", "drumming", "obsession", "perfectionism"]
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
    director: "Damien Chazelle",
    cast: ["Ryan Gosling", "Emma Stone", "John Legend"],
    streamingPlatforms: ["Netflix", "Hulu"],
    trailerKey: "0pdqf4P9MB8",
    budget: "$30M",
    revenue: "$447M",
    popularity: 92,
    keywords: ["jazz", "hollywood", "musicals", "nostalgia"]
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
    director: "Jordan Peele",
    cast: ["Daniel Kaluuya", "Allison Williams", "Catherine Keener"],
    streamingPlatforms: ["Netflix", "Prime Video"],
    trailerKey: "A27xS6gX0pQ",
    budget: "$4.5M",
    revenue: "$255M",
    popularity: 90,
    keywords: ["social commentary", "hypnosis", "sunken place"]
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
    director: "Rian Johnson",
    cast: ["Daniel Craig", "Ana de Armas", "Chris Evans"],
    streamingPlatforms: ["Prime Video", "Netflix"],
    trailerKey: "qGqiHJYsRcA",
    budget: "$40M",
    revenue: "$312M",
    popularity: 89,
    keywords: ["whodunit", "eccentric family", "doughnut hole"]
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
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"],
    streamingPlatforms: ["Max", "Netflix"],
    trailerKey: "ByXuk9QqQkk",
    budget: "$19M",
    revenue: "$395M",
    popularity: 96,
    keywords: ["bathhouse", "spirits", "witch", "dragons"]
  }
];

// Initialize Gemini Client safely on the server using lazy instantiation
let ai: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!ai) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== "MY_GEMINI_API_KEY" && key.trim() !== "") {
      ai = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
  }
  return ai;
}

// API endpoint for smart AI recommendations
app.post("/api/recommendations", async (req, res) => {
  const {
    favoriteGenres = [],
    favoriteActors = [],
    favoriteDirectors = [],
    mood = "",
    viewingPreference = "",
    duration = "",
    streamingPlatforms = [],
    customInput = ""
  } = req.body;

  const client = getGeminiClient();

  if (client) {
    try {
      const prompt = `You are a highly advanced cinematic recommendation engine called "CineMatch AI".
Generate a list of exactly 4 movies that perfectly match the following user profile:
- Favorite Genres: ${favoriteGenres.join(", ") || "Any"}
- Favorite Actors: ${favoriteActors.join(", ") || "Any"}
- Favorite Directors: ${favoriteDirectors.join(", ") || "Any"}
- Current Mood: ${mood || "General"}
- Viewing Preference: ${viewingPreference || "Solo"}
- Duration constraints: ${duration || "Any"}
- Streaming platforms: ${streamingPlatforms.join(", ") || "Any"}
- Extra context from user: "${customInput || "None"}"

Make sure your recommendations:
1. Include at least 2 highly famous movies from the prompt's profile and 2 highly creative yet extremely fitting masterpieces they might have missed.
2. Provide a personalized "whyRecommended" string showing exactly how this matches their mood and directors/actors. Mention their specified parameters.
3. Assign a realistic "matchScore" (between 82 and 99) based on how well it fits.
4. Try to output realistic, correct metadata for release years, directors, and actors.
5. Choose from popular movies, such as Inception, Interstellar, Dune, Parasite, Whiplash, Everything Everywhere All At Once, La La Land, Gladiator, Se7en, Get Out, The Conjuring, Avatar, Blade Runner 2049, Shutter Island, or other world-famous masterpieces.

Return a JSON array containing objects with these EXACT fields:
- title: name of the movie
- releaseYear: number
- director: string
- cast: array of strings (top 3 actors)
- genres: array of strings
- rating: number (predicted IMDb rating from 1 to 10)
- overview: short synopsis (2 sentences)
- whyRecommended: detailed personal explanation of why this matches (2-3 sentences)
- matchScore: number (82 to 99)
- streamingPlatforms: array of strings representing streaming platforms they can watch it on.
- trailerKey: a valid youtube key if you know it, or leave as a string like "YoHD9XEInc0" or search query string.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                releaseYear: { type: Type.INTEGER },
                director: { type: Type.STRING },
                cast: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                genres: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                rating: { type: Type.NUMBER },
                overview: { type: Type.STRING },
                whyRecommended: { type: Type.STRING },
                matchScore: { type: Type.INTEGER },
                streamingPlatforms: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                trailerKey: { type: Type.STRING }
              },
              required: ["title", "releaseYear", "director", "cast", "genres", "rating", "overview", "whyRecommended", "matchScore", "streamingPlatforms", "trailerKey"]
            }
          }
        }
      });

      const responseText = response.text || "[]";
      const parsedRecommendations = JSON.parse(responseText.trim());

      // Let's add premium Unsplash images to the recommendations so they look stunning
      const enrichedRecommendations = parsedRecommendations.map((rec: any, idx: number) => {
        // Fallback or map specific movie titles to nice Unsplash templates
        const titleLower = rec.title.toLowerCase();
        let posterUrl = `https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80`;
        let backdropUrl = `https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&auto=format&fit=crop&q=80`;

        if (titleLower.includes("inception")) {
          posterUrl = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80";
          backdropUrl = "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80";
        } else if (titleLower.includes("interstellar")) {
          posterUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80";
          backdropUrl = "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&auto=format&fit=crop&q=80";
        } else if (titleLower.includes("knight")) {
          posterUrl = "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80";
          backdropUrl = "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80";
        } else if (titleLower.includes("dune")) {
          posterUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80";
          backdropUrl = "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200&auto=format&fit=crop&q=80";
        } else if (titleLower.includes("parasite")) {
          posterUrl = "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=600&auto=format&fit=crop&q=80";
          backdropUrl = "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&auto=format&fit=crop&q=80";
        } else if (titleLower.includes("land")) {
          posterUrl = "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80";
          backdropUrl = "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80";
        } else {
          // Dynamic visual placeholders depending on index to make them distinct
          const themes = [
            "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=600&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&auto=format&fit=crop&q=80"
          ];
          const backdrops = [
            "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1524712245354-2c4e5e7bbbd8?w=1200&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?w=1200&auto=format&fit=crop&q=80"
          ];
          posterUrl = themes[idx % themes.length];
          backdropUrl = backdrops[idx % backdrops.length];
        }

        return {
          movie: {
            id: rec.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
            title: rec.title,
            overview: rec.overview,
            posterUrl,
            backdropUrl,
            genres: rec.genres,
            rating: rec.rating || 8.0,
            releaseYear: rec.releaseYear || 2023,
            language: "English",
            runtime: duration.includes("Under 90") ? 88 : duration.includes("90-120") ? 105 : 145,
            director: rec.director,
            cast: rec.cast,
            streamingPlatforms: rec.streamingPlatforms || ["Netflix"],
            trailerKey: rec.trailerKey || "YoHD9XEInc0",
            budget: "$45M",
            revenue: "$120M",
            popularity: rec.matchScore,
            keywords: rec.genres.map((g: string) => g.toLowerCase()),
            reviews: []
          },
          matchScore: rec.matchScore,
          whyRecommended: rec.whyRecommended
        };
      });

      return res.json({
        recommendations: enrichedRecommendations,
        source: "Gemini AI"
      });
    } catch (error: any) {
      console.error("Gemini recommendation error:", error);
      // Fallback to high-quality local calculation if Gemini fails
    }
  }

  // --- LOCAL SEMANTIC CONTENT-BASED MATCHING ALGORITHM (FALLBACK) ---
  // Calculates compatibility scores with local mock movies
  const recommendations = STATIC_FALLBACK_MOVIES.map((movie) => {
    let score = 70; // Base score

    // Genre matching (adds 6 points per matching favorite genre)
    const matchingGenres = movie.genres.filter(g => favoriteGenres.includes(g));
    score += matchingGenres.length * 6;

    // Director matching (adds 12 points)
    if (favoriteDirectors.includes(movie.director)) {
      score += 12;
    }

    // Actor/Cast matching (adds 8 points per matching actor)
    const matchingActors = movie.cast.filter(actor => favoriteActors.includes(actor));
    score += matchingActors.length * 8;

    // Mood matching
    const movieGenresLower = movie.genres.map(g => g.toLowerCase());
    if (mood.toLowerCase() === "happy" && (movieGenresLower.includes("comedy") || movieGenresLower.includes("animation"))) {
      score += 15;
    } else if (mood.toLowerCase() === "romantic" && movieGenresLower.includes("romance")) {
      score += 15;
    } else if (mood.toLowerCase() === "action" && movieGenresLower.includes("action")) {
      score += 15;
    } else if (mood.toLowerCase() === "thriller" && (movieGenresLower.includes("thriller") || movieGenresLower.includes("mystery"))) {
      score += 15;
    } else if (mood.toLowerCase() === "sci-fi" && movieGenresLower.includes("sci-fi")) {
      score += 15;
    } else if (mood.toLowerCase() === "horror" && movieGenresLower.includes("horror")) {
      score += 15;
    } else if (mood.toLowerCase() === "sad" && movieGenresLower.includes("drama") && !movieGenresLower.includes("comedy")) {
      score += 10;
    }

    // Streaming matches (adds 5 points if it's on a preferred streaming platform)
    const matchingStreamings = movie.streamingPlatforms.filter(p => streamingPlatforms.includes(p));
    if (matchingStreamings.length > 0) {
      score += 5;
    }

    // Custom input text-matching (adds 10 points if keywords intersect)
    if (customInput) {
      const inputWords = customInput.toLowerCase().split(/\s+/);
      const matchWordCount = movie.keywords.filter(kw => inputWords.includes(kw.toLowerCase())).length;
      score += Math.min(matchWordCount * 5, 15);
    }

    // Cap score at 99, floor at 75 for positive experience
    score = Math.max(75, Math.min(score, 99));

    // Craft why-recommended text based on inputs
    let whyRecommended = `We matched this because of your love for ${movie.genres[0]} films. `;
    if (matchingGenres.length > 0) {
      whyRecommended = `Based on your interest in ${matchingGenres.join(" and ")} and Christopher Nolan style pacing, `;
    }
    if (favoriteDirectors.includes(movie.director)) {
      whyRecommended += `it is directed by your favorite director, ${movie.director}, `;
    } else {
      whyRecommended += `this is directed by master filmmaker ${movie.director}, `;
    }
    if (matchingActors.length > 0) {
      whyRecommended += `starring your favorite, ${matchingActors[0]}. `;
    } else {
      whyRecommended += `featuring a stellar performance by ${movie.cast[0]}. `;
    }
    if (mood) {
      whyRecommended += `Its thematic pacing perfectly suits a ${mood.toLowerCase()} mood for a perfect ${viewingPreference || "solo"} session.`;
    }

    return {
      movie: {
        ...movie,
        runtime: duration.includes("Under 90") ? 88 : duration.includes("90-120") ? 105 : ((movie as any).runtime || 120),
        reviews: []
      },
      matchScore: score,
      whyRecommended
    };
  });

  // Sort and pick top 4
  const sortedRecs = recommendations
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 4);

  return res.json({
    recommendations: sortedRecs,
    source: "CineMatch Local Smart Engine"
  });
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

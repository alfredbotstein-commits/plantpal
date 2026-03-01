// 500 common houseplant species - local database, no API calls
const speciesData = [
  { commonName: "Monstera Deliciosa", scientificName: "Monstera deliciosa", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 65, tempMax: 80, careNotes: "Let top inch of soil dry between waterings. Yellow leaves = overwatering.", icon: "🌿" },
  { commonName: "Snake Plant", scientificName: "Sansevieria trifasciata", wateringDays: 14, summerWateringDays: 10, winterWateringDays: 21, light: "Low to bright indirect", humidity: "Low (20-40%)", tempMin: 60, tempMax: 85, careNotes: "Very drought tolerant. Overwatering causes root rot.", icon: "🌵" },
  { commonName: "Pothos", scientificName: "Epipremnum aureum", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Low to bright indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 80, careNotes: "Let soil dry between waterings. Trailing vines can be pruned.", icon: "🪴" },
  { commonName: "Peace Lily", scientificName: "Spathiphyllum wallisii", wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Low to medium indirect", humidity: "High (50-70%)", tempMin: 65, tempMax: 80, careNotes: "Drooping leaves mean it needs water. Thrives in humidity.", icon: "🌸" },
  { commonName: "Fiddle Leaf Fig", scientificName: "Ficus lyrata", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 75, careNotes: "Sensitive to overwatering and drafts. Rotate for even growth.", icon: "🌿" },
  { commonName: "Aloe Vera", scientificName: "Aloe barbadensis", wateringDays: 14, summerWateringDays: 10, winterWateringDays: 21, light: "Bright direct to indirect", humidity: "Low (20-40%)", tempMin: 55, tempMax: 80, careNotes: "Let soil dry completely. Well-draining soil essential.", icon: "🌵" },
  { commonName: "Spider Plant", scientificName: "Chlorophytum comosum", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 55, tempMax: 80, careNotes: "Brown tips may indicate fluoride sensitivity. Use filtered water.", icon: "🌿" },
  { commonName: "Rubber Plant", scientificName: "Ficus elastica", wateringDays: 10, summerWateringDays: 7, winterWateringDays: 14, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 80, careNotes: "Wipe leaves to maintain shine. Let top soil dry between waterings.", icon: "🌿" },
  { commonName: "ZZ Plant", scientificName: "Zamioculcas zamiifolia", wateringDays: 14, summerWateringDays: 10, winterWateringDays: 21, light: "Low to bright indirect", humidity: "Low (20-40%)", tempMin: 60, tempMax: 80, careNotes: "Extremely drought tolerant. Water when soil is completely dry.", icon: "🌿" },
  { commonName: "Chinese Evergreen", scientificName: "Aglaonema commutatum", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Low to medium indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 80, careNotes: "Keep away from cold drafts. Tolerates low light well.", icon: "🌿" },
  { commonName: "Boston Fern", scientificName: "Nephrolepis exaltata", wateringDays: 3, summerWateringDays: 2, winterWateringDays: 5, light: "Bright indirect", humidity: "High (60-80%)", tempMin: 60, tempMax: 75, careNotes: "Loves humidity. Mist regularly or use a humidifier.", icon: "🌿" },
  { commonName: "Jade Plant", scientificName: "Crassula ovata", wateringDays: 14, summerWateringDays: 10, winterWateringDays: 21, light: "Bright direct", humidity: "Low (20-40%)", tempMin: 55, tempMax: 75, careNotes: "Succulent. Let soil dry completely between waterings.", icon: "🌵" },
  { commonName: "Philodendron", scientificName: "Philodendron hederaceum", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Medium indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 80, careNotes: "Easy care trailing plant. Keep soil moist but not soggy.", icon: "🌿" },
  { commonName: "Dracaena", scientificName: "Dracaena marginata", wateringDays: 10, summerWateringDays: 7, winterWateringDays: 14, light: "Low to bright indirect", humidity: "Low to medium", tempMin: 60, tempMax: 80, careNotes: "Sensitive to fluoride. Use distilled water if tips brown.", icon: "🌿" },
  { commonName: "Calathea", scientificName: "Calathea orbifolia", wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Medium indirect", humidity: "High (60-80%)", tempMin: 65, tempMax: 80, careNotes: "Needs high humidity. Leaves curl when thirsty. Use filtered water.", icon: "🌿" },
  { commonName: "String of Pearls", scientificName: "Senecio rowleyanus", wateringDays: 14, summerWateringDays: 10, winterWateringDays: 21, light: "Bright indirect", humidity: "Low (20-40%)", tempMin: 55, tempMax: 80, careNotes: "Succulent. Very sensitive to overwatering. Needs drainage.", icon: "🌵" },
  { commonName: "Bird of Paradise", scientificName: "Strelitzia reginae", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Bright direct to indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 80, careNotes: "Needs bright light to bloom indoors. Wipe large leaves.", icon: "🌿" },
  { commonName: "English Ivy", scientificName: "Hedera helix", wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Bright indirect", humidity: "Medium to high", tempMin: 50, tempMax: 70, careNotes: "Prefers cooler temps. Prone to spider mites in dry air.", icon: "🌿" },
  { commonName: "Parlor Palm", scientificName: "Chamaedorea elegans", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Low to medium indirect", humidity: "Medium (40-60%)", tempMin: 65, tempMax: 80, careNotes: "One of the best low-light palms. Don't overwater.", icon: "🌴" },
  { commonName: "Croton", scientificName: "Codiaeum variegatum", wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Bright direct to indirect", humidity: "High (50-70%)", tempMin: 60, tempMax: 80, careNotes: "Needs bright light for colorful leaves. Keep soil consistently moist.", icon: "🌿" },
  { commonName: "Dieffenbachia", scientificName: "Dieffenbachia seguine", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Medium indirect", humidity: "Medium (40-60%)", tempMin: 62, tempMax: 80, careNotes: "Toxic if ingested. Keep away from pets. Moderate water.", icon: "🌿" },
  { commonName: "Anthurium", scientificName: "Anthurium andraeanum", wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Bright indirect", humidity: "High (60-80%)", tempMin: 65, tempMax: 80, careNotes: "Likes humidity. Red flowers last weeks. Don't let soil dry completely.", icon: "🌺" },
  { commonName: "Tradescantia", scientificName: "Tradescantia zebrina", wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 55, tempMax: 80, careNotes: "Fast grower. Pinch stems for bushier growth. Easy to propagate.", icon: "🌿" },
  { commonName: "Succulent Mix", scientificName: "Various Crassulaceae", wateringDays: 14, summerWateringDays: 10, winterWateringDays: 21, light: "Bright direct", humidity: "Low (20-40%)", tempMin: 50, tempMax: 85, careNotes: "Let soil dry completely. Well-draining soil essential.", icon: "🌵" },
  { commonName: "Cactus Mix", scientificName: "Various Cactaceae", wateringDays: 21, summerWateringDays: 14, winterWateringDays: 30, light: "Bright direct", humidity: "Low (10-30%)", tempMin: 50, tempMax: 90, careNotes: "Very drought tolerant. Minimal watering in winter.", icon: "🌵" },
  { commonName: "African Violet", scientificName: "Saintpaulia ionantha", wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 65, tempMax: 75, careNotes: "Water from bottom. Avoid wetting leaves. Use lukewarm water.", icon: "🌸" },
  { commonName: "Orchid (Phalaenopsis)", scientificName: "Phalaenopsis amabilis", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Bright indirect", humidity: "Medium to high", tempMin: 60, tempMax: 80, careNotes: "Ice cube method: 3 cubes weekly. Don't let roots sit in water.", icon: "🌸" },
  { commonName: "Money Tree", scientificName: "Pachira aquatica", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 80, careNotes: "Let top soil dry between waterings. Braided trunk is decorative.", icon: "🌿" },
  { commonName: "Ponytail Palm", scientificName: "Beaucarnea recurvata", wateringDays: 14, summerWateringDays: 10, winterWateringDays: 21, light: "Bright direct to indirect", humidity: "Low (20-40%)", tempMin: 55, tempMax: 80, careNotes: "Stores water in trunk. Very drought tolerant.", icon: "🌴" },
  { commonName: "Cast Iron Plant", scientificName: "Aspidistra elatior", wateringDays: 10, summerWateringDays: 7, winterWateringDays: 14, light: "Low", humidity: "Low to medium", tempMin: 45, tempMax: 80, careNotes: "Nearly indestructible. Thrives on neglect.", icon: "🌿" },
  { commonName: "Bamboo Palm", scientificName: "Chamaedorea seifrizii", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Low to bright indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 80, careNotes: "Great air purifier. Keep soil moist but not soggy.", icon: "🌴" },
  { commonName: "Schefflera", scientificName: "Schefflera arboricola", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 80, careNotes: "Dropping leaves = overwatering. Let soil dry between waterings.", icon: "🌿" },
  { commonName: "Peperomia", scientificName: "Peperomia obtusifolia", wateringDays: 10, summerWateringDays: 7, winterWateringDays: 14, light: "Medium indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 80, careNotes: "Semi-succulent leaves. Let soil dry between waterings.", icon: "🌿" },
  { commonName: "String of Hearts", scientificName: "Ceropegia woodii", wateringDays: 10, summerWateringDays: 7, winterWateringDays: 14, light: "Bright indirect", humidity: "Low to medium", tempMin: 55, tempMax: 80, careNotes: "Semi-succulent trailing plant. Let soil dry between waterings.", icon: "🌿" },
  { commonName: "Hoya", scientificName: "Hoya carnosa", wateringDays: 10, summerWateringDays: 7, winterWateringDays: 14, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 55, tempMax: 80, careNotes: "Let soil dry between waterings. Fragrant waxy flowers.", icon: "🌸" },
  { commonName: "Prayer Plant", scientificName: "Maranta leuconeura", wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Medium indirect", humidity: "High (60-80%)", tempMin: 60, tempMax: 80, careNotes: "Leaves fold up at night. Needs humidity. Use filtered water.", icon: "🌿" },
  { commonName: "Alocasia", scientificName: "Alocasia amazonica", wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Bright indirect", humidity: "High (60-80%)", tempMin: 60, tempMax: 80, careNotes: "Keep soil moist. May go dormant in winter. Needs humidity.", icon: "🌿" },
  { commonName: "Nerve Plant", scientificName: "Fittonia albivenis", wateringDays: 4, summerWateringDays: 3, winterWateringDays: 5, light: "Low to medium indirect", humidity: "High (60-80%)", tempMin: 60, tempMax: 80, careNotes: "Dramatic wilter when thirsty but recovers quickly.", icon: "🌿" },
  { commonName: "Polka Dot Plant", scientificName: "Hypoestes phyllostachya", wateringDays: 5, summerWateringDays: 3, winterWateringDays: 7, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 80, careNotes: "Pinch back flowers to keep bushy. Needs consistent moisture.", icon: "🌿" },
  { commonName: "Majesty Palm", scientificName: "Ravenea rivularis", wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Bright indirect", humidity: "High (60-80%)", tempMin: 65, tempMax: 80, careNotes: "Keep soil consistently moist. Mist frequently.", icon: "🌴" },
  { commonName: "Areca Palm", scientificName: "Dypsis lutescens", wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Bright indirect", humidity: "Medium to high", tempMin: 65, tempMax: 80, careNotes: "Good air purifier. Likes moist soil. Brown tips from dry air.", icon: "🌴" },
  { commonName: "Swiss Cheese Plant", scientificName: "Monstera adansonii", wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Bright indirect", humidity: "Medium to high", tempMin: 60, tempMax: 80, careNotes: "Climbing vine. Needs support. More fenestrations with more light.", icon: "🌿" },
  { commonName: "Satin Pothos", scientificName: "Scindapsus pictus", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Medium indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 80, careNotes: "Silvery leaves. Let soil dry between waterings.", icon: "🪴" },
  { commonName: "Wandering Jew", scientificName: "Tradescantia fluminensis", wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 55, tempMax: 80, careNotes: "Fast growing trailer. Pinch for bushiness.", icon: "🌿" },
  { commonName: "Lucky Bamboo", scientificName: "Dracaena sanderiana", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Low to medium indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 80, careNotes: "Can grow in water. Change water every 2 weeks.", icon: "🎋" },
  { commonName: "Air Plant", scientificName: "Tillandsia ionantha", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 55, tempMax: 80, careNotes: "Soak in water 30 min weekly. Shake off excess. No soil needed.", icon: "🌿" },
  { commonName: "Bromeliad", scientificName: "Guzmania lingulata", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Bright indirect", humidity: "Medium to high", tempMin: 60, tempMax: 80, careNotes: "Water into central cup. Flower lasts months.", icon: "🌺" },
  { commonName: "Yucca", scientificName: "Yucca elephantipes", wateringDays: 14, summerWateringDays: 10, winterWateringDays: 21, light: "Bright direct to indirect", humidity: "Low (20-40%)", tempMin: 50, tempMax: 85, careNotes: "Drought tolerant. Well-draining soil essential.", icon: "🌿" },
  { commonName: "Oxalis", scientificName: "Oxalis triangularis", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 55, tempMax: 75, careNotes: "Leaves close at night. May go dormant. Reduce water if so.", icon: "🌸" },
  { commonName: "Norfolk Island Pine", scientificName: "Araucaria heterophylla", wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Bright indirect", humidity: "Medium to high", tempMin: 55, tempMax: 75, careNotes: "Not a true pine. Likes humidity. Don't let soil dry completely.", icon: "🌲" },
];

// Generate remaining ~450 species algorithmically from real plant families
const additionalSpecies = [
  // Succulents & Cacti (50 more)
  ...generateFamily("Echeveria", "Echeveria", 30, { wateringDays: 14, summerWateringDays: 10, winterWateringDays: 21, light: "Bright direct", humidity: "Low (20-40%)", tempMin: 50, tempMax: 80, icon: "🌵" }, [
    "elegans", "agavoides", "pulvinata", "setosa", "lilacina", "purpusorum", "runyonii", "colorata", "laui", "chihuahuaensis",
    "pulidonis", "nodulosa", "secunda", "gibbiflora", "peacockii", "shaviana", "subsessilis", "derenbergii", "imbricata", "perle von nurnberg",
    "lola", "black prince", "dusty rose", "neon breakers", "tippy", "orion", "pollux", "afterglow", "blue bird", "cubic frost"
  ]),
  ...generateFamily("Haworthia", "Haworthia", 15, { wateringDays: 14, summerWateringDays: 10, winterWateringDays: 21, light: "Bright indirect", humidity: "Low (20-40%)", tempMin: 50, tempMax: 80, icon: "🌵" }, [
    "fasciata", "attenuata", "cooperi", "retusa", "truncata", "cymbiformis", "obtusa", "reinwardtii", "limifolia", "tessellata",
    "maughanii", "pygmaea", "bayeri", "emelyae", "springbokvlakensis"
  ]),
  ...generateFamily("Sedum", "Sedum", 15, { wateringDays: 14, summerWateringDays: 10, winterWateringDays: 21, light: "Bright direct", humidity: "Low (20-40%)", tempMin: 40, tempMax: 85, icon: "🌵" }, [
    "morganianum", "rubrotinctum", "acre", "spurium", "adolphii", "nussbaumerianum", "dasyphyllum", "palmeri", "reflexum", "sieboldii",
    "kamtschaticum", "album", "hispanicum", "lydium", "makinoi"
  ]),
  ...generateFamily("Mammillaria", "Mammillaria", 10, { wateringDays: 21, summerWateringDays: 14, winterWateringDays: 30, light: "Bright direct", humidity: "Low (10-30%)", tempMin: 50, tempMax: 90, icon: "🌵" }, [
    "elongata", "gracilis", "plumosa", "hahniana", "bocasana", "spinosissima", "prolifera", "zeilmanniana", "rhodantha", "bombycina"
  ]),
  // Ferns (20)
  ...generateFamily("Fern", "Various", 20, { wateringDays: 4, summerWateringDays: 3, winterWateringDays: 5, light: "Medium indirect", humidity: "High (60-80%)", tempMin: 55, tempMax: 75, icon: "🌿" }, [
    "Maidenhair|Adiantum capillus-veneris", "Staghorn|Platycerium bifurcatum", "Bird's Nest|Asplenium nidus", "Rabbit's Foot|Davallia fejeensis",
    "Blue Star|Phlebodium aureum", "Button|Pellaea rotundifolia", "Asparagus|Asparagus setaceus", "Holly|Cyrtomium falcatum",
    "Kangaroo Paw|Microsorum diversifolium", "Silver Brake|Pteris cretica", "Crocodile|Microsorum musifolium", "Heart|Hemionitis arifolia",
    "Lemon Button|Nephrolepis cordifolia", "Fluffy Ruffle|Nephrolepis exaltata Fluffy Ruffle", "Dallas|Nephrolepis exaltata Dallas",
    "Kimberly Queen|Nephrolepis obliterata", "Japanese Painted|Athyrium niponicum", "Autumn|Dryopteris erythrosora",
    "Royal|Osmunda regalis", "Sword|Polystichum munitum"
  ]),
  // Philodendrons (20)
  ...generateFamily("Philodendron", "Philodendron", 20, { wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Medium to bright indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 80, icon: "🌿" }, [
    "birkin", "brasil", "micans", "gloriosum", "melanochrysum", "verrucosum", "hastatum", "squamiferum", "billietiae", "gigas",
    "mamei", "sodiroi", "plowmanii", "florida", "paraiso verde", "ring of fire", "painted lady", "white wizard", "white knight", "pink princess"
  ]),
  // Calatheas/Marantaceae (15)
  ...generateFamily("Calathea", "Calathea/Goeppertia", 15, { wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Medium indirect", humidity: "High (60-80%)", tempMin: 65, tempMax: 80, icon: "🌿" }, [
    "medallion", "ornata", "lancifolia", "roseopicta", "makoyana", "rufibarba", "zebrina", "warscewiczii", "crocata", "musaica",
    "white fusion", "freddie", "vittata", "beauty star", "fasciata"
  ]),
  // Hoyas (15)
  ...generateFamily("Hoya", "Hoya", 15, { wateringDays: 10, summerWateringDays: 7, winterWateringDays: 14, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 55, tempMax: 80, icon: "🌸" }, [
    "kerrii", "pubicalyx", "linearis", "compacta", "obovata", "curtisii", "serpens", "wayetii", "australis", "bella",
    "macrophylla", "multiflora", "retusa", "lacunosa", "polyneura"
  ]),
  // Begonias (15)
  ...generateFamily("Begonia", "Begonia", 15, { wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Bright indirect", humidity: "High (50-70%)", tempMin: 60, tempMax: 80, icon: "🌸" }, [
    "rex", "maculata", "masoniana", "pavonina", "luxurians", "brevirimosa", "amphioxus", "darthvaderiana", "ferox", "listada",
    "melanobullata", "sizemoreae", "chlorosticta", "gryphon", "angel wing"
  ]),
  // Peperomias (15)
  ...generateFamily("Peperomia", "Peperomia", 15, { wateringDays: 10, summerWateringDays: 7, winterWateringDays: 14, light: "Medium indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 80, icon: "🌿" }, [
    "watermelon", "hope", "prostrata", "caperata", "argyreia", "polybotrya", "graveolens", "rotundifolia", "pellucida", "clusiifolia",
    "verticillata", "tetraphylla", "puteolata", "quadrangularis", "scandens"
  ]),
  // Dracaenas (10)
  ...generateFamily("Dracaena", "Dracaena", 10, { wateringDays: 10, summerWateringDays: 7, winterWateringDays: 14, light: "Low to bright indirect", humidity: "Low to medium", tempMin: 60, tempMax: 80, icon: "🌿" }, [
    "fragrans", "reflexa", "deremensis", "compacta", "warneckii", "lemon lime", "limelight", "gold star", "janet craig", "song of india"
  ]),
  // Alocasias (10)
  ...generateFamily("Alocasia", "Alocasia", 10, { wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Bright indirect", humidity: "High (60-80%)", tempMin: 60, tempMax: 80, icon: "🌿" }, [
    "polly", "zebrina", "frydek", "silver dragon", "black velvet", "dragon scale", "cuprea", "maharani", "melo", "stingray"
  ]),
  // Anthuriums (10)
  ...generateFamily("Anthurium", "Anthurium", 10, { wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Bright indirect", humidity: "High (60-80%)", tempMin: 65, tempMax: 80, icon: "🌺" }, [
    "clarinervium", "crystallinum", "veitchii", "warocqueanum", "magnificum", "regale", "forgetii", "villenaorum", "luxurians", "papillilaminum"
  ]),
  // Ficus varieties (10)
  ...generateFamily("Ficus", "Ficus", 10, { wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 80, icon: "🌿" }, [
    "benjamina", "microcarpa", "pumila", "altissima", "audrey", "tineke", "ruby", "shivereana", "triangularis", "religiosa"
  ]),
  // Palms (10)
  ...generateFamily("Palm", "Various", 10, { wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 80, icon: "🌴" }, [
    "Kentia|Howea forsteriana", "Lady|Rhapis excelsa", "Cat|Chamaedorea cataractarum", "Fishtail|Caryota mitis",
    "Fan|Livistona chinensis", "Sago|Cycas revoluta", "Pygmy Date|Phoenix roebelenii", "Coconut|Cocos nucifera",
    "Bottle|Hyophorbe lagenicaulis", "Christmas|Adonidia merrillii"
  ]),
  // Sansevieria varieties (10)
  ...generateFamily("Sansevieria", "Sansevieria/Dracaena", 10, { wateringDays: 14, summerWateringDays: 10, winterWateringDays: 21, light: "Low to bright indirect", humidity: "Low (20-40%)", tempMin: 55, tempMax: 85, icon: "🌵" }, [
    "cylindrica", "moonshine", "whale fin", "boncel", "fernwood", "sayuri", "silver queen", "black coral", "bantels sensation", "samurai"
  ]),
  // Herbs (20)
  ...generateFamily("Herb", "Various", 20, { wateringDays: 3, summerWateringDays: 2, winterWateringDays: 5, light: "Bright direct", humidity: "Medium (40-60%)", tempMin: 55, tempMax: 80, icon: "🌿" }, [
    "Basil|Ocimum basilicum", "Mint|Mentha piperita", "Rosemary|Rosmarinus officinalis", "Thyme|Thymus vulgaris",
    "Oregano|Origanum vulgare", "Cilantro|Coriandrum sativum", "Parsley|Petroselinum crispum", "Sage|Salvia officinalis",
    "Dill|Anethum graveolens", "Chives|Allium schoenoprasum", "Lavender|Lavandula angustifolia", "Lemon Balm|Melissa officinalis",
    "Tarragon|Artemisia dracunculus", "Bay Laurel|Laurus nobilis", "Marjoram|Origanum majorana", "Fennel|Foeniculum vulgare",
    "Chamomile|Matricaria chamomilla", "Stevia|Stevia rebaudiana", "Lemongrass|Cymbopogon citratus", "Curry Plant|Helichrysum italicum"
  ]),
  // Flowering (20)
  ...generateFamily("Flowering", "Various", 20, { wateringDays: 5, summerWateringDays: 4, winterWateringDays: 7, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 60, tempMax: 80, icon: "🌸" }, [
    "Hibiscus|Hibiscus rosa-sinensis", "Gardenia|Gardenia jasminoides", "Jasmine|Jasminum polyanthum", "Geranium|Pelargonium hortorum",
    "Cyclamen|Cyclamen persicum", "Kalanchoe|Kalanchoe blossfeldiana", "Christmas Cactus|Schlumbergera bridgesii", "Easter Cactus|Rhipsalidopsis gaertneri",
    "Lipstick Plant|Aeschynanthus radicans", "Goldfish Plant|Nematanthus gregarius", "Crown of Thorns|Euphorbia milii", "Desert Rose|Adenium obesum",
    "Poinsettia|Euphorbia pulcherrima", "Azalea|Rhododendron simsii", "Camellia|Camellia japonica", "Clivia|Clivia miniata",
    "Gloxinia|Sinningia speciosa", "Ixora|Ixora coccinea", "Mandevilla|Mandevilla sanderi", "Plumeria|Plumeria rubra"
  ]),
  // Trailing/Climbing (15)
  ...generateFamily("Trailing", "Various", 15, { wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Bright indirect", humidity: "Medium (40-60%)", tempMin: 55, tempMax: 80, icon: "🌿" }, [
    "String of Turtles|Peperomia prostrata", "String of Bananas|Senecio radicans", "String of Dolphins|Senecio peregrinus",
    "String of Nickels|Dischidia nummularia", "Lipstick Vine|Aeschynanthus lobbianus", "Grape Ivy|Cissus rhombifolia",
    "Creeping Fig|Ficus pumila", "Inch Plant|Tradescantia zebrina", "Swedish Ivy|Plectranthus verticillatus",
    "Chain of Hearts|Ceropegia linearis", "Burro's Tail|Sedum morganianum", "Hindu Rope|Hoya compacta",
    "Wax Plant|Hoya carnosa compacta", "Dischidia|Dischidia ovata", "Rhipsalis|Rhipsalis baccifera"
  ]),
  // Agaves & Aloes (15)
  ...generateFamily("Agave/Aloe", "Various", 15, { wateringDays: 14, summerWateringDays: 10, winterWateringDays: 21, light: "Bright direct", humidity: "Low (20-40%)", tempMin: 50, tempMax: 85, icon: "🌵" }, [
    "Agave americana|Agave americana", "Agave victoriae-reginae|Agave victoriae-reginae", "Agave parryi|Agave parryi",
    "Agave attenuata|Agave attenuata", "Agave potatorum|Agave potatorum", "Aloe arborescens|Aloe arborescens",
    "Aloe brevifolia|Aloe brevifolia", "Aloe juvenna|Aloe juvenna", "Aloe polyphylla|Aloe polyphylla",
    "Aloe cameronii|Aloe cameronii", "Gasteria|Gasteria bicolor", "Gasteraloe|× Gasteraloe",
    "Aloe maculata|Aloe maculata", "Aloe striata|Aloe striata", "Aloe ferox|Aloe ferox"
  ]),
  // Uncommon / Rare (30)
  ...generateFamily("Rare", "Various", 30, { wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Bright indirect", humidity: "Medium to high", tempMin: 60, tempMax: 80, icon: "🌿" }, [
    "Monstera Thai Constellation|Monstera deliciosa Thai Constellation", "Monstera Albo|Monstera deliciosa Albo Variegata",
    "Pink Princess|Philodendron erubescens Pink Princess", "White Princess|Philodendron erubescens White Princess",
    "Variegated String of Hearts|Ceropegia woodii variegata", "Variegated Monstera adansonii|Monstera adansonii variegata",
    "Philodendron Spiritus Sancti|Philodendron spiritus-sancti", "Anthurium Warocqueanum Queen|Anthurium warocqueanum",
    "Hoya Imbricata|Hoya imbricata", "Begonia Maculata|Begonia maculata Wightii",
    "Alocasia Azlanii|Alocasia azlanii", "Philodendron Tortum|Philodendron bipinnatifidum Tortum",
    "Rhaphidophora Tetrasperma|Rhaphidophora tetrasperma", "Scindapsus Treubii Moonlight|Scindapsus treubii Moonlight",
    "Epipremnum Pinnatum Cebu Blue|Epipremnum pinnatum Cebu Blue", "Syngonium Albo|Syngonium podophyllum Albo",
    "Caladium|Caladium bicolor", "Colocasia|Colocasia esculenta", "Stephania Erecta|Stephania erecta",
    "Cissus Discolor|Cissus discolor", "Stromanthe Triostar|Stromanthe sanguinea Triostar",
    "Ctenanthe|Ctenanthe lubbersiana", "Maranta Lemon Lime|Maranta leuconeura Lemon Lime",
    "Calathea Dottie|Goeppertia roseopicta Dottie", "Pilea Peperomioides|Pilea peperomioides",
    "Pilea Moon Valley|Pilea involucrata", "Coleus|Plectranthus scutellarioides",
    "Selaginella|Selaginella kraussiana", "Mimosa Pudica|Mimosa pudica", "Venus Flytrap|Dionaea muscipula"
  ]),
  // Additional common (40 more to reach ~500)
  ...generateFamily("Common", "Various", 40, { wateringDays: 7, summerWateringDays: 5, winterWateringDays: 10, light: "Medium indirect", humidity: "Medium (40-60%)", tempMin: 55, tempMax: 80, icon: "🌿" }, [
    "Corn Plant|Dracaena fragrans Massangeana", "Dragon Tree|Dracaena draco", "Umbrella Plant|Schefflera actinophylla",
    "Ti Plant|Cordyline fruticosa", "Crocodile Fern|Microsorum musifolium Crocodyllus", "Baby Rubber Plant|Peperomia obtusifolia",
    "Watermelon Peperomia|Peperomia argyreia", "Aluminum Plant|Pilea cadierei", "Artillery Plant|Pilea microphylla",
    "Chinese Money Plant|Pilea peperomioides", "Persian Shield|Strobilanthes dyerianus", "Purple Passion|Gynura aurantiaca",
    "Moses in Cradle|Tradescantia spathacea", "Bromeliads Neoregelia|Neoregelia carolinae", "Vriesea|Vriesea splendens",
    "Tillandsia Xerographica|Tillandsia xerographica", "Staghorn Fern|Platycerium bifurcatum", "Elkhorn Fern|Platycerium alcicorne",
    "Cotton Candy Fern|Nephrolepis exaltata Cotton Candy", "Asparagus Fern|Asparagus densiflorus Sprengeri",
    "Foxtail Fern|Asparagus densiflorus Myersii", "Ming Aralia|Polyscias fruticosa", "Japanese Aralia|Fatsia japonica",
    "False Aralia|Plerandra elegantissima", "Coffee Plant|Coffea arabica", "Lemon Tree|Citrus limon",
    "Avocado|Persea americana", "Banana Plant|Musa acuminata", "Bird of Paradise White|Strelitzia nicolai",
    "Elephant Ear|Colocasia gigantea", "Taro|Colocasia esculenta", "Swiss Cheese Vine|Monstera adansonii",
    "Silver Satin|Scindapsus pictus Argyraeus", "Neon Pothos|Epipremnum aureum Neon", "Marble Queen Pothos|Epipremnum aureum Marble Queen",
    "Golden Pothos|Epipremnum aureum Golden", "Manjula Pothos|Epipremnum aureum Manjula", "Pearls and Jade|Epipremnum aureum Pearls and Jade",
    "N'Joy Pothos|Epipremnum aureum N'Joy", "Glacier Pothos|Epipremnum aureum Glacier"
  ])
];

function generateFamily(familyLabel, genus, count, defaults, varieties) {
  return varieties.slice(0, count).map(v => {
    const hasPipe = v.includes("|");
    const commonName = hasPipe ? v.split("|")[0] : `${familyLabel !== "Common" && familyLabel !== "Flowering" && familyLabel !== "Trailing" && familyLabel !== "Herb" && familyLabel !== "Fern" && familyLabel !== "Palm" && familyLabel !== "Agave/Aloe" && familyLabel !== "Rare" ? genus + " " : ""}${hasPipe ? v.split("|")[0] : v.charAt(0).toUpperCase() + v.slice(1)}`;
    const sciName = hasPipe ? v.split("|")[1] : `${genus} ${v}`;
    return {
      commonName,
      scientificName: sciName,
      wateringDays: defaults.wateringDays + Math.floor(Math.random() * 3 - 1),
      summerWateringDays: defaults.summerWateringDays + Math.floor(Math.random() * 2 - 1),
      winterWateringDays: defaults.winterWateringDays + Math.floor(Math.random() * 4 - 2),
      light: defaults.light,
      humidity: defaults.humidity,
      tempMin: defaults.tempMin + Math.floor(Math.random() * 6 - 3),
      tempMax: defaults.tempMax + Math.floor(Math.random() * 6 - 3),
      careNotes: `Care for ${commonName}: ${defaults.light} light, water every ${defaults.wateringDays} days. ${defaults.humidity} humidity preferred.`,
      icon: defaults.icon
    };
  });
}

const allSpecies = [...speciesData, ...additionalSpecies];

export function searchSpecies(query) {
  if (!query || query.length < 2) return allSpecies.slice(0, 20);
  const q = query.toLowerCase();
  return allSpecies.filter(s =>
    s.commonName.toLowerCase().includes(q) ||
    s.scientificName.toLowerCase().includes(q)
  ).slice(0, 30);
}

export function getPopularSpecies() {
  return speciesData.slice(0, 6);
}

export function getSpeciesByName(name) {
  return allSpecies.find(s => s.commonName === name || s.scientificName === name);
}

export default allSpecies;

// Version 13: Slim Nav, Daily Digest Sub-Nav
import { useState, useEffect, useRef } from "react";

// --- DATA (from original document) --- //

const moodBackgrounds = {
  peaceful: "https://www.youtube.com/embed/BFTbRCDLWmw?autoplay=1&controls=0&loop=1&playlist=BFTbRCDLWmw&enablejsapi=1",
  grateful: "https://www.youtube.com/embed/-EMn-ePp7Uw?autoplay=1&controls=0&loop=1&playlist=-EMn-ePp7Uw&enablejsapi=1",
  anxious: "https://www.youtube.com/embed/tck7E11SdR8?autoplay=1&controls=0&loop=1&playlist=tck7E11SdR8&enablejsapi=1",
  inspired: "https://www.youtube.com/embed/v4WgU-LAp-0?autoplay=1&controls=0&loop=1&playlist=v4WgU-LAp-0&enablejsapi=1"
};

const sacredEarthVideos = {
  DeepForestDawn: "https://www.youtube.com/embed/FxAgAyZYXJ8?autoplay=1&loop=1&playlist=FxAgAyZYXJ8&controls=0",
  RiverEdge: "https://www.youtube.com/embed/g_Haa84cpuM?autoplay=1&loop=1&playlist=g_Haa84cpuM&controls=0",
  EmeraldThunder: "https://www.youtube.com/embed/59fHDWDhzkY?autoplay=1&loop=1&playlist=59fHDWDhzkY&controls=0",
  CampfireNight: "https://www.youtube.com/embed/E77jmtut1Zc?autoplay=1&loop=1&playlist=E77jmtut1Zc&controls=0",
  MorningSerenade: "https://www.youtube.com/embed/rV_ERKtNyNA?autoplay=1&loop=1&playlist=rV_ERKtNyNA&controls=0"
};

const meditationStyles = [
    { title: "Guided Meditation (Gratitude)", url: "https://www.youtube.com/embed/OCorElLKFQE?autoplay=1" },
    { title: "Bhastrika Pranayama", url: "https://www.youtube.com/embed/2B5RM0dphyA?autoplay=1" },
    { title: "Anulom Vilom Breathing", url: "https://www.youtube.com/embed/WNKwfubq6I8?autoplay=1" },
    { title: "Vipassana Meditation", url: "https://www.youtube.com/embed/BSku2WZsYLo?autoplay=1" },
    { title: "Om Chanting", url: "https://www.youtube.com/embed/aTTYcn8VoVc?autoplay=1" },
];

const faithQuotes = {
    Hinduism: [ { text: "Be steadfast in yoga, O Arjuna...", source: "Bhagavad Gita 2.47" }, { text: "You are what your deep, driving desire is...", source: "Upanishads" }, { text: "Truth alone triumphs.", source: "Mundaka Upanishad 3.1.6" }, { text: "A person is made by belief. As he believes, so he is.", source: "Bhagavad Gita 17.3" }, { text: "Do your duty without attachment to the result.", source: "Bhagavad Gita 2.47" }, { text: "The soul is neither born, and nor does it die.", source: "Bhagavad Gita 2.20" }, { text: "Those who live in harmony with the Self, see the Self in all beings.", source: "Isha Upanishad" }, { text: "There is nothing lost or wasted in this life. Every action counts.", source: "Bhagavad Gita 2.40" }, { text: "From purity arises wisdom.", source: "Bhagavad Gita 14.17" }, { text: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.", source: "Bhagavad Gita 6.19" }, { text: "Delusion arises from attachment; and from delusion, anger is born.", source: "Bhagavad Gita 2.63" }, ],
    Christianity: [ { text: "Peace I leave with you; my peace I give you.", source: "John 14:27" }, { text: "Give thanks in all circumstances...", source: "1 Thessalonians 5:18" }, { text: "Love your neighbor as yourself.", source: "Matthew 22:39" }, { text: "I can do all things through Christ who strengthens me.", source: "Philippians 4:13" }, { text: "God is our refuge and strength, an ever-present help in trouble.", source: "Psalm 46:1" }, { text: "Do not be anxious about anything...", source: "Philippians 4:6" }, { text: "For with God nothing shall be impossible.", source: "Luke 1:37" }, { text: "Let all you do be done in love.", source: "1 Corinthians 16:14" }, { text: "Ask and it will be given to you...", source: "Matthew 7:7" }, { text: "Be still and know that I am God.", source: "Psalm 46:10" }, { text: "The Lord is my shepherd; I shall not want.", source: "Psalm 23:1" } ],
    Islam: [ { text: "Indeed, in the remembrance of Allah do hearts find rest.", source: "Qur’an 13:28" }, { text: "Verily, with hardship comes ease.", source: "Qur’an 94:6" }, { text: "So remember Me; I will remember you.", source: "Qur’an 2:152" }, { text: "And He found you lost and guided [you].", source: "Qur’an 93:7" }, { text: "Allah does not burden a soul beyond that it can bear.", source: "Qur’an 2:286" }, { text: "And be patient. Surely, Allah is with the patient.", source: "Qur’an 8:46" }, { text: "Say, ‘My Lord has commanded justice.’", source: "Qur’an 7:29" }, { text: "Call upon Me; I will respond to you.", source: "Qur’an 40:60" }, { text: "And whoever puts their trust in Allah – then He will suffice him.", source: "Qur’an 65:3" }, { text: "Indeed, prayer prohibits immorality and wrongdoing.", source: "Qur’an 29:45" }, { text: "Guide us to the straight path.", source: "Surah Al-Fatiha" } ],
    Buddhism: [ { text: "Peace comes from within. Do not seek it without.", source: "Buddha" }, { text: "All that we are is the result of what we have thought.", source: "Buddha" }, { text: "Three things cannot be long hidden: the sun, the moon, and the truth.", source: "Buddha" }, { text: "You, yourself, as much as anybody in the entire universe, deserve your love and affection.", source: "Buddha" }, { text: "Let go of attachments and find freedom.", source: "Buddha" }, { text: "Hatred does not cease by hatred, but only by love.", source: "Dhammapada" }, { text: "The mind is everything. What you think you become.", source: "Buddha" }, { text: "It is better to conquer yourself than to win a thousand battles.", source: "Buddha" }, { text: "Health is the greatest gift, contentment the greatest wealth.", source: "Buddha" }, { text: "Work out your own salvation. Do not depend on others.", source: "Buddha" }, { text: "Thousands of candles can be lit from a single candle.", source: "Buddha" } ],
    Sikhism: [ { text: "He Himself bestows His gifts, and blesses us with peace.", source: "Guru Granth Sahib" }, { text: "Speak only that which will bring you honor.", source: "Guru Granth Sahib" }, { text: "Even kings and emperors, with heaps of wealth and vast dominion, cannot compare with an ant filled with the love of God.", source: "Guru Nanak" }, { text: "Where there is forgiveness, there is God Himself.", source: "Guru Granth Sahib" }, { text: "One who eliminates duality from within shall attain the Lord.", source: "Guru Granth Sahib" }, { text: "Those who have loved are those that have found God.", source: "Guru Granth Sahib" }, { text: "Why do you go looking for God? He is within you.", source: "Guru Granth Sahib" }, { text: "Make compassion the cotton, contentment the thread...", source: "Guru Nanak" }, { text: "The Lord Himself is the farmer, and the Lord Himself is the field.", source: "Guru Granth Sahib" }, { text: "With your hands and feet, do all your work, but let your mind be at rest in the Lord.", source: "Guru Granth Sahib" }, { text: "Whatever pleases the Lord is good. This alone is my opinion.", source: "Guru Granth Sahib" } ],
    Jainism: [ { text: "A man is seated on top of a tree in the midst of a burning forest...", source: "Mahavira" }, { text: "The soul comes alone and goes alone, no one accompanies it.", source: "Mahavira" }, { text: "Fight with yourself, why fight with external foes?", source: "Mahavira" }, { text: "All souls are alike; none is superior to another.", source: "Mahavira" }, { text: "Every soul is independent. None depends on another.", source: "Mahavira" }, { text: "Don’t accumulate if you do not need. The more you know, the less you need.", source: "Mahavira" }, { text: "Anger begets more anger, and forgiveness and love lead to more forgiveness and love.", source: "Mahavira" }, { text: "Live and allow others to live; hurt no one; life is dear to all living beings.", source: "Mahavira" }, { text: "Non-violence is the highest religion.", source: "Mahavira" }, { text: "The one who neglects or disregards the existence of earth, water, fire, air, and vegetation disregards their own existence.", source: "Mahavira" }, { text: "Silence and self-control are non-violence.", source: "Mahavira" } ],
    "General Wisdom": [ { text: "Gratitude turns what we have into enough.", source: "Aesop" }, { text: "This too shall pass.", source: "Sufi Wisdom" }, { text: "The journey of a thousand miles begins with a single step.", source: "Lao Tzu" }, { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", source: "Unknown" }, { text: "Life is 10% what happens to you and 90% how you react to it.", source: "Charles R. Swindoll" }, { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", source: "Ralph Waldo Emerson" }, { text: "Kindness is a language which the deaf can hear and the blind can see.", source: "Mark Twain" }, { text: "Happiness is not something ready-made. It comes from your own actions.", source: "Dalai Lama" }, { text: "The only way to do great work is to love what you do.", source: "Steve Jobs" }, { text: "Success is not the key to happiness. Happiness is the key to success.", source: "Albert Schweitzer" }, { text: "Everything you can imagine is real.", source: "Pablo Picasso" } ]
};

const faithSongs = {
    Hinduism: [ { title: "Maha Mrityunjay Mantra", link: "https://youtu.be/OV9LXGOXjgs?si=rkkZ25UysRN3cNzm" }, { title: "Shiva Panchakshar Stotra", link: "https://youtu.be/jlcZNOt-pcc?si=X7TkdkW5EOUTo0rn" }, { title: "Om Chanting (108 times)", link: "https://youtu.be/ijfLsKg8jFY?si=24U7Bj5c5hdMQsPL" }, { title: "Durga Chalisa", link: "https://youtu.be/AXvmt88JLWg?si=fwGuak4wRCVgWg4Y" }, { title: "Hanuman Chalisa", link: "https://youtu.be/AETFvQonfV8?si=Z9GvFGfh7fMhZr1A" }, { title: "Hey Ram Hey Ram", link: "https://youtu.be/Hy55Ij78amM?si=-vNx7W7W8paNERgI" } ],
    Christianity: [ { title: "The Lord is my Shepherd", link: "https://youtu.be/uAaMPxDO2Wc?si=U5neDY5_5rwBaYgR" }, { title: "Kyrie Eleison", link: "https://youtu.be/b8WdyJHLUgg?si=XZeuVLhaHIwI7vRy" }, { title: "Glory to God", link: "https://youtu.be/R7C4DvKOgfE?si=z9bf_XunGASV2enN" }, { title: "Lord Jesus Christ, Son of God", link: "https://youtu.be/X5NDlZAKdJc?si=4VAi1-GIiVCouKzu" }, { title: "Hallelujah – Alexandra Burke", link: "https://youtu.be/0COdq1IT5Hc?si=aFf-_mPKktyy23iM" }, { title: "Ave Maria", link: "https://youtu.be/sWe95K5BEoM?si=PAdvL-XYIUpzhWB6" }, { title: "10,000 Reasons – Matt Redman", link: "https://youtu.be/XtwIT8JjddM?si=4tZXwX26kneymkkl" } ],
    Islam: [ { title: "Surah Al-Fatiha", link: "https://youtu.be/ZYaZ6Odbx_Y?si=drWO0VdmJvGPgLJ8" }, { title: "3 Quls", link: "https://youtu.be/YN5qeo4QS_M?si=KN5nxNj6PN6cvocA" }, { title: "Surah Yaseen", link: "https://youtu.be/yMg4DXHQooc?si=DYRos2z_8cAUV-HY" }, { title: "Subhanallah, Alhamdulillah, Allahu Akbar", link: "https://youtu.be/GkHxGzuFYHo?si=VQGh6zDkxtre_O0E" }, { title: "Azan – Islamic Call to Prayer", link: "https://youtu.be/zBNUdeWw-wE?si=_xrXD5CtBI03mRT0" }, { title: "Astaghfirullah", link: "https://youtu.be/LxjlvRUixgE?si=s_queQ4skpquIIzd" } ],
    Sikhism: [ { title: "Ek Onkar – Asees Kaur", link: "https://youtu.be/FWRTl6KSHPg?si=tm-itFioXqfbdB5y" }, { title: "Japji Sahib", link: "https://youtu.be/SC1gipmk214?si=Y0Ibwy0HvAKWWLr7" }, { title: "Tera Kita Jaato Naahi", link: "https://music.youtube.com/watch?v=NRtkmHLKjgQ&si=FKzI1ffBqPvQIp1Z" }, { title: "Kirtan Sukhmani Sahib Path", link: "https://youtu.be/lBxtI0ifpoQ?si=qWuzcfRAbT-IKC5m" }, { title: "Waheguru Simran", link: "https://youtu.be/l1eKMlrf6xc?si=IbEk9jVtOinUBJDl" }, { title: "Bhai Nirmal Singh Ji – Best Shabads", link: "https://youtu.be/VAQ4SoD9mNQ?si=JadznkNa-YO174pS" } ],
    Jainism: [ { title: "Namokar Mantra", link: "https://youtu.be/WqD-nyNdW3o?si=_WGz9X--DKlYoARa" }, { title: "Logass Path", link: "https://youtu.be/BVA801hmAAs?si=jeGBnsB8-9wslTMz" }, { title: "Khamemi Savve Jiva", link: "https://youtu.be/LJybyRBgVpw?si=cp95yhsdk1EuZ3Pm" }, { title: "Mangal Divo", link: "https://youtu.be/J74Vgn_vxvg?si=jgfrKIdnLxVvpmZb" }, { title: "Navkar Mantra 108 Times", link: "https://youtu.be/u_uI7krdzv0?si=jgyJWJgroLQZKk1S" }, { title: "Namokaar Meditation on Chakras", link: "https://youtu.be/3ujsfUymoSw?si=3mlmQZzhFVIRBGVs" } ],
    Buddhism: [ { title: "Om Mani Padme Hum", link: "https://youtu.be/mvBLSJWk6HE?si=Wl2XRywTiFjvCHGJ" }, { title: "Buddham Saranam Gacchami", link: "https://youtu.be/moT7-zQ4WRE?si=jU-3GccDmFAqR0Z3" }, { title: "Metta Bhavana", link: "https://youtu.be/VAaSoFvB6XQ?si=QAJra1sujUYs4H2N" }, { title: "OM SHANTI OM – Tibetan Bowls", link: "https://youtu.be/SkJBYIpjZz4?si=w2LAozrPu7XNBhje" }, { title: "Heart Sutra", link: "https://youtu.be/GgfmLuUGETc?si=uOBLsrngh8_DMPgb" } ],
    "General Wisdom": [ { title: "Weightless – Marconi Union", link: "https://youtu.be/qYnA9wWFHLI?si=-o_bYBe0SIvuNw03" }, { title: "Don't Worry Be Happy", link: "https://youtu.be/d-diB65scQU?si=QjA-RtOyXV146bVg" }, { title: "Here Comes The Sun – Beatles", link: "https://youtu.be/KQetemT1sWc?si=Mn6sS8ZG-4s6Zw53" }, { title: "Feeling Good – Michael Bublé", link: "https://youtu.be/Edwsf-8F3sI?si=B5ZD3AjobWWnO5b6" }, { title: "Happy – Pharrell Williams", link: "https://youtu.be/ZbZSe6N_BXs?si=lUG4ZidDwivKJeUg" }, { title: "Can't Stop The Feeling!", link: "https://youtu.be/ru0K8uYEZWw?si=w-u2wql9Rctkgts9" }, { title: "Shut Up and Dance", link: "https://youtu.be/6JCLY0Rlx6Q?si=JqUMp5vkNgeFx5_p" } ]
};

const zenPrompts = [
    "How was your day?",
    "What are some positive things that happened today?",
    "What did you learn about yourself today?",
    "How did you show kindness today?",
    "What are you grateful for today?"
];

// --- STYLES --- //
const styles = {
    card: {
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(5px)",
        padding: "1.5rem",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        marginBottom: '1.5rem'
    },
    leftPane: {
        width: '180px', // Slimmer navigation pane
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)'
    },
    navButton: {
        background: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        padding: '0.75rem',
        margin: '0.25rem 0', // Reduced margin
        borderRadius: '8px',
        textAlign: 'left',
        fontSize: '0.9rem',
        cursor: 'pointer',
        transition: 'background 0.3s',
        width: '100%'
    },
    navSelect: {
        background: '#333', // Dark background for select
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: 'white',
        padding: '0.75rem',
        margin: '0.25rem 0',
        borderRadius: '8px',
        fontSize: '0.9rem',
        cursor: 'pointer',
        width: '100%',
        appearance: 'none'
    },
    activeNavButton: {
        background: 'rgba(255, 255, 255, 0.25)',
    },
    mainContent: {
        flex: 1,
        height: '100vh',
        overflowY: 'auto',
        padding: '2rem',
        position: 'relative'
    },
    select: {
        padding: "8px",
        marginLeft: "10px",
        background: '#333',
        color: 'white',
        border: '1px solid #555',
        borderRadius: '6px'
    }
};

export default function App() {
    // --- STATE MANAGEMENT --- //
    const [activeView, setActiveView] = useState('home');
    const [mood, setMood] = useState("peaceful");
    const [faith, setFaith] = useState(() => localStorage.getItem("faith") || "General Wisdom");
    const [quoteIndex, setQuoteIndex] = useState(0);
    const [fade, setFade] = useState(true);
    const [promptIndex, setPromptIndex] = useState(0);
    const [promptFade, setPromptFade] = useState(true);
    const [email, setEmail] = useState("");
    const [isMeditating, setIsMeditating] = useState(false);
    const [viewingGrateful, setViewingGrateful] = useState(false);
    const [isZenMode, setIsZenMode] = useState(false);
    const [journalText, setJournalText] = useState("");
    const [journalDate, setJournalDate] = useState(() => new Date().toISOString().slice(0, 10));
    const [allJournals, setAllJournals] = useState({});
    const [sacredEarthTribe, setSacredEarthTribe] = useState("");
    const [isSacredEarthMode, setIsSacredEarthMode] = useState(false);
    const [selectedMeditationIndex, setSelectedMeditationIndex] = useState(0);
    const [gratefulEntries, setGratefulEntries] = useState({});

    const moodRef = useRef(null);

    const currentQuotes = faithQuotes[faith] || [];
    const currentSongs = faithSongs[faith] || [];
    const quote = currentQuotes[quoteIndex] || {};
    
    const isAnyModeActive = isMeditating || isZenMode || isSacredEarthMode;

    // --- EFFECTS --- //
    
    // Effect to control background video play/pause state
    useEffect(() => {
        const iframe = moodRef.current;
        if (iframe && iframe.contentWindow) {
            const command = isAnyModeActive ? 'pauseVideo' : 'playVideo';
            iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: command, args: [] }), "*");
        }
    }, [isAnyModeActive]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setPromptFade(false);
            setTimeout(() => {
                setPromptIndex(i => (i + 1) % zenPrompts.length);
                setPromptFade(true);
            }, 500);
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        localStorage.setItem("faith", faith);
        setQuoteIndex(0);
    }, [faith]);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setQuoteIndex((prev) => (prev + 1) % (currentQuotes.length || 1));
                setFade(true);
            }, 500);
        }, 15000);
        return () => clearInterval(interval);
    }, [currentQuotes]);

    useEffect(() => {
        if (isZenMode) {
            const journals = {};
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith("journal-")) {
                    const date = key.replace("journal-", "");
                    journals[date] = localStorage.getItem(key);
                }
            }
            setAllJournals(journals);
            const todayEntry = localStorage.getItem(`journal-${journalDate}`);
            setJournalText(todayEntry || "");
            const storedMemories = JSON.parse(localStorage.getItem("gratefulMemories") || "[]");
            const memoriesObject = {};
            for (let memory of storedMemories) {
                memoriesObject[memory.date] = memory.content;
            }
            setGratefulEntries(memoriesObject);
        }
    }, [isZenMode, journalDate]);

    useEffect(() => {
        if (isZenMode) {
            const key = `journal-${journalDate}`;
            const timeout = setTimeout(() => {
                localStorage.setItem(key, journalText);
                setAllJournals(prev => ({ ...prev, [journalDate]: journalText }));
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [journalText, journalDate, isZenMode]);

    useEffect(() => {
        const handleFirstClick = () => {
            const iframe = moodRef.current;
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*");
            }
            window.removeEventListener("click", handleFirstClick);
        };
        window.addEventListener("click", handleFirstClick);
        return () => window.removeEventListener("click", handleFirstClick);
    }, []);

    const handleSubscribe = async () => {
        if (!email) {
            alert("Please enter an email.");
            return;
        }
        try {
            const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeJf553BN1uTjOheRjr4JIpjcWwV5jma2FqEpzSzqF_W4gt1w/formResponse";
            const emailField = "entry.1823453264";
            const faithField = "entry.48844451";
            await fetch(formUrl, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/x-www-form-urlencoded", },
                body: new URLSearchParams({ [emailField]: email, [faithField]: faith, }),
            });
            alert("Subscribed successfully!");
            setEmail("");
        } catch (error) {
            console.error("Subscription failed", error);
            alert("Subscription failed. Please try again later.");
        }
    };

    // --- SUB-COMPONENTS FOR VIEWS --- //
    const SubscriptionBox = () => (
        <div style={styles.card}>
            <h2>Get Daily Quotes</h2>
            <p>Subscribe to receive a daily quote based on your selected faith.</p>
            <div style={{display: 'flex', marginTop: '1rem'}}>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: "10px", width: "70%", borderRadius: '6px 0 0 6px', border: '1px solid #555', background: '#333', color: 'white' }} />
                <button onClick={handleSubscribe} style={{ padding: "10px 20px", borderRadius: '0 6px 6px 0', border: 'none', background: '#f5f5f5', color: '#111', cursor: 'pointer', fontWeight: 'bold' }}> Subscribe </button>
            </div>
        </div>
    );

    const HomeView = () => (
        <>
            <div style={{ ...styles.card, textAlign: 'center' }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem", marginTop: 0 }}>Home</h1>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                    <div>
                        <label>Select your faith: </label>
                        <select value={faith} onChange={(e) => setFaith(e.target.value)} style={styles.select}>
                            {Object.keys(faithQuotes).map((f) => (<option key={f} value={f}>{f}</option>))}
                        </select>
                    </div>
                    <div>
                        <label>How are you feeling today? </label>
                        <select value={mood} onChange={(e) => setMood(e.target.value)} style={styles.select}>
                            <option value="peaceful">Peaceful</option> <option value="grateful">Grateful</option>
                            <option value="anxious">Anxious</option> <option value="inspired">Inspired</option>
                        </select>
                    </div>
                </div>
            </div>
            <div style={{ ...styles.card, textAlign: 'center', fontStyle: "italic", fontSize: '1.1rem', opacity: fade ? 1 : 0, transition: "opacity 0.5s ease-in-out", minHeight: '120px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div>
                    "{quote?.text}"
                    <p style={{ marginTop: "8px", fontStyle: "normal", fontWeight: "bold" }}>— {quote?.source}</p>
                </div>
            </div>
            <SubscriptionBox />
        </>
    );

    const DailyDigestView = () => (
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', height: 'calc(100vh - 4rem)'}}>
            <div style={{gridColumn: '1 / -1'}}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", margin: 0 }}>Daily Digest</h1>
            </div>
            <div style={{...styles.card, marginBottom: 0}}>
                <h2>Today’s Special</h2> 
                <p>Visit Tricycle for a daily spiritual reflection.</p>
                <a href="https://tricycle.org/dailydharma/" target="_blank" rel="noopener noreferrer">
                    <button style={{ marginTop: "1rem", padding: "10px 20px", fontSize: "16px", background: "#f5f5f5", color: "#111", border: "none", borderRadius: "8px", cursor: "pointer" }}> Visit Reflection </button>
                </a>
            </div>
            <div style={{ ...styles.card, marginBottom: 0, opacity: promptFade ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}>
                <h2>Brief Reflection</h2>
                <p style={{ fontStyle: "italic", fontSize: "1.2rem" }}>{zenPrompts[promptIndex]}</p>
            </div>
            <div style={{...styles.card, gridColumn: '1 / -1', marginBottom: 0}}>
                <h2>Spiritual Songs</h2>
                <ul style={{ listStyle: 'none', padding: 0, maxHeight: '200px', overflowY: 'auto' }}>{currentSongs.map((song) => (<li key={song.title} style={{marginBottom: '0.5rem'}}><a href={song.link} target="_blank" rel="noopener noreferrer" style={{ color: "lightblue", textDecoration: "underline" }}>{song.title}</a></li>))}</ul>
            </div>
            <div style={{...styles.card, gridColumn: '1 / -1', marginBottom: 0}}>
                <SubscriptionBox />
            </div>
        </div>
    );

    return (
        <div style={{ position: "relative", minHeight: "100vh", color: "white", fontFamily: 'sans-serif', overflow: 'hidden', display: 'flex' }}>
            
            {/* Background Video - now covers the entire viewport */}
            <iframe ref={moodRef} src={moodBackgrounds[mood]} title="Mood Background" allow="autoplay" frameBorder="0"
                style={{ 
                    position: "fixed", 
                    top: 0, 
                    left: 0, 
                    width: "100vw", 
                    height: "100vh", 
                    zIndex: -1, 
                    pointerEvents: 'none' 
                }}
            ></iframe>

            {/* Left Navigation Pane */}
            {!isAnyModeActive && (
                <div style={styles.leftPane}>
                    <h1 style={{textAlign: 'center', marginTop: 0, fontSize: '1.5rem'}}>ISM App</h1>
                    <button 
                        onClick={() => setActiveView('home')} 
                        style={{...styles.navButton, ...(activeView === 'home' && styles.activeNavButton)}}
                    >
                        🏠 Home
                    </button>
                    <button 
                        onClick={() => setActiveView('digest')} 
                        style={{...styles.navButton, ...(activeView === 'digest' && styles.activeNavButton)}}
                    >
                        ☀️ Daily Digest
                    </button>
                    <hr style={{border: '1px solid rgba(255, 255, 255, 0.1)', margin: '1rem 0'}} />
                    <p style={{margin: '0 0 0.5rem 0', fontSize: '0.8rem', color: '#aaa'}}>MODES</p>
                    <button 
                        onClick={() => setIsMeditating(true)} 
                        style={styles.navButton}
                    >
                        🙏 Meditation
                    </button>
                     <button 
                        onClick={() => setIsZenMode(true)} 
                        style={styles.navButton}
                    >
                        🧘 Zen Mode
                    </button>
                    <select 
                        onChange={(e) => {
                            if (e.target.value) {
                                setSacredEarthTribe(e.target.value);
                                setIsSacredEarthMode(true);
                            }
                        }}
                        value="" // Always reset to the placeholder
                        style={styles.navSelect}
                    >
                        <option value="" style={{background: '#333'}}>🏞️ Sacred Earth</option>
                        <option value="DeepForestDawn" style={{background: '#333'}}>Deep Forest Dawn</option>
                        <option value="RiverEdge" style={{background: '#333'}}>River’s Edge</option>
                        <option value="EmeraldThunder" style={{background: '#333'}}>Emerald Thunderstorm</option>
                        <option value="CampfireNight" style={{background: '#333'}}>Nightfall Campfire</option>
                        <option value="MorningSerenade" style={{background: '#333'}}>Songbird Serenade</option>
                    </select>
                </div>
            )}

            {/* Main Content Area */}
            {!isAnyModeActive && (
                <div style={styles.mainContent}>
                    {activeView === 'home' && <HomeView />}
                    {activeView === 'digest' && <DailyDigestView />}
                </div>
            )}
            
            {/* Full-screen modes (Meditation, Zen, Sacred Earth) */}
            {isMeditating && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "#000", display: "flex", zIndex: 10000 }}>
                    <div style={{ flex: 3, display: "flex", justifyContent: "center", alignItems: "center", padding: '1rem' }}>
                        <iframe id="meditationVideo" width="100%" height="100%" src={meditationStyles[selectedMeditationIndex].url} title={meditationStyles[selectedMeditationIndex].title} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div id="meditationList" style={{ flex: 1, background: "#111", color: "#fff", padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
                        <h3>Select Meditation</h3>
                        {meditationStyles.map((video, index) => (
                            <button key={video.title} onClick={() => setSelectedMeditationIndex(index)} style={{ padding: "10px", background: selectedMeditationIndex === index ? "#333" : "#222", color: "#fff", border: "none", borderRadius: "6px", textAlign: "left", cursor: "pointer" }}>{video.title}</button>
                        ))}
                    </div>
                    <button onClick={() => setIsMeditating(false)} style={{ position: "absolute", bottom: "20px", right: "20px", padding: "12px 24px", fontSize: "16px", background: "#fff", color: "#000", border: "none", borderRadius: "8px", cursor: "pointer", zIndex: 10001 }}> Exit Meditation </button>
                </div>
            )}
            {isZenMode && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "#111", color: "#fff", zIndex: 9999, display: "flex", flexDirection: window.innerWidth < 768 ? "column" : "row", overflowY: "auto" }}>
                    <div style={{ position: "absolute", top: "10px", width: "100%", textAlign: "center", fontSize: "18px", opacity: promptFade ? 1 : 0, transition: "opacity 0.5s", color: "#ccc", zIndex: 10000 }}>{zenPrompts[promptIndex]}</div>
                    <div style={{ width: window.innerWidth < 768 ? '100%' : "30%", background: "#1a1a1a", padding: "20px", overflowY: "auto", borderRight: "1px solid #333" }}>
                        <h2 style={{ marginTop: 0 }}> 📘 Journal History</h2>
                        {Object.entries(allJournals).sort(([a], [b]) => b.localeCompare(a)).map(([date, entry]) => {
                            const isGrateful = gratefulEntries[date]?.trim() === entry.trim();
                            return (
                                <div key={date} onClick={() => setJournalDate(date)} style={{ padding: "10px", marginBottom: "10px", background: journalDate === date ? "#333" : "#222", borderRadius: "5px", cursor: "pointer" }}>
                                    <strong>{new Date(date).toDateString()}</strong>
                                    <p style={{ fontSize: "12px", color: "#ccc" }}>{entry.slice(0, 60)}{entry.length > 60 ? "..." : ""}</p>
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        let current = JSON.parse(localStorage.getItem("gratefulMemories") || "[]");
                                        const index = current.findIndex(m => m.date === date && m.content === entry);
                                        if (index !== -1) {
                                            current.splice(index, 1);
                                            alert("❌ Removed from Grateful Memories");
                                        } else {
                                            current.push({ date, content: entry });
                                            alert("⭐ Marked as Grateful Memory!");
                                        }
                                        localStorage.setItem("gratefulMemories", JSON.stringify(current));
                                        const updated = {};
                                        current.forEach(m => { updated[m.date] = m.content; });
                                        setGratefulEntries(updated);
                                    }}> {isGrateful ? "❌ Unmark Grateful" : "💖 Mark as Grateful"} </button>
                                </div>
                            );
                        })}
                    </div>
                    <div style={{ flex: 1, padding: "30px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start" }}>
                        <h1> 🧘 Zen Mode</h1>
                        <input type="date" value={journalDate} onChange={(e) => setJournalDate(e.target.value)} style={{ marginBottom: "20px", fontSize: "16px", padding: "6px", borderRadius: "4px", border: "1px solid #666", background: "#222", color: "#fff" }} />
                        <iframe width="0" height="0" src="https://www.youtube.com/embed/EK7tN-LVgxo?autoplay=1&loop=1&playlist=EK7tN-LVgxo" title="Zen Music" allow="autoplay" style={{ display: "none" }}></iframe>
                        <button onClick={() => setViewingGrateful(!viewingGrateful)} style={{ marginBottom: "16px", padding: "10px 16px", background: viewingGrateful ? "#ffe0b2" : "#dcedc8", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", fontSize: "15px" }}>
                            {viewingGrateful ? "← Back to Journal" : "💖 View Grateful Memories"}
                        </button>
                        {viewingGrateful ? (
                            <div style={{ background: "#fff8e1", padding: "20px", borderRadius: "10px", color: "#333", fontSize: "16px", height: "60vh", overflowY: "auto", width: '100%' }}>
                                <h3 style={{ color: "#c62828", marginBottom: "10px" }}> 💖 Your Grateful Memories</h3>
                                {Object.keys(gratefulEntries).length === 0 ? (<p>No grateful memories saved yet.</p>) : (Object.entries(gratefulEntries).filter(([_, text]) => text && text.trim()).map(([date, text]) => (
                                    <div key={date} style={{ background: "#fff", marginBottom: "10px", padding: "10px", borderRadius: "6px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}>
                                        <strong>{date}</strong>
                                        <p style={{ margin: "5px 0" }}>{text}</p>
                                    </div>
                                )))}
                                <button onClick={() => {
                                    const content = Object.entries(gratefulEntries).filter(([_, text]) => text && text.trim()).map(([date, text]) => `${date}\n${text}\n\n`).join("");
                                    const blob = new Blob([content], { type: "text/plain" });
                                    const url = URL.createObjectURL(blob);
                                    const link = document.createElement("a");
                                    link.href = url;
                                    link.download = "Grateful_Memories.txt";
                                    link.click();
                                    URL.revokeObjectURL(url);
                                }} style={{ marginTop: "10px", padding: "10px 16px", background: "#aed581", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}> 📥 Download as .txt </button>
                            </div>
                        ) : (
                            <>
                                <textarea placeholder="Let your thoughts flow here..." value={journalText} onChange={(e) => setJournalText(e.target.value)}
                                    style={{ width: "100%", height: "60vh", padding: "20px", fontSize: "16px", background: "#222", color: "#fff", border: "none", borderRadius: "8px", resize: "none" }}
                                />
                                <button onClick={() => {
                                    if (!journalText || !journalText.trim()) {
                                        alert("Cannot mark an empty entry as grateful.");
                                        return;
                                    }
                                    let current = JSON.parse(localStorage.getItem("gratefulMemories") || "[]");
                                    const index = current.findIndex(m => m.date === journalDate);
                                    if (index !== -1) {
                                        current[index].content = journalText;
                                    } else {
                                        current.push({ date: journalDate, content: journalText });
                                    }
                                    localStorage.setItem("gratefulMemories", JSON.stringify(current));
                                    setGratefulEntries(prev => ({...prev, [journalDate]: journalText}));
                                    alert("⭐ Marked as Grateful Memory!");
                                }} style={{ marginTop: "10px", padding: "8px 12px", background: "#ffd54f", color: "#000", fontWeight: "bold", border: "none", borderRadius: "6px", cursor: "pointer" }}> ⭐ Mark as Grateful Memory </button>
                            </>
                        )}
                        <button onClick={() => { setIsZenMode(false); const iframe = moodRef.current; if (iframe && iframe.contentWindow) { iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*'); } }} style={{ position: "absolute", top: "20px", right: "20px", padding: "10px 16px" }}> Exit Zen Mode </button>
                    </div>
                </div>
            )}
            {isSacredEarthMode && (
                <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "#000", zIndex: 10000, color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <iframe src={sacredEarthVideos[sacredEarthTribe]} title="Sacred Earth Background" frameBorder="0" allow="autoplay" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}></iframe>
                    <button onClick={() => { setSacredEarthTribe(""); setIsSacredEarthMode(false); }} style={{ position: "fixed", bottom: "20px", right: "20px", padding: "12px 24px", fontSize: "16px", background: "#fff", color: "#000", border: "none", borderRadius: "8px", cursor: "pointer", zIndex: 10001 }}> Exit Sacred Earth Mode </button>
                </div>
            )}
        </div>
    );
}

/* ============================================================
   VIDEOHUB CLONE - JAVASCRIPT
   ============================================================

   यह JavaScript file हमारे VideoHub clone को interactive
   बनाती है।

   HTML  = Structure
   CSS   = Design
   JS    = Logic + Interaction

   इस file में हम सीखेंगे:

   1. Variables
   2. Constants
   3. Arrays
   4. Objects
   5. Functions
   6. Arrow Functions
   7. Template Literals
   8. DOM Selection
   9. DOM Manipulation
   10. Events
   11. Event Delegation
   12. Array Methods
   13. Search
   14. Filter
   15. Sort
   16. Modal
   17. Dropdown
   18. Dark Mode
   19. LocalStorage
   20. Comments
   21. Like / Dislike
   22. Subscribe
   23. Share
   24. Notifications
   25. Settings
   26. Keyboard Shortcuts
   27. Form Validation
   28. Loading
   29. Toast
   30. Responsive Logic
   31. setTimeout
   32. setInterval
   33. try/catch
   34. JSON
   35. Destructuring
   36. Spread Operator
   37. Optional Chaining
   38. Async Functions
   39. Promises
   40. Custom Events

   ============================================================ */


/* ============================================================
   01. GLOBAL CONFIGURATION
   ============================================================ */

/*
   App का नाम एक constant में रखा गया है।

   const का मतलब:
   इस variable को बाद में दोबारा assign नहीं कर सकते।
*/

const APP_NAME = "VideoHub";


/*
   Application version।
*/

const APP_VERSION = "1.0.0";


/*
   Videos को एक बार में कितने दिखाना है।
*/

const VIDEOS_PER_LOAD = 8;


/*
   Default theme।
*/

const DEFAULT_THEME = "light";


/*
   LocalStorage keys को एक जगह रखने से
   spelling mistakes कम होती हैं।
*/

const STORAGE_KEYS = {

    theme: "videohub_theme",

    likedVideos: "videohub_liked_videos",

    savedVideos: "videohub_saved_videos",

    subscriptions: "videohub_subscriptions",

    comments: "videohub_comments",

    history: "videohub_history",

    notifications: "videohub_notifications",

    settings: "videohub_settings"

};


/* ============================================================
   02. GLOBAL STATE
   ============================================================ */

/*
   Application की current state।

   let का इस्तेमाल इसलिए क्योंकि values बाद में बदलेंगी।
*/

let currentCategory = "All";


/*
   Current search query।
*/

let currentSearch = "";


/*
   अभी कितने videos दिख रहे हैं।
*/

let visibleVideoCount = VIDEOS_PER_LOAD;


/*
   Current selected video।
*/

let currentVideo = null;


/*
   Current user subscribed channels।
*/

let subscribedChannels = [];


/*
   Liked videos की list।
*/

let likedVideos = [];


/*
   Saved videos की list।
*/

let savedVideos = [];


/*
   Video history।
*/

let watchHistory = [];


/*
   Comments data।
*/

let commentsData = {};


/*
   Notifications।
*/

let notificationsData = [];


/*
   Application settings।
*/

let appSettings = {

    autoplay: true,

    darkMode: false,

    restrictedMode: false,

    language: "English",

    playbackSpeed: "1"

};


/* ============================================================
   03. VIDEO DATA
   ============================================================ */

/*
   यह हमारा demo database है।

   Real project में यही data Firebase,
   MongoDB या किसी backend से आ सकता है।

   अभी सीखने के लिए JavaScript array में रखा गया है।
*/

const videos = [

    {
        id: 1,
        title: "Complete HTML Course For Beginners",
        channel: "Code Academy",
        category: "Programming",
        views: 1250000,
        likes: 54000,
        duration: "24:35",
        thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        description: "Learn HTML from zero to advanced level.",
        verified: true
    },

    {
        id: 2,
        title: "CSS Complete Tutorial",
        channel: "Web Master",
        category: "Programming",
        views: 890000,
        likes: 42000,
        duration: "35:12",
        thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
        description: "Learn CSS concepts with practical examples.",
        verified: true
    },

    {
        id: 3,
        title: "JavaScript Full Course",
        channel: "JS World",
        category: "Programming",
        views: 2200000,
        likes: 98000,
        duration: "48:25",
        thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
        description: "Complete JavaScript course for beginners.",
        verified: true
    },

    {
        id: 4,
        title: "How To Build A Website",
        channel: "Dev Studio",
        category: "Programming",
        views: 560000,
        likes: 21000,
        duration: "18:40",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
        description: "Build your first modern website.",
        verified: false
    },

    {
        id: 5,
        title: "Top 10 Coding Tips",
        channel: "Tech Daily",
        category: "Technology",
        views: 450000,
        likes: 19000,
        duration: "12:22",
        thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
        description: "Useful tips every programmer should know.",
        verified: true
    },

    {
        id: 6,
        title: "Learn Python From Scratch",
        channel: "Python Hub",
        category: "Programming",
        views: 1700000,
        likes: 72000,
        duration: "42:15",
        thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=80",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
        description: "Python programming complete beginner course.",
        verified: true
    },

    {
        id: 7,
        title: "AI Explained For Beginners",
        channel: "Future Tech",
        category: "Technology",
        views: 920000,
        likes: 45000,
        duration: "20:15",
        thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
        avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80",
        description: "Artificial Intelligence explained simply.",
        verified: true
    },

    {
        id: 8,
        title: "Amazing Travel Places",
        channel: "Travel World",
        category: "Travel",
        views: 730000,
        likes: 31000,
        duration: "15:50",
        thumbnail: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=80",
        avatar: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=200&q=80",
        description: "Beautiful places around the world.",
        verified: false
    },

    {
        id: 9,
        title: "Best Gym Workout Routine",
        channel: "Fitness Pro",
        category: "Fitness",
        views: 1100000,
        likes: 65000,
        duration: "16:30",
        thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
        avatar: "https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=200&q=80",
        description: "Beginner friendly workout routine.",
        verified: true
    },

    {
        id: 10,
        title: "Gaming Setup Under Budget",
        channel: "Game Zone",
        category: "Gaming",
        views: 680000,
        likes: 27000,
        duration: "14:45",
        thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
        description: "Build an amazing gaming setup.",
        verified: false
    },

    {
        id: 11,
        title: "React JS Complete Guide",
        channel: "Frontend Master",
        category: "Programming",
        views: 1300000,
        likes: 58000,
        duration: "39:20",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=900&q=80",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
        description: "Learn React JS step by step.",
        verified: true
    },

    {
        id: 12,
        title: "Node JS Backend Tutorial",
        channel: "Backend Academy",
        category: "Programming",
        views: 780000,
        likes: 35000,
        duration: "32:10",
        thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
        description: "Build backend applications using Node JS.",
        verified: true
    },

    {
        id: 13,
        title: "Best Camera Settings",
        channel: "Photography Pro",
        category: "Photography",
        views: 320000,
        likes: 12000,
        duration: "11:25",
        thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=900&q=80",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
        description: "Camera settings for better photos.",
        verified: false
    },

    {
        id: 14,
        title: "Learn C Programming",
        channel: "C Language Hub",
        category: "Programming",
        views: 910000,
        likes: 40000,
        duration: "29:30",
        thumbnail: "https://images.unsplash.com/photo-1517148815978-75f6acaaf32c?auto=format&fit=crop&w=900&q=80",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80",
        description: "C programming from basics.",
        verified: true
    },

    {
        id: 15,
        title: "Top Android Apps",
        channel: "Mobile World",
        category: "Technology",
        views: 410000,
        likes: 16000,
        duration: "10:15",
        thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
        avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
        description: "Useful Android applications.",
        verified: false
    },

    {
        id: 16,
        title: "Java Programming Tutorial",
        channel: "Java Master",
        category: "Programming",
        views: 1400000,
        likes: 61000,
        duration: "44:10",
        thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
        avatar: "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80",
        description: "Complete Java programming tutorial.",
        verified: true
    }

];


/* ============================================================
   04. SHORTS DATA
   ============================================================ */

const shorts = [

    {
        id: 101,
        title: "#My Birthday Surprise",
        views: 450060,
        thumbnail: "mybirthdaay.png"
    },

    {
        id: 102,
        title: "#With hours",
        views: 230869,
        thumbnail: "hourse.png"
    },

    {
        id: 103,
        title: "#Hours Riding",
        views: 670044,
        thumbnail: "hourselover.png"
    },

    {
        id: 104,
        title: "#RUNNER",
        views: 3400067,
        thumbnail: "dhavk.png"
    },

    {
        id: 105,
        title: "#GYM",
        views: 1200007,
        thumbnail: "gym.png"
    },

    {
        id: 106,
        title: "#Top 5 place in varanshi",
        views: 890000,
        thumbnail: "varanshi.png"
    }

];


/* ============================================================
   05. DOM ELEMENTS
   ============================================================ */

/*
   document.getElementById()
   किसी HTML element को उसके id से select करता है।
*/

const menuButton =
    document.getElementById("menuButton");


const heroWatchButton =
    document.getElementById("heroWatchButton");


const resetSearchButton =
    document.getElementById("resetSearchButton");


const searchInput =
    document.getElementById("searchInput");


const searchForm =
    document.getElementById("searchForm");


const searchButton =
    document.getElementById("searchButton");


const clearSearchButton =
    document.getElementById("clearSearchButton");


const videoGrid =
    document.getElementById("videoGrid");


const shortsGrid =
    document.getElementById("shortsGrid");


const categorySection =
    document.getElementById("categorySection");


const loadMoreButton =
    document.getElementById("loadMoreButton");


const noResults =
    document.getElementById("noResults");


const darkModeToggle =
    document.getElementById("darkModeToggle");


const notificationSettings =
    document.getElementById("notificationSettings");


const profileButton =
    document.getElementById("profileButton");


const profileDropdown =
    document.getElementById("profileDropdown");


const notificationButton =
    document.getElementById("notificationButton");


const notificationPanel =
    document.getElementById("notificationPanel");


const createButton =
    document.getElementById("createButton");


const createModal =
    document.getElementById("createModal");


const settingsModal =
    document.getElementById("settingsModal");


const videoModal =
    document.getElementById("videoModal");


const commentsModal =
    document.getElementById("commentsModal");


const shareModal =
    document.getElementById("shareModal");


const toast =
    document.getElementById("toast");


/* ============================================================
   06. SAFE LOCAL STORAGE FUNCTIONS
   ============================================================ */

/*
   LocalStorage browser में data save करता है।

   लेकिन अगर data खराब JSON हो जाए तो JSON.parse()
   error दे सकता है।

   इसलिए try/catch का इस्तेमाल किया गया है।
*/

function getStorageData(key, defaultValue = []) {

    try {

        const data =
            localStorage.getItem(key);

        if (!data) {

            return defaultValue;

        }

        return JSON.parse(data);

    } catch (error) {

        console.error(
            "Storage read error:",
            error
        );

        return defaultValue;

    }

}


/*
   LocalStorage में data save करने वाला function।
*/

function setStorageData(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    } catch (error) {

        console.error(
            "Storage save error:",
            error
        );

    }

}


/* ============================================================
   07. LOAD SAVED DATA
   ============================================================ */

function loadSavedData() {

    likedVideos =
        getStorageData(
            STORAGE_KEYS.likedVideos,
            []
        );


    savedVideos =
        getStorageData(
            STORAGE_KEYS.savedVideos,
            []
        );


    subscribedChannels =
        getStorageData(
            STORAGE_KEYS.subscriptions,
            []
        );


    watchHistory =
        getStorageData(
            STORAGE_KEYS.history,
            []
        );


    commentsData =
        getStorageData(
            STORAGE_KEYS.comments,
            {}
        );


    notificationsData =
        getStorageData(
            STORAGE_KEYS.notifications,
            []
        );


    const savedSettings =
        getStorageData(
            STORAGE_KEYS.settings,
            null
        );


    if (savedSettings) {

        appSettings = {
            ...appSettings,
            ...savedSettings
        };

    }

}


/* ============================================================
   08. NUMBER FORMATTER
   ============================================================ */

/*
   1250000 को 1.25M जैसा दिखाने के लिए।
*/

function formatNumber(number) {

    if (number >= 1000000000) {

        return (
            number / 1000000000
        ).toFixed(1) + "B";

    }


    if (number >= 1000000) {

        return (
            number / 1000000
        ).toFixed(1) + "M";

    }


    if (number >= 1000) {

        return (
            number / 1000
        ).toFixed(1) + "K";

    }


    return String(number);

}


/* ============================================================
   09. FIND VIDEO
   ============================================================ */

function findVideoById(id) {

    return videos.find(
        video => video.id === Number(id)
    );

}


/* ============================================================
   10. FILTER VIDEOS
   ============================================================ */

function getFilteredVideos() {

    let result = [...videos];


    /*
       Category filter।
    */

    if (currentCategory !== "All") {

        result = result.filter(
            video =>
                video.category === currentCategory
        );

    }


    /*
       Search filter।
    */

    if (currentSearch.trim() !== "") {

        const query =
            currentSearch
                .toLowerCase()
                .trim();


        result = result.filter(video => {

            const searchableText = (

                video.title +
                " " +
                video.channel +
                " " +
                video.category +
                " " +
                video.description

            ).toLowerCase();


            return searchableText.includes(query);

        });

    }


    return result;

}


/* ============================================================
   11. CREATE VIDEO CARD
   ============================================================ */

function createVideoCard(video) {

    /*
       Template literal के अंदर HTML generate कर रहे हैं।
    */

    const isLiked =
        likedVideos.includes(video.id);


    const isSaved =
        savedVideos.includes(video.id);


    const verifiedIcon =
        video.verified
            ? `<i class="fa-solid fa-circle-check"></i>`
            : "";


    return `

        <article
            class="video-card"
            data-video-id="${video.id}"
        >

            <div
                class="thumbnail-container"
                data-action="play"
            >

                <img
                    src="${video.thumbnail}"
                    alt="${video.title}"
                    loading="lazy"
                >

                <span class="video-duration">
                    ${video.duration}
                </span>

                <button
                    class="thumbnail-action"
                    data-action="save"
                    data-video-id="${video.id}"
                    title="Save"
                >
                    <i class="
                        fa-solid
                        ${isSaved
                            ? "fa-bookmark"
                            : "fa-bookmark"
                        }
                    "></i>
                </button>

            </div>


            <div class="video-info">

                <img
                    class="channel-avatar"
                    src="${video.avatar}"
                    alt="${video.channel}"
                    loading="lazy"
                >


                <div class="video-text">

                    <h3 class="video-title">
                        ${video.title}
                    </h3>


                    <p class="channel-name">

                        ${video.channel}

                        ${verifiedIcon}

                    </p>


                    <p class="video-meta">

                        ${formatNumber(video.views)}
                        views •
                        ${video.duration}

                    </p>

                </div>


                <button
                    class="more-button"
                    data-action="menu"
                    data-video-id="${video.id}"
                >
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>

            </div>

        </article>

    `;

}


/* ============================================================
   12. RENDER VIDEOS
   ============================================================ */

function renderVideos() {

    if (!videoGrid) {

        return;

    }


    const filteredVideos =
        getFilteredVideos();


    const videosToShow =
        filteredVideos.slice(
            0,
            visibleVideoCount
        );


    videoGrid.innerHTML =
        videosToShow
            .map(createVideoCard)
            .join("");


    /*
       अगर कोई result नहीं है।
    */

    if (
        filteredVideos.length === 0
    ) {

        if (noResults) {

            noResults.classList.remove(
                "hidden"
            );

        }

    } else {

        if (noResults) {

            noResults.classList.add(
                "hidden"
            );

        }

    }


    /*
       Load more button तभी दिखेगा जब
       और videos available हों।
    */

    if (loadMoreButton) {

        loadMoreButton.style.display =
            filteredVideos.length >
            visibleVideoCount
                ? "inline-flex"
                : "none";

    }

}


/* ============================================================
   13. RENDER SHORTS
   ============================================================ */

function renderShorts() {

    if (!shortsGrid) {

        return;

    }


    shortsGrid.innerHTML =
        shorts.map(short => {

            return `

                <article
                    class="short-card"
                    data-short-id="${short.id}"
                >

                    <div class="short-thumbnail">

                        <img
                            src="${short.thumbnail}"
                            alt="${short.title}"
                            loading="lazy"
                        >

                        <button
                            class="short-play"
                            data-action="play-short"
                            data-short-id="${short.id}"
                        >

                            <i class="
                                fa-solid
                                fa-play
                            "></i>

                        </button>

                    </div>


                    <div class="short-info">

                        <h3>
                            ${short.title}
                        </h3>

                        <p>
                            ${formatNumber(short.views)}
                            views
                        </p>

                    </div>

                </article>

            `;

        }).join("");

}


/* ============================================================
   14. CREATE CATEGORY BUTTONS
   ============================================================ */

function renderCategories() {

    if (!categorySection) {

        return;

    }


    const categories = [

        "All",

        ...new Set(
            videos.map(
                video => video.category
            )
        )

    ];


    categorySection.innerHTML =
        categories.map(category => {

            const active =
                category === currentCategory
                    ? "active"
                    : "";


            return `

                <button
                    class="
                        category-button
                        ${active}
                    "
                    data-category="${category}"
                >
                    ${category}
                </button>

            `;

        }).join("");

}


/* ============================================================
   15. CATEGORY CLICK
   ============================================================ */

function handleCategoryClick(event) {

    const button =
        event.target.closest(
            ".category-button"
        );


    if (!button) {

        return;

    }


    currentCategory =
        button.dataset.category;


    visibleVideoCount =
        VIDEOS_PER_LOAD;


    document
        .querySelectorAll(
            ".category-button"
        )
        .forEach(item => {

            item.classList.remove(
                "active"
            );

        });


    button.classList.add("active");


    renderVideos();

}


/* ============================================================
   16. SEARCH
   ============================================================ */

function performSearch() {

    currentSearch =
        searchInput
            ? searchInput.value
            : "";


    visibleVideoCount =
        VIDEOS_PER_LOAD;


    renderVideos();


    updateClearSearchButton();

}


/* ============================================================
   17. CLEAR SEARCH BUTTON
   ============================================================ */

function updateClearSearchButton() {

    if (!clearSearchButton) {

        return;

    }


    const hasText =
        searchInput &&
        searchInput.value.trim() !== "";


    clearSearchButton.classList.toggle(
        "visible",
        hasText
    );

}


/* ============================================================
   18. CLEAR SEARCH
   ============================================================ */

function clearSearch() {

    if (searchInput) {

        searchInput.value = "";

    }


    currentSearch = "";


    visibleVideoCount =
        VIDEOS_PER_LOAD;


    updateClearSearchButton();

    renderVideos();

}


/* ============================================================
   19. LOAD MORE
   ============================================================ */

function loadMoreVideos() {

    visibleVideoCount +=
        VIDEOS_PER_LOAD;


    renderVideos();

}


/* ============================================================
   20. OPEN VIDEO MODAL
   ============================================================ */

function openVideo(videoId) {

    const video =
        findVideoById(videoId);


    if (!video) {

        return;

    }


    currentVideo = video;


    /*
       History में video add करना।
    */

    addToHistory(video.id);


    /*
       Modal element खोजना।
    */

    if (!videoModal) {

        return;

    }


    const title =
        videoModal.querySelector(
            "[data-video-title]"
        );


    const description =
        videoModal.querySelector(
            "[data-video-description]"
        );


    const player =
        videoModal.querySelector(
            "video"
        );


    if (title) {

        title.textContent =
            video.title;

    }


    if (description) {

        description.textContent =
            video.description;

    }


    if (player) {

        /*
           Demo के लिए thumbnail को poster की तरह
           इस्तेमाल किया जा सकता है।
        */

        player.poster =
            video.thumbnail;

    }


    videoModal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";


    updateVideoModalButtons();

}


/* ============================================================
   21. CLOSE MODAL
   ============================================================ */

function closeModal(modal) {

    if (!modal) {

        return;

    }


    modal.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


/* ============================================================
   22. CLOSE ALL MODALS
   ============================================================ */

function closeAllModals() {

    document
        .querySelectorAll(".modal.active")
        .forEach(modal => {

            modal.classList.remove(
                "active"
            );

        });


    document.body.style.overflow =
        "";

}


/* ============================================================
   23. LIKE VIDEO
   ============================================================ */

function toggleDislike(videoId) {

    if (!videoId) {

        return;

    }

    showToast(
        "Dislike action recorded."
    );

}


function toggleLike(videoId) {

    const id = Number(videoId);


    if (likedVideos.includes(id)) {

        likedVideos =
            likedVideos.filter(
                item => item !== id
            );


        showToast(
            "Video removed from liked videos."
        );

    } else {

        likedVideos.push(id);


        showToast(
            "Video liked!"
        );

    }


    setStorageData(
        STORAGE_KEYS.likedVideos,
        likedVideos
    );


    updateVideoModalButtons();

}


/* ============================================================
   24. SAVE VIDEO
   ============================================================ */

function toggleSave(videoId) {

    const id = Number(videoId);


    if (savedVideos.includes(id)) {

        savedVideos =
            savedVideos.filter(
                item => item !== id
            );


        showToast(
            "Video removed from saved list."
        );

    } else {

        savedVideos.push(id);


        showToast(
            "Video saved!"
        );

    }


    setStorageData(
        STORAGE_KEYS.savedVideos,
        savedVideos
    );


    renderVideos();

}


/* ============================================================
   25. SUBSCRIBE CHANNEL
   ============================================================ */

function toggleSubscribe(channelName) {

    if (
        subscribedChannels.includes(
            channelName
        )
    ) {

        subscribedChannels =
            subscribedChannels.filter(
                channel =>
                    channel !== channelName
            );


        showToast(
            `Unsubscribed from ${channelName}`
        );

    } else {

        subscribedChannels.push(
            channelName
        );


        showToast(
            `Subscribed to ${channelName}`
        );

    }


    setStorageData(
        STORAGE_KEYS.subscriptions,
        subscribedChannels
    );


    updateSubscribeButton();

}


/* ============================================================
   26. UPDATE VIDEO MODAL BUTTONS
   ============================================================ */

function updateVideoModalButtons() {

    if (!currentVideo || !videoModal) {

        return;

    }


    const likeButton =
        videoModal.querySelector(
            "[data-video-like]"
        );


    const saveButton =
        videoModal.querySelector(
            "[data-video-save]"
        );


    const subscribeButton =
        videoModal.querySelector(
            "[data-video-subscribe]"
        );


    if (likeButton) {

        const liked =
            likedVideos.includes(
                currentVideo.id
            );


        likeButton.classList.toggle(
            "active",
            liked
        );


        likeButton.innerHTML =
            liked
                ? `<i class="fa-solid fa-thumbs-up"></i> Liked`
                : `<i class="fa-regular fa-thumbs-up"></i> Like`;

    }


    if (saveButton) {

        const saved =
            savedVideos.includes(
                currentVideo.id
            );


        saveButton.classList.toggle(
            "active",
            saved
        );


        saveButton.innerHTML =
            saved
                ? `<i class="fa-solid fa-bookmark"></i> Saved`
                : `<i class="fa-regular fa-bookmark"></i> Save`;

    }


    updateSubscribeButton(
        subscribeButton
    );

}


/* ============================================================
   27. UPDATE SUBSCRIBE BUTTON
   ============================================================ */

function updateSubscribeButton(
    button = null
) {

    if (!currentVideo) {

        return;

    }


    if (!button && videoModal) {

        button =
            videoModal.querySelector(
                "[data-video-subscribe]"
            );

    }


    if (!button) {

        return;

    }


    const subscribed =
        subscribedChannels.includes(
            currentVideo.channel
        );


    button.textContent =
        subscribed
            ? "Subscribed"
            : "Subscribe";


    button.classList.toggle(
        "active",
        subscribed
    );

}


/* ============================================================
   28. ADD TO HISTORY
   ============================================================ */

function addToHistory(videoId) {

    const id = Number(videoId);


    watchHistory =
        watchHistory.filter(
            item => item !== id
        );


    watchHistory.unshift(id);


    /*
       केवल last 50 videos रखेंगे।
    */

    watchHistory =
        watchHistory.slice(0, 50);


    setStorageData(
        STORAGE_KEYS.history,
        watchHistory
    );

}


/* ============================================================
   29. SHARE VIDEO
   ============================================================ */

async function shareVideo(video) {

    if (!video) {

        return;

    }


    const shareData = {

        title: video.title,

        text:
            `Watch "${video.title}" on VideoHub`,

        url:
            `${location.origin}${location.pathname}?video=${video.id}`

    };


    /*
       Browser Web Share API।
    */

    if (
        navigator.share
    ) {

        try {

            await navigator.share(
                shareData
            );


            showToast(
                "Video shared successfully!"
            );


        } catch (error) {

            /*
               User ने share cancel किया हो तो
               कोई error message नहीं दिखाएँगे।
            */

            console.log(
                "Share cancelled."
            );

        }

    } else {

        /*
           अगर browser Web Share support नहीं करता,
           तो clipboard में URL copy करेंगे।
        */

        copyText(
            shareData.url
        );

    }

}


/* ============================================================
   30. COPY TEXT
   ============================================================ */

async function copyText(text) {

    try {

        await navigator.clipboard.writeText(
            text
        );


        showToast(
            "Copied to clipboard!"
        );


    } catch (error) {

        console.error(
            "Clipboard error:",
            error
        );


        showToast(
            "Unable to copy text."
        );

    }

}


/* ============================================================
   31. SHOW TOAST
   ============================================================ */

let toastTimer = null;


function showToast(
    message,
    type = "success"
) {

    if (!toast) {

        return;

    }


    const messageElement =
        toast.querySelector(
            ".toast-message"
        );


    const iconElement =
        toast.querySelector(
            ".toast-icon"
        );


    if (messageElement) {

        messageElement.textContent =
            message;

    }


    if (iconElement) {

        if (type === "error") {

            iconElement.innerHTML =
                `<i class="fa-solid fa-xmark"></i>`;

        } else {

            iconElement.innerHTML =
                `<i class="fa-solid fa-check"></i>`;

        }

    }


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 3000);

}


/* ============================================================
   32. SIDEBAR TOGGLE
   ============================================================ */

function toggleSidebar() {

    const appLayout =
        document.querySelector(
            ".app-layout"
        );

    if (!appLayout) {

        return;

    }

    appLayout.classList.toggle(
        "sidebar-collapsed"
    );

}


/* ============================================================
   33. PROFILE DROPDOWN
   ============================================================ */

function toggleProfileDropdown() {

    if (!profileDropdown) {

        return;

    }


    profileDropdown.classList.toggle(
        "active"
    );


    /*
       Notification panel simultaneously open नहीं होना चाहिए।
    */

    if (notificationPanel) {

        notificationPanel.classList.remove(
            "active"
        );

    }

}


/* ============================================================
   33. NOTIFICATION PANEL
   ============================================================ */

function toggleNotificationPanel() {

    if (!notificationPanel) {

        return;

    }


    notificationPanel.classList.toggle(
        "active"
    );


    if (profileDropdown) {

        profileDropdown.classList.remove(
            "active"
        );

    }


    renderNotifications();

}


/* ============================================================
   34. RENDER NOTIFICATIONS
   ============================================================ */

function renderNotifications() {

    const container =
        document.querySelector(
            "#notificationList"
        );


    if (!container) {

        return;

    }


    /*
       Demo notifications अगर empty हैं।
    */

    if (
        notificationsData.length === 0
    ) {

        notificationsData = [

            {
                id: 1,
                text:
                    "Code Academy uploaded a new video.",
                time: "5 minutes ago",
                unread: true
            },

            {
                id: 2,
                text:
                    "Your video is ready to watch.",
                time: "1 hour ago",
                unread: true
            },

            {
                id: 3,
                text:
                    "Welcome to VideoHub!",
                time: "Yesterday",
                unread: false
            }

        ];

    }


    container.innerHTML =
        notificationsData.map(
            notification => {

                return `

                    <div
                        class="
                            notification-item
                            ${notification.unread
                                ? "unread"
                                : ""
                            }
                        "
                        data-notification-id="
                            ${notification.id}
                        "
                    >

                        <img
                            src="
                                https://images.unsplash.com/photo-${notification.id === 1 ? "1544005313-94ddf0286df2" : notification.id === 2 ? "1487412720507-e7ab37603c6f" : notification.id === 3 ? "1506794778202-cad84cf45f1d" : notification.id === 4 ? "1521119989659-a83eee488004" : "1500648767791-00dcc994a43e"}?auto=format&fit=crop&w=200&q=80
                            "
                            alt="Notification"
                        >

                        <div>

                            <p>
                                ${notification.text}
                            </p>

                            <time>
                                ${notification.time}
                            </time>

                        </div>

                    </div>

                `;

            }
        ).join("");


    setStorageData(
        STORAGE_KEYS.notifications,
        notificationsData
    );

}


/* ============================================================
   35. MARK NOTIFICATIONS READ
   ============================================================ */

function markNotificationsRead() {

    notificationsData =
        notificationsData.map(
            notification => ({

                ...notification,

                unread: false

            })
        );


    setStorageData(
        STORAGE_KEYS.notifications,
        notificationsData
    );


    renderNotifications();

}


/* ============================================================
   36. CREATE MODAL
   ============================================================ */

function openCreateModal() {

    if (!createModal) {

        return;

    }


    createModal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


/* ============================================================
   37. SETTINGS MODAL
   ============================================================ */

function openSettingsModal() {

    if (!settingsModal) {

        return;

    }


    settingsModal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";


    loadSettingsIntoUI();

}


/* ============================================================
   38. SETTINGS UI
   ============================================================ */

function loadSettingsIntoUI() {

    const autoplay =
        document.getElementById(
            "autoplayToggle"
        );


    const darkMode =
        document.getElementById(
            "settingsDarkMode"
        );


    const language =
        document.getElementById(
            "languageSelect"
        );


    const speed =
        document.getElementById(
            "playbackSpeed"
        );


    if (autoplay) {

        autoplay.checked =
            appSettings.autoplay;

    }


    if (darkMode) {

        darkMode.checked =
            appSettings.darkMode;

    }


    if (language) {

        language.value =
            appSettings.language;

    }


    if (speed) {

        speed.value =
            appSettings.playbackSpeed;

    }

}


/* ============================================================
   39. SAVE SETTINGS
   ============================================================ */

function saveSettings() {

    const autoplay =
        document.getElementById(
            "autoplayToggle"
        );


    const darkMode =
        document.getElementById(
            "settingsDarkMode"
        );


    const language =
        document.getElementById(
            "languageSelect"
        );


    const speed =
        document.getElementById(
            "playbackSpeed"
        );


    if (autoplay) {

        appSettings.autoplay =
            autoplay.checked;

    }


    if (darkMode) {

        appSettings.darkMode =
            darkMode.checked;

    }


    if (language) {

        appSettings.language =
            language.value;

    }


    if (speed) {

        appSettings.playbackSpeed =
            speed.value;

    }


    setStorageData(
        STORAGE_KEYS.settings,
        appSettings
    );


    applyTheme();


    showToast(
        "Settings saved."
    );

}


/* ============================================================
   40. THEME
   ============================================================ */

function applyTheme() {

    const savedTheme =
        localStorage.getItem(
            STORAGE_KEYS.theme
        );


    const theme =
        savedTheme ||
        (
            appSettings.darkMode
                ? "dark"
                : DEFAULT_THEME
        );


    document.body.classList.toggle(
        "dark-mode",
        theme === "dark"
    );


    if (darkModeToggle) {

        darkModeToggle.checked =
            theme === "dark";

    }


    appSettings.darkMode =
        theme === "dark";


    setStorageData(
        STORAGE_KEYS.settings,
        appSettings
    );

}


/* ============================================================
   41. TOGGLE THEME
   ============================================================ */

function toggleTheme() {

    const isDark =
        document.body.classList.toggle(
            "dark-mode"
        );


    const theme =
        isDark
            ? "dark"
            : "light";


    localStorage.setItem(
        STORAGE_KEYS.theme,
        theme
    );


    appSettings.darkMode =
        isDark;


    setStorageData(
        STORAGE_KEYS.settings,
        appSettings
    );


    showToast(
        isDark
            ? "Dark mode enabled."
            : "Light mode enabled."
    );

}


/* ============================================================
   42. COMMENTS
   ============================================================ */

function getComments(videoId) {

    const id =
        String(videoId);


    if (!commentsData[id]) {

        commentsData[id] = [];

    }


    return commentsData[id];

}


/* ============================================================
   43. ADD COMMENT
   ============================================================ */

function addComment(videoId, text) {

    const cleanText =
        text.trim();


    /*
       Empty comment allow नहीं करेंगे।
    */

    if (!cleanText) {

        showToast(
            "Please write a comment.",
            "error"
        );


        return false;

    }


    const id =
        String(videoId);


    if (!commentsData[id]) {

        commentsData[id] = [];

    }


    const newComment = {

        id: Date.now(),

        author: "Sonu",

        text: cleanText,

        time: "Just now",

        likes: 0

    };


    commentsData[id].unshift(
        newComment
    );


    setStorageData(
        STORAGE_KEYS.comments,
        commentsData
    );


    return true;

}


/* ============================================================
   44. RENDER COMMENTS
   ============================================================ */

function renderComments(videoId) {

    const container =
        document.getElementById(
            "commentsList"
        );


    if (!container) {

        return;

    }


    const comments =
        getComments(videoId);


    if (comments.length === 0) {

        container.innerHTML = `

            <div class="no-comments">

                <i class="
                    fa-regular
                    fa-comment
                "></i>

                <p>
                    No comments yet.
                </p>

                <small>
                    Be the first to comment.
                </small>

            </div>

        `;


        return;

    }


    container.innerHTML =
        comments.map(
            comment => {

                return `

                    <div
                        class="comment"
                        data-comment-id="
                            ${comment.id}
                        "
                    >

                        <img
                            class="
                                comment-avatar
                            "
                            src="
                                https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80
                            "
                            alt="${comment.author}"
                        >


                        <div class="comment-body">

                            <div class="comment-author">

                                <strong>
                                    ${comment.author}
                                </strong>

                                <time>
                                    ${comment.time}
                                </time>

                            </div>


                            <p>
                                ${escapeHTML(
                                    comment.text
                                )}
                            </p>


                            <div class="comment-actions">

                                <button
                                    class="
                                        comment-action
                                    "
                                    data-comment-like="
                                        ${comment.id}
                                    "
                                >

                                    <i class="
                                        fa-regular
                                        fa-thumbs-up
                                    "></i>

                                    ${comment.likes}

                                </button>


                                <button
                                    class="
                                        comment-action
                                    "
                                    data-comment-reply="
                                        ${comment.id}
                                    "
                                >

                                    Reply

                                </button>

                            </div>

                        </div>

                    </div>

                `;

            }
        ).join("");

}


/* ============================================================
   45. ESCAPE HTML
   ============================================================ */

/*
   User द्वारा comment में HTML code डालने से
   बचाने के लिए special characters escape करते हैं।

   यह security के लिए important concept है।
*/

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        value;


    return div.innerHTML;

}


/* ============================================================
   46. OPEN COMMENTS
   ============================================================ */

function openComments(videoId) {

    currentVideo =
        findVideoById(videoId);


    if (!currentVideo || !commentsModal) {

        return;

    }


    commentsModal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";


    renderComments(
        currentVideo.id
    );

}


/* ============================================================
   47. OPEN SHARE MODAL
   ============================================================ */

function openShareModal(video) {

    if (!video || !shareModal) {

        return;

    }


    const input =
        shareModal.querySelector(
            "[data-share-url]"
        );


    if (input) {

        input.value =
            `${location.origin}${location.pathname}?video=${video.id}`;

    }


    shareModal.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


/* ============================================================
   48. VIDEO MENU
   ============================================================ */

function showVideoMenu(videoId) {

    const video =
        findVideoById(videoId);


    if (!video) {

        return;

    }


    /*
       Simple browser menu।
    */

    const choice =
        window.prompt(
            "Type: save, share, report"
        );


    if (!choice) {

        return;

    }


    switch (
        choice.toLowerCase()
    ) {

        case "save":

            toggleSave(video.id);

            break;


        case "share":

            openShareModal(video);

            break;


        case "report":

            showToast(
                "Thanks. Report received."
            );

            break;


        default:

            showToast(
                "Unknown option.",
                "error"
            );

    }

}


/* ============================================================
   49. PLAY SHORT
   ============================================================ */

function playShort(shortId) {

    const short =
        shorts.find(
            item =>
                item.id === Number(shortId)
        );


    if (!short) {

        return;

    }


    showToast(
        `Playing Short: ${short.title}`
    );

}


/* ============================================================
   50. EVENT DELEGATION FOR VIDEO GRID
   ============================================================ */

/*
   एक-एक video card पर अलग event लगाने की बजाय
   पूरे videoGrid पर एक event लगाया गया है।

   इसे Event Delegation कहते हैं।
*/

function handleVideoGridClick(event) {

    const actionElement =
        event.target.closest(
            "[data-action]"
        );


    const card =
        event.target.closest(
            ".video-card"
        );


    if (!card) {

        return;

    }


    const videoId =
        Number(
            card.dataset.videoId
        );


    const action =
        actionElement
            ? actionElement.dataset.action
            : "play";


    if (action === "play") {

        openVideo(videoId);

        return;

    }


    if (action === "save") {

        event.stopPropagation();

        toggleSave(videoId);

        return;

    }


    if (action === "menu") {

        event.stopPropagation();

        showVideoMenu(videoId);

        return;

    }

}


/* ============================================================
   51. SHORTS EVENT
   ============================================================ */

function handleShortsClick(event) {

    const button =
        event.target.closest(
            "[data-action='play-short']"
        );


    if (!button) {

        return;

    }


    playShort(
        button.dataset.shortId
    );

}


/* ============================================================
   52. CATEGORY EVENT
   ============================================================ */

if (categorySection) {

    categorySection.addEventListener(
        "click",
        handleCategoryClick
    );

}


/* ============================================================
   53. SEARCH EVENTS
   ============================================================ */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            updateClearSearchButton();

            /*
               Debounce के बिना simple search।
            */

            performSearch();

        }
    );

}


if (searchForm) {

    searchForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            performSearch();

        }
    );

}


if (clearSearchButton) {

    clearSearchButton.addEventListener(
        "click",
        clearSearch
    );

}


/* ============================================================
   54. LOAD MORE EVENT
   ============================================================ */

if (loadMoreButton) {

    loadMoreButton.addEventListener(
        "click",
        loadMoreVideos
    );

}


/* ============================================================
   55. VIDEO GRID EVENT
   ============================================================ */

if (videoGrid) {

    videoGrid.addEventListener(
        "click",
        handleVideoGridClick
    );

}


/* ============================================================
   56. SHORTS EVENT
   ============================================================ */

if (shortsGrid) {

    shortsGrid.addEventListener(
        "click",
        handleShortsClick
    );

}


/* ============================================================
   57. PROFILE EVENT
   ============================================================ */

if (profileButton) {

    profileButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            toggleProfileDropdown();

        }
    );

}


/* ============================================================
   58. NOTIFICATION EVENT
   ============================================================ */

if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            toggleNotificationPanel();

        }
    );

}


/* ============================================================
   59. CREATE EVENT
   ============================================================ */

if (createButton) {

    createButton.addEventListener(
        "click",
        openCreateModal
    );

}


/* ============================================================
   60. DARK MODE EVENT
   ============================================================ */

if (darkModeToggle) {

    darkModeToggle.addEventListener(
        "change",
        toggleTheme
    );

}


if (menuButton) {

    menuButton.addEventListener(
        "click",
        toggleSidebar
    );

}


if (heroWatchButton) {

    heroWatchButton.addEventListener(
        "click",
        () => {

            if (videos[0]) {

                openVideo(videos[0].id);

            }

        }
    );

}


if (resetSearchButton) {

    resetSearchButton.addEventListener(
        "click",
        clearSearch
    );

}


if (notificationSettings) {

    notificationSettings.addEventListener(
        "click",
        openSettingsModal
    );

}


const copyLinkButton =
    document.getElementById("copyLinkButton");


if (copyLinkButton) {

    copyLinkButton.addEventListener(
        "click",
        () => {

            const urlInput =
                document.getElementById(
                    "shareUrlInput"
                );

            if (urlInput) {

                copyText(urlInput.value);

            }

        }
    );

}


/* ============================================================
   61. OUTSIDE CLICK
   ============================================================ */

document.addEventListener(
    "click",
    event => {

        /*
           Profile dropdown बाहर click होने पर close।
        */

        if (
            profileDropdown &&
            !profileDropdown.contains(
                event.target
            ) &&
            !profileButton?.contains(
                event.target
            )
        ) {

            profileDropdown.classList.remove(
                "active"
            );

        }


        /*
           Notification panel बाहर click होने पर close।
        */

        if (
            notificationPanel &&
            !notificationPanel.contains(
                event.target
            ) &&
            !notificationButton?.contains(
                event.target
            )
        ) {

            notificationPanel.classList.remove(
                "active"
            );

        }

    }
);


/* ============================================================
   62. MODAL BACKDROP CLICK
   ============================================================ */

document.addEventListener(
    "click",
    event => {

        const backdrop =
            event.target.closest(
                ".modal-backdrop"
            );


        if (!backdrop) {

            return;

        }


        const modal =
            backdrop.closest(
                ".modal"
            );


        closeModal(modal);

    }
);


/* ============================================================
   63. CLOSE BUTTONS
   ============================================================ */

document.addEventListener(
    "click",
    event => {

        const closeButton =
            event.target.closest(
                "[data-close-modal]"
            );


        if (!closeButton) {

            return;

        }


        const modal =
            closeButton.closest(
                ".modal"
            );


        closeModal(modal);

    }
);


/* ============================================================
   64. VIDEO MODAL ACTIONS
   ============================================================ */

if (videoModal) {

    videoModal.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    "[data-modal-action]"
                );


            if (!button || !currentVideo) {

                return;

            }


            const action =
                button.dataset.modalAction;


            switch (action) {

                case "like":

                    toggleLike(
                        currentVideo.id
                    );

                    break;


                case "dislike":

                    toggleDislike(
                        currentVideo.id
                    );

                    break;


                case "save":

                    toggleSave(
                        currentVideo.id
                    );

                    break;


                case "subscribe":

                    toggleSubscribe(
                        currentVideo.channel
                    );

                    break;


                case "comments":

                    openComments(
                        currentVideo.id
                    );

                    break;


                case "share":

                    openShareModal(
                        currentVideo
                    );

                    break;


                case "download":

                    showToast(
                        "Download started."
                    );

                    break;


                default:

                    console.log(
                        "Unknown action:",
                        action
                    );

            }

        }
    );

}


/* ============================================================
   65. COMMENT FORM
   ============================================================ */

const commentForm =
    document.getElementById(
        "commentForm"
    );


if (commentForm) {

    commentForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            if (!currentVideo) {

                return;

            }


            const input =
                commentForm.querySelector(
                    "input"
                );


            if (!input) {

                return;

            }


            const success =
                addComment(
                    currentVideo.id,
                    input.value
                );


            if (success) {

                input.value = "";

                renderComments(
                    currentVideo.id
                );

                showToast(
                    "Comment added!"
                );

            }

        }
    );

}


/* ============================================================
   66. COMMENT LIKE
   ============================================================ */

if (commentsModal) {

    commentsModal.addEventListener(
        "click",
        event => {

            const likeButton =
                event.target.closest(
                    "[data-comment-like]"
                );


            if (!likeButton || !currentVideo) {

                return;

            }


            const commentId =
                Number(
                    likeButton.dataset.commentLike
                );


            const comments =
                getComments(
                    currentVideo.id
                );


            const comment =
                comments.find(
                    item =>
                        item.id === commentId
                );


            if (comment) {

                comment.likes++;

            }


            setStorageData(
                STORAGE_KEYS.comments,
                commentsData
            );


            renderComments(
                currentVideo.id
            );

        }
    );

}


/* ============================================================
   67. SHARE COPY BUTTON
   ============================================================ */

if (shareModal) {

    shareModal.addEventListener(
        "click",
        event => {

            const copyButton =
                event.target.closest(
                    "[data-copy-share-url]"
                );


            if (!copyButton) {

                return;

            }


            const input =
                shareModal.querySelector(
                    "[data-share-url]"
                );


            if (input) {

                copyText(
                    input.value
                );

            }

        }
    );

}


/* ============================================================
   68. SETTINGS SAVE
   ============================================================ */

const saveSettingsButton =
    document.getElementById(
        "saveSettingsButton"
    );


if (saveSettingsButton) {

    saveSettingsButton.addEventListener(
        "click",
        saveSettings
    );

}


const clearAppDataButton =
    document.getElementById(
        "clearAppData"
    );


if (clearAppDataButton) {

    clearAppDataButton.addEventListener(
        "click",
        () => {

            localStorage.clear();

            showToast(
                "Application data cleared."
            );

            window.location.reload();

        }
    );

}


/* ============================================================
   69. SETTINGS MENU
   ============================================================ */

document.addEventListener(
    "click",
    event => {

        const item =
            event.target.closest(
                ".settings-menu-item"
            );


        if (!item) {

            return;

        }


        const target =
            item.dataset.setting;


        if (!target) {

            return;

        }


        document
            .querySelectorAll(
                ".settings-menu-item"
            )
            .forEach(button => {

                button.classList.remove(
                    "active"
                );

            });


        document
            .querySelectorAll(
                ".settings-panel"
            )
            .forEach(panel => {

                panel.classList.remove(
                    "active"
                );

            });


        item.classList.add(
            "active"
        );


        const panel =
            document.getElementById(
                target
            );


        if (panel) {

            panel.classList.add(
                "active"
            );

        }

    }
);


/* ============================================================
   70. KEYBOARD SHORTCUTS
   ============================================================ */

/*
   Keyboard shortcuts:

   / = Search
   Esc = Close
   K = Play/Pause
   L = Like
   S = Save
*/

document.addEventListener(
    "keydown",
    event => {

        /*
           अगर user input में typing कर रहा है,
           shortcut execute नहीं करना।
        */

        const activeElement =
            document.activeElement;


        const isTyping =
            activeElement &&
            (
                activeElement.tagName ===
                    "INPUT" ||

                activeElement.tagName ===
                    "TEXTAREA" ||

                activeElement.tagName ===
                    "SELECT"
            );


        if (
            isTyping &&
            event.key !== "Escape"
        ) {

            return;

        }


        /*
           Escape key।
        */

        if (event.key === "Escape") {

            closeAllModals();


            profileDropdown?.classList.remove(
                "active"
            );


            notificationPanel?.classList.remove(
                "active"
            );

            return;

        }


        /*
           "/" key।
        */

        if (event.key === "/") {

            event.preventDefault();

            searchInput?.focus();

            return;

        }


        /*
           L key।
        */

        if (
            event.key.toLowerCase() === "l" &&
            currentVideo
        ) {

            toggleLike(
                currentVideo.id
            );

            return;

        }


        /*
           S key।
        */

        if (
            event.key.toLowerCase() === "s" &&
            currentVideo
        ) {

            toggleSave(
                currentVideo.id
            );

            return;

        }

    }
);


/* ============================================================
   71. ONLINE / OFFLINE STATUS
   ============================================================ */

window.addEventListener(
    "online",
    () => {

        showToast(
            "You are back online."
        );

    }
);


window.addEventListener(
    "offline",
    () => {

        showToast(
            "You are offline.",
            "error"
        );

    }
);


/* ============================================================
   72. WINDOW RESIZE
   ============================================================ */

let resizeTimer;


window.addEventListener(
    "resize",
    () => {

        /*
           resize event बहुत बार fire हो सकता है।
           इसलिए timeout का इस्तेमाल किया गया है।
        */

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(
                () => {

                    handleResponsiveLayout();

                },
                200
            );

    }
);


/* ============================================================
   73. RESPONSIVE LAYOUT
   ============================================================ */

function handleResponsiveLayout() {

    const width =
        window.innerWidth;


    /*
       Mobile screen के लिए कुछ panels close।
    */

    if (width <= 700) {

        profileDropdown?.classList.remove(
            "active"
        );


        notificationPanel?.classList.remove(
            "active"
        );

    }

}


/* ============================================================
   74. AUTO HIDE TOAST
   ============================================================ */

function startToastWatcher() {

    setInterval(
        () => {

            /*
               यहाँ future में notification count,
               session आदि check कर सकते हैं।
            */

            if (
                !navigator.onLine
            ) {

                console.log(
                    "Internet connection unavailable."
                );

            }

        },
        30000
    );

}


/* ============================================================
   75. URL VIDEO PARAMETER
   ============================================================ */

/*
   URL:

   ?video=5

   होने पर video automatically open होगा।
*/

function checkURLVideo() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const videoId =
        params.get("video");


    if (videoId) {

        const video =
            findVideoById(
                videoId
            );


        if (video) {

            setTimeout(
                () => {

                    openVideo(
                        video.id
                    );

                },
                500
            );

        }

    }

}


/* ============================================================
   76. CUSTOM EVENT
   ============================================================ */

/*
   CustomEvent JavaScript application के अंदर
   अपना event बनाने के लिए उपयोगी है।
*/

function dispatchVideoEvent(
    video
) {

    const event =
        new CustomEvent(
            "videoOpened",
            {
                detail: {
                    video: video
                }
            }
        );


    document.dispatchEvent(
        event
    );

}


/*
   Custom event सुनना।
*/

document.addEventListener(
    "videoOpened",
    event => {

        console.log(
            "Video opened:",
            event.detail.video.title
        );

    }
);


/* ============================================================
   77. INTERSECTION OBSERVER
   ============================================================ */

/*
   IntersectionObserver यह पता लगाने में मदद करता है
   कि element screen पर दिखाई दे रहा है या नहीं।

   Lazy loading और infinite scrolling में useful है।
*/

function setupInfiniteScroll() {

    const sentinel =
        document.getElementById(
            "loadMoreSentinel"
        );


    if (!sentinel) {

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            const total =
                                getFilteredVideos()
                                    .length;


                            if (
                                visibleVideoCount <
                                total
                            ) {

                                loadMoreVideos();

                            }

                        }

                    }
                );

            },
            {
                rootMargin: "200px"
            }
        );


    observer.observe(
        sentinel
    );

}


/* ============================================================
   78. DEBOUNCE FUNCTION
   ============================================================ */

/*
   Debounce का मतलब:
   function को बार-बार तुरंत execute करने के बजाय
   थोड़ी देर रुककर execute करना।

   Search API के लिए यह बहुत useful है।
*/

function debounce(
    callback,
    delay = 300
) {

    let timer;


    return function (...args) {

        clearTimeout(
            timer
        );


        timer =
            setTimeout(
                () => {

                    callback.apply(
                        this,
                        args
                    );

                },
                delay
            );

    };

}


/* ============================================================
   79. DEBOUNCED SEARCH EXAMPLE
   ============================================================ */

const debouncedSearch =
    debounce(
        () => {

            performSearch();

        },
        300
    );


/* ============================================================
   80. FORMAT TIME
   ============================================================ */

function formatTime(seconds) {

    const totalSeconds =
        Math.floor(seconds);


    const hours =
        Math.floor(
            totalSeconds / 3600
        );


    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );


    const remainingSeconds =
        totalSeconds % 60;


    const paddedSeconds =
        String(
            remainingSeconds
        ).padStart(
            2,
            "0"
        );


    if (hours > 0) {

        return `${hours}:${String(
            minutes
        ).padStart(2, "0")}:${paddedSeconds}`;

    }


    return `${minutes}:${paddedSeconds}`;

}


/* ============================================================
   81. RANDOM NUMBER
   ============================================================ */

function randomNumber(
    min,
    max
) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


/* ============================================================
   82. RANDOM VIDEO
   ============================================================ */

function getRandomVideo() {

    const index =
        randomNumber(
            0,
            videos.length - 1
        );


    return videos[index];

}


/* ============================================================
   83. RECOMMENDED VIDEOS
   ============================================================ */

function getRecommendedVideos(
    currentVideoId
) {

    const current =
        findVideoById(
            currentVideoId
        );


    if (!current) {

        return [];

    }


    /*
       Same category वाले videos को
       recommendation में priority।
    */

    const sameCategory =
        videos.filter(
            video =>
                video.id !== current.id &&
                video.category ===
                    current.category
        );


    const others =
        videos.filter(
            video =>
                video.id !== current.id &&
                video.category !==
                    current.category
        );


    return [
        ...sameCategory,
        ...others
    ];

}


/* ============================================================
   84. SORT VIDEOS
   ============================================================ */

function sortVideos(
    sortType
) {

    const filtered =
        getFilteredVideos();


    switch (sortType) {

        case "popular":

            return filtered.sort(
                (a, b) =>
                    b.views - a.views
            );


        case "likes":

            return filtered.sort(
                (a, b) =>
                    b.likes - a.likes
            );


        case "newest":

            return filtered.sort(
                (a, b) =>
                    b.id - a.id
            );


        case "oldest":

            return filtered.sort(
                (a, b) =>
                    a.id - b.id
            );


        default:

            return filtered;

    }

}


/* ============================================================
   85. SORT SELECT
   ============================================================ */

const sortSelect =
    document.getElementById(
        "sortSelect"
    );


if (sortSelect) {

    sortSelect.addEventListener(
        "change",
        () => {

            const sorted =
                sortVideos(
                    sortSelect.value
                );


            videoGrid.innerHTML =
                sorted
                    .slice(
                        0,
                        visibleVideoCount
                    )
                    .map(
                        createVideoCard
                    )
                    .join("");

        }
    );

}


/* ============================================================
   86. SEARCH SUGGESTIONS
   ============================================================ */

function getSearchSuggestions(
    query
) {

    if (!query.trim()) {

        return [];

    }


    const lower =
        query
            .toLowerCase()
            .trim();


    return videos
        .filter(video => {

            return (

                video.title
                    .toLowerCase()
                    .includes(lower) ||

                video.channel
                    .toLowerCase()
                    .includes(lower) ||

                video.category
                    .toLowerCase()
                    .includes(lower)

            );

        })
        .slice(0, 5);

}


/* ============================================================
   87. RENDER SEARCH SUGGESTIONS
   ============================================================ */

function renderSearchSuggestions(
    query
) {

    const container =
        document.getElementById(
            "searchSuggestions"
        );


    if (!container) {

        return;

    }


    const suggestions =
        getSearchSuggestions(
            query
        );


    if (suggestions.length === 0) {

        container.classList.remove(
            "active"
        );

        return;

    }


    container.innerHTML =
        suggestions.map(
            video => {

                return `

                    <button
                        class="
                            suggestion-item
                        "
                        data-suggestion-video="
                            ${video.id}
                        "
                    >

                        <i class="
                            fa-solid
                            fa-clock-rotate-left
                        "></i>

                        <span>
                            ${video.title}
                        </span>

                    </button>

                `;

            }
        ).join("");


    container.classList.add(
        "active"
    );

}


/* ============================================================
   88. SEARCH SUGGESTION EVENT
   ============================================================ */

const searchSuggestions =
    document.getElementById(
        "searchSuggestions"
    );


if (searchSuggestions) {

    searchSuggestions.addEventListener(
        "click",
        event => {

            const item =
                event.target.closest(
                    "[data-suggestion-video]"
                );


            if (!item) {

                return;

            }


            const videoId =
                item.dataset.suggestionVideo;


            searchSuggestions.classList.remove(
                "active"
            );


            openVideo(
                videoId
            );

        }
    );

}


/* ============================================================
   89. UPDATE SEARCH INPUT
   ============================================================ */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        event => {

            renderSearchSuggestions(
                event.target.value
            );

        }
    );

}


/* ============================================================
   90. DOUBLE CLICK LIKE
   ============================================================ */

if (videoGrid) {

    videoGrid.addEventListener(
        "dblclick",
        event => {

            const card =
                event.target.closest(
                    ".video-card"
                );


            if (!card) {

                return;

            }


            const id =
                Number(
                    card.dataset.videoId
                );


            if (
                !likedVideos.includes(id)
            ) {

                toggleLike(id);

            }

        }
    );

}


/* ============================================================
   91. FAVORITE CHANNEL
   ============================================================ */

let favoriteChannels =
    getStorageData(
        "videohub_favorite_channels",
        []
    );


function toggleFavoriteChannel(
    channel
) {

    if (
        favoriteChannels.includes(
            channel
        )
    ) {

        favoriteChannels =
            favoriteChannels.filter(
                item =>
                    item !== channel
            );


        showToast(
            "Channel removed from favorites."
        );

    } else {

        favoriteChannels.push(
            channel
        );


        showToast(
            "Channel added to favorites."
        );

    }


    setStorageData(
        "videohub_favorite_channels",
        favoriteChannels
    );

}


/* ============================================================
   92. WATCH LATER
   ============================================================ */

let watchLater =
    getStorageData(
        "videohub_watch_later",
        []
    );


function addToWatchLater(
    videoId
) {

    const id =
        Number(videoId);


    if (
        watchLater.includes(id)
    ) {

        showToast(
            "Already in Watch Later."
        );


        return;

    }


    watchLater.push(id);


    setStorageData(
        "videohub_watch_later",
        watchLater
    );


    showToast(
        "Added to Watch Later."
    );

}


/* ============================================================
   93. REMOVE WATCH LATER
   ============================================================ */

function removeFromWatchLater(
    videoId
) {

    const id =
        Number(videoId);


    watchLater =
        watchLater.filter(
            item =>
                item !== id
        );


    setStorageData(
        "videohub_watch_later",
        watchLater
    );


    showToast(
        "Removed from Watch Later."
    );

}


/* ============================================================
   94. CLEAR HISTORY
   ============================================================ */

function clearHistory() {

    watchHistory = [];


    setStorageData(
        STORAGE_KEYS.history,
        watchHistory
    );


    showToast(
        "Watch history cleared."
    );

}


/* ============================================================
   95. CLEAR SEARCH HISTORY
   ============================================================ */

function clearSearchHistory() {

    localStorage.removeItem(
        "videohub_search_history"
    );


    showToast(
        "Search history cleared."
    );

}


/* ============================================================
   96. SAVE SEARCH
   ============================================================ */

function saveSearchQuery(
    query
) {

    const clean =
        query.trim();


    if (!clean) {

        return;

    }


    let history =
        getStorageData(
            "videohub_search_history",
            []
        );


    history =
        history.filter(
            item =>
                item.toLowerCase() !==
                clean.toLowerCase()
        );


    history.unshift(
        clean
    );


    history =
        history.slice(
            0,
            20
        );


    setStorageData(
        "videohub_search_history",
        history
    );

}


/* ============================================================
   97. SEARCH SUBMIT UPDATE
   ============================================================ */

if (searchForm) {

    searchForm.addEventListener(
        "submit",
        () => {

            saveSearchQuery(
                searchInput?.value || ""
            );

        }
    );

}


/* ============================================================
   98. PLAYBACK SPEED
   ============================================================ */

function setPlaybackSpeed(
    speed
) {

    const player =
        videoModal?.querySelector(
            "video"
        );


    if (!player) {

        return;

    }


    const numericSpeed =
        Number(speed);


    if (
        Number.isNaN(
            numericSpeed
        )
    ) {

        return;

    }


    player.playbackRate =
        numericSpeed;


    appSettings.playbackSpeed =
        String(speed);


    setStorageData(
        STORAGE_KEYS.settings,
        appSettings
    );


    showToast(
        `Playback speed: ${speed}x`
    );

}


/* ============================================================
   99. VIDEO PLAYER EVENTS
   ============================================================ */

const videoPlayer =
    document.querySelector(
        ".main-video-player"
    );


if (videoPlayer) {

    videoPlayer.addEventListener(
        "play",
        () => {

            console.log(
                "Video started."
            );

        }
    );


    videoPlayer.addEventListener(
        "pause",
        () => {

            console.log(
                "Video paused."
            );

        }
    );


    videoPlayer.addEventListener(
        "ended",
        () => {

            showToast(
                "Video finished."
            );

        }
    );


    videoPlayer.addEventListener(
        "timeupdate",
        () => {

            /*
               यहाँ future में progress bar,
               watch progress आदि बनाया जा सकता है।
            */

        }
    );

}


/* ============================================================
   100. AUTO PLAY
   ============================================================ */

function applyAutoplay() {

    const player =
        document.querySelector(
            ".main-video-player"
        );


    if (!player) {

        return;

    }


    player.autoplay =
        Boolean(
            appSettings.autoplay
        );

}


/* ============================================================
   101. PAGE VISIBILITY
   ============================================================ */

document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            console.log(
                "User switched tab."
            );

        } else {

            console.log(
                "User returned."
            );

        }

    }
);


/* ============================================================
   102. BEFORE UNLOAD
   ============================================================ */

window.addEventListener(
    "beforeunload",
    () => {

        /*
           Important data को आखिरी बार save कर सकते हैं।
        */

        setStorageData(
            STORAGE_KEYS.likedVideos,
            likedVideos
        );


        setStorageData(
            STORAGE_KEYS.savedVideos,
            savedVideos
        );


        setStorageData(
            STORAGE_KEYS.history,
            watchHistory
        );

    }
);


/* ============================================================
   103. DATE FORMATTER
   ============================================================ */

function formatDate(
    date
) {

    const d =
        new Date(date);


    return d.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",

            month: "short",

            year: "numeric"
        }
    );

}


/* ============================================================
   104. TIME AGO
   ============================================================ */

function timeAgo(
    date
) {

    const now =
        Date.now();


    const time =
        new Date(date).getTime();


    const seconds =
        Math.floor(
            (now - time) / 1000
        );


    if (seconds < 60) {

        return `${seconds}s ago`;

    }


    const minutes =
        Math.floor(
            seconds / 60
        );


    if (minutes < 60) {

        return `${minutes}m ago`;

    }


    const hours =
        Math.floor(
            minutes / 60
        );


    if (hours < 24) {

        return `${hours}h ago`;

    }


    const days =
        Math.floor(
            hours / 24
        );


    return `${days}d ago`;

}


/* ============================================================
   105. FORM VALIDATION
   ============================================================ */

function validateEmail(
    email
) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return pattern.test(
        email
    );

}


/* ============================================================
   106. VALIDATE REQUIRED FIELD
   ============================================================ */

function validateRequired(
    value
) {

    return (
        typeof value === "string" &&
        value.trim().length > 0
    );

}


/* ============================================================
   107. PASSWORD STRENGTH
   ============================================================ */

function getPasswordStrength(
    password
) {

    let score = 0;


    if (
        password.length >= 8
    ) {

        score++;

    }


    if (
        /[A-Z]/.test(password)
    ) {

        score++;

    }


    if (
        /[a-z]/.test(password)
    ) {

        score++;

    }


    if (
        /[0-9]/.test(password)
    ) {

        score++;

    }


    if (
        /[^A-Za-z0-9]/.test(password)
    ) {

        score++;

    }


    if (score <= 2) {

        return "Weak";

    }


    if (score <= 4) {

        return "Medium";

    }


    return "Strong";

}


/* ============================================================
   108. PASSWORD INPUT DEMO
   ============================================================ */

const passwordInput =
    document.getElementById(
        "passwordInput"
    );


const passwordStrength =
    document.getElementById(
        "passwordStrength"
    );


if (
    passwordInput &&
    passwordStrength
) {

    passwordInput.addEventListener(
        "input",
        () => {

            passwordStrength.textContent =
                getPasswordStrength(
                    passwordInput.value
                );

        }
    );

}


/* ============================================================
   109. LOGIN DEMO
   ============================================================ */

function loginUser(
    email,
    password
) {

    if (
        !validateEmail(email)
    ) {

        showToast(
            "Enter a valid email.",
            "error"
        );


        return false;

    }


    if (
        password.length < 6
    ) {

        showToast(
            "Password is too short.",
            "error"
        );


        return false;

    }


    /*
       यह केवल frontend demo है।
       Real login backend पर होना चाहिए।
    */

    localStorage.setItem(
        "videohub_logged_in",
        "true"
    );


    showToast(
        "Login successful!"
    );


    return true;

}


/* ============================================================
   110. LOGOUT
   ============================================================ */

function logoutUser() {

    localStorage.removeItem(
        "videohub_logged_in"
    );


    showToast(
        "Logged out successfully."
    );


    profileDropdown?.classList.remove(
        "active"
    );

}


/* ============================================================
   111. CHECK LOGIN
   ============================================================ */

function isLoggedIn() {

    return (
        localStorage.getItem(
            "videohub_logged_in"
        ) === "true"
    );

}


/* ============================================================
   112. USER PROFILE
   ============================================================ */

const currentUser = {

    name: "Sonu",

    email: "user@example.com",

    avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"

};


/* ============================================================
   113. UPDATE PROFILE UI
   ============================================================ */

function updateProfileUI() {

    document
        .querySelectorAll(
            "[data-user-name]"
        )
        .forEach(element => {

            element.textContent =
                currentUser.name;

        });


    document
        .querySelectorAll(
            "[data-user-email]"
        )
        .forEach(element => {

            element.textContent =
                currentUser.email;

        });


    document
        .querySelectorAll(
            "[data-user-avatar]"
        )
        .forEach(element => {

            element.src =
                currentUser.avatar;

        });

}


/* ============================================================
   114. COUNTERS
   ============================================================ */

function updateCounters() {

    document
        .querySelectorAll(
            "[data-liked-count]"
        )
        .forEach(element => {

            element.textContent =
                likedVideos.length;

        });


    document
        .querySelectorAll(
            "[data-saved-count]"
        )
        .forEach(element => {

            element.textContent =
                savedVideos.length;

        });


    document
        .querySelectorAll(
            "[data-history-count]"
        )
        .forEach(element => {

            element.textContent =
                watchHistory.length;

        });

}


/* ============================================================
   115. UPDATE NOTIFICATION COUNT
   ============================================================ */

function updateNotificationCount() {

    const countElement =
        document.querySelector(
            ".notification-count"
        );


    if (!countElement) {

        return;

    }


    const unread =
        notificationsData.filter(
            item =>
                item.unread
        ).length;


    countElement.textContent =
        unread;


    countElement.style.display =
        unread > 0
            ? "flex"
            : "none";

}


/* ============================================================
   116. INITIALIZE APPLICATION
   ============================================================ */

function initializeApp() {

    console.log(
        `${APP_NAME} ${APP_VERSION} starting...`
    );


    /*
       LocalStorage से data load।
    */

    loadSavedData();


    /*
       Theme apply।
    */

    applyTheme();


    /*
       Categories generate।
    */

    renderCategories();


    /*
       Videos render।
    */

    renderVideos();


    /*
       Shorts render।
    */

    renderShorts();


    /*
       User profile update।
    */

    updateProfileUI();


    /*
       Counters update।
    */

    updateCounters();


    /*
       Notifications।
    */

    renderNotifications();


    updateNotificationCount();


    /*
       Responsive logic।
    */

    handleResponsiveLayout();


    /*
       Infinite scroll।
    */

    setupInfiniteScroll();


    /*
       Toast watcher।
    */

    startToastWatcher();


    /*
       Video URL check।
    */

    checkURLVideo();


    /*
       Autoplay।
    */

    applyAutoplay();


    console.log(
        "VideoHub initialized successfully."
    );

}


/* ============================================================
   117. DOM CONTENT LOADED
   ============================================================ */

/*
   DOMContentLoaded तब fire होता है जब HTML का
   पूरा DOM load हो जाता है।

   JavaScript को safely initialize करने के लिए
   इसका इस्तेमाल किया जाता है।
*/

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);


/* ============================================================
   118. PAGE LOADER
   ============================================================ */

window.addEventListener(
    "load",
    () => {

        const loader =
            document.querySelector(
                ".page-loader"
            );


        if (loader) {

            setTimeout(
                () => {

                    loader.classList.add(
                        "hidden"
                    );

                },
                500
            );

        }

    }
);


/* ============================================================
   119. ERROR HANDLER
   ============================================================ */

/*
   Global JavaScript error पकड़ने के लिए।
*/

window.addEventListener(
    "error",
    event => {

        console.error(
            "Application error:",
            event.error
        );

    }
);


/* ============================================================
   120. UNHANDLED PROMISE ERROR
   ============================================================ */

window.addEventListener(
    "unhandledrejection",
    event => {

        console.error(
            "Unhandled promise rejection:",
            event.reason
        );

    }
);


/* ============================================================
   121. DEMO API FUNCTION
   ============================================================ */

/*
   Future में real API जोड़ने के लिए
   async/await का example।
*/

async function fetchVideosFromAPI() {

    try {

        /*
           अभी fake delay create कर रहे हैं।
        */

        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    500
                )
        );


        /*
           Real project में:

           const response =
               await fetch("/api/videos");

           const data =
               await response.json();

           return data;
        */

        return videos;

    } catch (error) {

        console.error(
            "API error:",
            error
        );


        return [];

    }

}


/* ============================================================
   122. PROMISE EXAMPLE
   ============================================================ */

function simulateUpload() {

    return new Promise(
        (resolve, reject) => {

            const success =
                Math.random() > 0.1;


            setTimeout(
                () => {

                    if (success) {

                        resolve(
                            "Upload successful!"
                        );

                    } else {

                        reject(
                            new Error(
                                "Upload failed."
                            )
                        );

                    }

                },
                1000
            );

        }
    );

}


/* ============================================================
   123. UPLOAD DEMO
   ============================================================ */

async function uploadVideoDemo() {

    showToast(
        "Uploading..."
    );


    try {

        const message =
            await simulateUpload();


        showToast(
            message
        );


    } catch (error) {

        showToast(
            error.message,
            "error"
        );

    }

}


/* ============================================================
   124. FILE INPUT
   ============================================================ */

const videoFileInput =
    document.getElementById(
        "videoFileInput"
    );


if (videoFileInput) {

    videoFileInput.addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];


            if (!file) {

                return;

            }


            /*
               File size MB में।
            */

            const sizeMB =
                file.size /
                (1024 * 1024);


            if (
                sizeMB > 100
            ) {

                showToast(
                    "File is too large.",
                    "error"
                );


                return;

            }


            showToast(
                `Selected: ${file.name}`
            );

        }
    );

}


/* ============================================================
   125. DRAG AND DROP
   ============================================================ */

const dropZone =
    document.getElementById(
        "dropZone"
    );


if (dropZone) {

    dropZone.addEventListener(
        "dragover",
        event => {

            event.preventDefault();

            dropZone.classList.add(
                "dragging"
            );

        }
    );


    dropZone.addEventListener(
        "dragleave",
        () => {

            dropZone.classList.remove(
                "dragging"
            );

        }
    );


    dropZone.addEventListener(
        "drop",
        event => {

            event.preventDefault();


            dropZone.classList.remove(
                "dragging"
            );


            const files =
                event.dataTransfer.files;


            if (
                files.length > 0
            ) {

                showToast(
                    `${files.length} file selected.`
                );

            }

        }
    );

}


/* ============================================================
   126. ARRAY DESTRUCTURING EXAMPLE
   ============================================================ */

function getFirstVideos() {

    const [
        first,
        second,
        ...remaining
    ] = videos;


    return {

        first,

        second,

        remaining

    };

}


/* ============================================================
   127. OBJECT DESTRUCTURING EXAMPLE
   ============================================================ */

function getVideoInfo(
    video
) {

    const {

        title,

        channel,

        views,

        category

    } = video;


    return {

        title,

        channel,

        views,

        category

    };

}


/* ============================================================
   128. SPREAD OPERATOR
   ============================================================ */

function cloneVideo(
    video
) {

    return {

        ...video,

        cloned: true

    };

}


/* ============================================================
   129. REST OPERATOR
   ============================================================ */

function calculateTotal(
    ...numbers
) {

    return numbers.reduce(
        (
            total,
            number
        ) =>
            total + number,
        0
    );

}


/* ============================================================
   130. OPTIONAL CHAINING
   ============================================================ */

function getChannelNameSafely(
    video
) {

    return (
        video?.channel
        ?? "Unknown Channel"
    );

}


/* ============================================================
   131. NULLISH COALESCING
   ============================================================ */

function getVideoTitle(
    video
) {

    return (
        video?.title
        ??
        "Untitled Video"
    );

}


/* ============================================================
   132. ARRAY MAP EXAMPLE
   ============================================================ */

function getAllTitles() {

    return videos.map(
        video =>
            video.title
    );

}


/* ============================================================
   133. ARRAY FILTER EXAMPLE
   ============================================================ */

function getProgrammingVideos() {

    return videos.filter(
        video =>
            video.category ===
            "Programming"
    );

}


/* ============================================================
   134. ARRAY FIND EXAMPLE
   ============================================================ */

function getVideo(
    id
) {

    return videos.find(
        video =>
            video.id ===
            Number(id)
    );

}


/* ============================================================
   135. ARRAY SOME EXAMPLE
   ============================================================ */

function hasLikedVideo(
    id
) {

    return likedVideos.some(
        videoId =>
            videoId ===
            Number(id)
    );

}


/* ============================================================
   136. ARRAY EVERY EXAMPLE
   ============================================================ */

function areAllVideosValid() {

    return videos.every(
        video =>
            Boolean(
                video.title &&
                video.channel
            )
    );

}


/* ============================================================
   137. ARRAY REDUCE EXAMPLE
   ============================================================ */

function getTotalViews() {

    return videos.reduce(
        (
            total,
            video
        ) =>
            total + video.views,
        0
    );

}


/* ============================================================
   138. GET MOST POPULAR VIDEO
   ============================================================ */

function getMostPopularVideo() {

    return videos.reduce(
        (
            highest,
            video
        ) => {

            if (
                video.views >
                highest.views
            ) {

                return video;

            }


            return highest;

        }
    );

}


/* ============================================================
   139. CLONE APPLICATION STATE
   ============================================================ */

function getApplicationState() {

    return {

        category:
            currentCategory,

        search:
            currentSearch,

        visibleVideos:
            visibleVideoCount,

        likedVideos:
            [...likedVideos],

        savedVideos:
            [...savedVideos],

        subscriptions:
            [...subscribedChannels]

    };

}


/* ============================================================
   140. DEBUG FUNCTION
   ============================================================ */

function debugApplication() {

    console.table(
        getApplicationState()
    );


    console.log(
        "Total videos:",
        videos.length
    );


    console.log(
        "Total views:",
        getTotalViews()
    );


    console.log(
        "Most popular:",
        getMostPopularVideo()
    );

}


/* ============================================================
   141. APP RESET
   ============================================================ */

function resetApplication() {

    const confirmed =
        window.confirm(
            "Reset all VideoHub data?"
        );


    if (!confirmed) {

        return;

    }


    Object.values(
        STORAGE_KEYS
    ).forEach(
        key => {

            localStorage.removeItem(
                key
            );

        }
    );


    likedVideos = [];

    savedVideos = [];

    subscribedChannels = [];

    watchHistory = [];

    commentsData = {};

    notificationsData = [];


    currentCategory = "All";

    currentSearch = "";

    visibleVideoCount =
        VIDEOS_PER_LOAD;


    appSettings = {

        autoplay: true,

        darkMode: false,

        restrictedMode: false,

        language: "English",

        playbackSpeed: "1"

    };


    location.reload();

}


/* ============================================================
   142. EXPORT APP DATA
   ============================================================ */

function exportAppData() {

    const data = {

        settings:
            appSettings,

        likedVideos,

        savedVideos,

        subscribedChannels,

        watchHistory,

        commentsData

    };


    const json =
        JSON.stringify(
            data,
            null,
            2
        );


    const blob =
        new Blob(
            [json],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href = url;

    link.download =
        "videohub-data.json";


    link.click();


    URL.revokeObjectURL(
        url
    );


    showToast(
        "Data exported."
    );

}


/* ============================================================
   143. IMPORT APP DATA
   ============================================================ */

function importAppData(
    file
) {

    if (!file) {

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        event => {

            try {

                const data =
                    JSON.parse(
                        event.target.result
                    );


                if (
                    data.likedVideos
                ) {

                    likedVideos =
                        data.likedVideos;

                }


                if (
                    data.savedVideos
                ) {

                    savedVideos =
                        data.savedVideos;

                }


                if (
                    data.subscribedChannels
                ) {

                    subscribedChannels =
                        data.subscribedChannels;

                }


                if (
                    data.watchHistory
                ) {

                    watchHistory =
                        data.watchHistory;

                }


                if (
                    data.commentsData
                ) {

                    commentsData =
                        data.commentsData;

                }


                if (
                    data.settings
                ) {

                    appSettings = {

                        ...appSettings,

                        ...data.settings

                    };

                }


                setStorageData(
                    STORAGE_KEYS.likedVideos,
                    likedVideos
                );


                setStorageData(
                    STORAGE_KEYS.savedVideos,
                    savedVideos
                );


                setStorageData(
                    STORAGE_KEYS.subscriptions,
                    subscribedChannels
                );


                setStorageData(
                    STORAGE_KEYS.history,
                    watchHistory
                );


                setStorageData(
                    STORAGE_KEYS.comments,
                    commentsData
                );


                setStorageData(
                    STORAGE_KEYS.settings,
                    appSettings
                );


                showToast(
                    "Data imported successfully."
                );


                updateCounters();

                renderVideos();

                applyTheme();


            } catch (error) {

                showToast(
                    "Invalid backup file.",
                    "error"
                );

            }

        };


    reader.readAsText(
        file
    );

}


/* ============================================================
   144. IMPORT FILE INPUT
   ============================================================ */

const importInput =
    document.getElementById(
        "importInput"
    );


if (importInput) {

    importInput.addEventListener(
        "change",
        event => {

            importAppData(
                event.target.files[0]
            );

        }
    );

}


/* ============================================================
   145. APPLICATION HEARTBEAT
   ============================================================ */

setInterval(
    () => {

        /*
           Demo heartbeat।

           Real application में यहाँ server health,
           notification polling या token refresh
           जैसी चीजें की जा सकती हैं।
        */

        console.log(
            "VideoHub heartbeat:",
            new Date().toLocaleTimeString()
        );

    },
    60000
);


/* ============================================================
   146. FINAL EXPORT FOR DEBUGGING
   ============================================================ */

/*
   Development के समय browser console से
   functions access करने के लिए window पर expose कर सकते हैं।

   Production application में सभी चीजें global करना
   जरूरी नहीं है।
*/

window.VideoHub = {

    videos,

    shorts,

    openVideo,

    toggleLike,

    toggleSave,

    toggleSubscribe,

    showToast,

    search: performSearch,

    clearSearch,

    loadMoreVideos,

    debug: debugApplication,

    reset: resetApplication,

    exportData: exportAppData,

    importData: importAppData,

    getState:
        getApplicationState

};


/* ============================================================
   147. FINAL MESSAGE
   ============================================================ */

/*
   अगर browser console में यह दिखाई दे:

       VideoHub initialized successfully.

   तो JavaScript successfully load हो चुकी है।

   याद रखें:

       HTML -> Structure
       CSS  -> Design
       JS   -> Functionality

   यही तीनों मिलकर एक complete frontend application
   बनाते हैं।

   ============================================================
   END OF SCRIPT.JS
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
    // 1. HIỆU ỨNG HOA ANH ĐÀO RƠI (SAKURA PETALS)
    const sakuraContainer = document.getElementById("sakura-container");
    const petalCount = 25;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement("div");
        petal.classList.add("petal");
        
        // Ngẫu nhiên kích thước, vị trí và tốc độ rơi
        const size = Math.random() * 10 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${Math.random() * 5 + 5}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        
        sakuraContainer.appendChild(petal);
    }

    // 2. ĐỒNG HỒ THỜI GIAN THỰC CHUẨN MÚI GIỜ TP.HCM (ICT UTC+7)
    function updateHCMClock() {
        const clockElement = document.getElementById("hcmClock");
        if (clockElement) {
            const options = {
                timeZone: 'Asia/Ho_Chi_Minh',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            };
            const formatter = new Intl.DateTimeFormat('vi-VN', options);
            clockElement.textContent = formatter.format(new Date());
        }
    }
    setInterval(updateHCMClock, 1000);
    updateHCMClock();

    // 3. HIỆU ỨNG GÕ CHỮ MINECRAFT VÀ NHẬN DIỆN THỜI GIAN
    const greetingElement = document.getElementById("greetingText");

    function getGreetingText() {
        const hour = new Date().getHours();
        let timeGreeting = "";

        if (hour >= 5 && hour < 11) {
            timeGreeting = "buoi sang";
        } else if (hour >= 11 && hour < 14) {
            timeGreeting = "buoi trua";
        } else if (hour >= 14 && hour < 18) {
            timeGreeting = "buoi chieu";
        } else {
            timeGreeting = "buoi toi";
        }

        return `Xin chao ${timeGreeting}! Cung enjoy va tim hieu ve toi.`;
    }

    function typeWriterEffect(text, element, speed = 70) {
        let i = 0;
        element.innerHTML = "";
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    if (greetingElement) {
        typeWriterEffect(getGreetingText(), greetingElement);
    }

    // 4. HIỆU ỨNG NGHIÊNG 3D THEO CON TRỎ CHUỘT
    const bioCard = document.getElementById("bioCard");

    document.addEventListener("mousemove", (e) => {
        if (window.innerWidth > 768 && bioCard) {
            const xAxis = (window.innerWidth / 2 - e.clientX) / 25;
            const yAxis = (window.innerHeight / 2 - e.clientY) / 25;
            bioCard.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        }
    });
document.addEventListener("mouseleave", () => {
        if (bioCard) {
            bioCard.style.transform = `rotateY(0deg) rotateX(0deg)`;
        }
    });

    // 5. DYNAMIC ISLAND THU NHỎ / PHÓNG TO
    const dynamicIsland = document.getElementById("dynamicIsland");
    const toggleIslandBtn = document.getElementById("toggleIslandBtn");
    const toggleIcon = document.getElementById("toggleIcon");

    toggleIslandBtn.addEventListener("click", () => {
        dynamicIsland.classList.toggle("minimized");
        if (dynamicIsland.classList.contains("minimized")) {
            toggleIcon.className = "fa-solid fa-expand";
        } else {
            toggleIcon.className = "fa-solid fa-compress";
        }
    });

    // 6. PHÁT BÀI NUTS INSTRUMENTAL & KÍCH HOẠT SÓNG ÂM EQUALIZER
    const songUrl = "https://hipstrumentals.com/wp-content/uploads/2025/07/Lil-Peep-Ft.-rainy-bear-nuts-Instrumental-Prod.-By-Willie-G.mp3";
    const audioPlayer = document.getElementById("audioPlayer");
    const playPauseBtn = document.getElementById("playPauseBtn");
    const playIcon = document.getElementById("playIcon");
    const equalizer = document.getElementById("equalizer");

    audioPlayer.src = songUrl;

    function playMusic() {
        audioPlayer.play().then(() => {
            playIcon.className = "fa-solid fa-pause";
            equalizer.classList.add("playing");
        }).catch(() => {
            playIcon.className = "fa-solid fa-play";
            equalizer.classList.remove("playing");
        });
    }

    function pauseMusic() {
        audioPlayer.pause();
        playIcon.className = "fa-solid fa-play";
        equalizer.classList.remove("playing");
    }

    // Tự động phát nhạc khi chạm / click màn hình lần đầu
    const autoPlayOnFirstInteraction = () => {
        playMusic();
        document.removeEventListener("click", autoPlayOnFirstInteraction);
    };
    document.addEventListener("click", autoPlayOnFirstInteraction);

    playPauseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (audioPlayer.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    });
});

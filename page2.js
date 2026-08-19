document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       SECTIONS
    ========================================== */

    const sections = [
        document.getElementById("intro-section"),
        document.getElementById("cake-section"),
        document.getElementById("balloon-section"),
        document.getElementById("popper-section"),
        document.getElementById("camera-section"),
        document.getElementById("notes-section"),
        document.getElementById("wine-section")
    ];

    function showSection(section) {

        sections.forEach(function (item) {
            item.classList.remove("active");
        });

        setTimeout(function () {
            section.classList.add("active");
        }, 120);
    }


    /* =========================================
       MUSIC
    ========================================== */

    const music = document.getElementById("party-music");
    const musicControl = document.getElementById("music-control");

    function startMusic() {

        music.volume = 0.35;

        const playPromise = music.play();

        if (playPromise !== undefined) {

            playPromise
                .then(function () {
                    musicControl.textContent = "♫";
                })
                .catch(function () {
                    musicControl.textContent = "🔇";
                });
        }
    }

    musicControl.addEventListener("click", function () {

        if (music.paused) {

            music.play();

            musicControl.textContent = "♫";

        } else {

            music.pause();

            musicControl.textContent = "🔇";
        }
    });


    /* =========================================
       CONFETTI
    ========================================== */

    function createConfetti(amount) {

        const container =
            document.getElementById("confetti-container");

        for (let i = 0; i < amount; i++) {

            const piece =
                document.createElement("span");

            piece.className = "confetti-piece";

            piece.style.left =
                Math.random() * 100 + "%";

            piece.style.top =
                (-20 - Math.random() * 30) + "px";

            piece.style.animationDelay =
                Math.random() * 0.8 + "s";

            piece.style.transform =
                "rotate(" +
                Math.random() * 360 +
                "deg)";

            container.appendChild(piece);

            setTimeout(function () {
                piece.remove();
            }, 3500);
        }
    }


    /* =========================================
       INTRO
    ========================================== */

    const startPartyButton =
        document.getElementById("start-party-btn");

    startPartyButton.addEventListener("click", function () {

        startMusic();

        createConfetti(60);

        showSection(
            document.getElementById("cake-section")
        );
    });


    /* =========================================
       CAKE
    ========================================== */

    const candles =
        document.querySelectorAll(".candle");

    const candleMessage =
        document.getElementById("candle-message");

    const cakeNextButton =
        document.getElementById("cake-next-btn");

    let candlesOut = 0;

    candles.forEach(function (candle) {

        candle.addEventListener("click", function () {

            if (candle.classList.contains("out")) {
                return;
            }

            candle.classList.add("out");

            candlesOut++;

            if (candlesOut === candles.length) {

                candleMessage.textContent =
                    "WISH LOCKED IN. 🎂✨";

                createConfetti(90);

                cakeNextButton.classList.remove("hidden");

            } else {

                candleMessage.textContent =
                    "That's " +
                    candlesOut +
                    " candle down... 👀";
            }

        });

    });


    cakeNextButton.addEventListener("click", function () {

        showSection(
            document.getElementById("balloon-section")
        );
    });


    /* =========================================
       BALLOONS
    ========================================== */

    const balloons =
        document.querySelectorAll(".pop-balloon");

    const balloonMessage =
        document.getElementById("balloon-message");

    const balloonNextButton =
        document.getElementById("balloon-next-btn");

    let balloonsPopped = 0;

    const balloonMessages = [
        "CUTUUUUU 🎀",
        "Hey! Don't miss me! 😂",
        "Someone is having fun. 👀",
        "POP POP POP!",
        "You're doing great, birthday girl. ❤️",
        "Okay... you're getting dangerous.",
        "Almost there...",
        "BURST THEM ALL CUTUUUU! 🎈"
    ];

    balloons.forEach(function (balloon, index) {

        balloon.addEventListener("click", function () {

            if (balloon.classList.contains("popped")) {
                return;
            }

            balloon.classList.add("popped");

            balloonsPopped++;

            createConfetti(10);

            balloonMessage.textContent =
                balloonMessages[index];

            if (balloonsPopped === balloons.length) {

                balloonMessage.textContent =
                    "YOU POPPED EVERYTHING! 😭🎈";

                createConfetti(80);

                balloonNextButton.classList.remove(
                    "hidden"
                );
            }

        });

    });


    balloonNextButton.addEventListener("click", function () {

        showSection(
            document.getElementById("popper-section")
        );
    });


    /* =========================================
       PARTY POPPERS
    ========================================== */

    const poppers =
        document.querySelectorAll(".popper");

    const popperMessage =
        document.getElementById("popper-message");

    const popperNextButton =
        document.getElementById("popper-next-btn");

    let poppersUsed = 0;

    poppers.forEach(function (popper) {

        popper.addEventListener("click", function () {

            if (popper.classList.contains("used")) {
                return;
            }

            popper.classList.add("used");

            poppersUsed++;

            createConfetti(100);

            popperMessage.textContent =
                "BOOOOOM! 🎊😂";

            if (poppersUsed === poppers.length) {

                popperMessage.textContent =
                    "Okay... we've officially made a mess. 😭";

                popperNextButton.classList.remove(
                    "hidden"
                );
            }

        });

    });


    popperNextButton.addEventListener("click", function () {

        showSection(
            document.getElementById("camera-section")
        );
    });


    /* =========================================
       CAMERA
    ========================================== */

    const cameraButton =
        document.getElementById("camera-btn");

    const cameraMessage =
        document.getElementById("camera-message");

    const polaroid =
        document.getElementById("polaroid");

    const cameraNextButton =
        document.getElementById("camera-next-btn");

    cameraButton.addEventListener("click", function () {

        cameraMessage.textContent =
            "📸 SAY CHEESEEEEE!";

        document.body.classList.add("camera-flash");

        setTimeout(function () {

            document.body.classList.remove(
                "camera-flash"
            );

        }, 250);

        polaroid.classList.add("show");

        createConfetti(35);

        cameraNextButton.classList.remove(
            "hidden"
        );
    });


    cameraNextButton.addEventListener("click", function () {

        showSection(
            document.getElementById("notes-section")
        );
    });


    /* =========================================
       MYSTERY NOTES
    ========================================== */

    const notes =
        document.querySelectorAll(".mystery-note");

    const noteReveal =
        document.getElementById("note-reveal");

    const notesNextButton =
        document.getElementById("notes-next-btn");

    let notesOpened = 0;

    const messages = {

        1:
            "You are more loved than you probably realize. ❤️",

        2:
            "Someone thinks your smile is ridiculously cute. 🥹",

        3:
            "Someone is VERY lucky to have you around. 🤍",

        4:
            "There is a certain boy who is completely gone for you. 😌",

        5:
            "Okay... enough clues. The real trouble starts next. 👀"

    };


    notes.forEach(function (note) {

        note.addEventListener("click", function () {

            if (note.classList.contains("opened")) {
                return;
            }

            note.classList.add("opened");

            notesOpened++;

            const number =
                note.getAttribute("data-note");

            noteReveal.textContent =
                messages[number];

            createConfetti(15);

            if (notesOpened === notes.length) {

                noteReveal.textContent =
                    "Every note opened. 💌 Now... one last thing.";

                notesNextButton.classList.remove(
                    "hidden"
                );
            }

        });

    });


    notesNextButton.addEventListener("click", function () {

        showSection(
            document.getElementById("wine-section")
        );

    });


    /* =========================================
       WINE
    ========================================== */

    const wineBottle =
        document.getElementById("wine-bottle");

    const wineLiquid =
        document.querySelector(".wine-liquid");

    const wineMessage =
        document.getElementById("wine-message");

    const progressBar =
        document.getElementById("wine-progress-bar");

    let wineClicks = 0;

    const wineMessages = [

        "Hmm... that's one. 👀",

        "Okay... that's two. 😌",

        "Tisha... are you sure about this? 😂",

        "The room feels a little strange...",

        "Oh no... I think we've made a mistake. 😭"

    ];


    wineBottle.addEventListener("click", function () {

        if (wineClicks >= 5) {
            return;
        }

        wineClicks++;

        const remaining =
            100 - (wineClicks * 20);

        wineLiquid.style.height =
            remaining + "%";

        progressBar.style.width =
            remaining + "%";

        wineMessage.textContent =
            wineMessages[wineClicks - 1];

        wineBottle.style.transform =
            "rotate(" +
            (wineClicks % 2 === 0 ? 5 : -5) +
            "deg)";

        setTimeout(function () {

            wineBottle.style.transform =
                "rotate(0deg)";

        }, 250);

        if (wineClicks >= 3) {

            document
                .getElementById("wine-section")
                .classList.add("dizzy");

            document.body.classList.add("dizzy");
        }

        if (wineClicks === 5) {

            wineMessage.textContent =
                "OH NOOOOO... 🍷😭";

            createConfetti(100);

            setTimeout(function () {

                goToPage3();

            }, 1800);
        }

    });


    /* =========================================
       PAGE 3 TRANSITION
    ========================================== */

    function goToPage3() {

        document.body.classList.remove("dizzy");

        document.body.classList.add(
            "page-transition"
        );

        music.volume = 0.12;

        setTimeout(function () {

            window.location.href =
                "part3.html";

        }, 1500);
    }

});

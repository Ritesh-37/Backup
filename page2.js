document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       SETTINGS
    ========================================== */

    const PHOTO_FILE = "tisha-photo.jpg";


    /* =========================================
       HELPERS
    ========================================== */

    function get(id) {
        return document.getElementById(id);
    }

    function showSection(sectionId) {

        const sections =
            document.querySelectorAll(".party-section");

        sections.forEach(function (section) {
            section.classList.remove("active");
        });

        const target = get(sectionId);

        if (target) {

            setTimeout(function () {
                target.classList.add("active");
            }, 150);
        }
    }

    function updateProgress(number) {

        get("progress-text").textContent =
            "Birthday Party • " + number + " / 8";
    }


    /* =========================================
       AUDIO
    ========================================== */

    const music = get("party-music");
    const musicButton = get("music-button");

    const balloonSound = get("balloon-sound");
    const popperSound = get("popper-sound");
    const cameraSound = get("camera-sound");

    function playSound(sound) {

        if (!sound) {
            return;
        }

        sound.currentTime = 0;

        sound.play().catch(function () {
            // Browser may block audio before user interaction.
        });
    }

    function startMusic() {

        if (!music) {
            return;
        }

        music.volume = 0.3;

        music.play().then(function () {

            musicButton.textContent = "♫";

        }).catch(function () {

            musicButton.textContent = "🔇";

        });
    }

    musicButton.addEventListener("click", function () {

        if (!music) {
            return;
        }

        if (music.paused) {

            music.play();

            musicButton.textContent = "♫";

        } else {

            music.pause();

            musicButton.textContent = "🔇";
        }

    });


    /* =========================================
       START
    ========================================== */

    get("start-party").addEventListener("click", function () {

        startMusic();

        updateProgress(2);

        showSection("cake-section");

    });


    /* =========================================
       CAKE
    ========================================== */

    const cakeAction = get("cake-action");
    const cakeMessage = get("cake-message");
    const cakeComplete = get("cake-complete");
    const cakeInstruction = get("cake-instruction");

    const cake =
        document.querySelector(".cake");

    let cakeCut = false;

    cakeAction.addEventListener("click", function () {

        if (cakeCut) {
            return;
        }

        cakeCut = true;

        cake.classList.add("cut");

        cakeInstruction.textContent =
            "Cake successfully cut! 🎂❤️";

        cakeAction.style.display =
            "none";

        createConfetti(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

        setTimeout(function () {

            cakeMessage.classList.add("show");

        }, 700);

    });


    get("blow-candles").addEventListener("click", function () {

        cake.classList.add("candles-out");

        cakeMessage.classList.remove("show");

        createConfetti(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

        setTimeout(function () {

            cakeComplete.classList.add("show");

        }, 700);

    });


    get("cake-next").addEventListener("click", function () {

        cakeComplete.classList.remove("show");

        updateProgress(3);

        showSection("balloon-section");

    });


    /* =========================================
       BALLOONS
    ========================================== */

    const balloons =
        document.querySelectorAll(".balloon");

    const balloonMessage =
        get("balloon-message");

    const balloonMessageText =
        get("balloon-message-text");

    const balloonComplete =
        get("balloon-complete");

    let balloonsPopped = 0;

    balloons.forEach(function (balloon) {

        balloon.addEventListener("click", function () {

            if (
                balloon.classList.contains("popped")
            ) {
                return;
            }

            const message =
                balloon.getAttribute("data-message");

            balloon.classList.add("popped");

            balloonsPopped++;

            playSound(balloonSound);

            balloonMessageText.textContent =
                message;

            balloonMessage.classList.add("show");

            const rect =
                balloon.getBoundingClientRect();

            createConfetti(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );

            if (
                balloonsPopped ===
                balloons.length
            ) {

                setTimeout(function () {

                    balloonComplete.classList.add("show");

                }, 700);

            }

        });

    });


    get("close-balloon-message")
        .addEventListener("click", function () {

            balloonMessage.classList.remove("show");

        });


    get("balloon-next")
        .addEventListener("click", function () {

            balloonComplete.classList.remove("show");

            updateProgress(4);

            showSection("popper-section");

        });


    /* =========================================
       PARTY POPPERS
    ========================================== */

    const poppers =
        document.querySelectorAll(".popper");

    const popperMessage =
        get("popper-message");

    const popperMessageText =
        get("popper-message-text");

    const popperComplete =
        get("popper-complete");

    let poppersUsed = 0;

    poppers.forEach(function (popper) {

        popper.addEventListener("click", function () {

            if (
                popper.classList.contains("exploded")
            ) {
                return;
            }

            const message =
                popper.getAttribute("data-message");

            popper.classList.add("exploded");

            poppersUsed++;

            playSound(popperSound);

            popperMessageText.textContent =
                message;

            popperMessage.classList.add("show");

            const rect =
                popper.getBoundingClientRect();

            createConfetti(
                rect.left + rect.width / 2,
                rect.top + rect.height / 2
            );

            if (
                poppersUsed ===
                poppers.length
            ) {

                setTimeout(function () {

                    popperComplete.classList.add("show");

                }, 700);

            }

        });

    });


    get("close-popper-message")
        .addEventListener("click", function () {

            popperMessage.classList.remove("show");

        });


    get("popper-next")
        .addEventListener("click", function () {

            popperComplete.classList.remove("show");

            updateProgress(5);

            showSection("camera-section");

        });


    /* =========================================
       CAMERA
    ========================================== */

    const camera =
        get("camera");

    const cameraCountdown =
        get("camera-countdown");

    const cameraFlash =
        document.querySelector(".camera-flash");

    const photoReveal =
        get("photo-reveal");

    const tishaPhoto =
        get("tisha-photo");

    let cameraUsed = false;

    tishaPhoto.src =
        PHOTO_FILE;


    camera.addEventListener("click", function () {

        if (cameraUsed) {
            return;
        }

        cameraUsed = true;

        let count = 3;

        cameraCountdown.textContent =
            count;

        cameraCountdown.classList.add("show");

        const countdownTimer =
            setInterval(function () {

                count--;

                if (count > 0) {

                    cameraCountdown.textContent =
                        count;

                    cameraCountdown.classList.remove("show");

                    void cameraCountdown.offsetWidth;

                    cameraCountdown.classList.add("show");

                } else {

                    clearInterval(countdownTimer);

                    cameraCountdown.classList.remove("show");

                    playSound(cameraSound);

                    cameraFlash.classList.add("flash");

                    setTimeout(function () {

                        photoReveal.classList.add("show");

                    }, 450);

                }

            }, 800);

    });


    get("photo-next")
        .addEventListener("click", function () {

            photoReveal.classList.remove("show");

            updateProgress(6);

            showSection("notes-section");

        });


    /* =========================================
       SECRET NOTES
    ========================================== */

    const notes =
        document.querySelectorAll(".note");

    const noteMessage =
        get("note-message");

    const noteMessageText =
        get("note-message-text");

    const notesComplete =
        get("notes-complete");

    let notesOpened = 0;

    notes.forEach(function (note) {

        note.addEventListener("click", function () {

            if (
                note.classList.contains("opened")
            ) {
                return;
            }

            const message =
                note.getAttribute("data-message");

            note.classList.add("opened");

            notesOpened++;

            noteMessageText.textContent =
                message;

            noteMessage.classList.add("show");

            if (
                notesOpened ===
                notes.length
            ) {

                setTimeout(function () {

                    notesComplete.classList.add("show");

                }, 700);

            }

        });

    });


    get("close-note-message")
        .addEventListener("click", function () {

            noteMessage.classList.remove("show");

        });


    get("notes-next")
        .addEventListener("click", function () {

            notesComplete.classList.remove("show");

            updateProgress(7);

            showSection("rose-section");

        });


    /* =========================================
       ROSE BOUQUET
    ========================================== */

    const roseBouquet =
        get("rose-bouquet");

    const roseMessage =
        get("rose-message");

    let roseClicked = false;

    roseBouquet.addEventListener("click", function () {

        if (roseClicked) {
            return;
        }

        roseClicked = true;

        roseBouquet.classList.add("center");

        createRosePetals();

        createConfetti(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

        setTimeout(function () {

            roseMessage.classList.add("show");

        }, 1000);

    });


    get("rose-next")
        .addEventListener("click", function () {

            roseMessage.classList.remove("show");

            updateProgress(8);

            showSection("wine-section");

        });


    /* =========================================
       WINE
    ========================================== */

    const wineBottle =
        get("wine-bottle");

    const wineLevel =
        get("wine-level");

    const wineMessage =
        get("wine-message");

    const wineInstruction =
        get("wine-instruction");

    const wineFinal =
        get("wine-final");

    const wineMeterFill =
        get("wine-meter-fill");

    let wineClicks = 0;

    const wineMessages = [

        "Just one little sip. 🍷❤️",

        "Okay... maybe another one. 😂🍷",

        "You're getting carried away now. 😭😂🍷",

        "Nimbuuu! Put the bottle down. RIGHT NOW. 😂🍋",

        "TOO LATE. 😭🍷❤️"

    ];


    wineBottle.addEventListener("click", function () {

        if (wineClicks >= 5) {
            return;
        }

        wineClicks++;

        const remaining =
            85 - (wineClicks * 17);

        wineLevel.style.height =
            Math.max(0, remaining) + "%";

        wineMeterFill.style.width =
            Math.max(0, remaining) + "%";

        wineMessage.textContent =
            wineMessages[wineClicks - 1];

        wineBottle.classList.remove("shake");

        void wineBottle.offsetWidth;

        wineBottle.classList.add("shake");


        if (wineClicks >= 3) {

            document.body.classList.add(
                "slightly-dizzy"
            );

        }


        if (wineClicks >= 4) {

            document.body.classList.add(
                "very-dizzy"
            );

        }


        if (wineClicks === 5) {

            wineInstruction.textContent =
                "Okay sweetheart... I think that's enough. 😂❤️";

            setTimeout(function () {

                wineFinal.classList.add("show");

                startFinalTransition();

            }, 900);

        }

    });


    /* =========================================
       FINAL TRANSITION
    ========================================== */

    function startFinalTransition() {

        let count = 3;

        const finalCount =
            get("final-count");

        finalCount.textContent =
            count;

        const timer =
            setInterval(function () {

                count--;

                if (count > 0) {

                    finalCount.textContent =
                        count;

                } else {

                    clearInterval(timer);

                    document.body.classList.add(
                        "dizzy"
                    );

                    setTimeout(function () {

                        window.location.href =
                            "page3.html";

                    }, 2600);

                }

            }, 1000);

    }


    /* =========================================
       CONFETTI
    ========================================== */

    function createConfetti(x, y) {

        for (let i = 0; i < 20; i++) {

            const piece =
                document.createElement("span");

            piece.textContent =
                [
                    "✦",
                    "♥",
                    "•",
                    "✧",
                    "🎀"
                ][
                    Math.floor(
                        Math.random() * 5
                    )
                ];

            piece.style.position =
                "fixed";

            piece.style.left =
                x + "px";

            piece.style.top =
                y + "px";

            piece.style.zIndex =
                "250";

            piece.style.pointerEvents =
                "none";

            piece.style.fontSize =
                (10 + Math.random() * 14) +
                "px";

            const angle =
                Math.random() *
                Math.PI *
                2;

            const distance =
                50 +
                Math.random() *
                120;

            const targetX =
                Math.cos(angle) *
                distance;

            const targetY =
                Math.sin(angle) *
                distance;

            piece.animate(

                [
                    {
                        transform:
                            "translate(0, 0) scale(1)",

                        opacity: 1
                    },

                    {
                        transform:
                            "translate(" +
                            targetX +
                            "px, " +
                            targetY +
                            "px) scale(0.2)",

                        opacity: 0
                    }
                ],

                {
                    duration:
                        800 +
                        Math.random() *
                        400,

                    easing:
                        "cubic-bezier(.2,.8,.2,1)"
                }

            );

            document.body.appendChild(piece);

            setTimeout(function () {

                piece.remove();

            }, 1400);

        }

    }


    /* =========================================
       ROSE PETALS
    ========================================== */

    function createRosePetals() {

        for (let i = 0; i < 24; i++) {

            const petal =
                document.createElement("div");

            petal.textContent =
                "🌹";

            petal.style.position =
                "fixed";

            petal.style.left =
                Math.random() * 100 + "%";

            petal.style.top =
                "-30px";

            petal.style.fontSize =
                (14 + Math.random() * 18) +
                "px";

            petal.style.zIndex =
                "90";

            petal.style.pointerEvents =
                "none";

            petal.animate(

                [
                    {
                        transform:
                            "translateY(0) rotate(0deg)",

                        opacity: 0
                    },

                    {
                        opacity: 1
                    },

                    {
                        transform:
                            "translateY(110vh) rotate(360deg)",

                        opacity: 0
                    }
                ],

                {
                    duration:
                        3000 +
                        Math.random() *
                        3000,

                    easing:
                        "linear"
                }

            );

            document.body.appendChild(petal);

            setTimeout(function () {

                petal.remove();

            }, 6500);

        }

    }

});

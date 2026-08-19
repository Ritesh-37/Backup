```javascript
/* =====================================================
   PAGE 2 — BIRTHDAY PARTY
   INTERACTIONS / SOUNDS / TRANSITIONS
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       HELPER
    ================================================= */

    function get(id) {
        return document.getElementById(id);
    }


    /* =================================================
       SECTION NAVIGATION
    ================================================= */

    function showSection(sectionId) {

        const sections =
            document.querySelectorAll(".party-section");

        sections.forEach(function (section) {
            section.classList.remove("active");
        });

        setTimeout(function () {

            const target = get(sectionId);

            if (target) {
                target.classList.add("active");
            }

        }, 100);
    }


    function updateProgress(number, emoji) {

        get("progress-text").textContent =
            emoji +
            " Birthday Party • " +
            number +
            " / 7";
    }


    /* =================================================
       AUDIO
    ================================================= */

    const music = get("party-music");
    const musicButton = get("music-button");

    const balloonSound = get("balloon-sound");
    const popperSound = get("popper-sound");
    const candleSound = get("candle-sound");
    const cameraSound = get("camera-sound");


    function playSound(audio) {

        if (!audio) {
            return;
        }

        audio.currentTime = 0;

        audio.play().catch(function () {});
    }


    function startMusic() {

        if (!music) {
            return;
        }

        music.volume = 0.3;

        music.play().catch(function () {

            musicButton.textContent = "🔇";

        });
    }


    musicButton.addEventListener("click", function () {

        if (music.paused) {

            music.play();

            musicButton.textContent = "♫";

        } else {

            music.pause();

            musicButton.textContent = "🔇";

        }

    });


    /* =================================================
       BALLOONS
    ================================================= */

    const balloons =
        document.querySelectorAll(".balloon");

    const balloonMessage =
        get("balloon-message");

    const balloonMessageText =
        get("balloon-message-text");

    const closeBalloon =
        get("close-balloon");

    const balloonNext =
        get("balloon-next");

    let poppedBalloons = 0;


    balloons.forEach(function (balloon) {

        balloon.addEventListener("click", function () {

            if (balloon.classList.contains("popped")) {
                return;
            }

            balloon.classList.add("popped");

            poppedBalloons++;

            playSound(balloonSound);

            balloonMessageText.textContent =
                balloon.dataset.message;

            balloonMessage.classList.add("show");

            createBurst(
                balloon.getBoundingClientRect().left +
                balloon.offsetWidth / 2,

                balloon.getBoundingClientRect().top +
                balloon.offsetHeight / 2
            );


            if (poppedBalloons === balloons.length) {

                setTimeout(function () {

                    balloonNext.classList.remove("hidden");

                }, 500);

            }

        });

    });


    closeBalloon.addEventListener("click", function () {

        balloonMessage.classList.remove("show");

    });


    balloonNext.addEventListener("click", function () {

        updateProgress(2, "🎉");

        showSection("popper-section");

    });


    /* =================================================
       PARTY POPPERS
    ================================================= */

    const poppers =
        document.querySelectorAll(".popper");

    const popperMessage =
        get("popper-message");

    const popperMessageText =
        get("popper-message-text");

    const closePopper =
        get("close-popper");

    const popperNext =
        get("popper-next");

    let explodedPoppers = 0;


    poppers.forEach(function (popper) {

        popper.addEventListener("click", function () {

            if (popper.classList.contains("exploded")) {
                return;
            }

            popper.classList.add("exploded");

            explodedPoppers++;

            playSound(popperSound);

            popperMessageText.textContent =
                popper.dataset.message;

            popperMessage.classList.add("show");

            createConfettiBurst(
                popper.getBoundingClientRect().left +
                popper.offsetWidth / 2,

                popper.getBoundingClientRect().top +
                popper.offsetHeight / 2
            );


            if (explodedPoppers === poppers.length) {

                setTimeout(function () {

                    popperNext.classList.remove("hidden");

                }, 600);

            }

        });

    });


    closePopper.addEventListener("click", function () {

        popperMessage.classList.remove("show");

    });


    popperNext.addEventListener("click", function () {

        updateProgress(3, "🎂");

        showSection("cake-section");

    });


    /* =================================================
       CAKE & CANDLES
    ================================================= */

    const candles =
        document.querySelectorAll(".candle");

    const cakeButton =
        get("cake-button");

    const cakeInstruction =
        get("cake-instruction");

    const cakeMessage =
        get("cake-message");

    const cakeNext =
        get("cake-next");

    let candlesBlown = 0;


    candles.forEach(function (candle) {

        candle.addEventListener("click", function (event) {

            event.stopPropagation();

            if (candle.classList.contains("blown")) {
                return;
            }

            candle.classList.add("blown");

            candlesBlown++;

            playSound(candleSound);


            if (candlesBlown === candles.length) {

                cakeInstruction.textContent =
                    "All the candles are out! Now click the cake. 🎂❤️";

                cakeButton.disabled = false;

            }

        });

    });


    cakeButton.addEventListener("click", function () {

        if (cakeButton.disabled) {
            return;
        }

        cakeMessage.classList.add("show");

    });


    cakeNext.addEventListener("click", function () {

        cakeMessage.classList.remove("show");

        updateProgress(4, "📸");

        showSection("camera-section");

    });


    /* =================================================
       CAMERA
    ================================================= */

    const camera =
        get("camera");

    const cameraCountdown =
        get("camera-countdown");

    const cameraFlash =
        document.querySelector(".camera-flash");

    const photoReveal =
        get("photo-reveal");

    const photoNext =
        get("photo-next");

    let cameraUsed = false;


    camera.addEventListener("click", function () {

        if (cameraUsed) {
            return;
        }

        cameraUsed = true;

        let count = 3;

        cameraCountdown.textContent = count;

        cameraCountdown.classList.add("show");


        const timer = setInterval(function () {

            count--;

            if (count > 0) {

                cameraCountdown.classList.remove("show");

                void cameraCountdown.offsetWidth;

                cameraCountdown.textContent = count;

                cameraCountdown.classList.add("show");

            } else {

                clearInterval(timer);

                cameraCountdown.classList.remove("show");

                playSound(cameraSound);

                cameraFlash.classList.add("flash");


                setTimeout(function () {

                    photoReveal.classList.add("show");

                }, 500);

            }

        }, 800);

    });


    photoNext.addEventListener("click", function () {

        photoReveal.classList.remove("show");

        updateProgress(5, "💌");

        showSection("notes-section");

    });


    /* =================================================
       SECRET NOTES
    ================================================= */

    const notes =
        document.querySelectorAll(".note");

    const noteMessage =
        get("note-message");

    const noteMessageText =
        get("note-message-text");

    const closeNote =
        get("close-note");

    const notesNext =
        get("notes-next");

    let openedNotes = 0;


    notes.forEach(function (note) {

        note.addEventListener("click", function () {

            if (note.classList.contains("opened")) {
                return;
            }

            note.classList.add("opened");

            openedNotes++;

            noteMessageText.textContent =
                note.dataset.message;

            noteMessage.classList.add("show");


            if (openedNotes === notes.length) {

                setTimeout(function () {

                    notesNext.classList.remove("hidden");

                }, 500);

            }

        });

    });


    closeNote.addEventListener("click", function () {

        noteMessage.classList.remove("show");

    });


    notesNext.addEventListener("click", function () {

        updateProgress(6, "🌹");

        showSection("rose-section");

    });


    /* =================================================
       ROSE BOUQUET
    ================================================= */

    const bouquet =
        document.querySelector(".bouquet");

    const bouquetTrigger =
        get("bouquet-trigger");

    const roseMessage =
        get("rose-message");

    const roseNext =
        get("rose-next");

    let bouquetShown = false;


    bouquetTrigger.addEventListener("click", function () {

        if (bouquetShown) {
            return;
        }

        bouquetShown = true;

        bouquet.classList.add("triggered");

        bouquetTrigger.textContent =
            "A LITTLE GIFT FOR YOU 🌹";

        createRosePetals();


        setTimeout(function () {

            roseMessage.classList.add("show");

        }, 900);

    });


    roseNext.addEventListener("click", function () {

        roseMessage.classList.remove("show");

        updateProgress(7, "🍷");

        showSection("wine-section");

    });


    /* =================================================
       WINE FINALE
    ================================================= */

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

    const finalCount =
        get("final-count");


    let wineClicks = 0;


    const wineMessages = [

        "Just one little sip. 🍷❤️",

        "Okay… maybe another one. 😂",

        "You're getting carried away now. 😭😂",

        "Nimbu! Put the bottle down. RIGHT NOW. 😂",

        "TOO LATE. 😭🍷"

    ];


    wineBottle.addEventListener("click", function () {

        if (wineClicks >= 5) {
            return;
        }

        wineClicks++;


        /* Bottle tilt */

        wineBottle.style.transform =
            "rotate(" +
            (wineClicks % 2 === 0 ? -6 : 6) +
            "deg)";


        setTimeout(function () {

            wineBottle.style.transform =
                "rotate(0deg)";

        }, 400);


        /* Wine level */

        const remaining =
            84 - (wineClicks * 16.8);

        wineLevel.style.height =
            Math.max(0, remaining) + "%";


        wineMessage.textContent =
            wineMessages[wineClicks - 1];


        /* Progressive dizziness */

        if (wineClicks === 2) {

            document.body.style.transform =
                "rotate(1deg)";

        }

        if (wineClicks === 3) {

            document.body.style.transform =
                "rotate(-2deg) scale(1.02)";

        }

        if (wineClicks === 4) {

            document.body.style.transform =
                "rotate(3deg) scale(1.04)";

        }


        if (wineClicks === 5) {

            document.body.style.transform =
                "rotate(-4deg) scale(1.06)";

            wineInstruction.textContent =
                "Okay sweetheart… I think that's enough. 😂❤️";


            setTimeout(function () {

                wineFinal.classList.add("show");

                startFinalTransition();

            }, 1000);

        }

    });


    /* =================================================
       FINAL TRANSITION
    ================================================= */

    function startFinalTransition() {

        let count = 3;

        finalCount.textContent = count;


        const timer = setInterval(function () {

            count--;

            if (count > 0) {

                finalCount.textContent = count;

            } else {

                clearInterval(timer);

                document.body.classList.add("dizzy");


                setTimeout(function () {

                    window.location.href =
                        "page3.html";

                }, 2600);

            }

        }, 1000);

    }


    /* =================================================
       CONFETTI BURST
    ================================================= */

    function createBurst(x, y) {

        const symbols = [
            "✦",
            "♥",
            "•",
            "✧"
        ];


        for (let i = 0; i < 18; i++) {

            const piece =
                document.createElement("span");

            piece.textContent =
                symbols[
                    Math.floor(
                        Math.random() *
                        symbols.length
                    )
                ];


            piece.style.position = "fixed";

            piece.style.left = x + "px";

            piece.style.top = y + "px";

            piece.style.zIndex = "500";

            piece.style.pointerEvents = "none";

            piece.style.fontSize =
                (10 + Math.random() * 15) +
                "px";


            const angle =
                Math.random() *
                Math.PI *
                2;

            const distance =
                60 +
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
                            "translate(0,0) scale(1)",

                        opacity: 1
                    },

                    {
                        transform:
                            "translate(" +
                            targetX +
                            "px," +
                            targetY +
                            "px) scale(0.2)",

                        opacity: 0
                    }
                ],

                {
                    duration:
                        700 +
                        Math.random() * 400,

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


    /* =================================================
       PARTY POPPER CONFETTI
    ================================================= */

    function createConfettiBurst(x, y) {

        const colors = [
            "✦",
            "♥",
            "●",
            "◆",
            "✧"
        ];


        for (let i = 0; i < 35; i++) {

            const piece =
                document.createElement("span");

            piece.textContent =
                colors[
                    Math.floor(
                        Math.random() *
                        colors.length
                    )
                ];


            piece.style.position = "fixed";

            piece.style.left = x + "px";

            piece.style.top = y + "px";

            piece.style.zIndex = "500";

            piece.style.pointerEvents = "none";

            piece.style.fontSize =
                (10 + Math.random() * 18) +
                "px";


            const angle =
                Math.random() *
                Math.PI *
                2;

            const distance =
                80 +
                Math.random() *
                220;


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
                            "translate(0,0) rotate(0deg)",

                        opacity: 1
                    },

                    {
                        transform:
                            "translate(" +
                            targetX +
                            "px," +
                            targetY +
                            "px) rotate(360deg)",

                        opacity: 0
                    }
                ],

                {
                    duration:
                        1000 +
                        Math.random() * 700,

                    easing:
                        "cubic-bezier(.2,.8,.2,1)"
                }

            );


            document.body.appendChild(piece);


            setTimeout(function () {

                piece.remove();

            }, 2000);

        }

    }


    /* =================================================
       ROSE PETALS
    ================================================= */

    function createRosePetals() {

        for (let i = 0; i < 20; i++) {

            const petal =
                document.createElement("div");

            petal.textContent = "🌹";

            petal.style.position = "fixed";

            petal.style.left =
                Math.random() * 100 + "%";

            petal.style.top = "-40px";

            petal.style.fontSize =
                (14 + Math.random() * 18) +
                "px";

            petal.style.zIndex = "180";

            petal.style.pointerEvents = "none";


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
                        Math.random() * 2500,

                    easing: "linear"
                }

            );


            document.body.appendChild(petal);


            setTimeout(function () {

                petal.remove();

            }, 6000);

        }

    }


    /* =================================================
       START MUSIC AFTER FIRST INTERACTION
    ================================================= */

    document.addEventListener(
        "click",
        function startPartyMusicOnce() {

            startMusic();

            document.removeEventListener(
                "click",
                startPartyMusicOnce
            );

        }
    );

});
```

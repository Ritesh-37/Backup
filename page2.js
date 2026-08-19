document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       HELPER FUNCTIONS
    ===================================================== */

    function get(id) {
        return document.getElementById(id);
    }


    function showSection(id) {

        document.querySelectorAll(".party-section").forEach(function (section) {
            section.classList.remove("active");
        });

        const target = get(id);

        if (target) {

            setTimeout(function () {
                target.classList.add("active");
            }, 100);
        }
    }


    function updateProgress(number) {

        get("progress-text").textContent =
            "Birthday Party • " + number + " / 5";
    }


    function playSound(audio, volume) {

        if (!audio) {
            return;
        }

        try {

            audio.pause();

            audio.currentTime = 0;

            audio.volume = volume || 0.6;

            const promise = audio.play();

            if (promise) {
                promise.catch(function () {
                    // Browser may block audio until user interaction.
                });
            }

        } catch (error) {
            console.log("Sound error:", error);
        }
    }


    /* =====================================================
       CONFETTI
    ===================================================== */

    function createConfetti(x, y, amount) {

        amount = amount || 18;

        const symbols = [
            "✦",
            "♥",
            "•",
            "✧",
            "🎀"
        ];

        for (let i = 0; i < amount; i++) {

            const piece =
                document.createElement("span");

            piece.textContent =
                symbols[
                    Math.floor(
                        Math.random() * symbols.length
                    )
                ];

            piece.style.position = "fixed";

            piece.style.left = x + "px";

            piece.style.top = y + "px";

            piece.style.zIndex = "1000";

            piece.style.pointerEvents = "none";

            piece.style.fontSize =
                (10 + Math.random() * 15) + "px";

            const angle =
                Math.random() * Math.PI * 2;

            const distance =
                50 + Math.random() * 150;

            const targetX =
                Math.cos(angle) * distance;

            const targetY =
                Math.sin(angle) * distance;

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
                            "px) scale(.2)",

                        opacity: 0
                    }
                ],

                {
                    duration:
                        700 + Math.random() * 500,

                    easing:
                        "cubic-bezier(.2,.8,.2,1)"
                }
            );

            document.body.appendChild(piece);

            setTimeout(function () {
                piece.remove();
            }, 1500);
        }
    }


    /* =====================================================
       1. FIVE SECOND WAIT
    ===================================================== */

    const welcome =
        get("welcome-section");

    setTimeout(function () {

        document.body.classList.remove(
            "birthday-waiting"
        );

        welcome.classList.add("active");

    }, 5000);


    /* =====================================================
       MUSIC
    ===================================================== */

    const music =
        get("birthday-music");

    const musicButton =
        get("music-button");


    function startBirthdayMusic() {

        if (!music) {
            return;
        }

        music.volume = 0.35;

        const promise =
            music.play();

        if (promise) {

            promise
                .then(function () {

                    musicButton.textContent = "♫";

                })
                .catch(function () {

                    musicButton.textContent = "🔇";

                });
        }
    }


    musicButton.addEventListener(
        "click",
        function () {

            if (!music) {
                return;
            }

            if (music.paused) {

                music.play()
                    .then(function () {

                        musicButton.textContent = "♫";

                    })
                    .catch(function () {});

            } else {

                music.pause();

                musicButton.textContent = "🔇";
            }
        }
    );


    /* =====================================================
       2. WELCOME -> CAKE
    ===================================================== */

    get("start-party")
        .addEventListener("click", function () {

            updateProgress(1);

            showSection("cake-section");

            /*
                This is deliberately called from a click.
                Therefore mobile browsers are much more likely
                to allow the birthday song to start immediately.
            */

            startBirthdayMusic();

        });


    /* =====================================================
       CAKE + CANDLES
    ===================================================== */

    const candles =
        document.querySelectorAll(".candle");

    const candleSound =
        get("candle-sound");

    const cake =
        get("birthday-cake");

    const cakeInstruction =
        get("cake-instruction");

    const cakeMessage =
        get("cake-message");

    let candlesOff = 0;

    let cakeClicked = false;


    candles.forEach(function (candle) {

        candle.addEventListener(
            "click",
            function () {

                if (
                    candle.classList.contains("off")
                ) {
                    return;
                }

                candle.classList.add("off");

                candlesOff++;

                playSound(
                    candleSound,
                    0.45
                );


                const rect =
                    candle.getBoundingClientRect();

                createConfetti(
                    rect.left +
                    rect.width / 2,

                    rect.top,

                    8
                );


                if (
                    candlesOff ===
                    candles.length
                ) {

                    cakeInstruction.textContent =
                        "All the candles are out. Now tap the cake, birthday girl. 🎂❤️";

                    cake.classList.add("ready");
                }

            }
        );
    });


    /* =====================================================
       CAKE CLICK
    ===================================================== */

    cake.addEventListener(
        "click",
        function () {

            if (cakeClicked) {
                return;
            }

            if (
                candlesOff !==
                candles.length
            ) {

                cakeInstruction.textContent =
                    "First put out all five candles, sweetheart. 🕯️❤️";

                return;
            }

            cakeClicked = true;

            cake.classList.add("eaten");

            cake.classList.remove("ready");

            cakeInstruction.textContent =
                "A little birthday sweetness, just for you. ❤️";


            const rect =
                cake.getBoundingClientRect();

            createConfetti(
                rect.left +
                rect.width / 2,

                rect.top +
                rect.height / 2,

                40
            );


            setTimeout(function () {

                cakeMessage.classList.add("show");

            }, 450);

        }
    );


    get("cake-next")
        .addEventListener("click", function () {

            cakeMessage.classList.remove("show");

            updateProgress(2);

            showSection("party-section");

        });


    /* =====================================================
       3. BALLOONS + PARTY POPPERS
    ===================================================== */

    const partyObjects =
        document.querySelectorAll(
            "#party-section .balloon, " +
            "#party-section .popper"
        );


    const partyMessage =
        get("party-message");

    const partyMessageText =
        get("party-message-text");

    const closePartyMessage =
        get("close-party-message");

    const partyComplete =
        get("party-complete");

    const balloonSound =
        get("balloon-pop-sound");

    const popperSound =
        get("popper-sound");


    let partyObjectsDone = 0;


    partyObjects.forEach(function (object) {

        object.addEventListener(
            "click",
            function () {

                const alreadyDone =
                    object.classList.contains("popped") ||
                    object.classList.contains("exploded");


                if (alreadyDone) {
                    return;
                }


                const isBalloon =
                    object.classList.contains("balloon");


                if (isBalloon) {

                    object.classList.add("popped");

                    playSound(
                        balloonSound,
                        0.65
                    );

                } else {

                    object.classList.add("exploded");

                    playSound(
                        popperSound,
                        0.65
                    );
                }


                partyObjectsDone++;


                partyMessageText.textContent =
                    object.getAttribute(
                        "data-message"
                    );


                partyMessage.classList.add("show");


                const rect =
                    object.getBoundingClientRect();


                createConfetti(
                    rect.left +
                    rect.width / 2,

                    rect.top +
                    rect.height / 2,

                    isBalloon ? 22 : 30
                );


                if (
                    partyObjectsDone ===
                    partyObjects.length
                ) {

                    setTimeout(function () {

                        partyComplete.classList.add(
                            "show"
                        );

                    }, 700);
                }

            }
        );

    });


    closePartyMessage.addEventListener(
        "click",
        function () {

            partyMessage.classList.remove("show");

        }
    );


    get("party-next")
        .addEventListener("click", function () {

            partyComplete.classList.remove("show");

            partyMessage.classList.remove("show");

            updateProgress(3);

            showSection("camera-section");

        });


    /* =====================================================
       4. CAMERA
    ===================================================== */

    const camera =
        get("camera");

    const cameraReveal =
        get("camera-reveal");

    let cameraUsed = false;


    camera.addEventListener(
        "click",
        function () {

            if (cameraUsed) {
                return;
            }

            cameraUsed = true;


            /*
                FLASH
            */

            const flash =
                document.createElement("div");

            flash.style.position = "fixed";

            flash.style.inset = "0";

            flash.style.background = "white";

            flash.style.zIndex = "10000";

            flash.style.pointerEvents = "none";

            document.body.appendChild(flash);


            flash.animate(
                [
                    {
                        opacity: 0
                    },

                    {
                        opacity: 1
                    },

                    {
                        opacity: 0
                    }
                ],
                {
                    duration: 500
                }
            );


            setTimeout(function () {
                flash.remove();
            }, 550);


            createConfetti(
                window.innerWidth / 2,
                window.innerHeight / 2,
                25
            );


            /*
                PHOTO APPEARS
            */

            setTimeout(function () {

                cameraReveal.classList.add(
                    "show"
                );

            }, 350);

        }
    );


    get("camera-next")
        .addEventListener("click", function () {

            cameraReveal.classList.remove("show");

            updateProgress(4);

            showSection("letter-section");

        });


    /* =====================================================
       5. BOUQUET
    ===================================================== */

    const roseBouquet =
        get("rose-bouquet");

    let bouquetClicked = false;


    roseBouquet.addEventListener(
        "click",
        function () {

            if (bouquetClicked) {
                return;
            }

            bouquetClicked = true;

            /*
                Bouquet moves to center.
            */

            roseBouquet.classList.add(
                "center"
            );


            createRosePetals();

        }
    );


    /* =====================================================
       ROSE PETALS
    ===================================================== */

    function createRosePetals() {

        for (let i = 0; i < 25; i++) {

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

            petal.style.zIndex = "400";

            petal.style.pointerEvents =
                "none";


            const horizontal =
                (Math.random() - .5) *
                200;


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
                            "translate(" +
                            horizontal +
                            "px,110vh) rotate(360deg)",

                        opacity: 0
                    }
                ],

                {
                    duration:
                        3000 +
                        Math.random() * 3000,

                    easing: "linear"
                }
            );


            document.body.appendChild(petal);


            setTimeout(function () {
                petal.remove();
            }, 7000);

        }
    }


    /* =====================================================
       ENVELOPE
    ===================================================== */

    const envelope =
        get("love-envelope");

    const letterMessage =
        get("letter-message");


    envelope.addEventListener(
        "click",
        function () {

            envelope.classList.add(
                "opened"
            );


            setTimeout(function () {

                letterMessage.classList.add(
                    "show"
                );

            }, 400);

        }
    );


    get("close-letter")
        .addEventListener("click", function () {

            letterMessage.classList.remove(
                "show"
            );

        });


    get("letter-next")
        .addEventListener("click", function () {

            letterMessage.classList.remove(
                "show"
            );

            updateProgress(5);

            showSection("wine-section");

        });


    /* =====================================================
       6. WINE
    ===================================================== */

    const wineBottle =
        get("wine-bottle");

    const wineLevel =
        get("wine-level");

    const wineMessage =
        get("wine-message");

    const wineInstruction =
        get("wine-instruction");


    let wineClicks = 0;

    let finalStarted = false;


    const wineMessages = [

        "Just one little sip. 🍷❤️",

        "Okay… maybe another one. 😂",

        "You're getting carried away now. 😭😂",

        "Nimbu! Put the bottle down. RIGHT NOW. 😂",

        "TOO LATE. 😭🍷"

    ];


    wineBottle.addEventListener(
        "click",
        function () {

            if (finalStarted) {
                return;
            }

            if (wineClicks >= 5) {
                return;
            }


            wineClicks++;


            /*
                Reduce wine level.
            */

            const remaining =
                85 -
                wineClicks * 17;


            wineLevel.style.height =
                Math.max(
                    0,
                    remaining
                ) + "%";


            wineMessage.textContent =
                wineMessages[
                    wineClicks - 1
                ];


            /*
                Little bottle movement.
            */

            wineBottle.animate(

                [
                    {
                        transform:
                            "rotate(0deg) scale(1)"
                    },

                    {
                        transform:
                            "rotate(-5deg) scale(1.04)"
                    },

                    {
                        transform:
                            "rotate(5deg) scale(1.04)"
                    },

                    {
                        transform:
                            "rotate(0deg) scale(1)"
                    }
                ],

                {
                    duration: 400,

                    easing: "ease-out"
                }
            );


            /*
                FINAL CLICK
            */

            if (wineClicks === 5) {

                finalStarted = true;

                wineInstruction.textContent =
                    "Okay sweetheart… that's enough. 😂❤️";


                setTimeout(
                    startFinalTransition,
                    700
                );

            }

        }
    );


    /* =====================================================
       FINAL TRANSITION
       NO COUNTDOWN
    ===================================================== */

    function startFinalTransition() {

        /*
            Immediately begin the cinematic ending.
        */

        document.body.classList.add(
            "final-transition"
        );


        /*
            Slowly fade the birthday song.
        */

        if (music) {

            music.volume = .18;

            setTimeout(function () {

                music.pause();

            }, 2200);

        }

    }


});

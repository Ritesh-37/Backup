document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       BASIC HELPERS
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
            }, 80);
        }
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
                promise.catch(function () {});
            }

        } catch (error) {
            console.log("Audio error:", error);
        }
    }


    /* =====================================================
       CONFETTI
    ===================================================== */

    function createConfetti(x, y, amount) {

        const symbols = [
            "✦",
            "✧",
            "♥",
            "🎀",
            "•",
            "✨"
        ];

        for (let i = 0; i < amount; i++) {

            const piece = document.createElement("span");

            piece.className = "party-confetti";

            piece.textContent =
                symbols[
                    Math.floor(
                        Math.random() * symbols.length
                    )
                ];

            piece.style.left = x + "px";
            piece.style.top = y + "px";

            piece.style.fontSize =
                (12 + Math.random() * 20) + "px";

            document.body.appendChild(piece);

            const angle =
                Math.random() * Math.PI * 2;

            const distance =
                80 + Math.random() * 300;

            const targetX =
                Math.cos(angle) * distance;

            const targetY =
                Math.sin(angle) * distance;

            piece.animate(
                [
                    {
                        transform: "translate(0,0) scale(1)",
                        opacity: 1
                    },
                    {
                        transform:
                            "translate(" +
                            targetX +
                            "px," +
                            targetY +
                            "px) rotate(" +
                            (Math.random() * 720) +
                            "deg) scale(.2)",
                        opacity: 0
                    }
                ],
                {
                    duration:
                        900 + Math.random() * 900,
                    easing:
                        "cubic-bezier(.2,.8,.2,1)"
                }
            );

            setTimeout(function () {
                piece.remove();
            }, 2200);
        }
    }


    function massiveCelebration() {

        for (let i = 0; i < 5; i++) {

            setTimeout(function () {

                createConfetti(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight,
                    25
                );

            }, i * 120);
        }
    }


    /* =====================================================
       WELCOME
    ===================================================== */

    const welcomeLines =
        document.querySelectorAll(".welcome-line");

    const welcomeSection =
        get("welcome-section");


    welcomeLines.forEach(function (line, index) {

        setTimeout(function () {

            line.classList.add("show");

        }, 1000 + index * 1300);

    });


    /*
        Welcome sequence lasts approximately 9 seconds.
        Then automatically move to cake.
    */

    setTimeout(function () {

        document.body.classList.remove(
            "birthday-waiting"
        );

        welcomeSection.classList.add("active");

    }, 5000);


    setTimeout(function () {

        showSection("cake-section");

    }, 9000);


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

        music.volume = 0.38;

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
       CAKE + CANDLES
    ===================================================== */

    const candles =
        document.querySelectorAll(".candle");

    const candleSound =
        get("candle-sound");

    const balloonSound =
        get("balloon-pop-sound");

    const popperSound =
        get("popper-sound");

    const cake =
        get("birthday-cake");

    const candleStatus =
        get("candle-status");

    const cakeInstruction =
        get("cake-instruction");

    let candlesOff = 0;
    let celebrationStarted = false;


    candles.forEach(function (candle, index) {

        candle.addEventListener("click", function () {

            if (celebrationStarted) {
                return;
            }

            if (candle.classList.contains("off")) {
                return;
            }

            /*
                Make final candle glow before interaction.
            */

            if (index === candles.length - 1) {
                candle.classList.add("final-candle");
            }


            candle.classList.add("off");

            candlesOff++;

            playSound(
                candleSound,
                0.5
            );


            const rect =
                candle.getBoundingClientRect();

            createConfetti(
                rect.left + rect.width / 2,
                rect.top,
                8
            );


            const remaining =
                candles.length - candlesOff;


            if (remaining === 4) {

                candleStatus.textContent =
                    "Four candles still glowing... ❤️";

            } else if (remaining === 3) {

                candleStatus.textContent =
                    "Three candles left... make a wish. ✨";

            } else if (remaining === 2) {

                candleStatus.textContent =
                    "Only two more, sweetheart... 🥹";

            } else if (remaining === 1) {

                candleStatus.textContent =
                    "JUST ONE MORE, BIRTHDAY GIRL. 👀❤️";

            } else {

                candleStatus.textContent =
                    "All the candles are out... 🎂❤️";

                cake.classList.add("ready");

                startFinalCandleCelebration();

            }

        });

    });


    /* =====================================================
       FINAL CANDLE CELEBRATION
    ===================================================== */

    function startFinalCandleCelebration() {

        if (celebrationStarted) {
            return;
        }

        celebrationStarted = true;

        cakeInstruction.textContent =
            "HAPPY BIRTHDAY, TISHA!!! 🎉❤️";


        /*
            Try to start music now.
            If Android blocks it, the music button remains available.
        */

        startBirthdayMusic();


        /*
            Screen shake.
        */

        document.body.classList.add(
            "screen-shake"
        );


        setTimeout(function () {

            document.body.classList.remove(
                "screen-shake"
            );

        }, 500);


        /*
            Burst every balloon.
        */

        const balloons =
            document.querySelectorAll(
                ".cake-balloon"
            );


        balloons.forEach(function (balloon, index) {

            setTimeout(function () {

                balloon.classList.add("burst");

                playSound(
                    balloonSound,
                    0.55
                );


                const rect =
                    balloon.getBoundingClientRect();

                createConfetti(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2,
                    22
                );

            }, index * 90);

        });


        /*
            Explode both party poppers.
        */

        const leftPopper =
            get("left-popper");

        const rightPopper =
            get("right-popper");


        setTimeout(function () {

            leftPopper.classList.add("explode");

            playSound(
                popperSound,
                0.7
            );

            createConfetti(
                100,
                window.innerHeight / 2,
                45
            );

        }, 150);


        setTimeout(function () {

            rightPopper.classList.add("explode");

            playSound(
                popperSound,
                0.7
            );

            createConfetti(
                window.innerWidth - 100,
                window.innerHeight / 2,
                45
            );

        }, 300);


        /*
            Huge confetti burst.
        */

        setTimeout(function () {

            massiveCelebration();

        }, 400);


        /*
            Birthday popup.
        */

        setTimeout(function () {

            get("birthday-celebration")
                .classList.add("show");

        }, 1100);

    }


    /* =====================================================
       CELEBRATION -> CAMERA
    ===================================================== */

    get("celebration-next")
        .addEventListener("click", function () {

            get("birthday-celebration")
                .classList.remove("show");

            showSection("camera-section");

        });


    /* =====================================================
       CAMERA
    ===================================================== */

    const camera =
        get("camera");

    const cameraCountdown =
        get("camera-countdown");

    const cameraReveal =
        get("camera-reveal");

    const cameraHint =
        get("camera-hint");

    const cameraSound =
        get("camera-sound");

    let cameraUsed = false;


    camera.addEventListener(
        "click",
        function () {

            if (cameraUsed) {
                return;
            }

            cameraUsed = true;

            cameraHint.textContent =
                "Get ready... 📸";


            cameraCountdown.classList.add(
                "show"
            );


            const numbers = [
                "3",
                "2",
                "1"
            ];


            numbers.forEach(function (number, index) {

                setTimeout(function () {

                    cameraCountdown.textContent =
                        number;

                    cameraCountdown.classList.remove(
                        "animate"
                    );

                    void cameraCountdown.offsetWidth;

                    cameraCountdown.classList.add(
                        "animate"
                    );

                }, index * 1000);

            });


            /*
                FLASH AFTER COUNTDOWN
            */

            setTimeout(function () {

                cameraCountdown.classList.remove(
                    "show"
                );


                const flash =
                    document.createElement("div");

                flash.style.position = "fixed";
                flash.style.inset = "0";
                flash.style.background = "white";
                flash.style.zIndex = "2000";
                flash.style.pointerEvents = "none";

                document.body.appendChild(flash);


                playSound(
                    cameraSound,
                    0.7
                );


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


                createConfetti(
                    window.innerWidth / 2,
                    window.innerHeight / 2,
                    30
                );


                setTimeout(function () {

                    flash.remove();

                    cameraReveal.classList.add(
                        "show"
                    );

                }, 550);


            }, 3200);

        }
    );


    /* =====================================================
       CAMERA -> BOUQUET
    ===================================================== */

    get("camera-next")
        .addEventListener("click", function () {

            cameraReveal.classList.remove(
                "show"
            );

            showSection("letter-section");

        });


    /* =====================================================
       BOUQUET
    ===================================================== */

    const roseBouquet =
        get("rose-bouquet");

    const bouquetMessage =
        get("bouquet-message");

    let bouquetClicked = false;


    roseBouquet.addEventListener(
        "click",
        function () {

            if (bouquetClicked) {
                return;
            }

            bouquetClicked = true;

            roseBouquet.classList.add(
                "center"
            );


            bouquetMessage.classList.add(
                "show"
            );


            createRosePetals();


            /*
                After the bouquet reveal,
                make the envelope slightly more noticeable.
            */

            setTimeout(function () {

                get("love-envelope")
                    .animate(
                        [
                            {
                                transform: "translateY(0)"
                            },
                            {
                                transform:
                                    "translateY(-10px)"
                            },
                            {
                                transform: "translateY(0)"
                            }
                        ],
                        {
                            duration: 900
                        }
                    );

            }, 900);

        }
    );


    /* =====================================================
       ROSE PETALS
    ===================================================== */

    function createRosePetals() {

        for (let i = 0; i < 28; i++) {

            const petal =
                document.createElement("div");

            petal.textContent = "🌹";

            petal.style.position = "fixed";
            petal.style.left =
                Math.random() * 100 + "%";
            petal.style.top = "-40px";
            petal.style.fontSize =
                (14 + Math.random() * 16) + "px";
            petal.style.zIndex = "850";
            petal.style.pointerEvents = "none";

            document.body.appendChild(petal);


            const horizontal =
                (Math.random() - 0.5) * 250;


            petal.animate(
                [
                    {
                        transform:
                            "translateY(0) rotate(0)",
                        opacity: 0
                    },
                    {
                        opacity: 1
                    },
                    {
                        transform:
                            "translate(" +
                            horizontal +
                            "px,110vh) rotate(540deg)",
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


            setTimeout(function () {
                petal.remove();
            }, 7000);

        }
    }


    /* =====================================================
       ENVELOPE + LETTER
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

            }, 450);

        }
    );


    get("close-letter")
        .addEventListener(
            "click",
            function () {

                letterMessage.classList.remove(
                    "show"
                );

            }
        );


    /* =====================================================
       LETTER -> WINE
    ===================================================== */

    get("letter-next")
        .addEventListener(
            "click",
            function () {

                letterMessage.classList.remove(
                    "show"
                );

                showSection("wine-section");

            }
        );


    /* =====================================================
       WINE
    ===================================================== */

    const wineBottle =
        get("wine-bottle");

    const wineLevel =
        get("wine-level");

    const wineMessage =
        get("wine-message");

    const wineInstruction =
        get("wine-instruction");

    const drunkPopup =
        get("drunk-popup");


    let wineClicks = 0;
    let finalWineClick = false;


    const wineMessages = [

        "Just one little sip... 🍷❤️",

        "Okay... maybe another one. 😂",

        "Why is the room spinning? 😭",

        "Tisha... are you okay? 😂🍷",

        "Yep. We're definitely drunk now. 🥴❤️"

    ];


    wineBottle.addEventListener(
        "click",
        function () {

            if (finalWineClick) {
                return;
            }

            if (wineClicks >= 5) {
                return;
            }


            wineClicks++;


            /*
                Wine decreases.
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
                Bottle wobble.
            */

            wineBottle.animate(
                [
                    {
                        transform:
                            "rotate(0deg) scale(1)"
                    },
                    {
                        transform:
                            "rotate(-6deg) scale(1.05)"
                    },
                    {
                        transform:
                            "rotate(6deg) scale(1.05)"
                    },
                    {
                        transform:
                            "rotate(0deg) scale(1)"
                    }
                ],
                {
                    duration: 500,
                    easing: "ease-out"
                }
            );


            /*
                Increase darkness.
            */

            document.body.classList.remove(
                "wine-fade-1",
                "wine-fade-2",
                "wine-fade-3",
                "wine-fade-4",
                "wine-fade-5"
            );

            document.body.classList.add(
                "wine-fade-" + wineClicks
            );


            /*
                Final click.
            */

            if (wineClicks === 5) {

                finalWineClick = true;

                wineInstruction.textContent =
                    "Yeah... that's definitely enough. 😂🍷";


                setTimeout(function () {

                    drunkPopup.classList.add(
                        "show"
                    );

                }, 900);

            }

        }
    );


    /* =====================================================
       PAGE 3
    ===================================================== */

    get("page3-button")
        .addEventListener(
            "click",
            function () {

                /*
                    Change this filename if your
                    Page 3 has a different name.
                */

                window.location.href =
                    "page3.html";

            }
        );

});

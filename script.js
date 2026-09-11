/* =========================
   START EXPERIENCE
========================= */

function startExperience() {

    const hero =
        document.getElementById("hero");

    const content =
        document.getElementById("mainContent");


    hero.style.display = "none";

    content.classList.remove("hidden");


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    createConfetti();

}



/* =========================
   MUSIC
========================= */

let playing = false;


function toggleMusic() {

    const music =
        document.getElementById("music");

    const button =
        document.getElementById("musicBtn");


    if (!playing) {

        music.play()
            .then(() => {

                playing = true;

                button.textContent = "🔊";

            })
            .catch(() => {

                alert(
                    "Music file (music.mp3) add karne ke baad music chalega."
                );

            });

    } else {

        music.pause();

        playing = false;

        button.textContent = "🎵";

    }

}



/* =========================
   REASONS
========================= */

const reasons = [

    "You're someone who can make an ordinary conversation a lot more fun. 😄",

    "You have your own personality and vibe — and that's something worth keeping. ✨",

    "You deserve people around you who genuinely celebrate your happiness. ❤️",

    "Most importantly, never forget that you are capable of doing amazing things. 🌷"

];


function showReason(index) {

    const box =
        document.getElementById(
            "reasonDisplay"
        );


    box.innerHTML = `

        <span>💖</span>

        <p>
            ${reasons[index]}
        </p>

    `;


    box.animate(

        [
            {
                opacity: 0,
                transform: "translateY(10px)"
            },

            {
                opacity: 1,
                transform: "translateY(0)"
            }

        ],

        {
            duration: 400
        }

    );

}



/* =========================
   BLOW CANDLE
========================= */

function makeWish() {

    const cake =
        document.getElementById(
            "bigCake"
        );


    const message =
        document.getElementById(
            "wishMessage"
        );


    cake.classList.add("blown");

    cake.textContent = "✨";


    message.classList.remove("hidden");


    createConfetti();

}



/* =========================
   FINAL SURPRISE
========================= */

function finalSurprise() {

    const message =
        document.getElementById(
            "finalMessage"
        );


    message.classList.remove("hidden");


    createConfetti();


    setTimeout(() => {

        message.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }, 100);

}



/* =========================
   CONFETTI
========================= */

function createConfetti() {

    const emojis = [

        "🎉",
        "✨",
        "💖",
        "🎈",
        "🌸",
        "⭐",
        "🥳"

    ];


    for (
        let i = 0;
        i < 55;
        i++
    ) {

        const confetti =
            document.createElement("div");


        confetti.textContent =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        confetti.style.position =
            "fixed";


        confetti.style.left =
            Math.random() * 100 + "vw";


        confetti.style.top =
            "-40px";


        confetti.style.fontSize =
            15 +
            Math.random() * 22 +
            "px";


        confetti.style.zIndex =
            "9999";


        confetti.style.pointerEvents =
            "none";


        document.body.appendChild(
            confetti
        );


        const duration =
            1800 +
            Math.random() * 2200;


        const animation =
            confetti.animate(

                [

                    {
                        transform:
                            "translateY(0) rotate(0deg)",

                        opacity: 1

                    },

                    {

                        transform:
                            `translateY(110vh) rotate(${360 + Math.random() * 500}deg)`,

                        opacity: 0

                    }

                ],

                {

                    duration:
                        duration,

                    easing:
                        "cubic-bezier(.2,.7,.3,1)"

                }

            );


        animation.onfinish =
            () => confetti.remove();

    }

}



/* =========================
   RANDOM FLOATING SPARKLES
========================= */

function sparkle() {

    const star =
        document.createElement("div");


    star.textContent = "✦";


    star.style.position =
        "fixed";


    star.style.left =
        Math.random() * 100 + "vw";


    star.style.top =
        "100vh";


    star.style.color =
        "#ffffff";


    star.style.opacity =
        ".7";


    star.style.pointerEvents =
        "none";


    document.body.appendChild(
        star
    );


    star.animate(

        [

            {
                transform:
                    "translateY(0)",
                opacity: .7
            },

            {
                transform:
                    "translateY(-110vh)",
                opacity: 0
            }

        ],

        {

            duration:
                5000 +
                Math.random() * 4000,

            easing:
                "linear"

        }

    ).onfinish =
        () => star.remove();

}


setInterval(
    sparkle,
    900
);

const club = {
    members: 24,
    projects: 58,
    raised: 2345,
    events: 17
};

const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target);
            }
        });
    },

    { threshold: 0.15 }
);

reveals.forEach(element => {revealObserver.observe(element);});

function animateCounter(element, target, prefix = "") {
    let start = 0;
    const duration = 1200;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        element.textContent =
            prefix + Math.floor(start).toLocaleString();
    }, 16);
}

let countersStarted = false;
const statsSection = document.querySelector(".stats-section");
const statsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                animateCounter(
                    document.getElementById("members-count"),
                    club.members
                );

                animateCounter(
                    document.getElementById("projects-count"),
                    club.projects
                );

                animateCounter(
                    document.getElementById("raised-count"),
                    club.raised,
                    "£"
                );

                animateCounter(
                    document.getElementById("events-count"),
                    club.events
                );

            }

        });

    },
    { threshold:0.4 }

);

if(statsSection){
    statsObserver.observe(statsSection);
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e){
        const target =
            document.querySelector(this.getAttribute("href"));
        if(target){
            e.preventDefault();
            target.scrollIntoView({ behavior:"smooth" });
        }
    });
});

const hero = document.querySelector(".home-hero");

if(hero){
    hero.addEventListener(
        "mousemove",
        (event)=>{
            const x =
            event.clientX / window.innerWidth * 100;
            const y =
            event.clientY / window.innerHeight * 100;

            hero.style.setProperty(
                "--mouse-x",
                `${x}%`
            );

            hero.style.setProperty(
                "--mouse-y",
                `${y}%`
            );
        }
    );
}
gsap.registerPlugin(MotionPathPlugin);
//Home Page
const page = document.querySelector(".first-page");
// const content = document.querySelector(".first-page-content");
const card1 = document.querySelectorAll(".images")[0];
const image = document.querySelectorAll(".images")[1];
const card2 = document.querySelectorAll(".images")[2];
const navbar = document.querySelector(".navbar");
const title = document.querySelector("#title");

gsap.to(card1, { duration: 1, ease: "power2.out", rotation: 10 });
gsap.to(image, { duration: 1, ease: "power1.inOut", opacity: 1 });
gsap.to(navbar, { duration: 0.6, ease: "power1.inOut", opacity: 1 });
gsap.to(title, { duration: 0.6, ease: "power1.inOut", opacity: 0.8 });
gsap.to(card2, { duration: 1, ease: "power2.out", rotation: -10 });
// gsap
//     .timeline({
//         defaults: {
//             scrollTrigger: { trigger: page, start: "bottom 75%", end: "bottom 25%", scrub: 0.5 }
//         }
//     })
//     .to(card1, { duration: 1, ease: "power2.out", rotation: 0 })
//     .to(card2, { duration: 1, ease: "power2.out", rotation: 0 });

//Story Page
const secondPage = document.querySelector(".second-page");
const secondCard1 = document.querySelectorAll(".second-images")[0];
const image2 = document.querySelectorAll(".second-images")[1];
const secondCard2 = document.querySelectorAll(".second-images")[2];
const story = document.querySelector("#story").children;

gsap
  .timeline({
    defaults: {
      scrollTrigger: { trigger: secondPage, start: "top bottom", end: "95% bottom", scrub: 0.5 }
    }
  })
  .to(secondCard1, { duration: 1, ease: "power2.out", xPercent: 18, yPercent: -11 })
  .to(image2, { duration: 1, ease: "power1.inOut", opacity: 1 })
  .to(secondCard2, { duration: 1, ease: "power2.out", xPercent: -18, yPercent: 11 })
  // .fromTo(story.children, {opacity: 0, y: 40}, { duration: 1, ease: "power1.inOut", opacity: 1, y: 0, stagger:0.5 });
  .from(story, {opacity: 0, y: 40, duration: 1, ease: "power1.inOut", stagger:0.5 });

//Offer Page
const thirdPage = document.querySelector(".third-page");
const thirdImages = document.querySelectorAll(".third-images");
const offer = document.querySelector("#offer").children;

gsap
    .timeline({
        defaults: {
            scrollTrigger: { trigger: thirdPage, start: "top bottom", end: "95% bottom", scrub: 0.5 }
        }
    })
    .to(thirdImages, { stagger: 0.65, duration: 1, ease: "power1.inOut", opacity: 1 })
    // .fromTo(offer,{opacity: 0, y: 40}, { ease: "power1.inOut", opacity: 1, y: 0, stagger: 0.25})
    .from(offer,{opacity: 0, y: 40, ease: "power1.inOut", stagger: 0.25})

//Contacts Page
const forthPage = document.querySelector(".forth-page");
const forthCard1 = document.querySelectorAll(".forth-images")[0];
const forthCard2 = document.querySelectorAll(".forth-images")[2];
const image4 = document.querySelectorAll(".forth-images")[1];
const plane = document.querySelector("#plane");
const path = document.querySelector("#path");
const contacts = document.querySelector("#contacts").children;

gsap.set(plane, {xPercent: -50, yPercent: -50, transformOrigin: "50% 50%", autoAlpha: 1});
gsap.timeline({
        defaults: {
            scrollTrigger: { trigger: forthPage, start: "top bottom", end: "95% bottom" }
        }
    })
    .to(plane, {
        motionPath: {
            autoRotate: true,
            align: "self",
            path: [
                {x:400, y: 250}, {x:700, y: 95}, {x:560, y: -105},
                {x:200, y: 0}, {x:500, y: 200}, {x:window.innerWidth + 300, y: 100 }
            ],
        },
        duration: 3.5,
        ease: "power1.in"
    });

gsap.timeline({
        defaults: {
            scrollTrigger: { trigger: forthPage, start: "50% bottom", end: "bottom bottom",scrub: 0.5 }
        }
    })
    // .fromTo(contacts, {opacity: 0, y: 40}, { duration: 1, ease: "power1.inOut", opacity: 1, y: 0, stagger: 0.25 })
    .from(contacts, {opacity: 0, y: 40, duration: 1, ease: "power1.inOut", stagger: 0.25 })
    .to(forthCard1, { duration: 1, ease: "power2.out", xPercent: 7, yPercent: -10 })
    .to(image4, { duration: 1, ease: "power1.inOut", opacity: 1 })
    .to(forthCard2, { duration: 1, ease: "power2.out", xPercent: -7, yPercent: 10 })


//Fifth Page
const download = document.querySelector('.fifth-page-content');
const fifthPage = document.querySelector('.fifth-page');

gsap.timeline({
        defaults: {
            scrollTrigger: { trigger: fifthPage, start: "50% bottom", end: "bottom bottom",scrub: 0.5 }
        }
    })
    .fromTo(download, {opacity: 0, y: 45}, { duration: 1.5, ease: "power1.inOut", opacity: 1, y: 0 });
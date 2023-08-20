// Lenis Smooth Scroll
const lenis = new Lenis();

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
    lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

//
const hamburgerBtn = document.querySelector("#hamburgerBtn");
const navbar = document.querySelector(".navbar");
const overlay = document.querySelector(".overlay");
const fadeElements = document.querySelectorAll(".has-fade");
const body = document.querySelector("body");

let prevScrollPos = 0; // Initialize the previous scroll position
const navbarHeight = navbar.offsetHeight; // Get the height of the navbar
let isHidden = false; // Initialize the hidden state of the navbar
let scrolledDistance = 0; // Initialize the distance scrolled since the navbar was hidden

window.onscroll = () => {
    let scrollEnd = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
    const currentScrollPos = window.scrollY;
    if (!body.classList.contains("lock-scroll")) {
        if (currentScrollPos > prevScrollPos && !scrollEnd) {
            // Scrolling down
            if (!isHidden && currentScrollPos > navbarHeight) {
                navbar.classList.add("hidden");
                isHidden = true;
            }
        } else if (scrollEnd) {
            navbar.classList.remove("hidden");
            isHidden = false;
            scrolledDistance = 0;
        }
        else {
            // Scrolling up
            if (isHidden || currentScrollPos <= navbarHeight) {
                scrolledDistance += prevScrollPos - currentScrollPos;
                if (scrolledDistance >= navbarHeight || currentScrollPos <= navbarHeight) {
                    navbar.classList.remove("hidden");
                    isHidden = false;
                    scrolledDistance = 0;
                }
            }
        }
    }

    prevScrollPos = currentScrollPos;
};

hamburgerBtn.addEventListener('click', () => {
    let open = navbar.classList.toggle("open");
    if (open) {
        body.classList.add("lock-scroll");
        fadeElements.forEach((element) => {
            element.classList.remove("fade-out");
            element.classList.add("fade-in");
        });
    } else {
        body.classList.remove("lock-scroll");
        fadeElements.forEach((element) => {
            element.classList.remove("fade-in");
            element.classList.add("fade-out");
        });
    }

})

// Slider JS
const slideshowDuration = 4000;
const slideshow = $('.main-content .slideshow');

function slideshowSwitch(slideshow,index,auto){
    let activeSlideImageLeft;
    let newSlideContentRight;
    let newSlideContentLeft;
    let newSlideImageToLeft;
    let newSlideImageToRight;
    let newSlideImageLeft;
    let newSlideImageRight;
    let newSlideLeft;
    let newSlideRight;
    if(slideshow.data('wait')) return;

    const slides = slideshow.find('.slide');
    slideshow.find('.pagination');
    const activeSlide = slides.filter('.is-active');
    const activeSlideImage = activeSlide.find('.image-container');
    const newSlide = slides.eq(index);
    const newSlideImage = newSlide.find('.image-container');
    const newSlideContent = newSlide.find('.slide-content');
    const newSlideElements = newSlide.find('.caption > *');
    if(newSlide.is(activeSlide))return;

    newSlide.addClass('is-new');
    let timeout = slideshow.data('timeout');
    clearTimeout(timeout);
    slideshow.data('wait',true);
    const transition = slideshow.attr('data-transition');
    if(transition === 'fade'){
        newSlide.css({
            display:'block',
            zIndex:2
        });
        newSlideImage.css({
            opacity:0
        });

        gsap.to(newSlideImage,{
            duration: 1,
            alpha:1,
            onComplete:() => {
                newSlide.addClass('is-active').removeClass('is-new');
                activeSlide.removeClass('is-active');
                newSlide.css({display:'',zIndex:''});
                newSlideImage.css({opacity:''});
                slideshow.find('.pagination').trigger('check');
                slideshow.data('wait',false);
                if(auto){
                    timeout = setTimeout(() => {
                        slideshowNext(slideshow,false,true);
                    },slideshowDuration);
                    slideshow.data('timeout',timeout);}}});
    } else {
        if(newSlide.index() > activeSlide.index()){
            newSlideRight = 0;
            newSlideLeft = 'auto';
            newSlideImageRight = -slideshow.width() / 8;
            newSlideImageLeft = 'auto';
            newSlideImageToRight = 0;
            newSlideImageToLeft = '';
            newSlideContentLeft = 'auto';
            newSlideContentRight = 0;
            activeSlideImageLeft = -slideshow.width() / 4;
        } else {
            newSlideRight = '';
            newSlideLeft = 0;
            newSlideImageRight = 'auto';
            newSlideImageLeft = -slideshow.width()/8;
            newSlideImageToRight = '';
            newSlideImageToLeft = 0;
            newSlideContentLeft = 0;
            newSlideContentRight = 'auto';
            activeSlideImageLeft = slideshow.width()/4;
        }

        newSlide.css({
            display:'block',
            width:0,
            right:newSlideRight,
            left:newSlideLeft
            ,zIndex:2
        });

        newSlideImage.css({
            width:slideshow.width(),
            right:newSlideImageRight,
            left:newSlideImageLeft
        });

        newSlideContent.css({
            width:slideshow.width(),
            left:newSlideContentLeft,
            right:newSlideContentRight
        });

        activeSlideImage.css({
            left:0
        });

        TweenMax.set(newSlideElements,{y:20,force3D:true});
        TweenMax.to(activeSlideImage,1,{
            left:activeSlideImageLeft,
            ease:Power3.easeInOut
        });

        TweenMax.to(newSlide,1,{
            width:slideshow.width(),
            ease:Power3.easeInOut
        });

        TweenMax.to(newSlideImage,1,{
            right:newSlideImageToRight,
            left:newSlideImageToLeft,
            ease:Power3.easeInOut
        });

        TweenMax.staggerFromTo(newSlideElements,0.8,{alpha:0,y:60},{alpha:1,y:0,ease:Power3.easeOut,force3D:true,delay:0.6},0.1,function(){
            newSlide.addClass('is-active').removeClass('is-new');
            activeSlide.removeClass('is-active');
            newSlide.css({
                display:'',
                width:'',
                left:'',
                zIndex:''
            });

            newSlideImage.css({
                width:'',
                right:'',
                left:''
            });

            newSlideContent.css({
                width:'',
                left:''
            });

            newSlideElements.css({
                opacity:'',
                transform:''
            });

            activeSlideImage.css({
                left:''
            });

            slideshow.find('.pagination').trigger('check');
            slideshow.data('wait',false);
            if(auto){
                timeout=setTimeout(function(){
                    slideshowNext(slideshow,false,true);
                },slideshowDuration);
                slideshow.data('timeout',timeout);
            }
        });
    }
}

function slideshowNext(slideshow,previous,auto){
    const slides = slideshow.find('.slide');
    const activeSlide = slides.filter('.is-active');
    let newSlide;
    if(previous){
        newSlide = activeSlide.prev('.slide');
        if(newSlide.length === 0) {
            newSlide = slides.last();
        }
    } else {
        newSlide = activeSlide.next('.slide');
        if(newSlide.length === 0)
            newSlide = slides.filter('.slide').first();
    }

    slideshowSwitch(slideshow, newSlide.index(), auto);
}

function homeSlideshowParallax(){
    const scrollTop = $(window).scrollTop();
    if(scrollTop > windowHeight) return;
    const inner = slideshow.find('.slideshow-inner');
    const newHeight = windowHeight - (scrollTop / 2);
    const newTop = scrollTop * 0.8;

    inner.css({
        transform:'translateY('+newTop+'px)',height:newHeight
    });
}

$(document).ready(function() {
    $('.slide').addClass('is-loaded');

    $('.slideshow .arrows .arrow').on('click',function(){
        slideshowNext($(this).closest('.slideshow'),$(this).hasClass('prev'));
    });

    $('.slideshow .pagination .item').on('click',function(){
        slideshowSwitch($(this).closest('.slideshow'),$(this).index());
    });

    $('.slideshow .pagination').on('check',function(){
        const slideshow = $(this).closest('.slideshow');
        const pages = $(this).find('.item');
        const index = slideshow.find('.slides .is-active').index();
        pages.removeClass('is-active');
        pages.eq(index).addClass('is-active');
    });

    /* Lazyloading
    $('.slideshow').each(function(){
      var slideshow=$(this);
      var images=slideshow.find('.image').not('.is-loaded');
      images.on('loaded',function(){
        var image=$(this);
        var slide=image.closest('.slide');
        slide.addClass('is-loaded');
      });
    */

    const timeout = setTimeout(function () {
        slideshowNext(slideshow, false, true);
    }, slideshowDuration);

    slideshow.data('timeout',timeout);
});

if(slideshow.length > 1) {
    $(window).on('scroll',homeSlideshowParallax);
}

const bg = document.querySelectorAll(".image");

gsap.to(bg, {
    backgroundPosition: "50% -25%",
    ease: "none",
    scrollTrigger: {
        trigger: bg,
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

const DOM = {
    timeline: "timeline",
    timelineStepper: "timeline__stepper",
    timelineStep: "timeline__step",
    timelineStepTitle: "timeline__step-title",
    timelineStepActive: "is-active",
    timelineStepActiveMarker: "timeline__step-active-marker",
    timelineSlidesContainer: "timeline__slides",
    timelineSlide: "timeline__slide",
    timelineSlideActive: "is-active",
};

const STEP_ACTIVE_MARKEP_CUSTOM_PROPS = {
    width: "--slide-width",
    posX: "--slide-pos-x",
    posY: "--slide-pos-y",
};

const SLIDES_CONTAINER_CUSTOM_PROPS = {
    height: "--slides-container-height",
};

const timeline = document.querySelector(`.${DOM.timeline}`);
const timelineStepper = timeline?.querySelector(`.${DOM.timelineStepper}`);
const timelineStepTitle = timeline?.querySelector(`.${DOM.timelineStepTitle}`);
const timelineSlidesContainer = timeline?.querySelector(
    `.${DOM.timelineSlidesContainer}`
) as HTMLElement;
const timelineSlides =
    timeline && Array.from(timeline.querySelectorAll(`.${DOM.timelineSlide}`));

interface IGetStepActiveMarkerPositionProps {
    posX: number;
    posY: number;
    width: number;
}

interface ISetStepActiveMarkerPositionProps
    extends IGetStepActiveMarkerPositionProps {
    stepActiveMarker: HTMLElement;
}

interface ICurrentStepProps {
    currentStep: Element | undefined;
    currentStepIndex: number | undefined;
}

window.addEventListener("load", () => {
    createStepActiveMarker();
    activateCurrentSlide();
});

window.addEventListener("resize", () => {
    recalcStepActiveMarkerProps();
});

timeline?.addEventListener("click", (event) => {
    const { target } = event;

    if (
        !target ||
        !(target instanceof Element) ||
        !target.closest(`.${DOM.timelineStep}`)
    ) {
        return;
    }

    const currentStep = target.closest(`.${DOM.timelineStep}`);

    if (!currentStep) {
        return;
    }

    deactivateSteps();
    activateCurrentStep(currentStep);

    recalcStepActiveMarkerProps();

    deactivateSlides();
    activateCurrentSlide();
});

function deactivateSteps(): void {
    const steps = document.querySelectorAll(`.${DOM.timelineStep}`);
    steps?.forEach((elem) => elem.classList.remove(`${DOM.timelineStepActive}`));
}

function activateCurrentStep(currentStep: Element): void {
    currentStep?.classList.add(`${DOM.timelineStepActive}`);
}

function deactivateSlides() {
    timelineSlides?.forEach((elem) =>
        elem.classList.remove(`${DOM.timelineSlideActive}`)
    );
}

function activateCurrentSlide() {
    const currentSlide = getCurrentSlide();

    if (!currentSlide) {
        return;
    }

    const currentSlideHeight = getCurrentSlideHeight(currentSlide);
    setSlideContainerHeight(currentSlideHeight);
    currentSlide.classList.add(`${DOM.timelineSlideActive}`);
}

function createStepActiveMarker() {
    const stepActiveMarker = document.createElement("div");
    stepActiveMarker.classList.add(`${DOM.timelineStepActiveMarker}`);
    timelineStepper?.appendChild(stepActiveMarker);

    const positionProps = getStepActiveMarkerProps();

    if (!positionProps) {
        return;
    }

    setStepActiveMarkerProps({
        stepActiveMarker,
        ...positionProps,
    });
}

function recalcStepActiveMarkerProps(): void {
    const stepActiveMarker = timeline?.querySelector(
        `.${DOM.timelineStepActiveMarker}`
    ) as HTMLElement;

    const stepActiveMarkerProps = getStepActiveMarkerProps();
    if (!stepActiveMarkerProps) {
        return;
    }

    setStepActiveMarkerProps({ stepActiveMarker, ...stepActiveMarkerProps });
}

function setStepActiveMarkerProps({
                                      stepActiveMarker,
                                      posX,
                                      posY,
                                      width,
                                  }: ISetStepActiveMarkerPositionProps): void {
    stepActiveMarker.style.setProperty(
        `${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.width}`,
        `${width}px`
    );

    stepActiveMarker.style.setProperty(
        `${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.posX}`,
        `${posX}px`
    );

    if (typeof posY === "number") {
        stepActiveMarker.style.setProperty(
            `${STEP_ACTIVE_MARKEP_CUSTOM_PROPS.posY}`,
            `${posY}px`
        );
    }
}

function getStepActiveMarkerProps(): IGetStepActiveMarkerPositionProps | null {
    const { currentStep } = getCurrentStep();

    if (!currentStep) {
        return null;
    }

    const width = getElementWidth(currentStep);
    const posX = getStepActiveMarkerPosX(currentStep);
    const posY = getStepActiveMarkerPosY();

    if (typeof posX !== "number" || typeof posY !== "number") {
        return null;
    }

    return { posX, posY, width };
}

function getCurrentStep(): ICurrentStepProps {
    const timelineSteps = Array.from(
        document.querySelectorAll(`.${DOM.timelineStep}`)
    );

    const currentStep = timelineSteps.find((element) =>
        element.classList.contains(`${DOM.timelineStepActive}`)
    );

    const currentStepIndex =
        currentStep &&
        timelineSteps.findIndex((element) =>
            element.classList.contains(`${DOM.timelineStepActive}`)
        );

    return { currentStep, currentStepIndex };
}

function getCurrentSlide(): Element | null {
    const { currentStepIndex } = getCurrentStep();

    if (typeof currentStepIndex !== "number" || !timelineSlides) {
        return null;
    }

    return timelineSlides[currentStepIndex];
}

function setSlideContainerHeight(height: number): void {
    timelineSlidesContainer?.style.setProperty(
        `${SLIDES_CONTAINER_CUSTOM_PROPS.height}`,
        `${height}px`
    );
}

function getCurrentSlideHeight(currentSlide: Element): number {
    return currentSlide.clientHeight;
}

function getStepActiveMarkerPosY(): number | null {
    const timelineTitlePosY = timelineStepTitle?.getBoundingClientRect().top;
    const timelineStepperPosY = timelineStepper?.getBoundingClientRect().top;

    if (!timelineTitlePosY || !timelineStepperPosY) {
        return null;
    }

    return timelineTitlePosY - timelineStepperPosY;
}

function getStepActiveMarkerPosX(currentStep: Element): number | null {
    const timelineStepperPosX = timelineStepper?.getBoundingClientRect().left;
    const currentStepPosX = currentStep.getBoundingClientRect().left;

    if (!timelineStepperPosX) {
        return null;
    }

    return currentStepPosX - timelineStepperPosX;
}

function getElementWidth(elem: Element): number {
    return elem.clientWidth;
}


gsap.to('#parallax', {
    backgroundPosition: "50% 58%",
    y: -100,
    ease: "none",
    scrollTrigger: {
        trigger: '#parallax',
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});
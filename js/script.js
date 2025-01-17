$('#demo1').sharrre({
    share: {
        googlePlus: true,
        facebook: true,
        twitter: true
    },

    buttons: {
        googlePlus: { size: 'tall', annotation: 'bubble' },
        facebook: { layout: 'box_count' },
        twitter: { count: 'vertical', via: '_JulienH' }
    },

    hover: function (api, options) {
        $(api.element).find('.buttons').show();
    },
    hide: function (api, options) {
        $(api.element).find('.buttons').hide();
    },
    enableTracking: true
});
"use strict";
var slideshow = document.querySelector(".slideshow");
var slides = document.querySelectorAll(".slideshow .slide");
var bars = document.querySelectorAll(".bars .bar");
var dots = document.querySelectorAll(".nav-dots .dot a");
var slideTitles = document.querySelectorAll(".slide-title");
var easeInOutQuart = "cubic-bezier(0.77, 0, 0.175, 1)";
var easeOutCubic = "cubic-bezier(0.215, 0.61, 0.355, 1)";
var staggeredSlideIn = function (element, delay) {
  return element.animate([
  { transform: "scaleY(0)", transformOrigin: "top" },
  { transform: "scaleY(1)", transformOrigin: "top" }],
  {
    duration: 800,
    easing: easeInOutQuart,
    fill: "forwards",
    delay: 80 * delay });

};
var staggeredSlideOut = function (element, delay) {
  return element.animate([
  { transform: "scaleY(1)", transformOrigin: "top" },
  { transformOrigin: "bottom", offset: 0.001 },
  { transform: "scaleY(0)", transformOrigin: "bottom" }],
  {
    duration: 800,
    easing: easeInOutQuart,
    fill: "forwards",
    delay: 80 * delay });

};
var fadeIn = function (element) {
  return element.animate([
  { opacity: 0, transform: "translateY(100%)" },
  { opacity: 1, transform: "translateY(0)" }],
  {
    duration: 800,
    easing: easeOutCubic,
    fill: "forwards",
    delay: 350 });

};
var fadeOut = function (element) {
  return element.animate([
  { opacity: 1, transform: "translateY(0)" },
  { opacity: 0, transform: "translateY(-100%)" }],
  {
    duration: 600,
    easing: easeOutCubic,
    fill: "forwards" });

};
var pageTransition = function (activeIndex) {
  slideTitles.forEach(function (slideTitle) {return fadeOut(slideTitle);});
  Promise.all(Array.from(bars).map(function (bar, i) {return staggeredSlideIn(bar, i).finished;})).then(function () {
    setActiveIndex(activeIndex);
    bars.forEach(function (bar, i) {
      staggeredSlideOut(bar, i);
    });
    slideTitles.forEach(function (slideTitle) {return fadeIn(slideTitle);});
  });
};
var setActiveIndex = function (activeIndex) {
  dots.forEach(function (dot) {return dot.classList.remove("active");});
  dots[activeIndex].classList.add("active");
  slideshow.style.setProperty("--active-index", "" + activeIndex);
  slides.forEach(function (slide) {return slide.style.zIndex = "-1";});
  slides[activeIndex].style.zIndex = "0";
};
// dots
dots[0].classList.add("active");
dots.forEach(function (dot, activeIndex) {
  dot.addEventListener("click", function () {
    var currentActiveIndex = slideshow.style.getPropertyValue("--active-index");
    if (Number(currentActiveIndex) !== activeIndex) {
      pageTransition(activeIndex);
    }
  });
});
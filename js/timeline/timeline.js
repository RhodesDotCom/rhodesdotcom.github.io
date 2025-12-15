document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".timeline-item").forEach((item) => {
    const time = item.querySelector(".time");
    const event = item.querySelector(".event");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 100%",
        toggleActions: "play none none reverse",
      }
    });

    // Animate time sliding up from below
    tl.fromTo(
      time,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 2 }
    );

    // Animate event sliding up from below
    tl.fromTo(
      event,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 2 },
      0
    );
  });
});

"use client";

import { RefObject, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMusic } from "@/lib/useMusic";

type UseStoryTimelineOptions = {
  dreamVideoRef: RefObject<HTMLVideoElement | null>;
  rootRef: RefObject<HTMLElement | null>;
};

export function useStoryTimeline({ dreamVideoRef, rootRef }: UseStoryTimelineOptions) {
  const music = useMusic();

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const q = gsap.utils.selector(root);
      let isDreamVideoPlaying = false;
      const playDreamVideo = () => {
        if (isDreamVideoPlaying) {
          return;
        }

        isDreamVideoPlaying = true;
        void dreamVideoRef.current?.play().catch(() => undefined);
      };
      const pauseDreamVideo = () => {
        if (!isDreamVideoPlaying) {
          return;
        }

        isDreamVideoPlaying = false;
        dreamVideoRef.current?.pause();
      };

      gsap.set(root, { "--stage-bg": "#0d0d18" });
      gsap.set(q(".story-stage__shade"), { autoAlpha: 1 });
      gsap.set(q(".story-scene"), { autoAlpha: 0, pointerEvents: "none" });
      gsap.set(q(".story-scene--hero"), { autoAlpha: 1, pointerEvents: "auto" });
      gsap.set(q(".story-photo"), {
        autoAlpha: 0,
        filter: "blur(10px) saturate(0.75)",
        scale: 1.08,
      });
      gsap.set(q(".story-photo--front"), {
        autoAlpha: 0.62,
        filter: "blur(0px) saturate(0.9)",
        scale: 1.04,
        xPercent: 8,
      });
      gsap.set(q(".char"), { autoAlpha: 0, y: 26 });
      gsap.set(q(".hero__line"), { autoAlpha: 0, y: 0 });
      gsap.set(q(".hero__title, .hero__role, .scroll-cue"), {
        autoAlpha: 0,
        y: 24,
      });
      gsap.set(q(".skills__label, .skills__item, .skills__outro"), {
        autoAlpha: 0,
        y: 36,
      });
      gsap.set(q(".skills__item"), {
        filter: "blur(10px)",
        rotate: () => gsap.utils.random(-7, 7),
        scale: 0.86,
        x: () => gsap.utils.random(-90, 90),
        y: () => gsap.utils.random(70, 140),
      });
      gsap.set(q(".outside__copy"), { autoAlpha: 0, y: 42 });
      gsap.set(q(".outside__beat"), { autoAlpha: 0, y: 34 });
      gsap.set(q(".outside__number, .outside__title, .outside__body, .outside__eyebrow"), {
        autoAlpha: 0,
        y: 34,
      });
      gsap.set(q(".outside-memory__frame"), {
        autoAlpha: 0,
        filter: "blur(14px) saturate(0.72)",
        scale: 1.08,
        yPercent: 5,
      });
      gsap.set(q(".outside-memory__frame img"), { scale: 1.08 });
      gsap.set(q(".outside-film-letterbox"), { autoAlpha: 0 });
      gsap.set(q(".dream__video-layer"), {
        autoAlpha: 0,
        filter: "blur(12px) saturate(0.78)",
        scale: 1.08,
      });
      gsap.set(q(".dream__word, .dream__text, .dream__heart, .dream__song"), {
        autoAlpha: 0,
        y: 34,
      });
      gsap.set(q(".monologue__line .char"), { autoAlpha: 0, y: 24 });
      gsap.set(q(".monologue__soon"), { autoAlpha: 0, y: 18 });

      const showScene = (sceneClass: string, at: number | string) => {
        timeline.to(
          q(sceneClass),
          {
            autoAlpha: 1,
            pointerEvents: "auto",
            duration: 0.75,
            ease: "power2.inOut",
          },
          at,
        );
      };

      const hideScene = (sceneClass: string, at: number | string) => {
        timeline.to(
          q(sceneClass),
          {
            autoAlpha: 0,
            pointerEvents: "none",
            duration: 0.75,
            ease: "power2.inOut",
          },
          at,
        );
      };

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=15100",
          scrub: 1.25,
          pin: true,
          anticipatePin: 1,
          onUpdate: ({ progress }) => {
            if (progress > 0.78 && progress < 0.93) {
              playDreamVideo();
            } else {
              pauseDreamVideo();
            }
          },
          onLeave: () => music.fadeOutAndPause(4800),
          onEnterBack: () => music.fadeVolume(0.15, 0.4, 1400),
        },
      });

      timeline
        .set(q(".hero__line--one"), { autoAlpha: 1 }, 0)
        .to(q(".hero__line--one .char"), {
          autoAlpha: 1,
          y: 0,
          stagger: 0.025,
          duration: 0.6,
        })
        .to(q(".story-photo--front"), { scale: 1, xPercent: 0, duration: 1.4 }, 0)
        .to({}, { duration: 0.5 })
        .to(q(".hero__line--one"), { autoAlpha: 0, y: -24, duration: 0.55 })
        .set(q(".hero__line--two"), { autoAlpha: 1 })
        .to(q(".hero__line--two .char"), {
          autoAlpha: 1,
          y: 0,
          stagger: 0.035,
          duration: 0.62,
        })
        .to({}, { duration: 0.42 })
        .to(q(".hero__line--two"), { autoAlpha: 0, y: -24, duration: 0.55 })
        .to(q(".hero__title"), { autoAlpha: 1, y: 0, duration: 0.85 })
        .to(q(".hero__role"), { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.3")
        .to(q(".scroll-cue"), { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.15")
        .to(q(".hero__title, .hero__role, .scroll-cue"), {
          autoAlpha: 0,
          y: -32,
          duration: 0.85,
          ease: "power2.inOut",
        });

      showScene(".story-scene--skills", ">-0.52");
      timeline
        .to(root, { "--stage-bg": "#0f1830", duration: 1.2, ease: "power2.inOut" }, "<")
        .to(
          q(".story-photo--front"),
          {
            autoAlpha: 0.12,
            filter: "blur(12px) saturate(0.55)",
            scale: 1.14,
            xPercent: 20,
            duration: 1.2,
          },
          "<",
        )
        .to(
          q(".story-photo--left"),
          {
            autoAlpha: 0.56,
            filter: "blur(0px) saturate(0.92)",
            scale: 1.01,
            xPercent: -10,
            duration: 1.2,
          },
          "<+=0.1",
        );
      hideScene(".story-scene--hero", "<+=0.18");
      timeline
        .to(q(".skills__label"), { autoAlpha: 1, y: 0, duration: 0.45 })
        .to(q(".skills__item"), {
          autoAlpha: 1,
          filter: "blur(0px)",
          rotate: 0,
          scale: 1,
          x: 0,
          y: 0,
          stagger: {
            amount: 0.86,
            from: "random",
          },
          duration: 0.82,
          ease: "back.out(1.25)",
        })
        .to(
          q(".skills__button"),
          {
            y: () => gsap.utils.random(-10, 10),
            x: () => gsap.utils.random(-8, 8),
            duration: 1.6,
            ease: "sine.inOut",
            stagger: 0.04,
          },
          "-=0.35",
        )
        .to(q(".skills__outro"), { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.45")
        .to(q(".skills__item"), {
          autoAlpha: 0,
          filter: "blur(8px)",
          scale: 1.04,
          y: -70,
          stagger: {
            amount: 0.36,
            from: "random",
          },
          duration: 0.72,
          ease: "power2.inOut",
        })
        .to(q(".skills__outro, .skills__label"), { y: -36, autoAlpha: 0, duration: 0.65 }, "<+=0.1");

      showScene(".story-scene--outside", ">-0.52");
      timeline
        .to(root, { "--stage-bg": "#1a3a6e", duration: 1.25, ease: "power2.inOut" }, "<")
        .to(
          q(".story-photo--left"),
          {
            autoAlpha: 0.22,
            filter: "blur(9px) saturate(0.72)",
            scale: 1.08,
            xPercent: -20,
            duration: 1.15,
          },
          "<",
        )
        .to(
          q(".story-photo--right"),
          {
            autoAlpha: 0.28,
            filter: "blur(8px) saturate(0.74)",
            scale: 1.08,
            xPercent: 16,
            duration: 1.2,
          },
          "<+=0.1",
        );
      hideScene(".story-scene--skills", "<+=0.22");
      timeline
        .to(q(".outside__copy"), { autoAlpha: 1, y: 0, duration: 0.45 })
        .to(q(".outside__eyebrow"), { autoAlpha: 1, y: 0, duration: 0.4 }, "<")
        .to(
          q(".outside-memory__frame--arrival"),
          {
            autoAlpha: 0.84,
            filter: "blur(0px) saturate(0.98)",
            scale: 1,
            yPercent: 0,
            duration: 0.95,
            ease: "power2.inOut",
          },
          "<+=0.05",
        )
        .to(q(".outside-memory__frame--arrival img"), { scale: 1.02, duration: 1.8 }, "<")
        .to(q(".outside__beat--arrival"), { autoAlpha: 1, y: 0, duration: 0.58 }, "<+=0.14")
        .to(
          q(".outside__beat--arrival .outside__number, .outside__beat--arrival .outside__title, .outside__beat--arrival .outside__body"),
          { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.5 },
          "<",
        )
        .to({}, { duration: 0.44 })
        .to(q(".outside__beat--arrival"), {
          autoAlpha: 0,
          y: -28,
          duration: 0.55,
          ease: "power2.inOut",
        })
        .to(
          q(".outside-memory__frame--arrival"),
          {
            autoAlpha: 0.2,
            filter: "blur(9px) saturate(0.75)",
            scale: 1.07,
            xPercent: -7,
            duration: 0.82,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          q(".outside-memory__frame--play"),
          {
            autoAlpha: 0.88,
            filter: "blur(0px) saturate(1)",
            scale: 1,
            yPercent: 0,
            duration: 0.95,
            ease: "power2.inOut",
          },
          "<+=0.08",
        )
        .to(q(".outside-memory__frame--play img"), { scale: 1.04, duration: 1.8 }, "<")
        .to(q(".outside__beat--play"), { autoAlpha: 1, y: 0, duration: 0.58 }, "<+=0.15")
        .to(
          q(".outside__beat--play .outside__number, .outside__beat--play .outside__title, .outside__beat--play .outside__body"),
          { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.5 },
          "<",
        )
        .to({}, { duration: 0.5 })
        .to(q(".outside__beat--play"), {
          autoAlpha: 0,
          y: -28,
          duration: 0.55,
          ease: "power2.inOut",
        })
        .to(
          q(".outside-memory__frame--play"),
          {
            autoAlpha: 0.22,
            filter: "blur(10px) saturate(0.78)",
            scale: 1.08,
            xPercent: -5,
            duration: 0.82,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          q(".outside-memory__frame--healing"),
          {
            autoAlpha: 0.92,
            filter: "blur(0px) saturate(1.04)",
            scale: 1,
            yPercent: 0,
            duration: 0.95,
            ease: "power2.inOut",
          },
          "<+=0.08",
        )
        .to(q(".outside-memory__frame--healing img"), { scale: 1.035, duration: 1.95 }, "<")
        .to(q(".outside__beat--healing"), { autoAlpha: 1, y: 0, duration: 0.58 }, "<+=0.15")
        .to(
          q(".outside__beat--healing .outside__number, .outside__beat--healing .outside__title, .outside__beat--healing .outside__body"),
          { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.5 },
          "<",
        )
        .to({}, { duration: 0.52 })
        .to(q(".outside__beat--healing"), {
          autoAlpha: 0,
          y: -28,
          duration: 0.55,
          ease: "power2.inOut",
        })
        .to(
          root,
          { "--stage-bg": "#11283f", duration: 0.95, ease: "power2.inOut" },
          "<",
        )
        .to(
          q(".outside-memory__frame--arrival, .outside-memory__frame--play, .outside-memory__frame--healing"),
          {
            autoAlpha: 0,
            filter: "blur(12px) saturate(0.62)",
            scale: 1.12,
            duration: 0.78,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          q(".outside-memory__frame--china-campus"),
          {
            autoAlpha: 0.88,
            filter: "blur(0px) saturate(0.96)",
            scale: 1,
            yPercent: 0,
            duration: 0.95,
            ease: "power2.inOut",
          },
          "<+=0.08",
        )
        .to(q(".outside-memory__frame--china-campus img"), { scale: 1.02, xPercent: -2, duration: 1.9 }, "<")
        .to(q(".outside__beat--china-campus"), { autoAlpha: 1, y: 0, duration: 0.58 }, "<+=0.15")
        .to(
          q(".outside__beat--china-campus .outside__number, .outside__beat--china-campus .outside__title, .outside__beat--china-campus .outside__body"),
          { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.5 },
          "<",
        )
        .to({}, { duration: 0.5 })
        .to(q(".outside__beat--china-campus"), {
          autoAlpha: 0,
          y: -28,
          duration: 0.55,
          ease: "power2.inOut",
        })
        .to(
          q(".outside-memory__frame--china-campus"),
          {
            autoAlpha: 0.2,
            filter: "blur(10px) saturate(0.74)",
            scale: 1.07,
            xPercent: -6,
            duration: 0.82,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          q(".outside-memory__frame--china-certificate"),
          {
            autoAlpha: 0.9,
            filter: "blur(0px) saturate(0.98)",
            scale: 1,
            yPercent: 0,
            duration: 0.95,
            ease: "power2.inOut",
          },
          "<+=0.08",
        )
        .to(q(".outside-memory__frame--china-certificate img"), { scale: 1.035, duration: 1.85 }, "<")
        .to(q(".outside__beat--china-certificate"), { autoAlpha: 1, y: 0, duration: 0.58 }, "<+=0.15")
        .to(
          q(".outside__beat--china-certificate .outside__number, .outside__beat--china-certificate .outside__title, .outside__beat--china-certificate .outside__body"),
          { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.5 },
          "<",
        )
        .to({}, { duration: 0.5 })
        .to(q(".outside__beat--china-certificate"), {
          autoAlpha: 0,
          y: -28,
          duration: 0.55,
          ease: "power2.inOut",
        })
        .to(
          root,
          { "--stage-bg": "#421d2a", duration: 0.95, ease: "power2.inOut" },
          "<",
        )
        .to(
          q(".outside-memory__frame--china-certificate"),
          {
            autoAlpha: 0.22,
            filter: "blur(10px) saturate(0.78)",
            scale: 1.08,
            xPercent: -5,
            duration: 0.82,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          q(".outside-memory__frame--china-stage"),
          {
            autoAlpha: 0.92,
            filter: "blur(0px) saturate(1.04)",
            scale: 1,
            yPercent: 0,
            duration: 0.95,
            ease: "power2.inOut",
          },
          "<+=0.08",
        )
        .to(q(".outside-memory__frame--china-stage img"), { scale: 1.04, duration: 1.95 }, "<")
        .to(q(".outside__beat--china-stage"), { autoAlpha: 1, y: 0, duration: 0.58 }, "<+=0.15")
        .to(
          q(".outside__beat--china-stage .outside__number, .outside__beat--china-stage .outside__title, .outside__beat--china-stage .outside__body"),
          { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.5 },
          "<",
        )
        .to({}, { duration: 0.52 })
        .to(q(".outside__beat--china-stage"), {
          autoAlpha: 0,
          y: -28,
          duration: 0.55,
          ease: "power2.inOut",
        })
        .to(
          root,
          { "--stage-bg": "#05050a", duration: 0.95, ease: "power2.inOut" },
          "<",
        )
        .to(q(".outside-film-letterbox"), { autoAlpha: 1, duration: 0.72, ease: "power2.inOut" }, "<")
        .to(
          q(".outside-memory__frame--china-stage"),
          {
            autoAlpha: 0,
            filter: "blur(12px) saturate(0.68)",
            scale: 1.12,
            duration: 0.82,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          q(".outside-memory__frame--film-process"),
          {
            autoAlpha: 0.9,
            filter: "blur(0px) saturate(0.92)",
            scale: 1,
            yPercent: 0,
            duration: 0.95,
            ease: "power2.inOut",
          },
          "<+=0.1",
        )
        .to(q(".outside-memory__frame--film-process img"), { scale: 1.045, duration: 1.85 }, "<")
        .to(q(".outside__beat--film-process"), { autoAlpha: 1, y: 0, duration: 0.58 }, "<+=0.15")
        .to(
          q(".outside__beat--film-process .outside__number, .outside__beat--film-process .outside__title, .outside__beat--film-process .outside__body"),
          { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.5 },
          "<",
        )
        .to({}, { duration: 0.5 })
        .to(q(".outside__beat--film-process"), {
          autoAlpha: 0,
          y: -28,
          duration: 0.55,
          ease: "power2.inOut",
        })
        .to(
          q(".outside-memory__frame--film-process"),
          {
            autoAlpha: 0.18,
            filter: "blur(10px) saturate(0.72)",
            scale: 1.08,
            xPercent: -5,
            duration: 0.82,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          q(".outside-memory__frame--film-screen"),
          {
            autoAlpha: 0.92,
            filter: "blur(0px) saturate(0.95)",
            scale: 1,
            yPercent: 0,
            duration: 0.18,
            ease: "power2.inOut",
          },
          "<+=0.14",
        )
        .to(q(".outside-memory__frame--film-screen img"), { scale: 1.035, duration: 1.55 }, "<")
        .to(q(".outside__beat--film-screen"), { autoAlpha: 1, y: 0, duration: 0.5 }, "<+=0.08")
        .to(
          q(".outside__beat--film-screen .outside__number, .outside__beat--film-screen .outside__title, .outside__beat--film-screen .outside__body"),
          { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.5 },
          "<",
        )
        .to({}, { duration: 0.52 })
        .to(q(".outside__beat--film-screen"), {
          autoAlpha: 0,
          y: -28,
          duration: 0.55,
          ease: "power2.inOut",
        })
        .to(
          q(".outside-memory__frame--film-screen"),
          {
            autoAlpha: 0.2,
            filter: "blur(10px) saturate(0.72)",
            scale: 1.08,
            xPercent: -4,
            duration: 0.82,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          root,
          { "--stage-bg": "#180d14", duration: 0.82, ease: "power2.inOut" },
          "<",
        )
        .to(
          q(".outside-memory__frame--film-stage"),
          {
            autoAlpha: 0.92,
            filter: "blur(0px) saturate(1.04)",
            scale: 1,
            yPercent: 0,
            duration: 0.95,
            ease: "power2.inOut",
          },
          "<+=0.08",
        )
        .to(q(".outside-memory__frame--film-stage img"), { scale: 1.04, duration: 1.95 }, "<")
        .to(q(".outside__beat--film-stage"), { autoAlpha: 1, y: 0, duration: 0.58 }, "<+=0.15")
        .to(
          q(".outside__beat--film-stage .outside__number, .outside__beat--film-stage .outside__title, .outside__beat--film-stage .outside__body"),
          { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.5 },
          "<",
        )
        .to({}, { duration: 0.72 })
        .to(q(".outside-film-letterbox"), { autoAlpha: 0, duration: 0.8, ease: "power2.inOut" })
        .to(q(".outside__copy"), { autoAlpha: 0, y: -36, duration: 0.85 })
        .to(
          q(".outside-memory__frame"),
          {
            autoAlpha: 0,
            filter: "blur(16px) saturate(0.64)",
            scale: 1.12,
            duration: 0.95,
            ease: "power2.inOut",
          },
          "<",
        );

      showScene(".story-scene--dream", ">-0.55");
      timeline
        .to(root, { "--stage-bg": "#f0f0f0", duration: 1.45, ease: "power2.inOut" }, "<")
        .to(
          q(".story-photo--right"),
          {
            autoAlpha: 0,
            filter: "blur(16px) saturate(0.55)",
            scale: 1.18,
            duration: 1.35,
          },
          "<",
        )
        .to(
          q(".dream__video-layer"),
          {
            autoAlpha: 1,
            filter: "blur(0px) saturate(1)",
            scale: 1,
            duration: 1.5,
            ease: "power2.inOut",
          },
          "<+=0.1",
        );
      hideScene(".story-scene--outside", "<+=0.22");
      timeline
        .to({}, { duration: 0.9 })
        .to(q(".dream__word"), {
          autoAlpha: 1,
          y: 0,
          stagger: 0.25,
          duration: 0.55,
        })
        .to({}, { duration: 0.32 })
        .to(q(".dream__text"), {
          autoAlpha: 1,
          y: 0,
          stagger: 0.18,
          duration: 0.48,
        })
        .to(q(".dream__heart"), { autoAlpha: 1, y: 0, duration: 0.55 })
        .to(q(".dream__song"), { autoAlpha: 1, y: 0, duration: 0.38 })
        .to({}, { duration: 0.38 })
        .to(q(".dream__inner"), { autoAlpha: 0, y: 26, duration: 0.62 })
        .to(q(".dream__video-layer"), {
          autoAlpha: 0.42,
          filter: "blur(8px) saturate(0.75)",
          scale: 1.04,
          duration: 0.85,
        }, "<");

      showScene(".story-scene--monologue", ">-0.56");
      timeline
        .to(root, { "--stage-bg": "#fff5f2", duration: 1.2, ease: "power2.inOut" }, "<")
        .to(q(".story-stage__shade"), { autoAlpha: 0, duration: 1.2, ease: "power2.inOut" }, "<")
        .call(() => music.fadeVolume(0.4, 0.15, 1800), [], "<+=0.05");
      hideScene(".story-scene--dream", "<+=0.28");
      timeline
        .to(q(".monologue__line .char"), {
          autoAlpha: 1,
          y: 0,
          stagger: 0.024,
          duration: 0.52,
        })
        .to({}, { duration: 0.72 })
        .to(q(".monologue__soon"), { autoAlpha: 1, y: 0, duration: 0.6 })
        .to({}, { duration: 0.65 });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, root);

    return () => context.revert();
  }, [dreamVideoRef, music, rootRef]);
}

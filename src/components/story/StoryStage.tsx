"use client";

import { useRef } from "react";
import { Dream } from "@/components/Dream";
import { Hero } from "@/components/Hero";
import { Monologue } from "@/components/Monologue";
import { Outside } from "@/components/Outside";
import { Skills } from "@/components/Skills";
import { useStoryTimeline } from "@/lib/useStoryTimeline";
import { PhotoLayer } from "@/components/story/PhotoLayer";
import { SceneLayer } from "@/components/story/SceneLayer";

export function StoryStage() {
  const rootRef = useRef<HTMLElement>(null);
  const dreamVideoRef = useRef<HTMLVideoElement>(null);

  useStoryTimeline({ dreamVideoRef, rootRef });

  return (
    <section className="story-stage" ref={rootRef}>
      <PhotoLayer />
      <div className="story-stage__shade" aria-hidden="true" />
      <SceneLayer className="story-scene--hero" label="Pembuka">
        <Hero />
      </SceneLayer>
      <SceneLayer className="story-scene--skills" label="Skills">
        <Skills />
      </SceneLayer>
      <SceneLayer className="story-scene--outside" label="Di luar layar">
        <Outside />
      </SceneLayer>
      <SceneLayer className="story-scene--dream" label="Mimpi">
        <Dream videoRef={dreamVideoRef} />
      </SceneLayer>
      <SceneLayer className="story-scene--monologue" label="Monologue">
        <Monologue />
      </SceneLayer>
    </section>
  );
}

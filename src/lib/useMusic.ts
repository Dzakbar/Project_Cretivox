"use client";

import { Howl } from "howler";
import { useMemo } from "react";

type MusicApi = {
  play: () => void;
  pause: () => void;
  fadeVolume: (from: number, to: number, duration: number) => void;
  fadeOutAndPause: (duration: number) => void;
  setVolume: (volume: number) => void;
};

const SILENT_FALLBACK =
  "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=";

let sound: Howl | null = null;
let shouldPlay = false;
let requestedVolume = 0;
let fadeOutTimer: ReturnType<typeof setTimeout> | null = null;

function getSound() {
  if (!sound) {
    sound = new Howl({
      src: ["/music/song.mp3"],
      html5: true,
      loop: true,
      volume: 0,
    });

    sound.once("loaderror", () => {
      sound?.unload();
      sound = new Howl({
        src: [SILENT_FALLBACK],
        loop: true,
        volume: requestedVolume,
      });

      if (shouldPlay) {
        sound.play();
      }
    });
  }

  return sound;
}

export function useMusic(): MusicApi {
  return useMemo(
    () => ({
      play() {
        shouldPlay = true;
        if (fadeOutTimer) {
          clearTimeout(fadeOutTimer);
          fadeOutTimer = null;
        }

        const track = getSound();

        if (!track.playing()) {
          track.play();
        }
      },
      pause() {
        shouldPlay = false;
        if (fadeOutTimer) {
          clearTimeout(fadeOutTimer);
          fadeOutTimer = null;
        }

        sound?.pause();
      },
      fadeVolume(from, to, duration) {
        requestedVolume = to;
        const track = getSound();
        track.volume(from);
        track.fade(from, to, duration);
      },
      fadeOutAndPause(duration) {
        const track = getSound();

        shouldPlay = false;
        requestedVolume = 0;

        if (fadeOutTimer) {
          clearTimeout(fadeOutTimer);
        }

        track.fade(track.volume(), 0, duration);
        fadeOutTimer = setTimeout(() => {
          track.pause();
          fadeOutTimer = null;
        }, duration + 120);
      },
      setVolume(volume) {
        requestedVolume = volume;
        getSound().volume(volume);
      },
    }),
    [],
  );
}

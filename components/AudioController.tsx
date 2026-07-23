"use client";

import { useRef, useState } from "react";

type AudioGraph = {
  context: AudioContext;
  oscillator: OscillatorNode;
  gain: GainNode;
};

export default function AudioController() {
  const graph = useRef<AudioGraph | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  async function toggleAmbientAudio() {
    if (graph.current && isPlaying) {
      graph.current.gain.gain.setTargetAtTime(0, graph.current.context.currentTime, 0.08);
      window.setTimeout(() => {
        graph.current?.oscillator.stop();
        graph.current?.context.close();
        graph.current = null;
      }, 180);
      setIsPlaying(false);
      return;
    }

    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    const context = new AudioContextCtor();
    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = 110;
    gain.gain.value = 0.015;
    oscillator.connect(gain).connect(context.destination);
    oscillator.start();
    graph.current = { context, oscillator, gain };
    setIsPlaying(true);
  }

  return (
    <button
      type="button"
      onClick={toggleAmbientAudio}
      className="fixed bottom-6 right-6 z-50 rounded-full border border-[#d4af37]/40 bg-black/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#d4af37] backdrop-blur-md transition hover:border-[#d4af37]"
      aria-pressed={isPlaying}
    >
      {isPlaying ? "Sound on" : "Sound off"}
    </button>
  );
}

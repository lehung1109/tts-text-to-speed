"use client";

import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Form = () => {
  const [vietnameseVoices, setVietnameseVoices] = useState<
    SpeechSynthesisVoice[]
  >([]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = globalThis.speechSynthesis.getVoices();
      const viVoices = voices.filter((voice) => voice.lang === "vi-VN");
      setVietnameseVoices(viVoices);
    };

    // Load voices initially
    loadVoices();

    // Chrome loads voices asynchronously
    globalThis.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      globalThis.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    globalThis.speechSynthesis.cancel(); // Stop any ongoing speech

    const formData = new FormData(e.target as HTMLFormElement);
    const text = formData.get("text") as string;
    const voice = formData.get("voice") as string;

    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = vietnameseVoices.find(
      (v) => v.name === voice
    ) as SpeechSynthesisVoice;
    globalThis.speechSynthesis.speak(utterThis);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      <NativeSelect name="voice">
        <NativeSelectOption value="">Select a voice</NativeSelectOption>

        {vietnameseVoices.map((voice) => (
          <NativeSelectOption key={voice.name} value={voice.name}>
            {voice.name}
          </NativeSelectOption>
        ))}
      </NativeSelect>

      <Textarea placeholder="Enter text" name="text" />

      <Button type="submit">Generate</Button>
    </form>
  );
};

export default Form;

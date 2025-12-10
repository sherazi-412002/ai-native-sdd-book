#!/usr/bin/env python3
"""
Example implementation of Whisper ASR for VLA system
This demonstrates how to integrate Whisper for speech recognition in humanoid robotics
"""

import whisper
import numpy as np
import sounddevice as sd
from typing import Optional


class VoiceRecognitionExample:
    """Example voice recognition system using Whisper"""

    def __init__(self, model_size: str = "base", device: Optional[str] = None):
        """
        Initialize the voice recognition system

        Args:
            model_size: Whisper model size ('tiny', 'base', 'small', 'medium')
            device: Device to run model on ('cuda' or 'cpu')
        """
        if device is None:
            device = "cuda" if whisper.utils.is_cuda_available() else "cpu"

        self.model = whisper.load_model(model_size, device=device)
        self.model_size = model_size
        print(f"Loaded Whisper model ({model_size}) on {device}")

    def record_audio(self, duration: float = 5.0, sample_rate: int = 16000) -> np.ndarray:
        """
        Record audio for specified duration

        Args:
            duration: Recording duration in seconds
            sample_rate: Audio sample rate

        Returns:
            Audio data as numpy array
        """
        print(f"Recording audio for {duration} seconds...")
        audio_data = sd.rec(
            int(duration * sample_rate),
            samplerate=sample_rate,
            channels=1,
            dtype=np.float32
        )
        sd.wait()  # Wait for recording to complete
        print("Recording complete.")
        return audio_data.flatten()

    def transcribe_audio(self, audio_data: np.ndarray) -> str:
        """
        Transcribe audio to text using Whisper

        Args:
            audio_data: Audio data as numpy array

        Returns:
            Transcribed text
        """
        # Ensure audio is in the right format
        if len(audio_data.shape) > 1:
            audio_data = audio_data.mean(axis=1)

        # Convert to float32 if needed
        if audio_data.dtype != np.float32:
            audio_data = audio_data.astype(np.float32)

        # Transcribe
        result = self.model.transcribe(audio_data)
        return result["text"].strip()

    def process_voice_command(self, duration: float = 5.0) -> dict:
        """
        Process a complete voice command

        Args:
            duration: Recording duration in seconds

        Returns:
            Dictionary with transcription and metadata
        """
        # Record audio
        audio_data = self.record_audio(duration)

        # Transcribe
        text = self.transcribe_audio(audio_data)

        return {
            "transcription": text,
            "timestamp": np.datetime64('now').astype(str),
            "confidence": "high"  # Simplified for example
        }


# Example usage
if __name__ == "__main__":
    # Initialize voice processor
    voice_processor = VoiceRecognitionExample(model_size="base")

    # Process a sample command
    print("=== Voice Command Processing Example ===")
    result = voice_processor.process_voice_command(duration=3.0)

    print(f"Transcribed command: {result['transcription']}")
    print(f"Processed at: {result['timestamp']}")
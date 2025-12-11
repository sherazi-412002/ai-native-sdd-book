---
title: "Mini Project: Implementing Voice Command System"
description: "Hands-on implementation of a voice command system using Whisper and LLMs for humanoid robotics"
keywords: ["voice project", "voice system", "robotic voice", "Whisper LLM", "hands-on project"]
sidebar_position: 4
---

# Mini Project: Implementing Voice Command System

In this hands-on project, you'll build a complete voice command system for a humanoid robot using Whisper for speech recognition and LLMs for intent understanding. This project will demonstrate how to integrate these technologies into a practical robotic application.

## Project Overview

This mini-project will create a voice processing system that:
1. Captures audio from a microphone
2. Converts speech to text using Whisper
3. Interprets the intent using an LLM
4. Executes appropriate actions based on the command

## Prerequisites

Before starting this project, ensure you have:

1. **Python 3.8+** installed
2. **pip** package manager
3. **ROS 2 Humble** or newer installed
4. **Basic understanding of Python and ROS 2**
5. **Microphone** for audio input
6. **GPU** (optional but recommended) for faster processing

## Project Structure

```
voice-command-system/
├── config/
│   └── voice_config.yaml
├── src/
│   ├── __init__.py
│   ├── audio_capture.py
│   ├── whisper_asr.py
│   ├── llm_intent.py
│   ├── command_executor.py
│   └── voice_system.py
├── examples/
│   └── sample_commands.txt
├── tests/
│   └── test_voice_system.py
└── requirements.txt
```

## Step 1: Setting Up Dependencies

First, create a `requirements.txt` file with the necessary packages:

```txt
whisper
openai
sounddevice
numpy
scipy
pyyaml
rclpy
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

## Step 2: Audio Capture Module

Create `src/audio_capture.py`:

```python
import sounddevice as sd
import numpy as np
import time
from typing import Tuple

class AudioCapture:
    def __init__(self, sample_rate: int = 16000, chunk_duration: float = 0.1):
        self.sample_rate = sample_rate
        self.chunk_duration = chunk_duration
        self.chunk_size = int(sample_rate * chunk_duration)

    def record_audio(self, duration: float) -> np.ndarray:
        """Record audio for specified duration"""
        print(f"Recording audio for {duration} seconds...")
        audio_data = sd.rec(
            int(duration * self.sample_rate),
            samplerate=self.sample_rate,
            channels=1,
            dtype=np.float32
        )
        sd.wait()  # Wait for recording to complete
        print("Recording complete.")
        return audio_data.flatten()

    def record_continuous(self, duration: float) -> np.ndarray:
        """Record audio continuously in chunks"""
        audio_data = []
        start_time = time.time()

        while time.time() - start_time < duration:
            chunk = sd.rec(
                self.chunk_size,
                samplerate=self.sample_rate,
                channels=1,
                dtype=np.float32
            )
            sd.wait()
            audio_data.append(chunk.flatten())

        return np.concatenate(audio_data)
```

## Step 3: Whisper ASR Implementation

Create `src/whisper_asr.py`:

```python
import whisper
import numpy as np
from typing import Optional

class WhisperASR:
    def __init__(self, model_size: str = "base", device: Optional[str] = None):
        if device is None:
            device = "cuda" if whisper.utils.is_cuda_available() else "cpu"

        self.model = whisper.load_model(model_size, device=device)
        self.model_size = model_size

    def transcribe(self, audio_data: np.ndarray) -> str:
        """Transcribe audio to text"""
        # Ensure audio is in the right format
        if len(audio_data.shape) > 1:
            audio_data = audio_data.mean(axis=1)

        # Convert to float32 if needed
        if audio_data.dtype != np.float32:
            audio_data = audio_data.astype(np.float32)

        # Transcribe
        result = self.model.transcribe(audio_data)
        return result["text"].strip()

    def transcribe_streaming(self, audio_chunks: list) -> str:
        """Transcribe audio chunks"""
        full_audio = np.concatenate(audio_chunks)
        return self.transcribe(full_audio)
```

## Step 4: LLM Intent Processing

Create `src/llm_intent.py`:

```python
import json
import openai
from typing import Dict, Any

class LLMIntentProcessor:
    def __init__(self, api_key: str = None, model: str = "gpt-3.5-turbo"):
        self.api_key = api_key
        self.model = model
        if api_key:
            openai.api_key = api_key

    def process_command(self, text: str) -> Dict[str, Any]:
        """Process voice command through LLM"""
        prompt = f"""
        You are a robotic command interpreter. Analyze the following spoken command
        and extract the intent, entities, and action requirements.

        Command: "{text}"

        Extract the following information in JSON format:
        {{
            "intent": "primary action the user wants (e.g., 'navigate', 'manipulate', 'retrieve')",
            "entities": {{
                "object": "what object is involved (if any)",
                "location": "where something should be (if specified)",
                "person": "who is involved (if specified)",
                "quantity": "number of items (if specified)"
            }},
            "confidence": 0.0-1.0,
            "clarification_needed": true/false
        }}

        Only respond with valid JSON. Do not include any explanatory text.
        """

        if self.api_key:
            # Use OpenAI API
            response = openai.ChatCompletion.create(
                model=self.model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.1
            )
            result_text = response.choices[0].message.content.strip()
        else:
            # Mock response for testing
            result_text = self._mock_response(text)

        try:
            return json.loads(result_text)
        except json.JSONDecodeError:
            return self._fallback_response(text)

    def _mock_response(self, text: str) -> str:
        """Mock response for testing without API key"""
        # Simple mock implementation
        return '''{
            "intent": "retrieve",
            "entities": {
                "object": "cup",
                "location": "kitchen table",
                "person": "",
                "quantity": 1
            },
            "confidence": 0.85,
            "clarification_needed": false
        }'''

    def _fallback_response(self, text: str) -> Dict[str, Any]:
        """Fallback response for malformed JSON"""
        return {
            "intent": "unknown",
            "entities": {},
            "confidence": 0.0,
            "clarification_needed": False
        }
```

## Step 5: Command Executor

Create `src/command_executor.py`:

```python
import time
from typing import Dict, Any

class CommandExecutor:
    def __init__(self):
        self.executed_commands = []

    def execute_command(self, intent_data: Dict[str, Any]) -> Dict[str, Any]:
        """Execute a command based on intent data"""
        intent = intent_data.get('intent', '')
        entities = intent_data.get('entities', {})

        # Log the command
        command_log = {
            "intent": intent,
            "entities": entities,
            "timestamp": time.time(),
            "status": "executing"
        }

        # Execute based on intent
        if intent == "retrieve":
            result = self._retrieve_object(entities)
        elif intent == "navigate":
            result = self._navigate_to_location(entities)
        elif intent == "manipulate":
            result = self._manipulate_object(entities)
        else:
            result = self._unknown_command(intent)

        command_log["result"] = result
        command_log["status"] = "completed"

        self.executed_commands.append(command_log)
        return result

    def _retrieve_object(self, entities: Dict[str, Any]) -> Dict[str, Any]:
        """Retrieve an object from a location"""
        obj = entities.get('object', 'object')
        location = entities.get('location', 'location')
        print(f"Retrieving {obj} from {location}...")
        return {
            "action": "retrieval",
            "status": "success",
            "details": f"Retrieved {obj} from {location}"
        }

    def _navigate_to_location(self, entities: Dict[str, Any]) -> Dict[str, Any]:
        """Navigate to a location"""
        location = entities.get('location', 'destination')
        print(f"Navigating to {location}...")
        return {
            "action": "navigation",
            "status": "success",
            "details": f"Navigated to {location}"
        }

    def _manipulate_object(self, entities: Dict[str, Any]) -> Dict[str, Any]:
        """Manipulate an object"""
        obj = entities.get('object', 'object')
        print(f"Manipulating {obj}...")
        return {
            "action": "manipulation",
            "status": "success",
            "details": f"Manipulated {obj}"
        }

    def _unknown_command(self, intent: str) -> Dict[str, Any]:
        """Handle unknown commands"""
        print(f"Unknown command intent: {intent}")
        return {
            "action": "unknown",
            "status": "failed",
            "details": f"Unknown intent: {intent}"
        }
```

## Step 6: Main Voice System

Create `src/voice_system.py`:

```python
import time
from typing import Dict, Any
from .audio_capture import AudioCapture
from .whisper_asr import WhisperASR
from .llm_intent import LLMIntentProcessor
from .command_executor import CommandExecutor

class VoiceSystem:
    def __init__(self,
                 model_size: str = "base",
                 api_key: str = None,
                 sample_rate: int = 16000):
        self.audio_capture = AudioCapture(sample_rate=sample_rate)
        self.asr = WhisperASR(model_size=model_size)
        self.intent_processor = LLMIntentProcessor(api_key=api_key)
        self.executor = CommandExecutor()

    def process_voice_command(self, duration: float = 5.0) -> Dict[str, Any]:
        """Process a complete voice command"""
        print("=== Starting Voice Command Processing ===")

        # Step 1: Capture audio
        print("Step 1: Capturing audio...")
        audio_data = self.audio_capture.record_audio(duration)

        # Step 2: Speech recognition
        print("Step 2: Converting speech to text...")
        text = self.asr.transcribe(audio_data)
        print(f"Recognized text: {text}")

        # Step 3: Intent processing
        print("Step 3: Interpreting intent...")
        intent_data = self.intent_processor.process_command(text)
        print(f"Extracted intent: {intent_data}")

        # Step 4: Execute command
        print("Step 4: Executing command...")
        result = self.executor.execute_command(intent_data)
        print(f"Command result: {result}")

        # Step 5: Report completion
        print("=== Voice Command Processing Complete ===")
        return {
            "text": text,
            "intent_data": intent_data,
            "result": result
        }

    def run_demo(self):
        """Run a demonstration of the voice system"""
        print("Voice Command System Demo")
        print("=" * 40)

        # Demonstrate with sample commands
        sample_commands = [
            "Bring me the red cup from the kitchen table",
            "Navigate to the living room",
            "Pick up the blue book"
        ]

        for i, command in enumerate(sample_commands, 1):
            print(f"\nDemo {i}: '{command}'")
            try:
                result = self.process_voice_command(duration=3.0)
                print(f"Success: {result['result']['details']}")
            except Exception as e:
                print(f"Error: {e}")
            time.sleep(1)
```

## Step 7: Configuration

Create `config/voice_config.yaml`:

```yaml
# Voice System Configuration
audio:
  sample_rate: 16000
  chunk_duration: 0.1
  recording_duration: 5.0

whisper:
  model_size: "base"
  device: "cuda"  # or "cpu"

llm:
  model: "gpt-3.5-turbo"
  api_key: ""  # Set your OpenAI API key here

robot:
  max_retry_attempts: 3
  timeout_seconds: 30
```

## Step 8: Main Script

Create `main.py`:

```python
#!/usr/bin/env python3

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'src'))

from voice_system import VoiceSystem

def main():
    print("Starting Voice Command System...")

    # Initialize the system
    # Note: Set your OpenAI API key here if you want to use LLMs
    voice_system = VoiceSystem(
        model_size="base",
        api_key=""  # Add your API key here if using cloud LLMs
    )

    # Run interactive mode
    print("\nVoice Command System Ready!")
    print("Commands:")
    print("  'demo' - Run demo commands")
    print("  'record' - Record and process a command")
    print("  'quit' - Exit")

    while True:
        try:
            command = input("\nEnter command: ").strip().lower()

            if command == 'quit':
                print("Exiting...")
                break
            elif command == 'demo':
                voice_system.run_demo()
            elif command == 'record':
                duration = input("Recording duration (seconds, default 5): ").strip()
                try:
                    duration = float(duration) if duration else 5.0
                except ValueError:
                    duration = 5.0
                result = voice_system.process_voice_command(duration)
                print(f"Result: {result}")
            else:
                print("Unknown command. Try 'demo', 'record', or 'quit'")

        except KeyboardInterrupt:
            print("\nInterrupted by user")
            break
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    main()
```

## Running the Project

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

2. **Run the demo**:
   ```bash
   python main.py
   ```

3. **Try the demo mode**:
   - Type `demo` to see sample commands in action
   - Type `record` to record and process your own voice commands

## Expected Output

When running the demo, you should see output like:

```
Voice Command System Demo
========================================

Demo 1: 'Bring me the red cup from the kitchen table'
=== Starting Voice Command Processing ===
Step 1: Capturing audio...
Recording audio for 5.0 seconds...
Recording complete.
Step 2: Converting speech to text...
Recognized text: Bring me the red cup from the kitchen table
Step 3: Interpreting intent...
Extracted intent: {'intent': 'retrieve', 'entities': {'object': 'red cup', 'location': 'kitchen table', 'person': '', 'quantity': 1}, 'confidence': 0.85, 'clarification_needed': False}
Step 4: Executing command...
Retrieving red cup from kitchen table...
Command result: {'action': 'retrieval', 'status': 'success', 'details': 'Retrieved red cup from kitchen table'}
=== Voice Command Processing Complete ===
Success: Retrieved red cup from kitchen table
```

## Enhancements and Extensions

Once you have the basic system working, consider these enhancements:

1. **Add safety checks**: Implement validation before executing dangerous commands
2. **Implement voice feedback**: Add audio responses to confirm command receipt
3. **Add command history**: Store and recall previous commands
4. **Implement wake word detection**: Only activate when hearing "Hey Robot"
5. **Add error recovery**: Handle recognition failures gracefully
6. **Integrate with ROS 2**: Publish commands to robot control nodes

## Troubleshooting

### Common Issues and Solutions

1. **Audio recording problems**:
   - Ensure microphone is properly connected
   - Check audio permissions
   - Verify audio drivers are installed

2. **Whisper model loading issues**:
   - Ensure sufficient disk space for model download
   - Check internet connection
   - Try different model sizes (tiny/base)

3. **LLM API key issues**:
   - Verify API key is correct
   - Check API quota limits
   - Ensure proper network connectivity

4. **Performance issues**:
   - Use smaller Whisper models for faster processing
   - Enable GPU acceleration if available
   - Optimize audio capture parameters

## Summary

This mini-project demonstrates how to build a complete voice command system for humanoid robots. By combining Whisper for speech recognition and LLMs for intent understanding, you've created a foundation that can be extended with more sophisticated robotic capabilities.

The project showcases:
- Audio capture and processing
- Speech-to-text conversion with Whisper
- Natural language understanding with LLMs
- Command execution framework
- Error handling and user feedback

In the next chapter, we'll explore how to integrate these voice processing capabilities with cognitive planning systems for more complex robot behaviors.

[Continue to Chapter 3: Cognitive Planning for Autonomous Humanoids](../chapter3-cognitive-planning/index.md)
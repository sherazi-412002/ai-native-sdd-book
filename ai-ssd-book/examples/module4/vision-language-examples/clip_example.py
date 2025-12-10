#!/usr/bin/env python3
"""
Example implementation of CLIP for vision-language grounding
This demonstrates how to use CLIP for object detection and recognition in VLA systems
"""

import torch
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import numpy as np


class VisionLanguageExample:
    """Example vision-language system using CLIP"""

    def __init__(self, model_name: str = "openai/clip-vit-base-patch32"):
        """
        Initialize the vision-language system

        Args:
            model_name: Name of CLIP model to use
        """
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.model = CLIPModel.from_pretrained(model_name).to(self.device)
        self.processor = CLIPProcessor.from_pretrained(model_name)
        print(f"Loaded CLIP model on {self.device}")

    def detect_objects_with_text_prompt(self, image_path: str, text_prompts: list) -> dict:
        """
        Detect objects in image based on text prompts using CLIP

        Args:
            image_path: Path to image file
            text_prompts: List of text descriptions for objects to detect

        Returns:
            Dictionary with detection results
        """
        # Load image
        image = Image.open(image_path)

        # Process image and text
        inputs = self.processor(images=image, text=text_prompts, return_tensors="pt", padding=True)
        inputs = {k: v.to(self.device) for k, v in inputs.items()}

        # Get model outputs
        with torch.no_grad():
            outputs = self.model(**inputs)
            logits_per_image = outputs.logits_per_image  # shape: (1, num_prompts)

        # Convert to probabilities
        probabilities = torch.softmax(logits_per_image, dim=1)

        # Extract detections
        detections = []
        for i, prompt in enumerate(text_prompts):
            confidence = probabilities[0][i].item()
            if confidence > 0.5:  # Confidence threshold
                detections.append({
                    'prompt': prompt,
                    'confidence': confidence,
                    'class': 'detected_object',
                    'matched': True
                })
            else:
                detections.append({
                    'prompt': prompt,
                    'confidence': confidence,
                    'class': 'not_detected',
                    'matched': False
                })

        return {
            "image_path": image_path,
            "text_prompts": text_prompts,
            "detections": detections,
            "timestamp": np.datetime64('now').astype(str)
        }

    def identify_object_by_description(self, image_path: str, object_description: str) -> dict:
        """
        Identify if a specific object is present in image

        Args:
            image_path: Path to image file
            object_description: Description of object to look for

        Returns:
            Dictionary with identification result
        """
        # Single prompt detection
        result = self.detect_objects_with_text_prompt(
            image_path,
            [object_description]
        )

        # Return just the first detection
        if result["detections"]:
            return result["detections"][0]
        else:
            return {
                "prompt": object_description,
                "confidence": 0.0,
                "class": "not_detected",
                "matched": False,
                "timestamp": np.datetime64('now').astype(str)
            }


# Example usage
if __name__ == "__main__":
    # Initialize vision-language processor
    vision_processor = VisionLanguageExample()

    # Example 1: Detect multiple objects
    print("=== Multiple Object Detection Example ===")
    image_path = "sample_room.jpg"  # This would be a real image file
    prompts = ["red cup", "blue book", "green plant", "black cat"]

    try:
        result = vision_processor.detect_objects_with_text_prompt(image_path, prompts)
        print(f"Image: {result['image_path']}")
        print("Detections:")
        for detection in result['detections']:
            status = "✓" if detection['matched'] else "✗"
            print(f"  {status} {detection['prompt']} (confidence: {detection['confidence']:.2f})")
    except Exception as e:
        print(f"Example 1 failed (no image file): {e}")

    # Example 2: Identify specific object
    print("\n=== Specific Object Identification Example ===")
    try:
        identification = vision_processor.identify_object_by_description(
            image_path,
            "red cup"
        )
        print(f"Looking for: {identification['prompt']}")
        print(f"Found: {'Yes' if identification['matched'] else 'No'}")
        print(f"Confidence: {identification['confidence']:.2f}")
    except Exception as e:
        print(f"Example 2 failed (no image file): {e}")
---
sidebar_position: 1
---

# Module 1: The Robotic Nervous System (ROS 2)

## Overview
Robots are physical machines, but behind their movement lies a complex communication network.  
This module introduces **ROS 2**, the framework that lets every robot component talk to each other.  
Just like the human nervous system connects the brain to every body part, ROS 2 connects AI controllers, motors, and sensors inside a humanoid robot.

## Why This Module Matters
Humanoid robots depend on dozens of joints, sensors, and processors working together.  
Without a communication layer, nothing would sync properly.  
ROS 2 provides:

- real-time messaging  
- modular system design  
- hardware abstraction  
- smooth AI integration  

By the end of this module, you will understand the backbone that keeps modern robots functional and intelligent.

## What Is ROS 2
ROS 2 is a **middleware layer** that standardizes how robot components communicate.  
It helps you build robots where:

- cameras publish image data  
- planners generate navigation paths  
- motors receive movement commands  
- AI agents supervise everything  

This structure enables advanced humanoid capabilities.

## Core Concepts of ROS 2

### ROS 2 Nodes
Nodes are independent programs that handle specific tasks. Examples:

- reading camera data  
- estimating robot position  
- controlling a leg  
- listening for voice commands  

Nodes keep the robot modular and stable.

### Topics
Topics are data channels used to publish and subscribe to messages.  
Examples:

- `/camera/color` for images  
- `/joint_states` for joint angles  
- `/cmd_vel` for movement commands  

Topics create the main data flow inside the robot.

### Services
Services allow request and response operations. Examples:

- asking for the current map  
- resetting robot pose  
- triggering a grasp action  

Use services when you need a direct answer.

### Actions
Actions handle long-running tasks such as:

- walking to a target  
- picking up an object  
- rotating an arm  

Actions support feedback and results.

## Bridging Python Agents with ROS 2 (rclpy)

### What rclpy Does
`rclpy` is the Python library for ROS 2. It allows Python programs to:

- publish commands  
- process sensor data  
- create nodes  
- integrate AI decision-making  

### What You Will Learn
In this section, you will:

- build ROS 2 nodes with Python  
- send motor commands  
- subscribe to sensor topics  
- create feedback loops  
- connect AI reasoning to robot actions  

This is where AI models and real robotics finally meet.

## Understanding URDF (Unified Robot Description Format)

### Why URDF Matters
Robots must know their own body structure to move correctly.  
URDF describes:

- limbs  
- joints and motion limits  
- sensor placement  
- physical dimensions  
- mass and inertia  

### Where URDF Is Used
URDF powers:

- ROS 2  
- Gazebo  
- Isaac Sim  
- RViz  
- motion planning  
- collision detection  

Understanding URDF means understanding a robot's digital blueprint.

## What You Will Achieve
By completing Module 1, you will be able to:

- create ROS 2 nodes  
- send commands using Python  
- read sensor streams  
- design URDF robot models  
- integrate AI with robot controllers  
- understand how robots think, communicate, and act  

This module builds the foundation for everything that follows: simulation, perception, and full humanoid autonomy.

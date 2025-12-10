# Data Model: Landing Page

## Module Card Data Structure

### Entity: ModuleCard
- **title** (string): The display title of the module
- **description** (string): Brief description of the module content
- **learningOutcomes** (array of strings): List of learning outcomes for the module
- **linkPath** (string): The URL path to the module page
- **icon** (optional, string): Optional icon identifier or path

### Example Module Card Data:
```javascript
{
  title: "Introduction to Physical AI",
  description: "Foundational concepts of artificial intelligence applied to physical systems",
  learningOutcomes: [
    "Understand the fundamentals of Physical AI",
    "Identify key applications in robotics",
    "Analyze AI-physical system interactions"
  ],
  linkPath: "/modules/introduction",
  icon: "ai-icon" // optional
}
```

## Setup Guide Data Structure

### Entity: SetupGuide
- **title** (string): The display title of the setup guide
- **description** (string): Brief description of what the guide covers
- **linkPath** (string): The URL path to the setup guide
- **category** (string): Category for the guide (workstation, edge-kit, cloud)

### Example Setup Guide Data:
```javascript
{
  title: "Workstation Setup Guide",
  description: "Set up your development environment for robotics development",
  linkPath: "/setup/workstation",
  category: "workstation"
}
```

## Page Section Data Structure

### Entity: PageSection
- **id** (string): Unique identifier for the section
- **title** (string): Section title (if applicable)
- **content** (array): Array of content items (module cards, setup guides, etc.)
- **className** (string): CSS class for styling
- **isVisible** (boolean): Whether the section should be visible

## Animation Configuration

### Entity: AnimationConfig
- **type** (string): Type of animation (fade-in, slide-up, staggered)
- **delay** (number): Delay before animation starts (in ms)
- **duration** (number): Duration of animation (in ms)
- **stagger** (number): Stagger delay between elements (in ms)
- **easing** (string): Easing function for animation

### Example Animation Config:
```javascript
{
  type: "fade-in",
  delay: 0,
  duration: 500,
  stagger: 100,
  easing: "ease-out"
}
```

## Hero Section Data

### Entity: HeroSection
- **headline** (string): Main headline text
- **subhead** (string): Subheading text
- **ctaText** (string): Call-to-action button text
- **ctaLink** (string): Link for the call-to-action button
- **backgroundColor** (string): Background color for the section
- **textColor** (string): Text color for the section

### Example Hero Section Data:
```javascript
{
  headline: "Master Physical AI & Humanoid Robotics",
  subhead: "A comprehensive hands-on guide to building intelligent physical systems",
  ctaText: "Start Learning →",
  ctaLink: "/modules/introduction",
  backgroundColor: "#121212",
  textColor: "#FFFFFF"
}
```

## Navigation Configuration

### Entity: NavigationConfig
- **headerShadow** (object): Configuration for header shadow effect
  - **enabled** (boolean): Whether shadow effect is enabled
  - **color** (string): Shadow color
  - **opacity** (number): Shadow opacity
- **scrollThreshold** (number): Scroll threshold in pixels to trigger effects

### Example Navigation Config:
```javascript
{
  headerShadow: {
    enabled: true,
    color: "#000000",
    opacity: 0.3
  },
  scrollThreshold: 10
}
```

## Responsive Design Breakpoints

### Entity: Breakpoints
- **mobile** (number): Mobile breakpoint in pixels (max-width)
- **tablet** (number): Tablet breakpoint in pixels (max-width)
- **desktop** (number): Desktop breakpoint in pixels (min-width)

### Standard Breakpoints:
```javascript
{
  mobile: 768,
  tablet: 1024,
  desktop: 1025
}
```

## Color Palette

### Entity: ColorPalette
- **primary** (string): Primary accent color (#6A0DAD - Deep Purple)
- **secondary** (string): Secondary accent color (#00BFFF - Bright Sky Blue)
- **background** (string): Background color (#121212 - Dark theme)
- **surface** (string): Surface elements color (#1E1E1E)
- **textPrimary** (string): Primary text color (#FFFFFF)
- **textSecondary** (string): Secondary text color (#B0B0B0)
- **textTertiary** (string): Tertiary text color (#888888)
- **border** (string): Border color (#333333)

### Color Palette Implementation:
```javascript
{
  primary: "#6A0DAD",        // Deep Purple
  secondary: "#00BFFF",      // Bright Sky Blue
  background: "#121212",     // Dark background
  surface: "#1E1E1E",        // Surface elements
  textPrimary: "#FFFFFF",    // Primary text
  textSecondary: "#B0B0B0",  // Secondary text
  textTertiary: "#888888",   // Tertiary text
  border: "#333333"          // Border color
}
```
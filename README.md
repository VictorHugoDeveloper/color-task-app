# Color Task App

A React Native application developed as part of a technical assessment. The app demonstrates modern mobile development practices, state management, animations, and clean architecture principles.

## 🎯 Challenge Description

Create a mobile application that:
- Displays "Hello there" in the center of the screen
- Changes background color randomly when tapping anywhere on the screen
- Implements smooth color transitions and animations
- Includes additional features for bonus points

## ✨ Features

- 🎨 Random color generation with tap gesture
- 🔄 Smooth fade animations between colors
- 💾 Persistent storage of colors and settings
- ❤️ Favorite colors system
- ↩️ Color history with undo functionality
- 🎚️ Color intensity adjustment
- 📱 Responsive design
- 🌓 Dynamic text contrast

## 🛠 Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **React Native Reanimated** - Animations
- **React Native Gesture Handler** - Touch interactions
- **AsyncStorage** - Data persistence

## 📁 Project Structure

```
src/
├── app/                 # Expo Router configuration
│   ├── _layout.tsx     # Root layout with providers
│   └── index.tsx       # Main entry point
├── components/         # Reusable UI components
│   ├── ActionButton.tsx
│   └── SavedColorsList.tsx
├── hooks/             # Custom React hooks
│   ├── useColorAnimation.ts
│   ├── useColorPersistence.ts
│   └── useFadeAnimation.ts
├── store/            # Redux store and state management
│   ├── store.ts
│   └── colorSlice.ts
└── theme/            # Theme configuration
    └── index.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. Clone the repository:

2. Install dependencies:
```bash
yarn install
# or
npm install
```

3. Start the development server:
```bash
yarn start
# or
npm start
```

4. Run on your preferred platform:
```bash
# For iOS
yarn ios
# or
npm run ios

# For Android
yarn android
# or
npm run android
```

## 🎮 Usage

- **Change Color**: Tap anywhere on the screen (except controls)
- **Adjust Intensity**: Use the slider to modify color brightness
- **Save Favorites**: Tap the heart icon to save current color
- **Undo**: Press the undo button to go back to previous colors
- **View History**: Scroll through your color history in the saved colors list
- **Quick Select**: Tap any saved color to apply it

## 🏗 Architecture

The application follows a clean architecture approach with:
- Separation of concerns
- Centralized state management
- Custom hooks for business logic
- Reusable components
- Type safety throughout
- Persistent storage integration

## 🧪 Testing

To run the test suite:
```bash
yarn test
# or
npm test
```

## 📱 Platform Support

- iOS 13.0 and above
- Android API level 21 and above

## 🤝 Contributing

This is a technical assessment project, but suggestions and feedback are welcome. Feel free to:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

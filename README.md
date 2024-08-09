# ranify

**ranify** is a library for creating customizable rain effects for React projects.

## Installation

```bash
pnpm install ranify
# or
npm install ranify
# or
yarn add ranify
```

### Usage

#### React

To use the rain effect in a React project, you can import the component and use it directly in your React components.

Example

1. Import the Components

```tsx
import { Ranify } from 'ranify'
```

2. Use the Component in Your Project

```tsx
import React from 'react'
import { Ranify } from 'ranify'

const App: React.FC = () => {
  return (
    <div>
      <Ranify
        intensity={0.5}
        speed={3}
        direction={{ x: 0, y: 1 }}
        color='rgba(255, 255, 255, 0.8)'
        thickness={2}
      />
    </div>
  )
}

export default App
```

### Configuration

#### Component Properties

- **'intensity'** (number): Controls the intensity of the rain. Values between 0 and 1.
- **'speed'** (number): Controls the speed of the rain. Positive values.
- **'direction'** (object): Defines the wind direction with x and y properties.
- **'color'** (string): Defines the color of the raindrops. Example: "rgba(255, 255, 255, 0.8)".
- **'thickness'** (number): Defines the thickness of the raindrops. Positive values.

### Configuration Example

```tsx
<Ranify
  intensity={0.7}
  speed={5}
  direction={{ x: 1, y: 0.5 }}
  color='rgba(0, 0, 255, 0.6)'
  thickness={3}
/>
```

### Contributing

If you want to contribute to the project, feel free to open issues and pull requests. Please follow the contribution guidelines and maintain code quality.

### License

This project is licensed under the MIT License. See the LICENSE file for more details.

### Contact

If you have any questions or suggestions, please contact us at: thiagotnon@gmail.com.

Thank you for using [ranify](https://github.com/thiagotnon/ranify.git)! We hope you enjoy the rain effect in your projects.

Made with 💜 by [thiagotnon](https://github.com/thiagotnon).

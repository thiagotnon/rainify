# Rainify 🌧️

**Rainify** is a library for creating customizable rain effects for React projects.

## Installation

```bash
pnpm install Rainify
# or
npm install Rainify
# or
yarn add Rainify
```

### Usage

#### React

To use the rain effect in a React project, you can import the component and use it directly in your React components.

Example

1. Import the Components

```tsx
import { Rainify } from 'Rainify'
```

2. Use the Component in Your Project

```tsx
import { Rainify } from 'Rainify'

const App = () => {
  return (
    <Rainify
      isRaining={isRaining}
      intensity={1000}
      color='rgba(255, 255, 255, 0.5)'
      zIndex={0}
      speed={10}
      wind={10}
      thickness={1}
      splashColor='rgba(255, 255, 255, 0.5)'
      splashDuration={6}
    />
  )
}

export default App
```

### Configuration

#### Component Properties

| Prop           | Type    | Default                    | Description                                                                |
| -------------- | ------- | -------------------------- | -------------------------------------------------------------------------- |
| intensity      | number  | `50`                       | Controls the intensity of the rain.                                        |
| speed          | number  | `1`                        | Sets the speed of the raindrops.                                           |
| wind           | number  | `0`                        | Defines the wind direction.                                                |
| color          | string  | `rgba(255, 255, 255, 0.5)` | Specifies the color of the raindrops. Example: "rgba(255, 255, 255, 0.5)". |
| thickness      | number  | `1`                        | Defines the thickness of the raindrops.                                    |
| isRaining      | boolean | `true`                     | Enables or disables the rain effect.                                       |
| className      | string  | `''`                       | Applies a custom CSS class to the canvas element                           |
| zIndex         | number  | `0`                        | Controls the z-index of the canvas to manage stacking order.               |
| splashColor    | string  | `rgba(255, 255, 255, 0.5)` | Defines the color of the splash effect when raindrops hit the ground.      |
| splashDuration | number  | `60`                       | Sets the duration of the splash effect before it fades out.                |

### Configuration Example

```tsx
<Rainify
  isRaining={isRaining}
  intensity={1000}
  color='rgba(255, 255, 255, 0.5)'
  zIndex={0}
  speed={10}
  wind={10}
  thickness={1}
  splashColor='rgba(255, 255, 255, 0.5)'
  splashDuration={6}
  className='my-custom-class'
/>
```

### Contributing

If you want to contribute to the project, feel free to open issues and pull requests. Please follow the contribution guidelines and maintain code quality.

### License

This project is licensed under the MIT License. See the LICENSE file for more details.

### Contact

Thank you for using [Rainify](https://github.com/thiagotnon/rainify.git)! I hope you enjoy the rain effect in your projects.

Made with 💜 by [thiagotnon](https://github.com/thiagotnon).

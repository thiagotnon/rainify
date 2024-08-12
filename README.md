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
    <div>
      <Rainify
        intensity={0.5}
        speed={3}
        wind={0}
        color='rgba(255, 255, 255, 0.8)'
        thickness={2}
        isEnabled
      />
    </div>
  )
}

export default App
```

### Configuration

#### Component Properties

| Prop      | Type    | Default                      | Description                                                                |
| --------- | ------- | ---------------------------- | -------------------------------------------------------------------------- |
| intensity | number  | `50`                         | Controls the intensity of the rain.                                        |
| speed     | number  | `1`                          | Sets the speed of the raindrops.                                           |
| wind      | number  | `0`                          | Defines the wind direction.                                                |
| color     | string  | `"rgba(128, 128, 128, 0.5)"` | Specifies the color of the raindrops. Example: "rgba(255, 255, 255, 0.8)". |
| thickness | number  | `1`                          | Defines the thickness of the raindrops.                                    |
| isEnabled | boolean | `true`                       | Enables or disables the rain effect.                                       |
| className | string  | `''`                         | Applies a custom CSS class to the canvas element                           |

### Configuration Example

```tsx
<Rainify
  intensity={0.7}
  speed={5}
  wind={0}
  color='rgba(0, 0, 255, 0.6)'
  thickness={3}
  isEnabled
  className='my-custom-class'
/>
```

### Contributing

If you want to contribute to the project, feel free to open issues and pull requests. Please follow the contribution guidelines and maintain code quality.

### License

This project is licensed under the MIT License. See the LICENSE file for more details.

### Contact

If you have any questions or suggestions, please contact us at: thiagotnon@gmail.com.

Thank you for using [Rainify](https://github.com/thiagotnon/rainify.git)! I hope you enjoy the rain effect in your projects.

Made with 💜 by [thiagotnon](https://github.com/thiagotnon).

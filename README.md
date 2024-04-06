# PeerPulse Frontend

Welcome to the PeerPulse frontend repository! This repository contains the frontend codebase for the PeerPulse social media platform. PeerPulse is a blend of Web2 and Web3 aiming to provide a seamless and engaging social media experience for college students.

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

## Features

- **User Authentication**: Secure user authentication using JSON Web Tokens (JWT).
- **Internationalization**: Built-in support for multiple languages using i18next library.
- **Responsive Design**: Ensures optimal user experience across various devices and screen sizes.
- **Dynamic Routing**: Navigation using React Router for smooth and efficient page transitions.
- **Error Handling**: Comprehensive error handling with Sentry for efficient issue detection and debugging.
- **Form Handling**: Form validation and submission using React Hook Form with Zod schema validation.
- **Media Upload**: Ability to upload media files such as images and videos.
- **Component Library**: Utilizes Radix UI with shadcn/ui and Lucide icons for consistent and visually appealing UI components.

## Getting Started

To get started with the PeerPulse frontend development environment, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Open-Tech-Devs/peerpulse_fe.git
   ```

2. Install dependencies:

   ```bash
   cd peerpulse_fe
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```dotenv
   VITE_API_ENDPOINT=
   SENTRY_AUTH_TOKEN=""
   VITE_SENTRY_DSN=""
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Contributing

We welcome contributions from the community! To contribute to PeerPulse, please follow these guidelines:

- Fork the repository and create a new branch for your feature or fix.
- Make your changes and ensure that the codebase passes linting and tests.
- Please write clear and concise commit messages and PR descriptions.
- Refrain yourself from creating PRs without an associated issue for bug fixes or features.

By contributing to this project, you agree to abide by the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Support Us

If you find PeerPulse useful, consider supporting us by:

- Making a donation to help fund the project's development.
- Spreading the word and sharing PeerPulse with others in your network.

Your support is greatly appreciated!

---

**© 2024 Open Tech Devs.**

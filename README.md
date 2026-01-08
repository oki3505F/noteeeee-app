# Note App

A simple note-taking application built with React, Vite, and Capacitor. This application is designed to be a simple, and elegant way to create, view, and manage your notes.

![Note App Screenshot](https://upload.wikimedia.org/wikipedia/commons/2/2a/Note_icon.svg) 

## Features

*   **Create and Edit Notes:** Easily create new notes and edit existing ones.
*   **Markdown Support:** Write notes in Markdown for rich text formatting.
*   **Cross-Platform:** Runs on the web and as a native Android application.

## Download

You can download the latest Android APK from the releases page:

[**Download note-app.apk**](https://github.com/oki3505F/note-app/releases/latest)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm
*   Java JDK 17
*   Android SDK

### Installation

1.  Clone the repo
    ```sh
    git clone https://github.com/your_username/note-app.git
    ```
2.  Install NPM packages
    ```sh
    npm install
    ```
3.  Build the web application
    ```sh
    npm run build
    ```
4.  Sync with Capacitor
    ```sh
    npx cap sync android
    ```
5.  Build the Android APK
    ```sh
    cd android
    ./gradlew assembleDebug
    ```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks again!

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
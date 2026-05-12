# 🐾 Pet - Playwright Automation Project

This repository is dedicated to automated testing and exploring automation fundamentals using the **Playwright** framework. It includes end-to-end test configurations and theoretical implementations for robust web automation.

---

## 🚀 1. Installation
To set up the project locally, follow these steps:

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/kotavakatsiaryna/pet.git](https://github.com/kotavakatsiaryna/pet.git)
    cd pet
    ```

2.  **Install Dependencies**
    Install the required Node.js packages (including Playwright and type definitions):
    ```bash
    npm install
    ```

3.  **Install Playwright Browsers**
    Download the necessary browser binaries (Chromium, Firefox, and WebKit):
    ```bash
    npx playwright install
    ```

---

## 📂 2. Project Structure
The project is organized to keep test logic and theoretical foundations clear:

* **`theory/`**: Contains files exploring on core JavaScript concepts.
* **`tests/`**: (Default) Directory for Playwright test specifications and scripts.
* **`package.json`**: Contains project metadata, dependency versions, and script definitions.

---

## 🧪 Running Tests
Use the following commands to execute automation scripts:

### Standard Execution (Headless)
Runs the test suite in the background.
```bash
npm run test
```

### Browser mode
Runs the test suite in headed mode.
```bash
npm run test:headed
```

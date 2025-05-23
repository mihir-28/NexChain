[![Netlify Status](https://api.netlify.com/api/v1/badges/58b0d247-673d-44b2-bcca-56a30ba5720d/deploy-status)](https://app.netlify.com/sites/nexchain/deploys)

<p align="center">
  <img src="./frontend/public/logo.png" alt="NexChain Logo" width="500" />
</p>

# NexChain - A Blockchain-Based Supply Chain Management (SCM) System 🚀

NexChain is a decentralized application (DApp) that leverages blockchain technology to enhance transparency, traceability, and security in supply chain management. This project uses React (via Vite) and Tailwind CSS for the frontend, with blockchain integration powered by Truffle, Ganache, and MetaMask. A Node.js/Express backend (with MongoDB) will be added later to further extend functionality.

## Table of Contents

-   [Overview](#overview-)
-   [Features](#features-)
-   [Tech Stack](#tech-stack-)
-   [Project Timeline](#project-timeline-)
-   [Getting Started](#getting-started-)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Running the Application](#running-the-application)
-   [Project Structure](#project-structure-)
-   [Future Enhancements](#future-enhancements-)
-   [License](#license-)

## Overview 📖

This project is designed to create a blockchain-based supply chain management system that:

-   **Enhances Transparency:** All transactions are recorded on an immutable blockchain ledger.
-   **Improves Traceability:** Each product's journey through the supply chain is fully traceable.
-   **Ensures Security:** Decentralized record-keeping prevents unauthorized tampering.
-   **Streamlines Processes:** Smart contracts automate and secure business transactions.

## Features ✨

### Frontend:

-   **React (via Vite):** Fast and modern front-end development.
-   **Tailwind CSS:** Responsive and modern UI styling.
-   **MetaMask Integration:** Wallet authentication and blockchain interactions.
-   **Web3.js:** Interact with deployed smart contracts.
-   **React Router:** For multi-page navigation (if applicable).

### Blockchain Integration:

-   **Truffle:** Framework for smart contract development.
-   **Ganache:** Local blockchain environment for testing.
-   **Solidity:** Smart contract language for blockchain logic.

### Backend (Planned):

-   **Node.js/Express:** For RESTful API endpoints.
-   **MongoDB:** Off-chain data storage and analytics.

### Tech Stack 🔮

-   **Frontend:** React (Vite), Tailwind CSS, React Router, Web3.js
-   **Blockchain:** Solidity, Truffle, Ganache, MetaMask
-   **Backend (Future):** Node.js, Express, MongoDB

## Project Timeline 📅

| Phase | Timeline | Description | Status | Details |
|-------|----------|-------------|--------|---------|
| **Phase 1** | January 2025 | **Project Planning** <br> Requirements gathering and project scope definition | ✅ Completed | • Business requirements documentation<br>• User stories & use case analysis<br>• Technology stack selection<br>• Development roadmap creation |
| **Phase 2** | February 2025 | **Architecture Design** <br> Design system architecture and smart contract structure | ✅ Completed | • Smart contract architecture design<br>• Database schema modeling<br>• API endpoints planning<br>• Security architecture planning |
| **Phase 3** | March 2025 | **Frontend Development** <br> UI/UX implementation and frontend user flows | ✅ Completed | • Core UI component development<br>• User authentication flows<br>• Dashboard & analytics interfaces<br>• Product tracking visualization<br>• Responsive design implementation |
| **Phase 4** | April 2025 | **Blockchain Integration** <br> Smart contract integration and wallet connectivity | 🔄 In Progress | • Smart contract deployment<br>• Wallet connection implementation<br>• Transaction signing & verification<br>• Chain data indexing & caching<br>• Gas optimization |
| **Phase 5** | May 2025 | **Testing & Deployment** <br> QA testing, security audits and deployment | 🔜 Planned | • Automated testing suite implementation<br>• Smart contract security audits<br>• Performance optimization<br>• CI/CD pipeline setup<br>• Testnet deployment & validation |
| **Phase 6** | July 2025 | **Security Audits & Scaling** <br> Advanced security measures and performance optimizations | 🔜 Planned | • Penetration testing<br>• Third-party security audit<br>• Distributed system scaling<br>• Performance benchmarking<br>• Disaster recovery planning |
| **Phase 7** | October 2025 | **Mobile App Development** <br> Native mobile application with blockchain integration | 🔜 Planned | • React Native implementation<br>• Mobile wallet integration<br>• QR code scanning functionality<br>• Push notifications<br>• Offline capabilities |

### Project Completion

| Phase | Status |
|-------|--------|
| 🟢 Research & Planning | ✅ Completed |
| 🟠 Development | 🔄 In Progress |
| 🔵 Testing | 🔜 Coming Soon |
| 🟣 Production | 🔜 Coming Soon |

### Features Status

| Feature | Status | Availability |
|---------|--------|--------------|
| Product Tracking | ✅ Completed | Available |
| Smart Contracts | ✅ Completed | Available |
| Transaction Logging | ✅ Completed | Available |
| QR Code Integration | ✅ Completed | In Development |
| Access Control | 🔄 In Progress | In Development |
| Mobile Wallet Support | 🔜 Planned | Coming Soon |
| Analytics Dashboard | 🔜 Planned | Coming Soon |
| Supply Chain Visualization | 🔜 Planned | Coming Soon |
| Real-time Notifications | 🔜 Planned | Coming Soon |
| Multi-signature Approval | 🔜 Planned | Coming Soon |

## Getting Started 🚀

### Prerequisites

Ensure you have the following installed:

-   **Node.js & npm:** [Download Node.js](https://nodejs.org/)
-   **Git:** [Download Git](https://git-scm.com/)
-   **Ganache:** [Download Ganache](https://trufflesuite.com/ganache/)
-   **Truffle:** Install globally:
    ```bash
    npm install -g truffle
    ```

### Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/yourusername/blockchain-scm.git
    cd blockchain-scm
    ```

2. **Setup Frontend:**

    - Navigate to the `frontend` directory and install dependencies:
        ```bash
        cd frontend
        npm install
        ```
    - Check Tailwind CSS v4 setup:

        ```bash
        # Check if Tailwind is installed
        npm list tailwindcss

        # Check for the Vite plugin
        npm list @tailwindcss/vite
        ```

    - Verify the main CSS file (`src/index.css`) includes:
        ```css
        @import "tailwindcss";
        ```
    - Remember that v4 doesn't require a configuration file by default. If you have custom configurations, they should be in a separate file.

3. **Setup Smart Contracts:**

    - Navigate to the `smart-contracts` directory and initialize a Truffle project:
        ```bash
        cd ../smart-contracts
        truffle init
        ```
    - Configure `truffle-config.js` to use Ganache:
        ```js
        module.exports = {
            networks: {
                development: {
                    host: "127.0.0.1",
                    port: 7545,
                    network_id: "*",
                },
            },
            compilers: {
                solc: { version: "0.8.4" },
            },
        };
        ```
    - Compile and deploy smart contracts:
        ```bash
        truffle compile
        truffle migrate --network development
        ```

4. **(Optional) Setup Backend Later:**
    - A backend using Node.js/Express and MongoDB will be integrated in a later phase.

### Running the Application

1. **Start Ganache:**  
   Launch Ganache to run your local blockchain on port `7545`.

2. **Run the Frontend:**

    - Navigate to the `frontend` directory and start the Vite development server:
        ```bash
        cd frontend
        npm run dev
        ```
    - The app should open in your default browser.

3. **Smart Contract Interactions:**
    - Use MetaMask to connect your wallet and interact with the blockchain from the frontend.

## Project Structure 📂

```plaintext
blockchain-scm/
├── backend/              # Node.js/Express API server (to be implemented later)
├── frontend/             # Vite-based React application
│   ├── public/           # Static assets and index.html
│   ├── src/
│   │   ├── assets/       # Images, fonts, etc.
│   │   ├── components/   # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── pages/        # Page components (Home, Dashboard, etc.)
│   │   ├── App.jsx       # Main App component
│   │   └── main.jsx      # Vite entry point
├── smart-contracts/      # Solidity contracts and Truffle configuration
│   ├── contracts/        # Smart contract files (.sol)
│   ├── migrations/       # Migration scripts for deploying contracts
│   ├── test/             # Smart contract tests
│   └── truffle-config.js # Truffle configuration file
└── README.md             # Project documentation (this file)
```

## Future Enhancements 🔮

-   **Backend Integration:**  
    Develop a Node.js/Express server with MongoDB for additional off-chain data storage and analytics.
-   **Advanced Blockchain Features:**  
    Integrate more complex smart contracts for enhanced product lifecycle management and automated workflows.
-   **Mobile Responsiveness & PWA:**  
    Enhance the frontend to support Progressive Web App (PWA) capabilities and mobile devices.

-   **IoT Integration:**  
    Incorporate IoT devices for real-time tracking of products through the supply chain.

## License 📄

This project is licensed under a proprietary license. See [LICENSE](LICENSE.md) for details.

---
<p align="center">
  <b>NexChain</b> - Transforming Supply Chains with Blockchain Technology
</p>

<p align="center">
  Made With 💪 Dedication, 🧠 Innovation, and Countless ☕ Coffee Sessions
</p>

<p align="center">
  Happy Coding! 😃
</p>

# Server-Side Word Guessing Game

A simple server-side word guessing game built with Node.js and Express, allowing multiple users to play independently without client-side JavaScript.

## Features

- **Session-Based Gameplay**: Each user has a unique game session tracked via cookies.
- **Server-Rendered Pages**: All game interactions are handled on the server, ensuring compatibility and simplicity.
- **Word Matching Logic**: Provides feedback on guessed words, indicating the number of matching letters with the secret word.
- **User Authentication**: Simple username-based login without passwords, with specific usernames restricted.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Ondorna/server-side-word-guessing-game.git
   cd server-side-word-guessing-game

2. **Install dependencies**:
  npm install

3. **Start the server**:
  node server.js

4. **Access the game**:
  Open your browser and navigate to http://localhost:3000.

**How to Play**
	1.	Login: Enter a unique username to start or resume a game session.
	2.	Guess the Word: Input your guesses to match the secret word. The game will provide feedback on the number of matching letters.
	3.	Win Condition: Guess the correct word to win. You can then start a new game or logout.

**Project Structure**
	•	server.js: Main server file handling routes and game logic.
	•	views/: Contains HTML templates rendered by the server.
	•	public/: Static assets like CSS files.
	•	data/words.js: List of possible secret words.

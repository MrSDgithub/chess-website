# ♟️ Chess Tournament Website

A modern, responsive web application to manage and showcase chess tournaments — including registration, scheduling, and live match updates.

## 🚀 Features

- 🧍 Player registration
- 🕒 Match scheduling system
- 📺 Live match updates
- 🏆 Leaderboard display
- 📄 Player and match statistics
- 🛡️ Secure backend via Supabase

## 🔧 Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Backend-as-a-Service:** Supabase
- **Linting:** ESLint
- **Bundling & Dev Server:** Vite

## 📦 Project Structure

```
project/
│
├── index.html               # Root HTML template
├── package.json             # Project metadata and dependencies
├── tsconfig.app.json        # TypeScript configuration
├── tailwind.config.js       # TailwindCSS configuration
├── vite.config.ts           # Vite build configuration
├── .env                     # Environment variables (Supabase keys, etc.)
├── .gitignore               # Git ignored files
├── postcss.config.js        # PostCSS setup
└── src/                     # React source code (components, pages)
```

## 🛠️ Installation

```bash
# Clone the repository
git clone https://github.com/your-username/chess-tournament-website.git
cd chess-tournament-website

# Install dependencies
npm install

# Start the development server
npm run dev
```

> Make sure to configure the `.env` file with your Supabase credentials before running.

## 🧪 Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm run lint` – Run ESLint

## 🧬 Environment Variables

Create a `.env` file in the root directory with the following structure:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📷 Screenshots

![Screenshot 2025-06-28 130208](https://github.com/user-attachments/assets/3d76e92a-7355-48e6-9210-f6824cb2ca37)


## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

**Developed with ❤️ using React and Supabase.**

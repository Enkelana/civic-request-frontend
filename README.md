CivicRequest Frontend
Frontend i sistemit CivicRequest — Platforma e Kërkesave të Qytetarëve
![React](https://img.shields.io/badge/React-18-61DAFB)
![Axios](https://img.shields.io/badge/Axios-Latest-5A29E4)
![Chart.js](https://img.shields.io/badge/Chart.js-Latest-FF6384)
![Deploy](https://img.shields.io/badge/Deploy-Vercel-000000)
---
Përshkrimi
CivicRequest Frontend është një React.js aplikacion që ofron një ndërfaqe moderne dhe intuitive për menaxhimin e kërkesave të qytetarëve ndaj institucioneve publike. Përfshin dashboard me grafiqe, eksport PDF/Excel, Dark Mode, dhe autentifikim të plotë me JWT.
🌐 App Live: https://civic-request-frontend.vercel.app
---
 Stack Teknologjik
Teknologjia	Versioni	Roli
React.js	18	UI Library
React Router DOM	Latest	Routing
Axios	Latest	HTTP Client + JWT Interceptors
Chart.js + react-chartjs-2	Latest	Grafiqe interaktive
jsPDF + jspdf-autotable	Latest	Eksport PDF
xlsx + file-saver	Latest	Eksport Excel
React Context API	Built-in	Dark/Light Mode
---
📁 Struktura e Projektit
```
civic-request-frontend/
├── src/
│   ├── pages/
│   │   ├── Login.js          # Faqja e autentifikimit
│   │   ├── Register.js       # Regjistrim zyrtari të ri
│   │   ├── Home.js           # Dashboard me grafiqe
│   │   ├── Citizens.js       # Menaxhim qytetarësh
│   │   ├── Requests.js       # Menaxhim kërkesash
│   │   └── Profile.js        # Profili i zyrtarit
│   ├── components/
│   │   ├── Navbar.js         # Navigim + Logout + Dark Mode
│   │   └── Pagination.js     # Komponent i ripërdorshëm
│   ├── services/
│   │   ├── api.js            # Axios instance + JWT interceptors
│   │   └── exportService.js  # Eksport PDF dhe Excel
│   ├── context/
│   │   └── ThemeContext.js   # Dark/Light Mode Context
│   ├── utils/
│   │   └── validators.js     # Validim i formave
│   └── App.js                # Routing + PrivateRoute
├── .env                      # Environment variables
└── package.json
```
---
✨ Funksionalitetet
Funksionaliteti	Përshkrimi
🔐 Autentifikim JWT	Login, Register, Logout, token automatik
📊 Dashboard	Statistika + Pie, Bar, Line Chart
👥 Qytetarë	Shto, shiko, filtro me pagination
📋 Kërkesa	CRUD i plotë + ndryshim statusi
🔍 Kërkim & Filtrim	Sipas titullit, statusit, kategorisë
📊 Eksport Excel	Lista e plotë ose e filtruar
📄 Eksport PDF	Me header, tabelë dhe footer
🌙 Dark Mode	Light/Dark theme + localStorage
📄 Pagination	5 rekorde për faqe
👤 Profil	Shfaq të dhëna + ndrysho fjalëkalim
✅ Validim	Email, telefon, emër, titull
📧 Email	Njoftime automatike nga backend
---
⚙️ Instalim Lokal
Kërkesat
Node.js v20+
npm v10+
Hapat
1. Clone projektin
```bash
git clone https://github.com/Enkelana/civic-request-frontend.git
cd civic-request-frontend
```
2. Instalo paketat
```bash
npm install
```
3. Krijo fajllin `.env`
```env
REACT_APP_API_URL=http://localhost:5280/api
```
> ⚠️ Për production: `REACT_APP_API_URL=https://civic-request-api.onrender.com/api`
4. Starto projektin
```bash
npm start
```
5. Hap në browser
```
http://localhost:3000
```
---
🌐 Deploy (Vercel)
Projekti është i konfiguruar për deploy automatik në Vercel nga GitHub.
Environment Variable në Vercel:
```
REACT_APP_API_URL = https://civic-request-api.onrender.com/api
```
---
📱 Faqet
Faqja	URL	Përshkrimi
Login	`/login`	Autentifikim me email + fjalëkalim
Register	`/register`	Regjistrim zyrtar i ri
Dashboard	`/`	Statistika + grafiqe
Qytetarët	`/citizens`	Lista + shtim qytetarësh
Kërkesat	`/requests`	Lista + kërkim + eksport
Profili	`/profile`	Të dhëna + ndryshim fjalëkalimi
---
🔒 Autentifikim
Aplikacioni përdor JWT Token për autentifikim:
Pas login-it, token ruhet në `localStorage`
Axios interceptor shton automatikisht `Authorization: Bearer {token}` në çdo kërkesë
Nëse token skadon, redirect automatik te `/login`
`PrivateRoute` mbron të gjitha faqet e brendshme
---
👤 Autor
Enkelana 
---
🔗 Linke
🌐 App Live: https://civic-request-frontend.vercel.app
📡 Backend API: https://civic-request-api.onrender.com
💻 Backend Repo: https://github.com/Enkelana/civic-request-api

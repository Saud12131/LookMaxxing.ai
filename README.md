<div align="center">
  <h1 align="center">✨ LookMaxxing.ai</h1>
  <p align="center">AI-Powered Personal Style Transformation Platform</p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
  [![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
</div>

## 🚀 Overview

LookMaxxing.ai is a cutting-edge platform that leverages AI to provide personalized style and appearance recommendations. Whether you're looking to refine your fashion sense, get personalized grooming tips, or understand how to best present yourself, LookMaxxing.ai offers data-driven insights to help you put your best face forward.

## ✨ Key Features

### 🎨 AI-Powered Style Analysis
- **Personalized Recommendations**: Get custom style advice based on your unique features
- **Facial Analysis**: AI-driven insights about your facial features and how to enhance them
- **Color Matching**: Discover the perfect color palette for your skin tone and undertone

### 💬 Interactive AI Assistant
- Real-time chat interface for style advice
- Context-aware responses to your fashion and grooming questions
- Loading indicators for smooth user experience

### 📸 Photo Analysis
- Upload photos for detailed style analysis
- Before/after comparisons with style recommendations
- Privacy-focused: Your images stay private and secure

### 👤 User Experience
- Responsive design that works on all devices
- Beautiful UI with smooth animations and transitions
- Dark theme with vibrant gradients for comfortable viewing

### 🔐 Secure Authentication
- Email/password authentication
- Protected routes for user content
- Profile management system

### 🌟 Transformation Journey
- **Social Media Feed**: Share your style transformation journey with the community
- **Before/After Posts**: Create posts showing your progress with before/after images

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework for server-rendered applications
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth transitions
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Shadcn/ui** - Beautifully designed components

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Type-safe database client
- **Firebase** - Authentication and storage
- **Google AI** - AI-powered recommendations

### Database
- **SQL Database** via Prisma
- **Firestore** for real-time data

### Deployment
- **Vercel** - For frontend and serverless functions
- **Prisma Data Platform** - Database management

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- Git
- Firebase account (for authentication)
- Google AI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/lookmaxxing.ai.git
   cd lookmaxxing.ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   DATABASE_URL="your_database_connection_string"
   GOOGLE_APPLICATION_CREDENTIALS="path/to/your/firebase/credentials.json"
   GOOGLE_AI_API_KEY="your_google_ai_api_key"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your_nextauth_secret"
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 📂 Project Structure

```
src/
├── app/                    # App router pages
│   ├── (pages)/           # Protected routes
│   │   ├── home/          # User dashboard
│   │   ├── AskAi/         # AI Style Assistant
│   │   ├── intelligence/  # Style analysis
│   │   └── results/       # Analysis results
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
├── context/               # React context providers
├── lib/                   # Utility functions
└── styles/                # Global styles
```

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Google AI](https://ai.google/)

## 📞 Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/yourusername/lookmaxxing.ai](https://github.com/yourusername/lookmaxxing.ai)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
  - Next.js 13+ App Router
  - React 19 with TypeScript
  - Prisma ORM with SQL database
  - Tailwind CSS for styling
  - Framer Motion for animations

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/lookmaxxing.ai.git
   cd lookmaxxing.ai
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="your_database_connection_string"
   AUTH0_SECRET="your_auth0_secret"
   AUTH0_BASE_URL="http://localhost:3000"
   AUTH0_ISSUER_BASE_URL="your_auth0_domain"
   AUTH0_CLIENT_ID="your_auth0_client_id"
   AUTH0_CLIENT_SECRET="your_auth0_client_secret"
   GOOGLE_AI_API_KEY="your_google_ai_api_key"
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Development

### Database Setup

1. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

2. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio for database management

## 🌐 Deployment

### Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Auth0](https://auth0.com/)
- [Google AI](https://ai.google/)

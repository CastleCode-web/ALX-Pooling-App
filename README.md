# ALX Polly - Modern Polling Platform

A comprehensive, feature-rich polling platform built with Next.js 15, TypeScript, and shadcn/ui components. Features smart routing, authentication system, and a complete polling ecosystem for creating engaging polls, gathering insights, and making data-driven decisions.

## 🚀 Features

### ✅ Smart Routing & Authentication
- **Intelligent Root Routing** - Auto-redirects based on authentication status
- **Authentication Context** - Complete state management with React Context
- **Persistent Sessions** - Automatic login restoration with token management
- **Protected Routes** - HOC-based route protection with permission system
- **User Registration & Login** - Secure authentication with form validation
- **Password Strength Indicators** - Real-time password validation
- **Responsive Auth Layouts** - Mobile-first authentication pages

### ✅ Poll Management
- **Rich Poll Creation** - Comprehensive form with up to 10 options
- **Multiple Poll Types** - Single/multiple selection support
- **Category System** - Organized poll categorization
- **Expiration Settings** - Time-based poll expiration
- **Tags & Descriptions** - Enhanced poll context

### ✅ Interactive Voting
- **Real-time Voting** - Dynamic voting interface
- **Results Visualization** - Progress bars and percentages
- **Anonymous Voting** - Privacy-focused voting options
- **Vote Validation** - Prevent duplicate voting

### ✅ Community Features
- **Comments System** - Threaded discussions on polls
- **Like/Dislike** - Engagement tracking
- **User Profiles** - Public user profiles with stats
- **Follow System** - User following capabilities

### ✅ Analytics Dashboard
- **Performance Metrics** - Comprehensive poll analytics
- **Engagement Tracking** - User interaction insights
- **Trending Polls** - Discover popular content
- **Export Data** - Download analytics reports

### ✅ Modern UI/UX
- **Smart User Experience** - Context-aware routing and navigation
- **Marketing Landing Page** - Professional `/welcome` page for feature showcase
- **Responsive Design** - Mobile-first responsive layouts
- **Dark Mode Support** - System/manual theme switching
- **Accessibility** - WCAG compliant components
- **Loading States** - Skeleton loaders and smooth transitions
- **Toast Notifications** - Custom notification system
- **Error Boundaries** - Comprehensive error handling with recovery options

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks + Context
- **Form Handling**: Custom useForm hook with validation
- **Error Handling**: Custom Error Boundaries

## 📁 Project Structure

```
alx-polly/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   ├── login/                # Login page
│   │   ├── register/             # Registration page
│   │   └── layout.tsx            # Auth layout
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── dashboard/            # Main dashboard
│   │   ├── polls/                # Poll management
│   │   ├── create-poll/          # Poll creation
│   │   ├── analytics/            # Analytics dashboard
│   │   ├── settings/             # User settings
│   │   └── layout.tsx            # Dashboard layout
│   ├── welcome/                  # Marketing landing page
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   └── polls/                # Poll CRUD endpoints
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/                   # Reusable components
│   ├── auth/                     # Authentication components
│   ├── polls/                    # Poll-related components
│   ├── layout/                   # Layout components
│   └── ui/                       # shadcn/ui components
├── lib/                          # Utilities and configurations
│   ├── types/                    # TypeScript type definitions
│   ├── hooks/                    # Custom React hooks
│   │   ├── useAuth.tsx           # Authentication context & hooks
│   │   ├── useToast.tsx          # Toast notification system
│   │   └── useForm.ts            # Form management utilities
│   ├── api.ts                    # API client utilities
│   └── utils.ts                  # General utilities (40+ functions)
├── public/                       # Static assets
├── components.json               # shadcn/ui configuration
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd alx-polly
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_API_URL=/api
   DATABASE_URL=your_database_url
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)
   
   **Note**: The root page will automatically redirect you to:
   - `/polls` - If not authenticated (browse public polls)
   - `/dashboard` - If authenticated (your personal dashboard)
   - Visit `/welcome` to see the marketing page

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Add shadcn/ui components
npx shadcn@latest add [component-name]

# Type checking
npm run type-check

# Linting
npm run lint
```

## 📱 Key Pages

### Smart Routing System
- **Root Page** (`/`) - Intelligent redirect based on authentication status
  - Authenticated users → `/dashboard`  
  - Guest users → `/polls` (public browsing)
- **Marketing Page** (`/welcome`) - Professional landing page with features overview
- **Authentication Pages**
  - **Login** (`/login`) - User authentication with context integration
  - **Register** (`/register`) - User registration with automatic login

### Protected Pages
- **Dashboard** (`/dashboard`) - User overview with stats
- **All Polls** (`/polls`) - Browse and search polls
- **Poll Details** (`/polls/[id]`) - Individual poll with voting/results
- **Create Poll** (`/create-poll`) - Poll creation form
- **Analytics** (`/analytics`) - Performance metrics
- **Settings** (`/settings`) - User preferences and account management

## 🎨 UI Components

Built with shadcn/ui components including:

- **Navigation** - Responsive navigation with mobile menu
- **Forms** - Accessible form components with validation
- **Cards** - Poll cards, stat cards, info cards
- **Dialogs** - Modal dialogs for actions
- **Data Display** - Tables, progress bars, badges
- **Feedback** - Toast notifications, loading states

## 🔐 Authentication Features

- **Secure Login/Register** - Form validation and error handling
- **Password Security** - Strength indicators and validation
- **Session Management** - Persistent login state
- **Protected Routes** - Route-level authentication
- **User Profiles** - Customizable user profiles

## 📊 Poll Features

### Poll Creation
- **Rich Editor** - Title, description, and options
- **Settings Panel** - Anonymous voting, multiple selection
- **Category Selection** - Organized categorization
- **Expiration Dates** - Time-limited polls
- **Preview Mode** - Preview before publishing

### Voting & Results
- **Interactive Voting** - Single/multiple selection
- **Real-time Results** - Live vote counting
- **Results Visualization** - Charts and progress bars
- **Export Options** - Download results data

### Community
- **Comments** - Threaded discussions
- **Reactions** - Like/dislike functionality
- **Sharing** - Social sharing capabilities
- **Moderation** - Report and flag content

## 🎯 Current User Flow

### New User Experience
1. **Visit** `/` → **Auto-redirect** to `/polls` (browse without account)
2. **Discover** content → **Click** "Get Started" → `/register`
3. **Register** → **Auto-login** → **Redirect** to `/dashboard`
4. **Explore** features via marketing page at `/welcome`

### Returning User Experience
1. **Visit** `/` → **Auto-redirect** to `/dashboard` (if authenticated)
2. **Access** all protected features immediately
3. **Persistent session** across browser refreshes

### Authentication Flow
- **Smart Authentication** - Context-based state management
- **Token Management** - Access/refresh token handling
- **Route Protection** - Automatic redirection for protected pages
- **Session Persistence** - Login state restored automatically

## 🎯 Upcoming Features

- [ ] **Database Integration** - PostgreSQL/MongoDB connection
- [ ] **Real-time Updates** - WebSocket integration for live voting
- [ ] **File Uploads** - Image support for polls and profiles
- [ ] **Email Notifications** - Poll activity notifications
- [ ] **Advanced Analytics** - Demographic insights and trends
- [ ] **Mobile App** - React Native companion app
- [ ] **API Documentation** - Public API for integrations
- [ ] **Internationalization** - Multi-language support
- [ ] **Advanced Moderation** - Content filtering and user management

## 🛡️ Security & Authentication

- **Context-Based Auth** - Secure authentication state management
- **Token Management** - JWT access and refresh tokens
- **Protected Routes** - HOC-based route protection
- **Input Validation** - Client and server-side validation
- **XSS Protection** - Content sanitization
- **CSRF Protection** - Request validation
- **Rate Limiting** - API endpoint protection
- **Session Persistence** - Secure local storage handling

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Netlify** - Static site deployment
- **Railway** - Full-stack deployment
- **AWS** - Scalable cloud deployment
- **DigitalOcean** - VPS deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **shadcn** - Beautiful and accessible UI components
- **Vercel** - Deployment and hosting platform
- **Tailwind CSS** - Utility-first CSS framework

## 📞 Support

For support and questions:

- 📧 Email: support@alxpolly.com
- 💬 Discord: [Join our community](https://discord.gg/alxpolly)
- 🐛 Issues: [GitHub Issues](https://github.com/your-org/alx-polly/issues)
- 📖 Documentation: [docs.alxpolly.com](https://docs.alxpolly.com)

---

**Made with ❤️ by the ALX Polly Team**
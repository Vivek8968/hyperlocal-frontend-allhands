# 🏪 Hyperlocal Marketplace Frontend

A complete **Next.js frontend** for a hyperlocal marketplace platform that connects customers with nearby shops and local businesses. This is a modern, responsive web application built with TypeScript, Tailwind CSS, and Firebase Authentication.

## 🌟 Features

### 🔐 **Authentication System**
- Firebase Authentication with Google Login & Phone OTP
- Role-based access control (Customer, Seller, Admin)
- Protected routes with automatic redirects

### 🏠 **Customer Experience**
- **Geolocation-based Shop Discovery**: Find nearby shops using browser location
- **Product Search & Filtering**: Search products by name, category, or shop
- **Shop & Product Details**: Detailed pages with contact information
- **WhatsApp Integration**: Direct contact with shop owners
- **Category Browsing**: Browse products by categories

### 👨‍💼 **Seller Dashboard**
- Shop management interface
- Product inventory overview
- Sales statistics and analytics
- Add/edit products with image upload

### 👑 **Admin Panel**
- Complete system oversight
- Shop approval/rejection management
- Category management
- System activity logs and monitoring
- User management

## 🛠 Tech Stack

- **Framework**: Next.js 15.3.3 with TypeScript
- **Styling**: Tailwind CSS (fully responsive)
- **Authentication**: Firebase Authentication
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Routing**: Next.js App Router with dynamic routes

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project (for authentication)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Vivek8968/hyperlocal-frontend-allhands.git
   cd hyperlocal-frontend-allhands
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-url.com
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Demo Accounts

For testing purposes, the application includes demo accounts:

### Customer Account
- **Phone**: +1234567890
- **Role**: Customer
- **Access**: Browse shops, view products, contact sellers

### Seller Account  
- **Phone**: +1234567891
- **Role**: Seller
- **Access**: Manage shop, add/edit products, view analytics

### Admin Account
- **Phone**: +1234567892  
- **Role**: Admin
- **Access**: Full system access, manage shops, categories, users

## 🗂 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard
│   ├── login/             # Authentication page
│   ├── product/[id]/      # Product detail page
│   ├── search/            # Search & filtering
│   ├── seller/            # Seller dashboard
│   ├── shop/[id]/         # Shop detail page
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── Navbar.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── ShopCard.tsx       # Shop display card
│   ├── ProductCard.tsx    # Product display card
│   ├── ProtectedRoute.tsx # Route protection
│   └── ...
├── contexts/              # React contexts
│   └── AuthContext.tsx    # Authentication state
├── data/                  # Mock data for development
│   └── mockData.ts        # Sample shops, products, users
├── lib/                   # Utility libraries
│   ├── api.ts             # API client configuration
│   ├── firebase.ts        # Firebase configuration
│   └── types.ts           # TypeScript type definitions
└── styles/                # Global styles
    └── globals.css        # Tailwind CSS imports
```

## 🔌 Backend Integration

This frontend is designed to work with the FastAPI backend:
👉 **Backend Repository**: [https://github.com/Vivek8968/hyperlocalbymanus.git](https://github.com/Vivek8968/hyperlocalbymanus.git)

### API Endpoints Used:
- `/customer_service/shops` - Get nearby shops
- `/seller_service/inventory` - Manage products
- `/admin_service/shops` - Admin shop management
- `/user_service/auth/verify-token` - User authentication

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on mobile and desktop
- **Modern UI**: Clean, professional design with Tailwind CSS
- **Loading States**: Smooth loading indicators for better UX
- **Error Handling**: Comprehensive error messages and fallbacks
- **Accessibility**: ARIA labels and keyboard navigation support

## 🔒 Security Features

- **JWT Token Management**: Secure token storage and refresh
- **Role-based Access Control**: Granular permissions system
- **Input Validation**: Client-side and server-side validation
- **Secure Headers**: CORS and security headers configuration

## 📦 Mock Data

The application includes comprehensive mock data for development:
- **6 Sample Shops** with different categories and locations
- **20+ Products** across electronics, grocery, fashion categories
- **3 User Roles** with different permission levels
- **System Activity Logs** for admin monitoring

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Authentication by [Firebase](https://firebase.google.com/)

---

**🔗 Live Demo**: [Coming Soon]  
**📧 Support**: support@localmarket.com  
**🐛 Issues**: [GitHub Issues](https://github.com/Vivek8968/hyperlocal-frontend-allhands/issues)

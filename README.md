 # 🎯 Events & Activities Platform - Backend

A robust backend API for connecting individuals who want to participate in local events, sports, or hobbies but lack companions. Built with Node.js, Express, TypeScript, MongoDB, and integrated with Cloudinary and SSLCommerz.

## 🚀 Features

- ✅ **User Authentication**: JWT-based secure authentication with role-based access control
- 👤 **User Management**: Complete CRUD operations with profile image upload
- 🎉 **Event Management**: Create, update, delete, and search events with advanced filtering
- 💰 **Payment Integration**: SSLCommerz payment gateway for paid events
- ⭐ **Review System**: Rate and review hosts after attending events
- 🔒 **Role-Based Access**: User, Host, and Admin roles with specific permissions
- 📸 **Image Upload**: Cloudinary integration with Multer for profile and event images
- 🔍 **Advanced Search**: Filter events by type, location, date, and status

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + Bcrypt
- **File Upload**: Multer + Cloudinary
- **Payment**: SSLCommerz
- **Dev Tools**: ts-node-dev

## 📁 Project Structure

```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.route.ts
│   ├── user/
│   │   ├── user.interface.ts
│   │   ├── user.model.ts
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   └── user.route.ts
│   ├── event/
│   │   ├── event.interface.ts
│   │   ├── event.model.ts
│   │   ├── event.controller.ts
│   │   ├── event.service.ts
│   │   └── event.route.ts
│   ├── review/
│   │   ├── review.interface.ts
│   │   ├── review.model.ts
│   │   ├── review.controller.ts
│   │   ├── review.service.ts
│   │   └── review.route.ts
│   └── payment/
│       ├── payment.interface.ts
│       ├── payment.model.ts
│       ├── payment.controller.ts
│       ├── payment.service.ts
│       └── payment.route.ts
├── middlewares/
│   ├── auth.middleware.ts
│   ├── multer.middleware.ts
│   └── errorHandler.middleware.ts
├── config/
│   ├── index.ts
│   ├── db.ts
│   └── cloudinary.ts
├── utils/
│   ├── AppError.ts
│   ├── catchAsync.ts
│   ├── sendResponse.ts
│   ├── uploadToCloudinary.ts
│   └── generateTransactionId.ts
├── app.ts
└── server.ts
```

## 🔧 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd events-activities-backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000

DATABASE_URL=mongodb://localhost:27017/events-activities

JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

BCRYPT_SALT_ROUNDS=12

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

SSL_STORE_ID=your-store-id
SSL_STORE_PASSWORD=your-store-password
SSL_IS_LIVE=false

FRONTEND_URL=http://localhost:3000
```

4. **Run the development server**
```bash
npm run dev
```

5. **Build for production**
```bash
npm run build
npm start
```

## 📊 Database Schema

### User Model
- fullName, email, password (hashed)
- role: user | host | admin
- profileImage, bio, interests
- location: { city, area }
- rating, totalRatings

### Event Model
- name, type, description
- host (ref: User)
- date, time, location
- minParticipants, maxParticipants, currentParticipants
- participants (array of User refs)
- joiningFee, eventImage
- status: open | full | cancelled | completed

### Review Model
- event (ref: Event)
- host (ref: User)
- reviewer (ref: User)
- rating (1-5), comment

### Payment Model
- user (ref: User)
- event (ref: Event)
- host (ref: User)
- amount, transactionId
- status: pending | completed | failed | refunded

## 🔐 Authentication Flow

1. **Register**: POST `/api/auth/register`
   - Creates user with hashed password
   - Returns user data and JWT token

2. **Login**: POST `/api/auth/login`
   - Validates credentials
   - Returns user data and JWT token

3. **Protected Routes**: Include token in header
   ```
   Authorization: Bearer <your-token>
   ```

## 🌐 API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/change-password` - Change password (protected)

### User Routes
- `GET /api/users/me` - Get my profile (protected)
- `GET /api/users/:id` - Get user profile by ID
- `PATCH /api/users/update` - Update profile (protected)
- `PATCH /api/users/upload-image` - Upload profile image (protected)
- `PATCH /api/users/upgrade-to-host` - Upgrade to host (protected)
- `GET /api/users/all` - Get all users (admin only)

### Event Routes
- `POST /api/events/create` - Create event (host only)
- `GET /api/events/all` - Get all events with filters
- `GET /api/events/:id` - Get event details
- `PATCH /api/events/:id` - Update event (host only)
- `DELETE /api/events/:id` - Delete event (host only)
- `POST /api/events/:id/join` - Join event (protected)
- `DELETE /api/events/:id/leave` - Leave event (protected)
- `GET /api/events/hosted` - Get hosted events (protected)
- `GET /api/events/joined` - Get joined events (protected)

### Review Routes
- `POST /api/reviews/create` - Create review (protected)
- `GET /api/reviews/host/:hostId` - Get host reviews
- `GET /api/reviews/event/:eventId` - Get event reviews

### Payment Routes
- `POST /api/payments/initialize` - Initialize payment (protected)
- `GET /api/payments/my-payments` - Get user payments (protected)
- `GET /api/payments/revenue` - Get host revenue (host only)

## 🧪 Testing with Postman

1. Import the provided Postman collection JSON
2. Set the `base_url` variable to your API URL
3. After login, copy the token and set it in the `token` variable
4. Test all endpoints with proper authentication

## 🔑 Key Features Implementation

### Password Security
- Passwords are hashed using bcrypt with configurable salt rounds
- Password hashing and comparison are handled in the service layer
- Models and interfaces remain clean

### Image Upload
- Multer handles multipart/form-data
- Images are stored in memory buffer
- Uploaded to Cloudinary with automatic optimization
- Profile and event images are organized in separate folders

### Role-Based Access Control
- Middleware checks JWT token and user role
- Different permissions for User, Host, and Admin
- Flexible role assignment per route

### Database Relationships
- User → Events (as host)
- User → Events (as participant)
- Event → Reviews
- User (Host) → Reviews
- Proper indexing for efficient queries

### Error Handling
- Global error handler with detailed error messages
- Validation errors from Mongoose
- Custom AppError class
- 404 handler for undefined routes

## 📝 Environment Setup

### MongoDB
```bash
# Local MongoDB
mongod --dbpath /path/to/data

# Or use MongoDB Atlas (cloud)
```

### Cloudinary
1. Sign up at https://cloudinary.com
2. Get your credentials from dashboard
3. Add to .env file

### SSLCommerz
1. Sign up at https://sslcommerz.com
2. Get sandbox/live credentials
3. Add to .env file

## 🚦 Development Tips

- Use `npm run dev` for hot reload during development
- Check console for detailed error messages
- MongoDB indexes are created automatically
- Review schema hooks handle automatic calculations

## 📦 Dependencies

```json
{
  "bcrypt": "^5.1.1",
  "cloudinary": "^1.41.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.0.3",
  "multer": "^1.4.5-lts.1",
  "sslcommerz-lts": "^1.1.0"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

MIT License

## 👨‍💻 Author

Built with ❤️ for connecting people through shared activities

---

**Happy Coding! 🎉**
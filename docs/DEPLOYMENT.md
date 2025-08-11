# Deployment Guide

This guide covers how to deploy LearnVerse to various platforms.

## Prerequisites

- Node.js 16+ installed
- Git repository set up
- Environment variables configured

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update the following variables:
- `VITE_API_BASE_URL` - Your backend API URL
- `VITE_JWT_SECRET` - JWT secret for authentication
- Other configuration variables as needed

## Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

## Deployment Options

### 1. Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

3. Set environment variables in Vercel dashboard

### 2. Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy to Netlify:
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repository

3. Configure environment variables in Netlify dashboard

### 3. GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://anas-abdullah-eng.github.io/learnverse-platform"
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

### 4. Docker

1. Create Dockerfile:
   ```dockerfile
   FROM node:18-alpine as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. Build and run:
   ```bash
   docker build -t learnverse .
   docker run -p 80:80 learnverse
   ```

### 5. AWS S3 + CloudFront

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload `dist` folder to S3 bucket

3. Configure CloudFront distribution

4. Set up custom domain (optional)

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test authentication flow
- [ ] Check API connectivity
- [ ] Verify responsive design on mobile
- [ ] Test dark mode functionality
- [ ] Confirm all features work as expected
- [ ] Set up monitoring and analytics
- [ ] Configure error tracking (Sentry, etc.)

## Environment-Specific Configurations

### Development
```bash
npm run dev
```

### Staging
```bash
VITE_API_BASE_URL=https://staging-api.learnverse.com npm run build
```

### Production
```bash
VITE_API_BASE_URL=https://api.learnverse.com npm run build
```

## Troubleshooting

### Common Issues

1. **Build fails**: Check Node.js version and dependencies
2. **API not connecting**: Verify CORS settings and API URL
3. **Routes not working**: Configure server for SPA routing
4. **Environment variables not loading**: Check variable names and .env file

### Performance Optimization

- Enable gzip compression
- Set up CDN for static assets
- Configure caching headers
- Optimize images and assets
- Use lazy loading for components

## Monitoring

Set up monitoring for:
- Application performance
- Error tracking
- User analytics
- API response times
- Uptime monitoring

## Security

- Use HTTPS in production
- Configure CSP headers
- Set up rate limiting
- Validate all user inputs
- Keep dependencies updated

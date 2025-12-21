# Contributing to Food Delivery App

Thank you for considering contributing to the Food Delivery App! We appreciate your interest in making this project better.

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Reporting Issues](#reporting-issues)

## 🤝 Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code:

- Be respectful and inclusive
- Use welcoming language
- Be collaborative
- Focus on what is best for the community
- Show empathy towards others

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork locally
3. Set up the development environment
4. Create a new branch for your feature
5. Make your changes
6. Test your changes
7. Submit a pull request

## 🛠️ Development Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Git

### Installation
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/food-delivery-app.git
cd food-delivery-app

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Start MongoDB
mongod

# Seed the database
node seedData.js

# Start the application
cd ..
npm run dev
```

## 📝 How to Contribute

### Types of Contributions
- 🐛 Bug fixes
- ✨ New features
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- ⚡ Performance improvements
- 🧪 Tests

### Before You Start
1. Check existing issues and pull requests
2. Open an issue to discuss major changes
3. Follow the project's coding standards
4. Write tests for new features

## 🔄 Pull Request Process

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, maintainable code
   - Follow the existing code style
   - Add tests for new functionality
   - Update documentation if needed

3. **Test Your Changes**
   ```bash
   # Run frontend tests
   npm test
   
   # Run backend tests
   cd backend
   npm test
   ```

4. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```
   
   Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create Pull Request**
   - Use a clear title and description
   - Reference any related issues
   - Include screenshots for UI changes
   - Ensure all checks pass

### Pull Request Requirements
- [ ] Code follows the project's style guide
- [ ] Tests pass
- [ ] Documentation is updated
- [ ] Changes are backwards compatible
- [ ] Screenshots included for UI changes

## 📏 Coding Standards

### JavaScript/React
- Use ES6+ features
- Follow React best practices
- Use functional components with hooks
- Use meaningful variable and function names
- Add comments for complex logic

### File Structure
- Keep components small and focused
- Use proper folder organization
- Follow naming conventions

### Backend
- Use Express.js best practices
- Implement proper error handling
- Use middleware appropriately
- Follow REST API conventions

### Database
- Use Mongoose schemas
- Implement proper validation
- Use meaningful field names

## 🐛 Reporting Issues

### Bug Reports
When reporting bugs, please include:
- Clear bug description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/console logs
- Environment details (OS, Node.js version, etc.)

### Feature Requests
When requesting features, please include:
- Clear feature description
- Use case and benefits
- Possible implementation approach
- Screenshots/mockups if applicable

### Issue Labels
- `bug` - Something isn't working
- `enhancement` - New feature request
- `documentation` - Documentation improvements
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed

## 🎯 Development Guidelines

### Frontend Development
- Use React hooks instead of class components
- Implement responsive design with Bootstrap
- Follow Material-UI design principles
- Optimize for performance

### Backend Development
- Implement proper authentication and authorization
- Use middleware for common functionality
- Follow RESTful API design
- Implement proper error handling

### Database Design
- Design efficient schemas
- Implement proper indexing
- Use aggregation for complex queries
- Ensure data consistency

## 🧪 Testing

### Frontend Testing
- Write unit tests for components
- Use React Testing Library
- Test user interactions
- Mock API calls

### Backend Testing
- Write unit tests for controllers
- Test API endpoints
- Mock database operations
- Test authentication flows

## 📖 Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex algorithms
- Keep comments up to date

### README Updates
- Update installation instructions
- Add new feature descriptions
- Include screenshots for UI changes
- Update API documentation

## 🎉 Recognition

Contributors will be:
- Listed in the README
- Mentioned in release notes
- Given credit for their contributions

## 📞 Getting Help

If you need help:
- Check existing documentation
- Search existing issues
- Ask questions in issues
- Contact maintainers

Thank you for contributing to the Food Delivery App! 🚀
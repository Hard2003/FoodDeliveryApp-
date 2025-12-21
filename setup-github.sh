#!/bin/bash

# Food Delivery App - GitHub Setup Script
# This script helps you initialize Git and push to GitHub

echo "🍕 Food Delivery App - GitHub Setup"
echo "=================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

echo "📋 Setting up Git repository..."

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
    git init
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

# Add all files to git
git add .
echo "✅ Files added to staging area"

# Check if there are any changes to commit
if git diff --cached --quiet; then
    echo "⚠️ No changes to commit"
else
    # Commit changes
    read -p "📝 Enter commit message (default: 'Initial commit - Food Delivery App'): " commit_message
    commit_message=${commit_message:-"Initial commit - Food Delivery App"}
    
    git commit -m "$commit_message"
    echo "✅ Changes committed"
fi

# Ask for GitHub repository URL
echo ""
echo "🔗 GitHub Repository Setup"
read -p "Enter your GitHub repository URL (https://github.com/username/repository-name.git): " repo_url

if [ ! -z "$repo_url" ]; then
    # Add remote origin
    if git remote get-url origin &> /dev/null; then
        echo "⚠️ Remote origin already exists. Updating..."
        git remote set-url origin "$repo_url"
    else
        git remote add origin "$repo_url"
    fi
    echo "✅ Remote origin added: $repo_url"
    
    # Push to GitHub
    echo "📤 Pushing to GitHub..."
    git branch -M main
    
    if git push -u origin main; then
        echo "✅ Successfully pushed to GitHub!"
        echo ""
        echo "🎉 Your Food Delivery App is now on GitHub!"
        echo "🌐 Repository: $repo_url"
        echo "📝 Don't forget to update the GitHub repository URL in your README.md"
    else
        echo "❌ Failed to push to GitHub. Please check your repository URL and permissions."
    fi
else
    echo "⚠️ No repository URL provided. Skipping GitHub push."
fi

echo ""
echo "🚀 Next Steps:"
echo "1. Update your GitHub username in README.md"
echo "2. Add screenshots to your repository"
echo "3. Create issues for future improvements"
echo "4. Set up GitHub Actions for CI/CD (optional)"
echo ""
echo "Happy coding! 🎉"
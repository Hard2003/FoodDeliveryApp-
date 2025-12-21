# Food Delivery App - GitHub Setup Script for Windows
# This script helps you initialize Git and push to GitHub

Write-Host "🍕 Food Delivery App - GitHub Setup" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

# Check if git is installed
try {
    git --version | Out-Null
    Write-Host "✅ Git is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    Write-Host "Download from: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

Write-Host "📋 Setting up Git repository..." -ForegroundColor Yellow

# Initialize git repository if not already initialized
if (!(Test-Path ".git")) {
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already exists" -ForegroundColor Green
}

# Add all files to git
git add .
Write-Host "✅ Files added to staging area" -ForegroundColor Green

# Check if there are any changes to commit
$status = git status --porcelain
if ($status) {
    # Commit changes
    $commit_message = Read-Host "📝 Enter commit message (press Enter for default)"
    if ([string]::IsNullOrWhiteSpace($commit_message)) {
        $commit_message = "Initial commit - Food Delivery App"
    }
    
    git commit -m $commit_message
    Write-Host "✅ Changes committed" -ForegroundColor Green
} else {
    Write-Host "⚠️ No changes to commit" -ForegroundColor Yellow
}

# Ask for GitHub repository URL
Write-Host ""
Write-Host "🔗 GitHub Repository Setup" -ForegroundColor Cyan
$repo_url = Read-Host "Enter your GitHub repository URL (https://github.com/username/repository-name.git)"

if (![string]::IsNullOrWhiteSpace($repo_url)) {
    # Add remote origin
    try {
        git remote get-url origin 2>$null | Out-Null
        Write-Host "⚠️ Remote origin already exists. Updating..." -ForegroundColor Yellow
        git remote set-url origin $repo_url
    } catch {
        git remote add origin $repo_url
    }
    Write-Host "✅ Remote origin added: $repo_url" -ForegroundColor Green
    
    # Push to GitHub
    Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
    git branch -M main
    
    try {
        git push -u origin main
        Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "🎉 Your Food Delivery App is now on GitHub!" -ForegroundColor Green
        Write-Host "🌐 Repository: $repo_url" -ForegroundColor Cyan
        Write-Host "📝 Don't forget to update the GitHub repository URL in your README.md" -ForegroundColor Yellow
    } catch {
        Write-Host "❌ Failed to push to GitHub. Please check your repository URL and permissions." -ForegroundColor Red
        Write-Host "Make sure you have created the repository on GitHub first." -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️ No repository URL provided. Skipping GitHub push." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Update your GitHub username in README.md"
Write-Host "2. Add screenshots to your repository"
Write-Host "3. Create issues for future improvements"
Write-Host "4. Set up GitHub Actions for CI/CD (optional)"
Write-Host ""
Write-Host "Happy coding! 🎉" -ForegroundColor Green

# Pause to keep window open
Read-Host "Press Enter to continue..."
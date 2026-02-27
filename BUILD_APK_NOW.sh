#!/bin/bash

echo "🚀 Building Android APK for Urbannn"
echo "===================================="
echo ""
echo "📋 Pre-build checklist:"
echo "  ✅ Fixed image filenames (removed spaces)"
echo "  ✅ Disabled new architecture"
echo "  ✅ EAS CLI installed"
echo "  ✅ Logged in as dharmendra_0"
echo ""
echo "🔨 Starting build..."
echo ""

eas build -p android --profile preview

echo ""
echo "✨ Build command executed!"
echo ""
echo "📊 Next steps:"
echo "  1. Wait 10-20 minutes for build to complete"
echo "  2. Check build status at: https://expo.dev/accounts/dharmendra_0/projects/urbannn/builds"
echo "  3. Download APK when ready"
echo "  4. Install on your Android device"
echo ""

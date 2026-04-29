#!/bin/bash

echo "🔍 Checking Provider Management API Status..."
echo ""

# Check backend health
echo "1️⃣ Checking backend health..."
HEALTH=$(curl -s https://urbannn-server.vercel.app/health)
if [ $? -eq 0 ]; then
    echo "   ✅ Backend is online"
else
    echo "   ❌ Backend is offline"
fi
echo ""

# Check provider management API
echo "2️⃣ Checking provider management API..."
RESPONSE=$(curl -s -w "\n%{http_code}" https://urbannn-server.vercel.app/api/admin/provider-management/providers)
HTTP_CODE=$(echo "$RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ Provider management API is working!"
    PROVIDER_COUNT=$(echo "$RESPONSE_BODY" | grep -o '"providers":\[' | wc -l)
    if [ "$PROVIDER_COUNT" -gt 0 ]; then
        echo "   ✅ Providers data is available"
    fi
elif [ "$HTTP_CODE" = "404" ]; then
    echo "   ❌ Provider management API not found (404)"
    echo "   👉 Backend needs to be deployed!"
else
    echo "   ⚠️  API returned status: $HTTP_CODE"
fi
echo ""

# Check local backend files
echo "3️⃣ Checking local backend files..."
if [ -f "backend/src/routes/provider-management.routes.js" ]; then
    echo "   ✅ provider-management.routes.js exists"
else
    echo "   ❌ provider-management.routes.js not found"
fi

if [ -f "backend/database/providers-schema.sql" ]; then
    echo "   ✅ providers-schema.sql exists"
else
    echo "   ❌ providers-schema.sql not found"
fi
echo ""

# Check if backend repo exists
echo "4️⃣ Checking backend repository..."
if [ -d "../urbannn-backend" ]; then
    echo "   ✅ urbannn-backend repo found"
    cd ../urbannn-backend
    git status > /dev/null 2>&1
    if [ $? -eq 0 ]; then
        echo "   ✅ Git repository is valid"
        UNCOMMITTED=$(git status --porcelain | wc -l)
        if [ "$UNCOMMITTED" -gt 0 ]; then
            echo "   ⚠️  You have $UNCOMMITTED uncommitted changes"
        else
            echo "   ✅ No uncommitted changes"
        fi
    fi
    cd - > /dev/null
else
    echo "   ⚠️  urbannn-backend repo not found at ../urbannn-backend"
fi
echo ""

# Summary
echo "📊 Summary:"
if [ "$HTTP_CODE" = "200" ]; then
    echo "   🎉 Provider management is READY!"
    echo "   You can use it in the app now."
else
    echo "   ⚠️  Provider management is NOT ready yet."
    echo ""
    echo "   Next steps:"
    echo "   1. Run SQL schema in Supabase"
    echo "      File: backend/database/providers-schema.sql"
    echo ""
    echo "   2. Deploy backend:"
    echo "      cd ~/urbannn-backend"
    echo "      git add ."
    echo "      git commit -m 'Add provider management'"
    echo "      git push"
    echo ""
    echo "   3. Wait 2 minutes for Vercel deployment"
    echo ""
    echo "   4. Run this script again to verify"
    echo ""
    echo "   📖 Full guide: SETUP_PROVIDER_MANAGEMENT.md"
fi

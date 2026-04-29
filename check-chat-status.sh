#!/bin/bash

echo "🔍 Checking Chat Feature Status..."
echo ""

# Check backend health
echo "1️⃣ Checking backend health..."
HEALTH=$(curl -s https://urbannn-server.vercel.app/health)
if [ $? -eq 0 ]; then
    echo "   ✅ Backend is online"
    echo "   Response: $HEALTH"
else
    echo "   ❌ Backend is offline"
fi
echo ""

# Check chat API
echo "2️⃣ Checking chat API..."
CHAT_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST https://urbannn-server.vercel.app/api/chat/conversations \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "00000000-0000-0000-0000-000000000001",
    "user_name": "Test User",
    "user_email": "test@example.com"
  }')

HTTP_CODE=$(echo "$CHAT_RESPONSE" | tail -n1)
RESPONSE_BODY=$(echo "$CHAT_RESPONSE" | head -n-1)

if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ Chat API is working!"
    echo "   Response: $RESPONSE_BODY"
elif [ "$HTTP_CODE" = "404" ]; then
    echo "   ❌ Chat API not found (404)"
    echo "   👉 You need to deploy the backend first!"
    echo "   👉 See DEPLOY_CHAT_BACKEND.md"
else
    echo "   ⚠️  Chat API returned status: $HTTP_CODE"
    echo "   Response: $RESPONSE_BODY"
fi
echo ""

# Check local backend files
echo "3️⃣ Checking local backend files..."
if [ -f "backend/src/routes/chat.routes.js" ]; then
    echo "   ✅ chat.routes.js exists"
else
    echo "   ❌ chat.routes.js not found"
fi

if [ -f "backend/database/chat-schema.sql" ]; then
    echo "   ✅ chat-schema.sql exists"
else
    echo "   ❌ chat-schema.sql not found"
fi
echo ""

# Summary
echo "📊 Summary:"
if [ "$HTTP_CODE" = "200" ]; then
    echo "   🎉 Chat feature is READY!"
    echo "   You can test it in the app now."
else
    echo "   ⚠️  Chat feature is NOT ready yet."
    echo ""
    echo "   Next steps:"
    echo "   1. Run SQL schema in Supabase (see backend/database/chat-schema.sql)"
    echo "   2. Deploy backend: cd ~/urbannn-backend && git push"
    echo "   3. Wait 2 minutes for Vercel deployment"
    echo "   4. Run this script again to verify"
    echo ""
    echo "   📖 Full guide: DEPLOY_CHAT_BACKEND.md"
fi

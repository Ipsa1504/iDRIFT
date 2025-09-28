# DRIFT - Running locally

## Backend
cd Backend
npm install
# create .env (use .env.example as template)
node server.js
# server runs on PORT (default 3000)

## Frontend
cd frontend
npm install
# create .env with VITE_BASE_URL (see .env.example)
npm run dev

## Admin endpoints (example)
# list pending bookings (replace ADMIN_TOKEN with your token)
curl -H "x-admin-token: YOUR_ADMIN_TOKEN" "http://localhost:3000/admin/bookings?status=pending"

# assign booking (replace IDs and token)
curl -X POST -H "Content-Type: application/json" -H "x-admin-token: YOUR_ADMIN_TOKEN" -d '{ "captainId": "CAPTAIN_ID", "assignedBy": "operator" }' "http://localhost:3000/admin/bookings/BOOKING_ID/assign"


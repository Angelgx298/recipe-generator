# Playwright Tests Setup Guide

## Environment Setup

To ensure tests run correctly, you need to configure the backend API key.

### Step 1: Create .env File in Backend

```bash
cd backend
cat > .env << 'EOF'
GROQ_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
EOF
cd ..
```

Replace `your_api_key_here` with your actual Groq API key from [console.groq.com](https://console.groq.com/).

### Step 2: Verify Servers Manually

Before running tests, verify that both servers are working correctly:

```bash
# Terminal 1: Backend Server
cd backend
pnpm start

# Terminal 2: Frontend Development Server
cd frontend
pnpm dev
```

Then open `http://localhost:5173` in your browser and try generating a recipe manually to ensure the integration works.

### Step 3: Run the Tests

Once verified that everything works manually:

```bash
# Ensure you are in the project root directory
pnpm test
```

## Troubleshooting

### "Failed to Fetch" Error

This error indicates that the frontend cannot connect to the backend API. Verify:

1. ✅ The `backend/.env` file exists and contains a valid `GROQ_API_KEY`
2. ✅ The backend server is running correctly on port 5000
3. ✅ No other processes are using ports 5000 or 5173

To check which processes are using the ports:
```bash
# Check what is using port 5000
lsof -i :5000

# Check what is using port 5173
lsof -i :5173
```

### Servers Won't Stop

If Playwright is interrupted and servers remain running in the background:

```bash
# Kill all related processes
pkill -f "pnpm.*start"
pkill -f "pnpm.*dev"
```

## Interactive Test Mode

To debug tests or view them running in UI mode:

```bash
pnpm exec playwright test --ui
```

## View HTML Test Report

After running tests, view the detailed HTML report:

```bash
pnpm exec playwright show-report
```

## Additional Resources

For more information about the test suite and architecture, see the main [README.md](./README.md#-testing).


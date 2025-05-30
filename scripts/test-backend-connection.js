#!/usr/bin/env node

// Test script to verify backend connection
const axios = require('axios');

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:12000';

const tests = [
  {
    name: 'API Gateway Health Check',
    url: `${BACKEND_URL}/shops`,
    method: 'GET'
  },
  {
    name: 'Get Shops',
    url: `${BACKEND_URL}/shops`,
    method: 'GET'
  },
  {
    name: 'Get Products',
    url: `${BACKEND_URL}/products`,
    method: 'GET'
  },
  {
    name: 'Get Categories',
    url: `${BACKEND_URL}/catalog/categories`,
    method: 'GET'
  }
];

async function runTests() {
  console.log('🧪 Testing Backend Connection...\n');
  
  for (const test of tests) {
    try {
      console.log(`⏳ Testing: ${test.name}`);
      const response = await axios({
        method: test.method,
        url: test.url,
        timeout: 5000
      });
      
      if (response.status === 200) {
        console.log(`✅ ${test.name}: SUCCESS`);
        if (response.data && response.data.data) {
          const dataLength = Array.isArray(response.data.data) 
            ? response.data.data.length 
            : Object.keys(response.data.data).length;
          console.log(`   📊 Data items: ${dataLength}`);
        }
      } else {
        console.log(`⚠️ ${test.name}: Unexpected status ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${test.name}: FAILED`);
      if (error.code === 'ECONNREFUSED') {
        console.log(`   🔌 Connection refused - is the backend running on ${BACKEND_URL}?`);
      } else {
        console.log(`   💥 Error: ${error.message}`);
      }
    }
    console.log('');
  }
  
  console.log('🏁 Backend connection test completed!');
  console.log('\n📋 Next Steps:');
  console.log('1. If tests failed, start the backend: ./scripts/start-backend.sh');
  console.log('2. Update .env.local with correct backend URLs');
  console.log('3. Switch to real API: follow SETUP_REAL_BACKEND.md');
}

runTests().catch(console.error);
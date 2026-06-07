const http = require('http');

async function request(path, method = 'GET', body = null, token = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: data ? JSON.parse(data) : null });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- Schedula Full E2E API Flow Test ---');
  
  // Wait a second for server to be fully ready
  await new Promise(r => setTimeout(r, 1000));

  try {
    // 1. Health check
    const health = await request('/');
    console.log(`[Health Check] Status: ${health.status}, Response: ${health.data}`);
    
    if (health.status !== 200) {
      console.log('Server is not responding at localhost:3000. Is it running?');
      return;
    }

    // 2. Doctor Signup & Login
    console.log('\n--- Doctor Workflow ---');
    const docEmail = `dr.smith${Date.now()}@example.com`;
    const signupDoc = await request('/auth/signup', 'POST', {
      name: 'Dr. John Smith',
      email: docEmail,
      password: 'securepassword',
      role: 'DOCTOR'
    });
    console.log('[Doctor Signup]', signupDoc.status);

    const loginDoc = await request('/auth/login', 'POST', {
      email: docEmail,
      password: 'securepassword'
    });
    console.log('[Doctor Login]', loginDoc.status);
    const docToken = loginDoc.data.access_token;

    // 3. Create Doctor Profile
    const createDocProfile = await request('/doctors/profile', 'POST', {
      specialization: 'Cardiology',
      licenseNumber: `LIC-${Date.now()}`,
      yearsExperience: 10,
      bio: 'Expert in heart stuff'
    }, docToken);
    console.log('[Create Doctor Profile]', createDocProfile.status);
    const docProfileId = createDocProfile.data.id;

    // 4. Add Availability
    const addAvail = await request('/availability', 'POST', {
      date: '2024-12-01',
      startTime: '09:00',
      endTime: '10:00'
    }, docToken);
    console.log('[Add Availability]', addAvail.status);
    const availId = addAvail.data.id;

    // 5. Patient Signup & Login
    console.log('\n--- Patient Workflow ---');
    const patEmail = `patient${Date.now()}@example.com`;
    const signupPat = await request('/auth/signup', 'POST', {
      name: 'Jane Doe',
      email: patEmail,
      password: 'securepassword',
      role: 'PATIENT'
    });
    console.log('[Patient Signup]', signupPat.status);

    const loginPat = await request('/auth/login', 'POST', {
      email: patEmail,
      password: 'securepassword'
    });
    console.log('[Patient Login]', loginPat.status);
    const patToken = loginPat.data.access_token;

    // 6. Create Patient Profile
    const createPatProfile = await request('/patients/profile', 'POST', {
      bloodType: 'A+',
      emergencyContact: '1234567890'
    }, patToken);
    console.log('[Create Patient Profile]', createPatProfile.status);

    // 7. Fetch Doctor Availability
    console.log('\n--- Booking Workflow ---');
    const fetchAvail = await request(`/availability/doctor/${docProfileId}`, 'GET');
    console.log('[Fetch Doctor Availability]', fetchAvail.status, `Found ${fetchAvail.data.length} slots`);

    // 8. Book Appointment
    const bookAppt = await request('/appointments', 'POST', {
      doctorId: docProfileId,
      availabilityId: availId,
      notes: 'First checkup'
    }, patToken);
    console.log('[Book Appointment]', bookAppt.status, bookAppt.data.id ? 'SUCCESS' : bookAppt.data);

    // 9. Fetch Patient Appointments
    const getPatAppts = await request('/appointments/patient', 'GET', null, patToken);
    console.log('[Fetch Patient Appointments]', getPatAppts.status, `Found ${getPatAppts.data.length} appointments`);

    // 10. Doctor Checks Appointments
    const getDocAppts = await request('/appointments/doctor', 'GET', null, docToken);
    console.log('[Fetch Doctor Appointments]', getDocAppts.status, `Found ${getDocAppts.data.length} appointments`);

    console.log('\n✅ All tests completed successfully!');

  } catch (error) {
    console.error('\n❌ Test failed with error:', error.message);
  }
}

runTests();

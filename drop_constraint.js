const mysql = require('mysql2/promise');

async function main() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Smit@1226',
      database: 'health_hub',
      port: 3306
    });
    console.log('Connected to MySQL via mysql2.');
    
    // Check if the constraint exists
    const [rows] = await connection.execute("SELECT CONSTRAINT_NAME FROM information_schema.table_constraints WHERE table_name = 'hop_appointment' AND constraint_type = 'CHECK';");
    console.log('Check constraints on hop_appointment:', rows);

    let found = false;
    for (const row of rows) {
      if (row.CONSTRAINT_NAME === 'CK_HOP_Appointment_Status' || row.CONSTRAINT_NAME === 'hop_appointment_chk_1') {
        found = true;
        console.log(`Dropping constraint: ${row.CONSTRAINT_NAME}`);
        await connection.execute(`ALTER TABLE hop_appointment DROP CHECK ${row.CONSTRAINT_NAME};`);
        console.log('Constraint dropped!');
      }
    }

    if (!found) {
      console.log('Constraint not found, or already dropped.');
    }

    await connection.end();
  } catch (err) {
    console.error('Error:', err.message);
  }
}

main();

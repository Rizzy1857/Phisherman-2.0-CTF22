import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { Solved } from './models/Solved.js';

dotenv.config();

async function verifyAllPasswords() {
    try {
        console.log('🔌 Connecting to MongoDB...');
        await mongoose.connect(process.env.ATLAS_URL);

        console.log('🔍 Fetching all users...');
        const users = await Solved.find({});

        if (users.length === 0) {
            console.error('❌ No users found in database!');
            process.exit(1);
        }

        console.log(`Checking ${users.length} users for password "password123"...`);

        let failures = 0;

        for (const user of users) {
            const isMatch = await bcrypt.compare("password123", user.password);
            if (isMatch) {
                console.log(`✅ ${user.email.padEnd(35)} : OK`);
            } else {
                console.error(`❌ ${user.email.padEnd(35)} : FAILED`);
                failures++;
            }
        }

        if (failures === 0) {
            console.log('\n🎉 SUCCESS: All users can login with "password123".');
        } else {
            console.error(`\n❌ FAILURE: ${failures} users have incorrect passwords.`);
        }

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

verifyAllPasswords();

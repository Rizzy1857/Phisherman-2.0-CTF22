import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

import path from 'path'
dotenv.config({ path: path.resolve(process.cwd(), 'backend', '.env') })

const secret = process.env.JWT_SECRET
const level2Flag = process.env.LEVEL2_FLAG || ''
const basePoints = parseInt(process.env.LEVEL2_BASE_POINTS) || 300

const submittedFlag = process.argv[2] || level2Flag
const email = 'testuser@example.com'

// Create JWT
const token = jwt.sign({ email }, secret, { expiresIn: '7d' })

console.log('Crafted JWT (cookie value):', token)
console.log('Submitting flag:', submittedFlag)

// Simulate findUser result (mock user that has not solved level2 and no hints)
const user = { email, flag5: '', level2Hints: [] }

// Simulate endpoint logic
if (submittedFlag !== level2Flag) {
  console.log(JSON.stringify({ success: false, message: 'Incorrect flag' }, null, 2))
  process.exit(1)
}

if (!user) {
  console.log(JSON.stringify({ success: false, message: 'User not found' }, null, 2))
  process.exit(1)
}

if (user.flag5 === 'SOLVED') {
  console.log(JSON.stringify({ success: false, message: 'Already solved' }, null, 2))
  process.exit(1)
}

let calculatedPenalty = 0
if ((user.level2Hints || []).includes(2)) calculatedPenalty += 5
if ((user.level2Hints || []).includes(3)) calculatedPenalty += 10

const pointsEarned = Math.max(0, basePoints - calculatedPenalty)

console.log(JSON.stringify({ success: true, message: 'Correct!', points: pointsEarned }, null, 2))

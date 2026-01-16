import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'

dotenv.config({ path: path.resolve(process.cwd(), 'backend', '.env') })

const secret = process.env.JWT_SECRET
if (!secret) {
  console.error('JWT_SECRET missing')
  process.exit(1)
}

const token = jwt.sign({ email: 'testuser@example.com' }, secret, { expiresIn: '7d' })
console.log(token)

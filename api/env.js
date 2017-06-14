require('dotenv').config();

const defaults = {
  TOKEN_EXPIRE_TIME: '2h',
  TOKEN_SIGNATURE_ALGORITHM: 'HS512'
};

for (const key of Object.keys(defaults)) {
  if (!process.env[key]) {
    process.env[key] = defaults[key];
  }
}

// Generate a randomish 128-byte secret if there's not one preset
if (!process.env.JWT_SECRET) {
  const buffer = Buffer.alloc(128);
  for (let i = 0; i < buffer.length; i += 1) {
    buffer.writeUInt8(Math.floor(Math.random() * 256), i);
  }
  process.env.JWT_SECRET = buffer.toString('hex');
}

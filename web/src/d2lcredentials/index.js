let credentials = {
  role: 'student',
  appID: process.env.PROD_D2L_APP_ID || process.env.DEV_D2L_APP_ID || '',
  appKey: process.env.PROD_D2L_APP_KEY || process.env.DEV_D2L_APP_KEY || '',
  host: process.env.D2L_HOST || 'http:localhost:8888/mock-d2l',
  port: process.env.D2L_PORT || 80,     // so that the valence lib doesn't append a :port to the string.
  callbackUrl: process.env.D2L_CALLBACK || 'http:localhost:3000'
}

module.exports = credentials

const {
  google
} = require('googleapis');


const oauth2Client = new google.auth.OAuth2(
  '92929700030 - 993bopvsj062qp70dg9tjs9vtck08afv.apps.googleusercontent.com',
  'gPXeXAHgpNxkgQuIJBfI0FVH',
  'http://localhost:8080'
)



const scopes = [
  'https://www.googleapis.com/auth/contacts'
]

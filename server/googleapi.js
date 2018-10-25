const {
  google
} = require('googleapis');


const oauth2Client = new google.auth.OAuth2(
  '92929700030 - 993bopvsj062qp70dg9tjs9vtck08afv.apps.googleusercontent.com',
  'gPXeXAHgpNxkgQuIJBfI0FVH',
  'https://localhost:8080'
);

const scopes = [
  'https://www.googleapis.com/auth/contacts'
]

const url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes
})

const {tokens} = oauth2Client.getToken()
oauth2Client.setCredentials(tokens)

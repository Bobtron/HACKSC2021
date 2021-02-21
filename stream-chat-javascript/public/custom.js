// global variables....
let client, channel, username, activeUser;

client = new StreamChat('j6j63hsuh9fv');

js

async function generateToken(username) {
  const { token } = (await axios.get(`/token?username=${username}`)).data;
  return token;
}

//

async function initializeClient() {
  const token = await generateToken(username);

  await client.setUser(
    {
      id: username,
      name: 'The user name', // Update this name dynamically
      image: 'https://bit.ly/2u9Vc0r' // user image
    },
    token
  ); // token generated from our Node server

  console.log(username);

  return client;
}

//

const user = document.getElementById('user-login-input');

user.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    checkAuthState();
  }
});

checkAuthState();

async function checkAuthState() {
  if (!user.value) {
    document.getElementById('login-block').style.display = 'grid';
    document.getElementsByClassName('chat-container')[0].style.display = 'none';
  } else {
    username = user.value;

    await initializeClient();

    document.getElementsByClassName('chat-container')[0].style.display = 'grid';
    document.getElementById('login-block').style.display = 'none';
  }
}

async function selectUserHandler(userPayload) {
  if (activeUser === userPayload.id) return; // current active user, so do not proceed...

  activeUser = userPayload.id;

  // remove the 'active' class from all users
  const allUsers = document.getElementsByClassName('user');
  Array.from(allUsers).forEach(user => {
    user.classList.remove('active');
  });

  // add the 'active' class to the current selected user
  const userElement = document.getElementById(userPayload.id);
  userElement.classList.add('active');

  // remove all previous messages in the message container...
  const messageContainer = document.getElementById('messages');
  messageContainer.innerHTML = '';

  // []
  await initializeChannel([username, userPayload.id]);
}

async function listUsers() {
  const filters = {};
  const response = await client.queryUsers(filters);

  populateUsers(response.users);
  return response;
}

async function initializeChannel(members) {
  //members => array of users, [user1, user2]
  channel = client.channel('messaging', {
    members: members,
    session: 8 // custom field, you can add as many as you want
  });

  await channel.watch();
}

## Terminal Authentication system

# Step 1: The Activation Handshake (Perfect)

The user inputs the activation code on the screen and presses submit.
The backend verifies the code, generates the device_access_token and device_refresh_token, and drops them directly into the browser's secure, httpOnly cookie storage.
The frontend receives a success message and routes the user to the Login page.

# Step 2: The Login Page Mount (The Correction)

What you wrote: useEffect checks if the token exists in the cookies. If not, instantly throws an error.
The Reality Tuning: Your frontend useEffect cannot look inside httpOnly cookies. Instead, it blindly fires the POST /get-detail request. The browser automatically attaches the hidden cookies to that request.
The Gate: If the cookies don't exist or are dead, the backend rejects the request with a 401/404. The frontend useEffect catches that network failure, instantly triggers an error, and blocks the login page from mounting.

# Step 3: Unlocking the Screen (The Correction)

What you wrote: Get businessId and terminalId from the cookies to open the login page.
The Reality Tuning: Since frontend JS can't touch the cookies, your backend /get-detail endpoint must include businessId and terminalId inside its JSON response body payload.
Once POST /get-detail returns a 200 OK with that JSON data, your frontend captures those IDs from response.data, stores them in your global state, and opens the passcode screen.

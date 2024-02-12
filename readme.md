# Assignment

<aside>
🚨 **Deadline: End of Class**

</aside>

<aside>
📌 YOUR GITHUB URL HERE:

</aside>

FORK THIS:

[https://github.com/adhanji8/passport-typescript-lab](https://github.com/adhanji8/passport-typescript-lab)

![Assignment%2077207fb4e3a04588af14bcb2006186fc/Untitled.png](Assignment%2077207fb4e3a04588af14bcb2006186fc/Untitled.png)

As you know, Passport has different "strategies", or ways of authenticating a user. Authentication is all about verifying is a user is who they say they are. 

Local Authentication Strategy is what we use in the video above. This strategy allows you to Login with a username and password. 

**Your Tasks:**

You must do the following things: 

### Task 1: Fix all the “😭 Fix Me” sections of the code. They are grouped into the following categories of bugs:

- Missing type annotations (The type is likely set to “any”. You need to fix this and choose the appropriate data type).
- Refactoring - This involves improving code readability
- Implementing Visible Errors for the user upon login.

→ Currently, when a user types incorrect login info, they are simply redirected back to the home page. You must find a way to ***display to the user in their browser the error that occured.*** 

For example, when I type an email of a user who does not exist…I should see the following:

![Untitled](Assignment%2077207fb4e3a04588af14bcb2006186fc/Untitled%201.png)

→ If I type a **valid email….**but the **password is incorrect, I should see:**

![Untitled](Assignment%2077207fb4e3a04588af14bcb2006186fc/Untitled%202.png)

Below is a ***very big*** hint on how to accomplish this in passport:

[https://stackoverflow.com/questions/72990723/node-js-web-application-passport-js-failureredirect-display-message-in-ejs](https://stackoverflow.com/questions/72990723/node-js-web-application-passport-js-failureredirect-display-message-in-ejs) 

### Task 2: Add another strategy: Github Login.

Doing this involves essentially 2 steps:

The first step is going to Github's website and getting a ID and Secret which you will need for step2. These are private credentials and you should NOT expose them anywhere. Make sure you keep these private. Use the following npm module BEFORE you push any code to github that contains your github secret credentials:

[https://www.npmjs.com/package/dotenv](https://www.npmjs.com/package/dotenv)

The second step is looking at the documentation for the Github strategy. It will show you which code you need to add to get Login with Github working.

![Assignment%2077207fb4e3a04588af14bcb2006186fc/Untitled%203.png](Assignment%2077207fb4e3a04588af14bcb2006186fc/Untitled%203.png)

 You must add a "Login with Github" button. When the user clicks this button, they should see a popup like this:

![Assignment%2077207fb4e3a04588af14bcb2006186fc/Untitled%204.png](Assignment%2077207fb4e3a04588af14bcb2006186fc/Untitled%204.png)

After they authorize the popup, github will send you their profile data:

Here are some hints to help you implement the logic:

If this is the first time that they are ever logging into your application with Github, you can add a new user to your fake database array. This new user doesn't need to have a password or email, because Github has that data already. You can store whatever data you want about that user which Github gives you (ex - their full name, their Github profile picture, their github display name, it’s up to you). Without a doubt…you will definitely want to store a unique id though. 

Upon logging in, they should be sent to the dashboard page, and it should say: Welcome <name>! 

![Assignment%2077207fb4e3a04588af14bcb2006186fc/Untitled%205.png](Assignment%2077207fb4e3a04588af14bcb2006186fc/Untitled%205.png)

The name that shows up is obtained from their Github profile details. 

### Add Admin Capabilities

Imagine that a user has their computer stolen. They contact you, panicking, and tell you that someone has stolen their computer, and the thief is on our website pretending to be them! 

We should have an Admin Dashboard that can revoke sessions. Revoking a session means that we invalidate the session of a given user. 

To complete this task, you must do the following:

1. Every user in your database should have a role. The role can either be:

a) user

b) admin

Admin users can visit a secret page called /admin. ONLY admins should be able to see this page. When they go to this page, it should show the Admin a list of all the current sessions, and the ID of the user that session belongs to. Next to each session should be a "revoke" button. When clicked, it should destroy that user's session.

By doing this, as soon as the thief refreshes their browser or goes to any other page, they will be auto-logged out. 

![Assignment%2077207fb4e3a04588af14bcb2006186fc/Untitled%206.png](Assignment%2077207fb4e3a04588af14bcb2006186fc/Untitled%206.png)

You can see here that only 1 active session exists currently. Try opening a new browser like Firefox or Edge or Safari and visit your site and log in. Now refresh the Admin dashboard. You should see 2 active sessions now. Click Revoke Session. Now go back to the other browser and refresh the page. The user should now be logged out.

### Task 4: Passport Knowledge Check-list

For this final task, you will need to answer the following questions to prove to me that you *truly understand how passport is working*. 

Question 1: Which passport method is responsible for triggering a creation of the user session? Why are we only storing the user’s id inside the session? Why not the entire user object from the database?

```json

```

 ******

Question 2: 

Observe the code below:

![Untitled](Assignment%2077207fb4e3a04588af14bcb2006186fc/Untitled%207.png)

The `addStrategies()` method is looping through an array of passport strategies…and for each one of them…invoking the `passport.use()` method. The strategy name and strategy itself are being sent as arguments into the use method. 

2A: What is the purpose of the `.use()` method in passport? What relationship exists between the `.use()` method and the `passport.authenticate()` method?

```json

```

2B: 

![Untitled](Assignment%2077207fb4e3a04588af14bcb2006186fc/Untitled%208.png)

The code above is calling `passport.authenticate()` and instructing it to use the local strategy method as a way of authenticating a user. 

![Untitled](Assignment%2077207fb4e3a04588af14bcb2006186fc/Untitled%209.png)

There are 2 ways that we can call `passport.use()` . In the 2nd way…you can see us passing in a name and a strategy. 

![Untitled](Assignment%2077207fb4e3a04588af14bcb2006186fc/Untitled%2010.png)

This is consistent with what we have in our code…and explains why we used the word “`local`” in `passport.authenticate(”local”, {…etc})` . But what about the first way of using `passport.use()`? If we do it that way…we wouldn’t pass it the name of our strategy. In this case, how are we supposed to know what default name our strategy was registered with? In other words…if we don’t give a name to our strategy when calling `passport.use()`…how are we supposed to know what name to write when we call passport.authenticate? Paste a screenshot below from the official passport documentation to support your answer:

```json

```

Question 3:

I mentioned that after a session has been created for the user…`deserializeUser` will ensure that every single time an incoming request enters…the latest data about the user will be inserted into `req.user`. Prove that this statement is true by screenshotting and explaining ***the actual source code from the passport documentation.*** 

<aside>
👍🏻 I’m going to give you some hints to point you on the right path…

</aside>

Hint 1:

```jsx
app.use(passport.session());
// is just a shortcut for writing:
app.use(passport.authenticate('session'));
```

Interesting…! 🤔  It looks like that means passport is automatically registering a built-in strategy for us. Also, unlike `passport.authenticate(”local”)` which only executed as middleware on our login route…this one is being used as *global middleware*…meaning it will executed on ***every single request…***

Here’s a link to the strategy:

[passport/session.js at master · jaredhanson/passport](https://github.com/jaredhanson/passport/blob/master/lib/strategies/session.js)

```jsx

```

Question 4:

We utilize in passport a function called `req.logOut()` which is responsible for logging out the user. 

![Untitled](Assignment%2077207fb4e3a04588af14bcb2006186fc/Untitled%2011.png)

Observe the screenshot above which is from internal passport.js library code. What I have done is set the debugger to ***pause*** execution of the application during the ***exact moment before passport logs jimmy123@gmail.com out by destroying his session.*** 

Provide a screenshot of your VSCode environment that shows your debugger paused on the same line as mine…and also shows the user id in the watch window. 

<Screenshot here>

 

<aside>
🚨 Heads up: You won’t be able to complete the task above unless you update to the latest version of passport. This can be done by typing: npm uninstall passport…following by npm install passport. Your passport.js internal code will look fundamentally different from mine because the newest version of passport.js regenerates sessions on every login and logout. Details can be seen here: 
[https://medium.com/passportjs/fixing-session-fixation-b2b68619c51d](https://medium.com/passportjs/fixing-session-fixation-b2b68619c51d)

</aside>
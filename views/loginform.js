function loginform(){
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="./css/stylelogin.css" type="text/css">
        <title>Login </title>
    </head>
    
    
    <div class="login">
        
        <h1 class="login-header">Log in</h1>
        
        <form action="/login" method="POST" class="login-container">
            <p><input type="text" placeholder="Username" name="username"></p>
            <p><input type="password" placeholder="Password" name="password"></p>
            <p>
                <input type="submit" value="Buckle Up"> 
            </p>
            <!-- TODO send to signup page -->
            <p class="text--center">Not a member? <a href="/register">Sign up now</a> 
        </form>
    </div>
    
    `;
}

module.exports = loginform;
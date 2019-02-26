function registerform(){
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="css/register.css">
        <title>Sign Up </title>
    </head>
 
            <div class="SignUp">
                
                <h1 class="SignUp-header">Sign Up</h1>
                
                <form action="/register" method="POST" class="SignUp-container">
                    <p><input type="text" name="username" placeholder="Username"></p>
                    <p><input type="password" name="password" placeholder="Password"></p>
                    <p><input type="submit" value="Sign Up"> <i class="fas fa-user-astronaut fas-3x"></i></p>
                </form>
            </div>
        
    `;
}

module.exports = registerform;
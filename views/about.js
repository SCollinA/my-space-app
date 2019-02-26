function about() {
    return `
   <!DOCTYPE html>
   <html lang="en">
   
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <meta http-equiv="X-UA-Compatible" content="ie=edge">
       <link rel="stylesheet" href="./css/about.css">
       <link rel="stylesheet" href="./css/myspace.css">
       <title>AboutUS</title>
   </head>
   
   <body>
   <div class="wrapper">
   <!-- Navigation -->
   <nav class="main-nav">
       <ul>
           <li>
               <a href="/events">Home <i class="fas fa-globe"></i></a>

           </li>
           <li>
               <a href="/profile">My Space <i class="fas fa-globe"></i></a>
           </li>
           <li>
               <a href="#">Login <i class="fas fa-sign-in-alt"></i></a>
           </li>
        
       </ul>
   </nav>
           <section class="cf team-container">
               <h1 class="team-h1">Our Team</h1>
   
               <!-- member-->
               <div class="team-member">
                   <img class="team-photo" src="/img/image.png">
                   <h3>Issac Fonseca </h3>
               </div>
   
   
               <!-- member-->
               <div class="team-member">
                   <img class="team-photo" src="/img/profile.png">
                   <h3>Melon Hasegawa</h3>
   
               </div>
   
   
               <!-- member-->
               <div class="team-member">
                   <img class="team-photo" src="/img/fullsizeoutput_ec4.jpeg">
                   <h3>Colin Argo</h3>
   
               </div>
   
   
   
               <!-- member-->
               <div class="team-member">
                   <img class="team-photo" src="/img/42783503.png">
                   <h3>Will Harris</h3>
   
               </div>
   
   
   
   
           </section>
   
   </div>
   </body>
    `;
}

module.exports = about;
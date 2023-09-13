
let email = document.getElementById('typeEmailX');
let senha = document.getElementById('typePasswordX');
let btnEntrar = document.getElementById('btn-entrar');
let loginButton = document.getElementById("login");
let logoutButton = document.getElementById("logout-button");

let isLoggedIn = false;

function toggleLogin() {
    isLoggedIn = !isLoggedIn;
    
   if (isLoggedIn) {
    // Se o usuário estiver logado, exibe o botão de logout e oculta o botão de login
    loginButton.style.display = "none";
    logoutButton.style.display = "block";
  } else {
    // Se o usuário não estiver logado, exibe o botão de login e oculta o botão de logout
    loginButton.style.display = "block";
    logoutButton.style.display = "none";
  }
}



function autentica(){
     // 1° Pegar o email digitado
     let userEmail = email.value;

     // 2° Pegar a senha digitada.
     let userSenha = senha.value;
 
     // 3° Validar se o email e senha estão corretos
 
     if(!userEmail || !userSenha){
         // 4° Caso esteja incorreto, mandar mensagem de usuario ou senha invalida.
        alert('Os campos de e-mail e senha são obrigatórios!')
         // alert("Os campos de e-mail e senha são obrigatórios!");
         return;
     }
    
     // Aqui precisamos enviar esse email e senha ao backend para saber se o usuario pode acessar o sistema.
     autenticar(userEmail, userSenha);
     toggleLogin()

     
}

document.addEventListener("keydown", function(event) {
    // Verifica se a tecla pressionada é a tecla "Enter" (código 13)
    if (event.key === "Enter") {
       
       autentica();
       return;
    }
});

// Aqui capturo o evento de click para tomar uma ação qualquer
btnEntrar.addEventListener('click',function(event) {
    autentica();
    return;
   
});


function autenticar(email, senha){
   const urlBase = `http://localhost:3400`;

   fetch(`${urlBase}/login`, {
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, senha})
   })
   .then(response => response = response.json())
   .then(response => {

       if(!!response.mensagem){
        alert(response.mensagem);
        return;

       }else{

        
        salvarToken(response.token);
        salvarUsuario(response.usuario);
       
        
        
      
         window.open('usuario.html', '_self'); 
       }
    });
}






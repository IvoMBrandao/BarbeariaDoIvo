let email = document.getElementById("email")
let senha = document.getElementById("senha")
let buttonLogin= document.getElementById("btn-entrar")


buttonLogin.addEventListener('click', () => {
  
    let userEmail  = email.value;
    let userSenha= senha.value;
    if(!userEmail || !userSenha){
      
      alert('login e senha obrigatorios')

      
        return;
    }

 
   
})
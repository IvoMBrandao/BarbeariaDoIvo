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

   autenticar(userEmail,userSenha)

   
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
        
        
       

      
            window.open('usuario.html', '_self');
    
        
       }
    });
}
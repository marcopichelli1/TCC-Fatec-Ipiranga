document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('#login-form');
  const loginMessage = document.querySelector('#login-message');


  // Função para carregar os dados do paciente do localStorage
  function loadPatientData() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('emailPaciente');
    const nome = localStorage.getItem('nomePaciente');

    if (token && email && nome) {
      // Os dados do paciente estão armazenados no localStorage
      // Você pode fazer o que quiser com esses dados, como exibi-los na página
      console.log('Token:', token);
      console.log('Email do Paciente:', email);
      console.log('Nome do Paciente:', nome);
    }
  }

  loadPatientData(); // Chame a função para carregar os dados do paciente quando a página for carregada


  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;

    // Crie um objeto com os dados do formulário
    const formData = {
      email: email,
      senha: senha,
    };

    // Faça uma solicitação POST para a rota /login no servidor
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          // Se houver um erro, exiba a mensagem de erro
          loginMessage.textContent = data.mensagem;
        } else {
          // Autenticação bem-sucedida, mostrar mensagem de sucesso
          loginMessage.textContent = 'Autenticação bem-sucedida.';

              // Salve o token, email e nome do paciente no Local Storage
            localStorage.setItem('token', data.token); // Salve o token
            localStorage.setItem('emailPaciente', email); // Salve o email do paciente
            localStorage.setItem('nomePaciente', data.paciente.nome); // Salve o nome do paciente          
            localStorage.setItem('rgPaciente', data.paciente.rg); // Salve o nome do paciente          
            localStorage.setItem('cpfPaciente', data.paciente.cpf);
            localStorage.setItem('ruaPaciente', data.paciente.rua);
            localStorage.setItem('numeroPaciente', data.paciente.numero);
            localStorage.setItem('cepPaciente', data.paciente.cep);
            localStorage.setItem('cidadePaciente', data.paciente.cidade);
            localStorage.setItem('estadoPaciente', data.paciente.estado);

          setTimeout(function () {
            window.location.href = 'perfilPaciente'; // Redirecionar para a página de perfilPaciente.html
          }, 2000); // Redirecionar após 2 segundos
        }
      })
      .catch((error) => {
        console.error('Erro na solicitação:', error);
      });
  });
});

// Função para consultar um paciente no banco de dados por email (simulada)
async function consultarPacientePorEmail(email) {
  // Implemente a lógica real para consultar o paciente no banco de dados
  // e retorne o paciente encontrado ou null se não existir.
  // Você pode usar uma biblioteca de banco de dados, como o Sequelize, para essa tarefa.
  return null; // Simulando que o paciente não foi encontrado.
}

// Função para validar as credenciais do paciente
async function pacienteAutenticado(email, senha) {
  const paciente = await pacienteAutenticado(email);
  if (!paciente) {
    return null; // Email não encontrado no banco de dados.
  }
  const senhaValida = await bcrypt.compare(senha, paciente.senha);
  if (!senhaValida) {
    return null; // Senha incorreta.
  }

  return paciente;
}
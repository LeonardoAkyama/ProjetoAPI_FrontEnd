const API = 'http://localhost:8081/projetos';

async function cadastrarProjeto() {

    const descricao = document.getElementById('descricao').value;
    const dataInicio = document.getElementById('dataInicio').value;
    const dataFim = document.getElementById('dataFim').value;

    const projeto = {
        descricao,
        dataInicio,
        dataFim,
        funcionarios: []
    };

    try {

        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projeto)
        });

        if(response.ok) {

            alert('Projeto cadastrado com sucesso!');

            limparCampos();

            listarProjetos();

        } else {
            alert('Erro ao cadastrar projeto');
        }

    } catch(error) {
        console.error(error);
    }
}

async function listarProjetos() {

    try {

        const response = await fetch(API);

        const projetos = await response.json();

        const lista = document.getElementById('listaProjetos');

        lista.innerHTML = '';

        projetos.forEach(projeto => {

            lista.innerHTML += `
                <div class="projeto">
                    <h3>${projeto.descricao}</h3>

                    <p>
                        <strong>Início:</strong>
                        ${projeto.dataInicio}
                    </p>

                    <p>
                        <strong>Fim:</strong>
                        ${projeto.dataFim}
                    </p>
                </div>
            `;
        });

    } catch(error) {
        console.error(error);
    }
}

function limparCampos() {

    document.getElementById('descricao').value = '';
    document.getElementById('dataInicio').value = '';
    document.getElementById('dataFim').value = '';
}

listarProjetos();
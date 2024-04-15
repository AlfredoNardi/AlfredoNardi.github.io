// começa com API Google Maps
function loadGoogleMapsAPI() {
    var script = document.createElement('script');
    script.type = 'text/javascript';

    // Substitua 'SUA_CHAVE_AQUI' com sua chave da API do Google Maps
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCZAuWVcceik4V-TUW3x7hAFQugOj7hAjc&libraries=places&callback=onGoogleMapsAPILoaded';
    
    // Async e Defer para carregamento não-bloqueante
    script.async = true;
    script.defer = true;

    document.head.appendChild(script);
}

function onGoogleMapsAPILoaded() {
    // Chama initAutocomplete somente depois que a API do Google Maps é carregada
    initAutocomplete('localFatos', 'vitimaEndereco');
}

function initAutocomplete(...ids) {
    ids.forEach(id => new google.maps.places.Autocomplete(document.getElementById(id), {
        types: ['address'],
        componentRestrictions: {country: 'br'}
    }));
}

loadGoogleMapsAPI();
// script estado e cidade
function carregarLocalidades(url, callback) {
  fetch(url)
    .then(response => response.json())
    .then(data => callback(data));
}
document.addEventListener('DOMContentLoaded', carregarEstados);

function carregarEstados() {
  carregarLocalidades('https://servicodados.ibge.gov.br/api/v1/localidades/estados', estados => {
    const selectEstado = document.getElementById('estado');
    estados.forEach(estado => {
      selectEstado.options.add(new Option(estado.nome, estado.id));
    });
  });
}

function carregarCidades(estadoId) {
  const selectCidade = document.getElementById('cidade');
  selectCidade.innerHTML = '';
  if (!estadoId) return;
  carregarLocalidades(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`, cidades => {
    cidades.forEach(cidade => {
      selectCidade.options.add(new Option(cidade.nome, cidade.id));
    });
  });
}


// Começa os demais scripts
document.addEventListener('DOMContentLoaded', function() {
   
	function toggleDenticionOptions() {
    var checkboxDenticion = document.getElementById('denticion');
    var divOpcionesDenticion = document.getElementById('opcionesDenticion');
    // Altera a exibição do div com base no estado do checkbox
    divOpcionesDenticion.style.display = checkboxDenticion.checked ? 'block' : 'none';
}
    var checkboxDenticion = document.getElementById('denticion');
    checkboxDenticion.addEventListener('change', toggleDenticionOptions);
	
	const cabeloTingidoSelect = document.getElementById('cabeloTingido');
    const grupoCorTintura = document.getElementById('grupoCorTintura');
    const corTinturaSelect = document.getElementById('corTintura');
    const especificarCorTintura = document.getElementById('especificarCorTintura');

    cabeloTingidoSelect.addEventListener('change', function() {
        // Mostra ou esconde a seção de cor da tintura
        grupoCorTintura.style.display = this.value === 'Sim' ? 'block' : 'none';
    });

    corTinturaSelect.addEventListener('change', function() {
        // Mostra ou esconde o campo de especificação caso 'Outra' seja selecionada
        especificarCorTintura.style.display = this.value === 'Outra' ? 'block' : 'none';
    });
	
	document.querySelectorAll('.select-com-especificacao').forEach(function(element) {
        element.addEventListener('change', function() {
            var targetId = this.getAttribute('data-especificacao-target');
            var especificacaoCampo = document.getElementById(targetId);
            // Para checkboxes: Usa 'this.checked' para determinar a visibilidade.
            // Para selects: Compara 'this.value' com 'outros' para determinar a visibilidade.
            var shouldDisplay = this.type === 'checkbox' ? this.checked : this.value === 'outros';
            especificacaoCampo.style.display = shouldDisplay ? 'block' : 'none';
        });
    });

})


document.getElementById('identificacaoVitima').addEventListener('change', function() {
    document.getElementById('campoAdicionalMotivo').style.display = this.value === 'nao_identificada' ? 'block' : 'none';
});



document.getElementById('vestigiosSangue').onchange = function() {
	document.getElementById('localSangue').style.display = this.value === 'Sim' ? 'block' : 'none';
    };    

document.getElementById('vestigioBiologico').onchange = function() {
        var detalhesBiologicos = document.getElementById('detalhesBiologicos');
        detalhesBiologicos.style.display = this.value === 'Sim' ? 'block' : 'none';
    };
    
    document.getElementById('outroMaterial').onchange = function() {
        var especifiqueMaterial = document.getElementById('especifiqueMaterial');
        especifiqueMaterial.style.display = this.checked ? 'block' : 'none';
    };

document.getElementById('corpoMovido').onchange = function() {
    document.getElementById('detalhesMovimento').style.display = this.value === 'sim' ? 'block' : 'none';
};

document.getElementById('motorLigado').onchange = function() {
        document.getElementById('campoAdicionalMotorLigado').style.display = this.value === 'Sim' ? 'block' : 'none';
    };

document.getElementById('danosVeiculo').onchange = function() {
        document.getElementById('campoAdicionalDanos').style.display = this.value === 'Sim' ? 'block' : 'none';
    };

document.querySelectorAll('.select-com-especificacao').forEach(function(element) {
        element.addEventListener('change', function() {
            var targetId = this.getAttribute('data-especificacao-target');
            var especificacaoCampo = document.getElementById(targetId);

            // Verifica se o elemento é um checkbox e ajusta a exibição baseado em 'checked'
            if (this.type === 'checkbox') {
                especificacaoCampo.style.display = this.checked ? '' : 'none';
            } else {
                // Para selects, mantém a lógica original baseada no valor 'outros'
                especificacaoCampo.style.display = this.value === 'outros' ? '' : 'none';
            }
        });
    });

preencherOpcoesDeTemperatura('temperatura');
preencherOpcoesDeTemperatura('sensacaoTermica');
preencherOpcoesDeUmidade('umidadeAr');

function preencherOpcoesDeUmidade(selectId) {
    const selectElement = document.getElementById(selectId);
    for (let i = 1; i <= 100; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i}%`;
        selectElement.appendChild(option);
    }
}


function preencherOpcoesDeTemperatura(selectId) {
    const selectElement = document.getElementById(selectId);
    for (let i = 1; i <= 60; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `${i}° Celsius`;
        selectElement.appendChild(option);
    }
}

document.getElementById('periodo').addEventListener('change', function() {
        // Aqui você define quando quer mostrar o select de 'luz'
        // Por exemplo, mostrar somente para 'Noite' e 'Madrugada'
        var mostrarLuz = this.value === 'Tarde';
        document.getElementById('luz').style.display = mostrarLuz ? 'block' : 'none';
    })

    
    
    // Função para adicionar opções dinamicamente a um <select>
    document.addEventListener('DOMContentLoaded', function() {
    // Função unificada para preencher selects de DP e Circunscrição Policial
    const preencherSelectsDP = (selectId) => {
        const select = document.getElementById(selectId);
        // Limpa opções existentes (opcional)
        select.innerHTML = '<option value="">Selecione...</option>';
        // Adiciona opções de DP
        for (let i = 1; i <= 103; i++) {
            const option = document.createElement('option');
            option.value = `${i}º DP`;
            option.textContent = `${i}º DP`;
            select.appendChild(option);
        }
    };
		
	var estadoVitimaSelect = document.getElementById('estadoVitima');
    if (estadoVitimaSelect) {
        estadoVitimaSelect.addEventListener('change', function() {
            var materialCoberturaDiv = document.getElementById('materialCobertura');
            materialCoberturaDiv.style.display = this.value === 'Coberta' ? 'block' : 'none';
        });
    }


    preencherSelectsDP('circunscricao-policial'); 
	preencherSelectsDP('bo-dp-select'); 
});



document.getElementById('botaoImprimir').addEventListener('click', imprimirCamposSelecionados);

function imprimirCamposSelecionados() {
    const camposPreenchidos = [];
    document.querySelectorAll('input, select').forEach(campo => {
        const tipo = campo.type;
        const nomeCampo = campo.previousElementSibling ? campo.previousElementSibling.innerText : 'Campo sem nome';
        let valorCampo = null;

        if ((tipo === 'checkbox' || tipo === 'radio') && campo.checked) {
            valorCampo = campo.value;
        } else if (tipo !== 'checkbox' && tipo !== 'radio' && campo.value) {
            valorCampo = campo.value;
        }

        if (valorCampo) {
            camposPreenchidos.push(`${nomeCampo}: ${valorCampo}`);
        }
    });

    let conteudoParaImprimir = '<h2>Formulário Preenchido</h2>';
    camposPreenchidos.forEach(campo => {
        conteudoParaImprimir += `<p>${campo}</p>`;
    });

    const janelaDeImpressao = window.open('', '', 'width=600,height=600');
    janelaDeImpressao.document.write(conteudoParaImprimir);
    janelaDeImpressao.document.close();
    janelaDeImpressao.focus();

    janelaDeImpressao.onload = function() {
        janelaDeImpressao.print();
        janelaDeImpressao.close();
    };
}

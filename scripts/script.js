function informarDados() {
    const valor = parseFloat(document.getElementById('valor').value);
    if (isNaN(valor) || valor <= 0) {
        alert('O campo Valor deve ser preenchido!!');
        return;
    }

    const pagamentoPix = document.getElementById('Pix').checked;
    const pagamentoCC = document.getElementById('cc').checked;
    let valorTotal = 0;

    if (pagamentoPix) {
        document.getElementById('pix-container').style.display = 'block';
        document.getElementById('cc-container').style.display = 'none';
        valorTotal = valor - (valor * 0.10);
    } else if (pagamentoCC) {
        document.getElementById('pix-container').style.display = 'none';
        document.getElementById('cc-container').style.display = 'block';
        const numeroInput = document.getElementById('numero');
        numeroInput.addEventListener('input', verificarNumeroCartao); 
        valorTotal = valor;

        const valor1 = valorTotal;
        const valor2 = valor / 2;
        const valor3 = valor / 3;
        const valor4p = (valor * 0.05) + valor;
        const valor4 = (valor4p / 4);
        const valor5p = (valor * 0.10) + valor;
        const valor5 = (valor5p / 5);

        document.getElementById('p-total1').innerText = 'R$ ' + valor1.toFixed(2) + ' (sem juros)';
        document.getElementById('p-total2').innerText = 'R$ ' + valor2.toFixed(2) + ' (sem juros)';
        document.getElementById('p-total3').innerText = 'R$ ' + valor3.toFixed(2) + ' (sem juros)';
        document.getElementById('p-total4').innerText = 'R$ ' + valor4.toFixed(2) + ' (5% juros)';
        document.getElementById('p-total5').innerText = 'R$ ' + valor5.toFixed(2) + ' (10% juros)';

        const parcelaSelect = document.getElementById('parcelas');
        parcelaSelect.addEventListener('change', function() {
            let parcelaValor;
            switch (parcelaSelect.value) {
                case '1x':
                    parcelaValor = valor1;
                    break;
                case '2x':
                    parcelaValor = valor2 * 2;
                    break;
                case '3x':
                    parcelaValor = valor3 * 3;
                    break;
                case '4x':
                    parcelaValor = valor4p;
                    break;
                case '5x':
                    parcelaValor = valor5p;
                    break;
                default:
                    parcelaValor = null;
            }
            document.getElementById('v-total').innerText = 'R$ ' + parcelaValor.toFixed(2);
        });
    } else {
        alert('Selecione um método de pagamento!!');
        return;
    }

    document.getElementById('v-total').innerText = 'R$ ' + valorTotal.toFixed(2);
    document.getElementById('pagto-container').style.display = 'block';
}

function verificarNumeroCartao() {
    const numero = document.getElementById('numero').value;
    const bandeira = document.getElementById('bandeira');

    if (numero.length >= 4) {
        if (numero.startsWith('1234')) {
            bandeira.src = 'icon/mastercard.png';
            bandeira.style.display = 'inline';
        } else if (numero.startsWith('4321')) {
            bandeira.src = 'icon/visa.png';
            bandeira.style.display = 'inline';
        } else {
            bandeira.style.display = 'none';
            alert('Número de cartão inválido!!');
        }
    } else {
        bandeira.style.display = 'none';
    }
}

function pagtoAceito() {
    const valorTotal = document.getElementById('v-total').innerText;
    const cpf = document.getElementById('cpf').value;
    alert('Pagamento Efetuado com Sucesso!!' 
        + '\nVALOR TOTAL: ' + valorTotal);
}
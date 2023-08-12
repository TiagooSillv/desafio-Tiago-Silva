class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        
        if (itens == ''){
            return "Não há itens no carrinho de compra!"
        }
        if (itens == 0){
            return "Quantidade inválida!"
        }
        if(metodoDePagamento == ''){
            return "Forma de pagamento inválida!"
        }
        if(metodoDePagamento == 0){
            return "Quantidade inválida!"
        }
        const cardapio = [
            { codigo:'cafe', descricao:'Café',valor: 3.00 },
            { codigo:'chantily', descricao:'Chantily (extra do Café)',valor: 1.50 },
            { codigo:'suco', descricao:'Suco Natural',valor: 6.20 },
            { codigo:'sanduiche', descricao:'Sanduíche',valor: 6.50 },
            { codigo:'queijo', descricao:'Queijo (extra do Sanduíche)',valor: 2.00 },
            { codigo:'salgado', descricao:'Salgado',valor: 7.25 },
            { codigo:'combo1', descricao:'1 Suco e 1 Sanduíche',valor: 9.50 },
            { codigo:'combo1', descricao:'1 Suco e 1 Sanduíche',valor: 7.50 },
        ]

        const resumoDaCompra = [];
        let cont = 0;
        for (const item of itens) {
            let [produto, quantidade] = item.split(',');
            const verificadorDeItem = cardapio.some((itemDoCaradpio)=>{
                return itemDoCaradpio.codigo === produto;
            })
            if(verificadorDeItem){
                const carrinho = cardapio.find((itemDoCaradpio)=>{
                    return itemDoCaradpio.codigo === produto;
                });
                quantidade = parseInt(quantidade);
                resumoDaCompra.push(carrinho);
                resumoDaCompra[cont] = {...carrinho,quantidade}
                cont ++

            }else{
                resumoDaCompra.push("Item inválido!")
                break;
            }      
        }
        const verificadorDeItemInvalido = resumoDaCompra.find((itemDaCompra)=>{
            return itemDaCompra === "Item inválido!";
        });

        if (verificadorDeItemInvalido){
            return "Item inválido!"
        }   

        function valorDaCompra (resumoDaCompra){
            const verificarSemTemCafe = resumoDaCompra.some((produto)=>{
                return produto.codigo === 'cafe';
            });
            const verificarSemTemSanduiche = resumoDaCompra.some((produto)=>{
                return produto.codigo === 'sanduiche';
            });
            const verificarSemTemQueijo = resumoDaCompra.some((produto)=>{
                return produto.codigo === 'queijo';
            });
            const verificarSemTemChantily = resumoDaCompra.some((produto)=>{
                return produto.codigo === 'chantily';
            });
            
            if (verificarSemTemChantily){
                if(!verificarSemTemCafe){
                    return "Item extra não pode ser pedido sem o principal";    
                }
            }
            if (verificarSemTemQueijo) {
                if (!verificarSemTemSanduiche) {
                    return "Item extra não pode ser pedido sem o principal"
                }
            }
            let valorDaCompra = 0;
            for (const produto of resumoDaCompra) {
                valorDaCompra += produto.quantidade * produto.valor;
            }
            let valorTotalComDesconto = valorDoDesconto(metodoDePagamento,valorDaCompra);

            return valorTotalComDesconto;

        }

        function valorDoDesconto (metodoDePagamento,valorDaCompra){

            const descontoCredito = 1.03;
            const descontoDinheiro = 0.05;
            const descontoDebito = 1.00;
    
            switch (metodoDePagamento){
                case 'debito':
                    return valorDaCompra * descontoDebito;
                case 'credito':
                    return valorDaCompra * descontoCredito;
                case 'dinheiro':
                    return valorDaCompra - (valorDaCompra * descontoDinheiro);
                default:
                    return "Forma de pagamento inválida!"
            }
        }

        let valorTotalDaCompra;
        valorTotalDaCompra = valorDaCompra(resumoDaCompra);
        if(valorTotalDaCompra === "Forma de pagamento inválida!")
        {
            return valorTotalDaCompra;
        }
        if(valorTotalDaCompra === 'Item extra não pode ser pedido sem o principal'){
            return valorTotalDaCompra;
        }else{

            valorTotalDaCompra = valorTotalDaCompra.toFixed(2).replace('.',',')
            valorTotalDaCompra.toString();

            return  `R$ ${valorTotalDaCompra}`;
        }

    }
}

export { CaixaDaLanchonete };

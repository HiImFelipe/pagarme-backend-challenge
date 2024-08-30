- cash-in
- cash-out

- Processar Transações (criar transações)
	- [ ] Salvar transações no banco
	- [ ] Criar um `payable`, valor que o cliente vai receber quando a transação for realizada
	
- Lista de Transações 
	- [ ] O serviço deve retornar uma lista das transações já criadas
	- [ ] Como o número do cartão é uma informação sensível, o serviço só pode armazenar e retornar os 4 últimos dígitos do cartão.
	
- Criar Payables
	- Se a transação for feita com um cartão de débito:
	    - [ ] O payable deve ser criado com status = `paid` (indicando que o cliente já recebeu esse valor)
	    - [ ] O payable deve ser criado com a data de pagamento (payment_date) = data da criação da transação (D+0).
	- Se a transação for feita com um cartão de crédito:
	    - [ ] O payable deve ser criado com status = `waiting_funds` (indicando que o cliente vai receber esse dinheiro no futuro)
	    - [ ] O payable deve ser criado com a data de pagamento (payment_date) = data da criação da transação + 30 dias (D+30).
	- [ ] No momento de criação dos payables também deve ser descontado a taxa de processamento (que chamamos de `fee`) do cliente. Ex: se a taxa for 5% e o cliente processar uma transação de R$100,00, ele só receberá R$95,00. Considere as seguintes taxas:
		- [ ] 3% para transações feitas com um cartão de débito
		- [ ] 5% para transações feitas com um cartão de crédito

- Consulta de saldo de clientes
	- [ ] Saldo `available` (disponível): tudo que o cliente já recebeu (payables `paid`)
	- [ ] Saldo `waiting_funds` (a receber): tudo que o cliente tem a receber (payables `waiting_funds`)

<hr />

* Valores a serem recebidos na criação de uma transação
    - Valor da transação
    - Descrição da transação. Ex: `'Smartband XYZ 3.0'`
    - Método de pagamento (`debit_card` ou `credit_card`)
    - Número do cartão
    - Nome do portador do cartão
    - Data de validade do cartão
    - Código de verificação do cartão (CVV)
<h1 align="center"> 💽 Desafio Backend Pagar.me </h1>

A ideia é realizar um programa capaz de lidar com cash-in e cash-out de um sistema de pagamentos. Para isso, este projeto teve como estratégia desacoplar toda a regra de negócio de Frameworks, ORMs, etc. Desta maneira, ele pode ser executado de dentro pra fora, focando mais em entregáveis e deixando a configuração externa em segundo plano (final do projeto).

<p align=right>
	<small>O desafio listado aqui é público</br> e pode ser encontrado
	<a href="https://github.com/pagarme/vagas/blob/master/desafios/software-engineer-backend/README.md">
		neste link
	</a>
	</small>
</p>

## 📃 Objetivos

- Processar Transações (criar transações)
  - [ ] Salvar transações no banco
  - [x] Criar um `payable`, valor que o cliente vai receber quando a transação for realizada
- Lista de Transações
  - [ ] O serviço deve retornar uma lista das transações já criadas
  - [ ] Como o número do cartão é uma informação sensível, o serviço só pode armazenar e retornar os 4 últimos dígitos do cartão.
- [x] Criar Payables

  - Se a transação for feita com um cartão de débito:
    - [x] O payable deve ser criado com status = `paid` (indicando que o cliente já recebeu esse valor)
    - [x] O payable deve ser criado com a data de pagamento (payment_date) = data da criação da transação (D+0).
  - Se a transação for feita com um cartão de crédito:
    - [x] O payable deve ser criado com status = `waiting_funds` (indicando que o cliente vai receber esse dinheiro no futuro)
    - [x] O payable deve ser criado com a data de pagamento (payment_date) = data da criação da transação + 30 dias (D+30).
  - [x] No momento de criação dos payables também deve ser descontado a taxa de processamento (que chamamos de `fee`) do cliente. Ex: se a taxa for 5% e o cliente processar uma transação de R$100,00, ele só receberá R$95,00. Considere as seguintes taxas:
    - [x] 3% para transações feitas com um cartão de débito
    - [x] 5% para transações feitas com um cartão de crédito

- [ ] Consulta de saldo de clientes
  - [ ] Saldo `available` (disponível): tudo que o cliente já recebeu (payables `paid`)
  - [ ] Saldo `waiting_funds` (a receber): tudo que o cliente tem a receber (payables `waiting_funds`)

<hr />

- Valores a serem recebidos na criação de uma transação
  - Valor da transação
  - Descrição da transação. Ex: `'Smartband XYZ 3.0'`
  - Método de pagamento (`debit_card` ou `credit_card`)
  - Número do cartão
  - Nome do portador do cartão
  - Data de validade do cartão
  - Código de verificação do cartão (CVV)

## 💻 Rodando o Projeto

### Dependências

- node v20.11 ou acima.

Instale as bibliotecas necessárias para rodar o projeto.

```
npm install
```

### Como executar

Primeiramente devemos realizar o build de typescript para javascript, para isso, na raiz do projeto, executamos:

```
npm run build
```

E logo em seguida, podemos executá-lo com o NodeJS.

```
npm run start
```

---

Para rodar os testes:

```
npm run test
```

Para rodar **sem a fase de build** (apenas para desenvolvimento):

```
npm run dev
```

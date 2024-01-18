# Teste GSW

## Visão Geral

Este é um simples aplicativo que simula transações bancárias. Possui funcionalidades como saque, depósito, histórico de transações (extrato) e verificação de saldo. A aplicação interage com uma API backend para realizar essas operações.

## Tecnologias Utilizadas

- Next.js
- Nestjs
- React
- Tailwind CSS
- Fetch API
- MongoDB
- Docker
- Docker Compose

## Como Começar

- Clone o repositório

```bash
  https://github.com/viniciusgoliver/teste-gsw.git
```

- Instale as dependências:

```bash
  cd teste-gsw
  npm run docker:build
```
** OBS Não será necessãrio executar o npm run install, pois o docker jã executa esta tarefa em tempo de exec.
- Abra <http://localhost:3000> no seu navegador.


## Estrutura do Projeto

O projeto está organizado em 5 páginas:

- **Home (`/`):**
  - Página contendo o menu de acesso aos módulos

- **Saque (`/saque`):**
  - Permite aos usuários sacar fundos de sua conta.
  - Regra de Negócio: O saque só é permitido se houver saldo suficiente na conta.

- **Depósito (`/deposito`):**
  - Permite aos usuários depositar fundos em sua conta.
  - Regra de Negócio: Aceita valores com ponto ou vírgula como separador decimal e permite até 2 casas decimais.

- **Extrato (`/extrato`):**
  - Exibe o histórico de transações com paginação.
  - A primeira transação em cada página é destacada.
  - Regra de Negócio: A última transação inserida é destacada com uma cor de fundo amarela clara.

- **Saldo (`/saldo`):**
  - Mostra o saldo atual da conta.
  - Regra de Negócio: Atualiza automaticamente a última transação após um saque ou depósito.


## Requisitos Básicos

    - Entregar o Menor Número de Notas:
        * A lógica de saque deve ser implementada para entregar a menor quantidade possível de notas ao cliente.

    - Possibilidade de Sacar o Valor Solicitado:
        * O sistema deve permitir o saque apenas se houver cédulas disponíveis para atender ao valor solicitado.

    - Saldo do Cliente:
        * O saldo inicial do cliente é de R$ 10.000,00.

    - Quantidade de Notas Infinita:
        * Embora a quantidade de notas seja teoricamente infinita, é possível limitá-la para aumentar a dificuldade do problema.

    - Notas Disponíveis:
        * As notas disponíveis para saque são de R$ 100,00; R$ 50,00; R$ 20,00; e R$ 10,00.

    - Validação de Saldo Disponível:
        * Antes de realizar um saque, o sistema deve validar se o saldo do cliente é suficiente para cobrir o valor solicitado.

    - Gerenciamento da Conta:
        * O sistema deve permitir o gerenciamento do saldo e dos saques realizados pelo cliente.

## Exemplos de Saque

    - Exemplo 1:
        * Valor do Saque: R$ 30,00
         - Resultado Esperado: Entregar 1 nota de R$20,00 e 1 nota de R$ 10,00.

    - Exemplo 2:
        * Valor do Saque: R$ 80,00
         - Resultado Esperado: Entregar 1 nota de R$50,00, 1 nota de R$ 20,00 e 1 nota de R$ 10,00.


## Endpoints da API

- **API de Saque:**

  ```bash
  curl --request POST \
    --url http://localhost:3001/account/saque \
    --header 'Content-Type: application/json' \
    --data '{
      "amount": 100
    }'
  ```

- **API de Depósito:**

```bash
  curl --request POST \
    --url http://localhost:3001/account/deposito \
    --header 'Content-Type: application/json' \
    --data '{
      "initialBalance": 30000
    }'
```

- **API de Histórico de Transações:**

```bash
  curl --request GET \
    --url <http://localhost:3001/account/extrato?page=1>
```

- **API de Saldo:**

```bash
  curl --request GET \
  --url http://localhost:3001/account/saldo
```

## Testes

- O código de teste fornecido utiliza o framework Jest para realizar testes unitários na classe AccountService do aplicativo bancário. Abaixo, fornecerei uma documentação detalhada para cada seção do código de teste.

## 1. Configuração Inicial dos Testes

- Nos testes foi realizado a configuração inicial para os testes da classe AccountService.
- Um mock do AccountRepository é criado para simular comportamentos específicos durante os testes.
- O serviço e o repositório são inicializados antes de todos os testes.
- No método getBalance do AccountService. O primeiro teste verifica se é retornado corretamente o saldo.
- O segundo teste verifica se uma exceção é lançada se o saldo for menor ou igual a zero.
- Já no método withdraw, utiliza a função describe.each para realizar vários testes com diferentes valores de saque e mensagens de erro associadas. Após isso, é Verificado se o método lança a exceção correta para cada situação. No final, temos a garantia que as funções updateAccount e addTransaction n~ao sejam chamadas em determinadas condições.

Para executar o teste, basta rodar o comando abaixo na raiz.

```bash
  npm run test:unit
```

## Notas Adicionais

- Certifique-se de que o servidor backend esteja em execução em <http://localhost:3001>.
- A aplicação utiliza Tailwind CSS para estilização, e os componentes são estruturados para fácil customização.
# Documentação do Projeto

Esse projeto se trata de uma API de lista de tarefas a serem feitas, com data de criação, descrição, e status de concluído.

O projeto utiliza mysql como banco de dados e Sequelize como ORM, modelando o banco e facilitando operações básicas.

A estrutura da API se divide em 4 pastas principais, sendo responsáveis por dividir a lógica e organizar o código de forma limpa e clara:

- ```database```: Criação e conexão com o banco

- ```model```: Mapeamento das tabelas do banco pelo sequelize 

- ```routes```: Rotas e regra de negócio

- ```tests```: Testes unitários e monitoramento

E por fim o arquivo ```app.js``` na raiz no projeto é responsável por iniciar o servidor


## Passo a passo

Primeiro instale as dependencias com o gerenciador de pacotes padrão do node: 
```bash
 npm install
```
A seguir, é necessário utilizar o .env-example para criar seu .env com a finalidade de guardar de forma segura os dados de seu banco de dados. 

Feito isso, o sequelize está configurado para criar o banco de dados, dado que você possua uma conexão com alguma instância mysql, seja por meio de docker, hospedada na nuvem, ou até por meio de servidor xampp.

Agora é apenas necessário apenas rodar o comando a seguir pelo seu terminal:
```bash
 node app.js
```
Se o banco ainda não for criado, tente novamente para o sequelize sincronizar.


## Rotas da API

A seguir, estão listadas as rotas disponíveis na API, junto com suas respectivas funções:

- **GET /tasks**
  - **Função**: Lista todas as tarefas.
  - **Descrição**: Retorna um array com todas as tarefas existentes no banco de dados.

- **POST /tasks**
  - **Função**: Cria uma nova tarefa.
  - **Descrição**: Recebe os dados da nova tarefa e a adiciona ao banco de dados.

- **PATCH /tasks/:id**
  - **Função**: Atualiza uma tarefa existente.
  - **Descrição**: Recebe o ID da tarefa a ser atualizada e os novos dados e atualiza a tarefa correspondente no banco de dados.

- **DELETE /tasks/:id**
  - **Função**: Remove uma tarefa.
  - **Descrição**: Recebe o ID da tarefa a ser removida e a exclui do banco de dados.

- **PATCH /tasks/:id/complete**
  - **Função**: Marca uma tarefa como concluída.
  - **Descrição**: Recebe o ID da tarefa e atualiza seu status para concluído.

## Testes Unitários

Este projeto inclui uma suíte de testes unitários utilizando o Jest. Os testes são fundamentais para garantir que as funcionalidades da aplicação funcionem conforme esperado. 

### Execução dos Testes

Para rodar os testes unitários, utilize o seguinte comando:

```bash
npm test
```

Os testes estão localizados no diretório src/tests. A seguir, algumas das funcionalidades testadas:

      Criação de Tarefas: Verifica se uma nova tarefa é criada corretamente.

      Listagem de Tarefas: Testa se todas as tarefas são listadas conforme esperado.

      Atualização de Tarefas: Confirma que as tarefas existentes podem ser atualizadas.

      Remoção de Tarefas: Verifica se as tarefas podem ser removidas corretamente.

      Marcação de Tarefas como Concluídas: Testa a funcionalidade de marcar uma tarefa como concluída.

## Monitoramento

O projeto inclui um endpoint para métricas, que permite monitorar a saúde da aplicação e coletar dados de desempenho.

O endpoint de métricas está disponível em:

```bash
GET /metrics
```

Este endpoint expõe métricas no formato Prometheus, permitindo que ferramentas de monitoramento coletem dados sobre o desempenho da aplicação. É preciso enviar algumas requisições para acumular métricas próprias para a comparação.

As seguintes métricas estão sendo coletadas:

    Duração de Requisições HTTP: Mede a duração dos requests em segundos e categoriza por método, rota e status.
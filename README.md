# Cadastro de Celulares - Gerenciamento de Celulares
### OBS Dentro desse projeto, existem dois projeto o phone-menager que é o projeto do desafio que eu quis fazer com alguns estilos diferenciados para descontrair e o phone-menager-prototype que é o projeto real do desafio, os dois estão ai disponíveis para avaliação!
## Descrição
Este repositório contém a solução para um aplicativo de gerenciamento de cadastro de celulares. O sistema permite cadastrar, editar, excluir e listar celulares de uma empresa que está lançando um novo app de vendas.

A aplicação foi construída utilizando ReactJS, Prisma e Supabase, com uma interface de usuário que se comunica com uma API externa para realizar as operações necessárias.

## Tecnologias Utilizadas
ReactJS: Para a construção da interface do usuário.
Prisma: ORM para facilitar a interação com o banco de dados.
Supabase: Plataforma de Backend como Serviço (BaaS), que hospeda o banco de dados.
Tailwind CSS: Framework de CSS para a construção do layout responsivo.
Axios: Biblioteca para requisições HTTP.
React Router: Para gerenciamento de rotas no frontend.
## Requisitos
Frontend: A aplicação foi desenvolvida em ReactJS.
Bibliotecas: Foram utilizadas bibliotecas como Tailwind CSS, Prisma, Axios, React Router, entre outras.
Responsividade: A aplicação foi projetada para ser responsiva, oferecendo uma boa experiência em dispositivos móveis.
Validação de Dados: A aplicação valida os dados dos celulares antes de enviá-los para o servidor.
## Funcionalidades
Cadastro de Celulares: Permite cadastrar um novo celular com as informações necessárias.
Edição de Celulares: Permite editar os dados de um celular existente.
Exclusão de Celulares: Permite excluir um celular da lista.
Listagem de Celulares: Exibe todos os celulares cadastrados.
Validação de Campos: Todos os campos de cadastro possuem validações específicas.
Integração com a API: A aplicação faz uso da API externa para as operações de CRUD.
## Validações dos Campos
model: Nome do modelo do celular.
Tipo: Texto
Restrições: Alfanumérico, mínimo de 2 e máximo de 255 caracteres.

price: Preço do celular.
Tipo: Número Real
Restrições: Número positivo.

brand: Nome da marca do celular.
Tipo: Texto
Restrições: Alfanumérico, mínimo de 2 e máximo de 255 caracteres.

startDate: Data de início da venda.
Tipo: Data
Restrições: Data no formato "dd/MM/yyyy" (exemplo: 31/12/2018). A data deve ser posterior ao dia 25/12/2018.

endDate: Data de fim da venda.
Tipo: Data
Restrições: Data no formato "dd/MM/yyyy" (exemplo: 31/12/2018). Deve ser posterior à data de início.

color: Cor do celular.
Tipo: Lista Fixa
Valores Permitidos: BLACK, WHITE, GOLD, PINK.

code: Código de identificação do celular.
Tipo: Texto
Restrições: Alfanumérico de 8 caracteres, não deve se repetir.

## Requisitos Técnicos
Cadastro: É possível cadastrar um novo celular com todos os dados obrigatórios.
Edição: Permite editar um celular já cadastrado, com validações de dados.
Exclusão: Possibilidade de excluir um celular.
Listagem: Todos os celulares cadastrados são exibidos na interface.
Header: A cada requisição, o CPF do usuário deve ser enviado no cabeçalho ({ cpf: seu cpf }).

## Endpoints da API
A API utilizada para comunicação é:

#### GET /api/phone - Lista todos os celulares.
#### GET /api/phone/:id - Exibe os detalhes de um celular específico.
#### DELETE /api/phone/:id - Exclui um celular pelo ID.
#### POST /api/phone - Cria um novo celular.
#### PATCH /api/phone/:id - Atualiza as informações de um celular.
Exemplo de Requisição (Criar ou Editar Celular)
Body da Requisição:
#### {
####   "model": "Galaxy 5",
####   "brand": "Samsung",
####   "price": "900",
####   "startDate": "26/04/2019",
####   "endDate": "12/12/2022",
####   "color": "BLACK",
####   "code": "#12212"
#### }
Os endpoints da API podem ser acessados em localhost/api/phone (em ambiente local) ou na URL fornecida.

## Configuração e Setup
Para rodar a aplicação localmente, siga os seguintes passos:

### Clone o repositório:
git clone https://github.com/seu-usuario/phone-manager.git
cd phone-manager

### Crie uma conta no Supabase:
Acesse Supabase e crie uma conta, caso ainda não tenha.
Crie um novo projeto e configure o banco de dados.

### Configuração do .env:
No arquivo .env, adicione as variáveis de ambiente relacionadas ao Supabase e outras configurações necessárias.
env
Copiar código
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_CPF=your_cpf

### Gerar o Prisma Client:
Após configurar as variáveis de ambiente, rode os seguintes comandos para gerar o Prisma Client e migrar o banco de dados para o Supabase.
npx prisma generate
npx prisma db push
### Instale as dependências:
npm install
Inicie a aplicação:
npm start
A aplicação estará disponível em http://localhost:3000.

## Conclusão
A solução foi construída para atender aos requisitos apresentados, com um formulário de cadastro de celulares que realiza as validações necessárias e se comunica com a API para operações CRUD. A aplicação é responsiva e segue o protótipo fornecido.

# OBS Foram feito dois projetos ambos com a mesmas funcionalidades, um eu fiquei com vontade de brincar com os estilos e fiz baseado nos estilos que achei interessante e o outro fiz respeitando 100% o protótipo passado.

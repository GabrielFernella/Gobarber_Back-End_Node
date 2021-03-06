Template
# Passos de instalação: 

1 - yarn add express
2 - Create file app.js, routes.js, server.js 
3 - yarn add sucrase nodemon -D (sucrase = para fazer os imports das dependencias) (nodemon = para fazer a atualização automatica)
4 - create nodemon.json para reconhecer os imports and edit package.json em scripts
5 - docker run --name postdata -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11 (instalar o container do docker)(o 11 descoheço)
6 - criar a estrutura de pastas
7 - yarn add sequelize  and  yarn add sequelize-cli -D and create .sequelizerc
8 - yarn add pg pg-hstore (Dependencias postgres)
9 - yarn sequelize migration:create --name=create-users   (criando a migration create Users)
10 - yarn sequelize db:migrate (Para executar a migration)   ||  yarn sequelize db:migrate:undo ou undo:all para desfazer as migratins
11 - yarn add bcryptjs (para gerar o hash de criptografia)
12 - yarn add jsonwebtoken (Atutenticação JWT em Token) (pesquisa um texto para fazer a criptografia no MD5 online)
13 - yarn add yup (Biblioteca de validação, shema validation)

14 - yarn add multer
15 - yarn sequelize migration:create --name=create-files (criar a tabela de files no banco) before yarn sequelize db:migrate
16 - yarn sequelize migration:create --name=add-avatar-field-to-users (Add campo de avatar para a tabela de usuários) before yarn sequelize db:migrate
17 - yarn sequelize migration:create --name=create-appointments (criar a tabela de agendamentos) yarn sequelize db:migrate
18 - yarn add date-fns@next (Biblioteca de datas)
19 - docker run --name mongobarber -p 27017:27017 -d -t mongo   (container para MongoDB)
20 - yarn add mongoose (ORM para mongoDB)
21 - yarn add nodemailer (biblioteca de envio de email)
22 - mailtrap.io (site de envio de email para testes)
23 - Para fazer templates de emails personalisados = yarn add express-handlebars nodemailer-express-handlebars
24 - criar as estruturas de pastas e arquivos dentro de views
25 - Adicionando Fila em Redis = docker run --name redisbarber -p 6379:6379 -d -t redis:alpine
26 - yarn add bee-queue (ferramenta de fila ) (Aula Difícil 17) yarn queue (new Date().getTime()) no chrome para pegar a data para a query 
27 - sentry.io (para tratamento e monitoramento de erros. Fazer login e baixar as infos)
28 - yarn add @sentry/node@5.14.1  =  Crie a config e edite o app.js
29 - yarn add express-async-errors
30 - yarn add youch
31 - yarn add dotenv (arquivo .env criado, porém, privado)
32 - Editar todas as conexões com as variaveis de ambiente

# Start Aplication other Interface
    docker start postadata mongobarber redisbarber
    yarn 
    yarn sequelize db:migrate (before created database gobarber in docker)
    yarn dev
    yarn queue
    npm install --save retry-as-promised
    
Aplicações de Terceiros Usados no projeto 
    docker (Container)(3 bancos utilizados)
    MD5 (para fazer chave de Autenticação)
    Mailtrip (Recebimento de Emails)
    Sentry.io (Verificação de Erros)




----------------------------------------------------------------------------------------------------------------------------
 Anotações:

    #ORM 
        * Abstração de bamco de dados
        * tabelas viram models
        * apenas codigo javascript

        @Migrations
            *Controle de versão para base de dados
            *cada arquivo contém instruçaõ para created, updated, remove tabelas e colunas
            *mantém a base de dados atualizada entre os desenvolvedores 
            *cada arquivo é uma migration e sua ordenação ocorre por data
            *é possivel desfazer uma migração
            *cada migration deve realizar alterações em apenas uma tabela
        @Seeds 
            *população da base de dados para desenvolvimento
            *utilizado para testes
            *executavel através de comandos
            *jamais utilizados em produção
    
    #Arquitetura MVC
        @model = Armazena a abstração do banco, utilizado para manipular os dados contidos nas tabelas do banco. Não é responsavel pela regra de negócio.
        @Controller = Ponto de entrada das requisições da aplicação, uma rota está associada diretamente com um método controller. parte as regras de negócio da aplicação.
        @View = Retorno ao cliente, retorno json para o front-end poder manipular da melhor maneira

            @Face de um Controller
                *Classes,
                *Sempre retorna um json,
                *não chama outro controller/método
                *Quando criar um novo controller = apenas 5 métodos, precisa ser da mesma entidade
                *Métodos = index, show, store, update, delete
    

    #Autenticação JWT = Autenticação através de token 
            *headers = cabeçalho, tipo do algoritmo
            *Payload = Dados Adicionais
            *Assinatura = garante que o token não foi alterado por algum usuário

    @guardar arquivos diversos dentro de um CDN (servidores onlines para arquivos físicos)
        *amazonS3
        *digitalOshon

            
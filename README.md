# Sistema de Gerenciamento - API em ASP.NET Core + Frontend React

Este projeto é uma aplicação **fullstack** desenvolvida para fins de avaliação técnica.
Contém uma **API REST** feita em **ASP.NET Core (.NET 8)** e um **frontend em React** para consumir os dados.

## 📦 Tecnologias Utilizadas

- ASP.NET Core 8 (Backend)
- Entity Framework Core (ORM)
- React.js (Frontend)
- Swagger (Documentação da API)
- MySQL (Banco de Dados)

## 📁 Estrutura do Projeto

```plaintext
/ClientApp               # Aplicação Frontend (React)
/Controllers             # API Controllers (C#)
/Models                  # Modelos de dados (C#)
/Data                    # DbContext e configurações de banco
/Repositories            # Camada de acesso a dados
/Services                # Regras de negócio
Program.cs               # Configurações principais do Backend
appsettings.json         # Configurações da aplicação (ex: conexão com banco)
```

## 📌 Funcionalidades

- CRUD de Clientes
- CRUD de Fornecedores
- CRUD de Produtos
- Relacionamento entre Produtos e Fornecedores
- Documentação automática da API com Swagger
- Frontend simples para consumir e manipular os dados da API

## 🚀 Como Executar o Projeto

1. Clone o repositório:
```bash
git clone https://github.com/serbiow/CRUD_React_ASP
cd CRUD_React_ASP
```

2. Configure a connection string no `appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=SEU_SERVIDOR;Database=EmpresaDB;Trusted_Connection=True;TrustServerCertificate=True;"
}
```

3. Execute as migrações (se necessário):
```bash
dotnet ef database update
```

4. Rode a aplicação (API + Frontend):
```bash
dotnet run
```

5. Acesse no navegador:
- API (Swagger): `https://localhost:5001/swagger`
- Frontend React: `https://localhost:44449` (ou porta configurada)

## 💡 Observações

- Projeto criado para avaliação de conhecimentos em desenvolvimento fullstack com C# e JavaScript.
- O frontend React está localizado dentro da pasta `/ClientApp` e se comunica automaticamente com a API.

## 📬 Contato

Desenvolvido por [Sérgio Reis](https://github.com/serbiow)  
Email: sergiohenriqueqqq@gmail.com

# Web Projeto Around Auh

## Descrição

O **Web Projeto Around Auth** Este projeto implementa um sistema de registro e autorização no front-end, incluindo a criação de rotas e redirecionamento, bem como a autenticação de usuários.

## Funcionalidades

1. **Registro de Usuários**:

   - Permite que novos usuários se cadastrem no sistema.

2. **Autenticação**:

   Implementa login e controle de sessão para garantir acesso seguro.

3. **Criação de Rotas**:
   Define rotas protegidas e públicas para navegação adequada.

## Tecnologias Utilizadas

- **React Router**: para gestão de rotas.
- **Context API**: Gerenciamento de estado.
- **JWT (JSON Web Tokens)**: Autenticação.

## Como Rodar o Projeto

1. **Clone o repositório**:

   ```bash
   git clone <url-do-repositorio>
   cd web-projeto-around-auth
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Inicie o servidor**:

   ```bash
   npm start
   ```

4. **Teste a aplicação**:
   Utilize ferramentas como Postman ou Insomnia para interagir com as rotas do servidor.

## Exemplos de Uso

### Verificação de Token

Envie uma requisição GET para a rota protegida com o token:

```http
GET /api/protected
Authorization: Bearer <seu-token-jwt>
```

## Contribuição

1. Faça um fork do repositório.
2. Crie uma branch com sua feature ou correção:
   ```bash
   git checkout -b minha-feature
   ```
3. Commit suas alterações:
   ```bash
   git commit -m "Minha nova feature"
   ```
4. Faça um push para sua branch:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request no repositório original.

## Autor

Desenvolvido por [Aysla Loureiro].

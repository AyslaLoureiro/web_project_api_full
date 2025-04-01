# Web Projeto Around Express

## Descrição

O **Web Projeto Around Express** é um projeto focado no aprendizado de back-end, onde você cria seu próprio servidor utilizando Express.js. Este projeto tem como objetivos principais:

- Verificar tokens de autenticação.
- Salvar e retornar "cards" (dados definidos pelo usuário).
- Lembrar se um determinado usuário gostou ou não de um "card".

## Funcionalidades

1. **Autenticação**:

   - O servidor verifica tokens para autenticar os usuários e garantir a segurança.

2. **Cards**:

   - Permite criar, salvar e retornar cards.
   - Cada card pode conter informações personalizadas, como título, descrição e outros detalhes.

3. **Likes nos Cards**:
   - Armazena as preferências dos usuários em relação a cada card.
   - Permite registrar se um usuário gostou ou não de um card específico.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript.
- **Express.js**: Framework para criar o servidor.
- **JWT (JSON Web Tokens)**: Para verificação e autenticação de usuários.
- **Banco de Dados**: Pode ser MongoDB ou qualquer outro sistema de armazenamento para salvar informações de usuários e cards.

## Como Rodar o Projeto

1. **Clone o repositório**:

   ```bash
   git clone <url-do-repositorio>
   cd web-projeto-around-express
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

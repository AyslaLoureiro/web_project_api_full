export const BASE_URL = "https://api.around-us.mooo.com";

export const signin = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then((error) => {
        throw new Error(error.message || `Error: ${res.status}`);
      });
    }
    return res.json();
  });
};

export const signup = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        // Se a resposta não for bem-sucedida, exibe o erro.
        return res.json().then((error) => {
          console.error("Erro completo:", error);
          console.error("Mensagem de erro:", error.message);
          console.error("Dados adicionais:", error.data);
          throw new Error(error.message || `Error: ${res.status}`);
        });
      }
      return res.json();
    })
    .catch((error) => {
      console.error("Erro ao registrar usuário:", error);
      throw error;
    });
};

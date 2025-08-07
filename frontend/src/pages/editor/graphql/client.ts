import { ApolloClient, InMemoryCache, HttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import toast from "react-hot-toast";

// Link para HTTP
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URL || "http://localhost:8093/graphql",
  credentials: "include",
});

// Link para autenticación (token opcional)
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("auth-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };
});

// Link para manejo de errores global
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      console.error(`GraphQL error: ${message}`);
      toast.error(`Error: ${message}`);
    });
  }

  if (networkError) {
    console.error(`Network error: ${networkError}`);
    toast.error("Error de conexión. Verifica tu conexión a internet.");
  }
});

// Política de cache personalizada
const cache = new InMemoryCache({
  typePolicies: {
    Editor: {
      fields: {
        objectLayers: {
          merge(_, incoming: unknown[]) {
            return incoming;
          },
        },
      },
    },
    EditorResponse: {
      fields: {
        stats: {
          merge(_, incoming) {
            return incoming;
          },
        },
        warnings: {
          merge(_, incoming: string[]) {
            return incoming;
          },
        },
      },
    },
  },
});

// Composición final de los links
const link = from([errorLink, authLink, httpLink]);

// Cliente Apollo
export const apolloClient = new ApolloClient({
  link,
  cache,
  defaultOptions: {
    watchQuery: {
      errorPolicy: "all",
      notifyOnNetworkStatusChange: true,
    },
    query: {
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});

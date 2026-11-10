import { QueryClient, QueryFunction, QueryKey } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  body?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    // FIX CORS: „same-origin" zamiast „include" – cookies są wysyłane tylko
    // do własnego origina (API), nigdy do domen zewnętrznych (np. obrazów
    // z https://pranie-dywanow.j.pl w trybie dev na localhost:5000).
    credentials: "same-origin",
    body: body ? JSON.stringify(body) : undefined,
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "throw" | "returnData";

export const getQueryFn =
  <T = unknown, TQueryKey extends QueryKey = QueryKey>(options: {
    on401: UnauthorizedBehavior;
  }): QueryFunction<T, TQueryKey> =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      // FIX CORS (błąd z konsoli):
      // „The value of the 'Access-Control-Allow-Origin' header in the response
      //  must not be the wildcard '*' when the request's credentials mode is
      //  'include'."
      //
      // Było: credentials: "include" — globalny queryFn wysyłał cookies DO
      // KAŻDEJ pobieranej nazwy queryKey, również do obrazów z zewnętrznej
      // domeny (https://pranie-dywanow.j.pl/images/dywany/88.avif). Serwer
      // odpowiada nagłówkiem „Access-Control-Allow-Origin: *", a wildcard +
      // credentials: "include" jest ZAKAZANY w CORS → przeglądarka blokuje
      // odpowiedź i request kończy się net::ERR_FAILED.
      //
      // Jest: „same-origin" — dla API na własnym originie cookies działają
      // dokładnie tak samo jak wcześniej (sesja/logowanie bez zmian), a dla
      // zasobów cross-origin (obrazy, CDN) request nie wysyła cookies, więc
      // „Access-Control-Allow-Origin: *" jest poprawne i odpowiedź przechodzi.
      credentials: "same-origin",
    });

    if (options.on401 === "returnData" && res.status === 401) {
      return null as any;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

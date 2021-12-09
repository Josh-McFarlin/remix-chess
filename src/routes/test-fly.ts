import type { LoaderFunction } from "remix";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response> => {
  try {
    console.log("request", JSON.stringify(request, null, 2));
    console.log("headers", JSON.stringify(request.headers, null, 2));
    console.log(
      "header entries",
      JSON.stringify([...request.headers.entries()], null, 2)
    );
    console.log("Fly-Client-IP", request.headers.get("Fly-Client-IP"));
    console.log("X-Forwarded-For", request.headers.get("X-Forwarded-For"));
    console.log("Via", request.headers.get("Via"));

    return new Response("Check logs!", {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return new Response("Failed!", {
      status: 500,
    });
  }
};

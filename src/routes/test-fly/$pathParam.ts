import type { LoaderFunction } from "remix";
import path from "path";
import fs from "fs";

export const loader: LoaderFunction = async ({
  request,
  params,
}): Promise<Response> => {
  try {
    console.log("Fly-Client-IP", request.headers.get("Fly-Client-IP"));
    console.log("Fly-Client-IP", request.headers.get("referer"));

    try {
      const { pathParam } = params;

      const pathName = path.resolve(__dirname, pathParam || "");

      const contents = fs.readdirSync(pathName, { withFileTypes: true });
      const contentNames = JSON.stringify(
        contents.map((c) => c.name),
        null,
        2
      );

      console.log(pathName, contentNames);

      return new Response(contentNames, {
        status: 200,
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      console.error(error?.message || error);
    }

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

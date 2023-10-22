import {
  error,
  json,
  Router,
  createCors,
  createResponse,
  jpeg,
} from "itty-router";

interface Env {
  BUCKET: R2Bucket;
}

const { preflight, corsify } = createCors({
  origins: ["*"],
  methods: ["GET", "PUT"],
});

const router = Router();

const MAX_IMAGE_SIZE = 10_000_000;
const cachePolicy = {
  "Cache-Control": "public, max-age=31536000",
};

// Function to handle errors in a consistent manner
const handleError = (status: number, message: string) => {
  console.error(message);
  return error(status, message);
};

// Function to validate the uploaded file
const validateFile = (file: unknown): file is File => {
  if (
    !file ||
    !(file instanceof File) ||
    file.size < 1 ||
    file.size > MAX_IMAGE_SIZE ||
    !file.type.startsWith("image/")
  ) {
    return false;
  }
  return true;
};

// Function to calculate the SHA-1 hash of the file
const calculateHash = async (blob: ArrayBuffer) => {
  const hash = await crypto.subtle.digest({ name: "sha-1" }, blob);
  return [...new Uint8Array(hash)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
};

router
  .all("*", preflight)
  .put("/images", async (req, env: Env) => {
    try {
      const formData = await req.formData();
      const file = formData.get("file");

      if (!validateFile(file)) {
        return handleError(400, "Invalid file");
      }

      console.log("got file", file.name, file.size, file.type);

      const blob = await file.arrayBuffer();
      const key = await calculateHash(blob);
      const res = await env.BUCKET.put(key, file);

      if (res === null) {
        throw new Error("Failed to save image");
      }

      console.log("saved image", res.uploaded);
      return json({ id: key });
    } catch (e) {
      console.error(e);
      return handleError(500, "An unexpected error occurred");
    }
  })
  .get("/images/:id", async (req, env: Env) => {
    try {
      const { id } = req.params as { id: string };

      if (!id) {
        return handleError(400, "Missing id");
      }

      const object = await env.BUCKET.get(id);

      if (!object) {
        return handleError(404, "Image not found");
      }

      const nativeType = object.httpMetadata?.contentType?.split(";")[0];
      const responseType = nativeType ? createResponse(nativeType) : jpeg;
      return responseType(await object.blob(), {
        headers: {
          ...cachePolicy,
        },
      });
    } catch (e) {
      console.error(e);
      return handleError(500, "An unexpected error occurred");
    }
  })
  .all("*", () => error(404));

export default {
  fetch: (req: Request, env: Env, ctx: ExecutionContext) =>
    router.handle(req, env, ctx).then(corsify).catch(error),
};

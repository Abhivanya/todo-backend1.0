export const requestDataValidator =
  (schema, property = "body") =>
  (req, res, next) => {
    const result = schema.safeParse(req[property]);

    if (!result.success) {
      res.status(400).json({
        data: null,
        message: result.error.errors,
        success: false,
      });
    }
    req[property] = result.data;

    next();
  };

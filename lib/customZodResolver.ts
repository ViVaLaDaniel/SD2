import { z } from "zod";
import { FieldValues, Resolver } from "react-hook-form";

/**
 * A custom Zod resolver for React Hook Form.
 * This function integrates Zod schema validation with React Hook Form.
 * It replaces the need for the `@hookform/resolvers/zod` package.
 *
 * @template T - The type of the form values, inferred from the Zod schema.
 * @param {z.Schema<T>} schema - The Zod schema to validate against.
 * @returns {Resolver<T>} A resolver function that React Hook Form can use.
 */
export const customZodResolver =
  <T extends FieldValues>(schema: z.Schema<T>): Resolver<T> =>
  async (values) => {
    try {
      // Validate the form values against the Zod schema
      const parsedValues = await schema.parseAsync(values);
      // If validation is successful, return the values and an empty errors object
      return {
        values: parsedValues,
        errors: {},
      };
    } catch (error) {
      // If validation fails, check if it's a ZodError
      if (error instanceof z.ZodError) {
        // Transform Zod's error structure into the format React Hook Form expects
        const errors = error.issues.reduce(
          (acc, currentError) => {
            const path = currentError.path.join(".");
            if (!acc[path]) {
              acc[path] = {
                type: currentError.code,
                message: currentError.message,
              };
            }
            return acc;
          },
          {} as Record<string, any>
        );
        // Return an empty values object and the formatted errors
        return {
          values: {},
          errors,
        };
      }
      // If it's not a ZodError, re-throw it
      throw error;
    }
  };
export function CatchMigrationError(): MethodDecorator {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const errorHandler = (error: any) => {
      console.log(
        '[MIGRATION ERROR]',
        error instanceof Error ? error.cause || error : error,
      );
    };
    descriptor.value = function (...args: any[]) {
      try {
        const result = originalMethod.apply(this, args);
        return result instanceof Promise ? result.catch(errorHandler) : result;
      } catch (error) {
        errorHandler(error);
      }
    };
    return descriptor;
  };
}

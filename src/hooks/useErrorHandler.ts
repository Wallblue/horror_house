import { useState, useCallback } from 'react';

export interface AppError {
  message: string;
  type: 'validation' | 'network' | 'server' | 'unknown';
  field?: string;
  code?: string;
}

export const useErrorHandler = () => {
  const [errors, setErrors] = useState<AppError[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addError = useCallback((error: AppError) => {
    setErrors(prev => [...prev, error]);
  }, []);

  const removeError = useCallback((index: number) => {
    setErrors(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearErrors = useCallback(() => {
    setErrors([]);
  }, []);

  const handleApiError = useCallback((error: any): AppError => {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      return {
        message: 'Impossible de se connecter au serveur. Vérifiez votre connexion internet.',
        type: 'network'
      };
    }

    if (error.status) {
      switch (error.status) {
        case 400:
          return {
            message: error.message || 'Données invalides',
            type: 'validation'
          };
        case 404:
          return {
            message: 'Ressource non trouvée',
            type: 'server'
          };
        case 500:
          return {
            message: 'Erreur interne du serveur',
            type: 'server'
          };
        default:
          return {
            message: error.message || 'Une erreur est survenue',
            type: 'server'
          };
      }
    }

    return {
      message: error.message || 'Une erreur inattendue est survenue',
      type: 'unknown'
    };
  }, []);

  const executeWithErrorHandling = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    onSuccess?: (result: T) => void,
    onError?: (error: AppError) => void
  ): Promise<T | null> => {
    setIsLoading(true);
    clearErrors();

    try {
      const result = await asyncFn();
      onSuccess?.(result);
      return result;
    } catch (error) {
      const appError = handleApiError(error);
      addError(appError);
      onError?.(appError);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [handleApiError, addError, clearErrors]);

  return {
    errors,
    isLoading,
    addError,
    removeError,
    clearErrors,
    handleApiError,
    executeWithErrorHandling
  };
};

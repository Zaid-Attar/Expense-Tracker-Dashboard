import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ShieldAlert } from 'lucide-react';

export const setupAxiosInterceptors = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 429) {
        // Custom UI for rate limiting
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-base-100 shadow-2xl rounded-xl pointer-events-auto flex ring-1 ring-error/30 overflow-hidden`}
          >
            <div className="flex-1 w-0 p-4 border-l-4 border-error bg-error/5">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5 text-error">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-bold text-error">
                    Rate Limit Exceeded
                  </p>
                  <p className="mt-1 text-sm text-base-content/80">
                    You're moving too fast! Please wait a moment before trying again to keep the server healthy.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-base-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="w-full border border-transparent rounded-none p-4 flex items-center justify-center text-sm font-medium hover:bg-base-200 focus:outline-none transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        ), { 
          duration: 5000, 
          id: 'rate-limit-toast' // Prevents spamming multiple of these
        });
      }
      return Promise.reject(error);
    }
  );
};

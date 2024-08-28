interface CustomHeadersOptions {
  authorization?: boolean;
  contentType?: boolean;
  multipartType?:boolean;
}

const customHeaders = (options: CustomHeadersOptions = {}) => {
  const headers: Record<string, string> = {};

  if (typeof window !== 'undefined') {
    const storage = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user') || '');

    if (options.authorization && storage && storage.token) {
      headers.Authorization = `Bearer ${storage.token}`;
    }
  }
  

  if (options.contentType) {
    headers['Content-Type'] = 'application/json';
  }
  
  if (options.multipartType) {
    headers['Content-Type'] = 'multipart/form-data';
  }

  return headers;
};

export default customHeaders;

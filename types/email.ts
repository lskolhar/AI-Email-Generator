export interface GenerateEmailRequest {
  prompt: string;
  tone: string;
}

export interface GenerateEmailResponse {
  subject: string;
  body: string;
}

export interface GenerateEmailError {
  error: string;
}
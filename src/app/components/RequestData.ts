export interface DocumentUpload {
  fileName: string;
  contentType: string;
  s3Url: string;
  type: number; // DocumentType
}

export interface RequestData {
  fName: string;
  lfName: string;
  gmail: string;
  homeNumber: string;
  street: string;
  // city: string;
  propertyNumber: string;
  status: string;
  averageMonthlyIncome: number;
  calculatedArnona: number;
  approvedArnona: number;
  documentUploads: DocumentUpload[];
}
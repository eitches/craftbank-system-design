export type ContractorPosition = 
  | 'PRIME_CONTRACTOR' 
  | 'FIRST_SUB_CONTRACTOR' 
  | 'SECOND_SUB_CONTRACTOR' 
  | 'THIRD_SUB_CONTRACTOR';

export type PaymentClosingDate = 
  | 'NEGOTIABLE' 
  | 'FIVE_DAY' 
  | 'TEN_DAY' 
  | 'FIFTEEN_DAY' 
  | 'TWENTY_DAY' 
  | 'TWENTY_FIVE_DAY' 
  | 'END_OF_MONTH';

export type PaymentDueMonth = 
  | 'NEGOTIABLE' 
  | 'THIS_MONTH' 
  | 'NEXT_MONTH' 
  | 'AFTER_NEXT_MONTH';

export type PaymentDueDate = 
  | 'NEGOTIABLE' 
  | 'FIVE_DAY' 
  | 'TEN_DAY' 
  | 'FIFTEEN_DAY' 
  | 'TWENTY_DAY' 
  | 'TWENTY_FIVE_DAY' 
  | 'END_OF_MONTH';
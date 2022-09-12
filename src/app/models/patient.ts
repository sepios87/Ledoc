import { PatientDocument } from './patient-document';
import { PatientTreatment } from './patient-treatment';

export interface Patient {
    id?: string,
    firstName: string,
    lastName: string,
    gender: number,
    allergies: string,
    height: string,
    weight: number,
    lastIncome: string,
    lastSubject: string,
    bloodGroup: number,
    socialNumber: string,
    notes: string,
    documents: PatientDocument[],
    treatments: PatientTreatment[]
}
